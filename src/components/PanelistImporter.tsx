import { useState } from 'react';
import { Upload, Download, Link as LinkIcon, CheckCircle, XCircle, FileText } from 'lucide-react';
import { usePanelStore } from '../panelStore';
import {
  parseCSV,
  readFileAsText,
  generateCSVTemplate,
  validateCSVHeaders,
  parseUnstructuredPanelistText,
} from '../utils/csvImport';
import { importPanelistsFromSheet, isGoogleAPIConfigured, GOOGLE_SHEETS_SETUP_INSTRUCTIONS } from '../utils/googleSheetsAPI';
import type { Panelist } from '../types';

type PanelistImporterProps = {
  eventId: string;
  onComplete?: () => void;
  onCancel?: () => void;
};

export function PanelistImporter({ eventId, onComplete, onCancel }: PanelistImporterProps) {
  const importPanelists = usePanelStore((s) => s.importPanelists);
  const showToast = usePanelStore((s) => s.showToast);

  const [activeTab, setActiveTab] = useState<'csv' | 'sheets' | 'text'>('csv');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvError, setCsvError] = useState<string>('');
  const [previewPanelists, setPreviewPanelists] = useState<Panelist[]>([]);
  const [previewSource, setPreviewSource] = useState<'csv' | 'text' | null>(null);
  const [sheetUrl, setSheetUrl] = useState('');
  const [textInput, setTextInput] = useState('');
  const [textError, setTextError] = useState('');
  const [namesOnly, setNamesOnly] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleDownloadTemplate = () => {
    const template = generateCSVTemplate();
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'panelist_template.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV template downloaded', 'success');
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvFile(file);
    setCsvError('');
    setPreviewPanelists([]);
    setPreviewSource(null);

    try {
      const csvText = await readFileAsText(file);

      // Validate headers
      const validation = validateCSVHeaders(csvText);
      if (!validation.isValid) {
        setCsvError(`Missing required columns: ${validation.missingHeaders.join(', ')}`);
        return;
      }

      // Parse CSV
      const panelists = parseCSV(csvText);
      setPreviewPanelists(panelists);
      setPreviewSource('csv');
      showToast(`Loaded ${panelists.length} panelists`, 'success');
    } catch (error) {
      setCsvError(error instanceof Error ? error.message : 'Failed to parse CSV');
      setPreviewSource(null);
    }
  };

  const handleCsvImport = () => {
    if (previewPanelists.length === 0 || previewSource !== 'csv') {
      showToast('No panelists to import', 'error');
      return;
    }

    importPanelists(eventId, previewPanelists);
    setPreviewPanelists([]);
    setPreviewSource(null);
    if (onComplete) {
      onComplete();
    }
  };

  const handleSheetsImport = async () => {
    if (!sheetUrl.trim()) {
      showToast('Please enter a Google Sheets URL', 'error');
      return;
    }

    if (!isGoogleAPIConfigured()) {
      showToast('Google Sheets API not configured', 'error');
      alert(GOOGLE_SHEETS_SETUP_INSTRUCTIONS);
      return;
    }

    setIsImporting(true);

    try {
      const panelists = await importPanelistsFromSheet(sheetUrl);
      importPanelists(eventId, panelists);
      showToast(`Imported ${panelists.length} panelists from Google Sheets`, 'success');

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to import from Google Sheets', 'error');
    } finally {
      setIsImporting(false);
    }
  };

  const handleTextParse = () => {
    const sanitizedInput = textInput.trim();
    if (!sanitizedInput) {
      setTextError('Please enter panelist data');
      return;
    }

    setTextError('');
    setPreviewPanelists([]);
    setPreviewSource(null);

    try {
      // If names-only mode, treat each non-empty line (or comma-separated token) as a full name
      if (namesOnly) {
        const pieces = sanitizedInput
          .replace(/\band\b/gi, '\n')
          .split(/[\n,;]+/)
          .map((s) => s.trim())
          .filter(Boolean);

        const stripTitle = (name: string) => name.replace(/^(dr|mr|mrs|ms|miss|prof|sir)\.?\s+/i, '').trim();
        const deriveFirst = (name: string) => {
          const without = stripTitle(name);
          const [first = ''] = without.split(/\s+/);
          return first || without || name;
        };

        const panelists: Panelist[] = pieces.map((fullName) => ({
          id: crypto.randomUUID(),
          firstName: deriveFirst(fullName),
          fullName,
          email: '',
          zoomJoinLink: '',
          registrationTrackingLink: '',
          promotionalMaterialsLink: '',
          questionsLink: '',
          finalBannerLink: '',
          questions: ['', '', '', '', ''],
        }));

        if (panelists.length === 0) {
          setTextError('No names detected. Add one name per line.');
          return;
        }

        setPreviewPanelists(panelists);
        setPreviewSource('text');
        showToast(`Parsed ${panelists.length} names`, 'success');
        return;
      }

      // Validate headers
      const validation = validateCSVHeaders(sanitizedInput);

      let panelists: Panelist[] = [];

      if (validation.isValid) {
        panelists = parseCSV(sanitizedInput);
      } else {
        const fallbackPanelists = parseUnstructuredPanelistText(sanitizedInput);
        if (fallbackPanelists.length === 0) {
          setTextError(
            `Missing required columns: ${validation.missingHeaders.join(
              ', '
            )}. Add the header row from the template or ensure the text matches the Zoom export format.`
          );
          return;
        }

        panelists = fallbackPanelists;
      }

      setPreviewPanelists(panelists);
      setPreviewSource('text');
      showToast(`Parsed ${panelists.length} panelists`, 'success');
    } catch (error) {
      setTextError(error instanceof Error ? error.message : 'Failed to parse text input');
      setPreviewSource(null);
    }
  };

  const handleTextImport = () => {
    if (previewPanelists.length === 0 || previewSource !== 'text') {
      showToast('No panelists to import', 'error');
      return;
    }

    importPanelists(eventId, previewPanelists);
    setPreviewPanelists([]);
    setPreviewSource(null);
    if (onComplete) {
      onComplete();
    }
  };

  const renderPreview = (source: 'csv' | 'text', onImport: () => void) => {
    if (previewSource !== source || previewPanelists.length === 0) {
      return null;
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h3 className="font-semibold">
            Preview ({previewPanelists.length} panelists)
          </h3>
        </div>

        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Questions</th>
                </tr>
              </thead>
              <tbody>
                {previewPanelists.map((panelist, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-200 dark:border-slate-700"
                  >
                    <td className="px-4 py-2 text-sm">{panelist.fullName}</td>
                    <td className="px-4 py-2 text-sm">{panelist.email}</td>
                    <td className="px-4 py-2 text-sm">
                      {panelist.questions.filter((q) => q).length} / 5
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={onImport}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Import {previewPanelists.length} Panelists
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Import Panelists</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('csv')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'csv'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <span className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            CSV Upload
          </span>
        </button>
        <button
          onClick={() => setActiveTab('sheets')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'sheets'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <span className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            Google Sheets
          </span>
        </button>
        <button
          onClick={() => setActiveTab('text')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'text'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <span className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Text Input
          </span>
        </button>
      </div>

      {/* CSV Tab */}
      {activeTab === 'csv' && (
        <div className="space-y-6">
          {/* Download Template */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Download className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Download CSV Template
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  Download our template with example data and fill in your panelist information.
                </p>
                <button
                  onClick={handleDownloadTemplate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Download Template
                </button>
              </div>
            </div>
          </div>

          {/* Upload CSV */}
          <div>
            <label className="block text-sm font-medium mb-2">Upload CSV File</label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Drag and drop your CSV file here, or click to browse
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Select CSV File
              </label>
              {csvFile && (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                  Selected: {csvFile.name}
                </p>
              )}
            </div>

            {csvError && (
              <div className="mt-3 flex items-start gap-2 text-red-600 dark:text-red-400 text-sm">
                <XCircle className="w-5 h-5 flex-shrink-0" />
                <p>{csvError}</p>
              </div>
            )}
          </div>

          {/* Preview */}
          {renderPreview('csv', handleCsvImport)}
        </div>
      )}

      {/* Text Input Tab */}
      {activeTab === 'text' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Paste Panelist Data</label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={namesOnly
                ? `One name per line (or comma-separated)\nDr. Melanie Barham\nDr. Mia Cary`
                : `Full Name,Email,Question 1,...\nJane Doe,jane@example.com,Question response,...`}
              rows={10}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 font-mono text-sm"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-slate-500">
                {namesOnly
                  ? 'Names-only mode: we will add panelists with blank email/links.'
                  : 'Paste CSV-formatted text matching the template headers, including the header row.'}
              </p>
              <label className="text-sm flex items-center gap-2 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={namesOnly}
                  onChange={(e) => setNamesOnly(e.target.checked)}
                />
                Treat input as names only
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleTextParse}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Parse Text
            </button>
            <button
              onClick={() => {
                setTextInput('');
                setTextError('');
                setPreviewPanelists([]);
                setPreviewSource(null);
              }}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Clear
            </button>
          </div>

          {textError && (
            <div className="flex items-start gap-2 text-red-600 dark:text-red-400 text-sm">
              <XCircle className="w-5 h-5 flex-shrink-0" />
              <p>{textError}</p>
            </div>
          )}

          {/* Preview */}
          {renderPreview('text', handleTextImport)}
        </div>
      )}

      {/* Google Sheets Tab */}
      {activeTab === 'sheets' && (
        <div className="space-y-6">
          {!isGoogleAPIConfigured() && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <LinkIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                    Google Sheets API Not Configured
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                    To use Google Sheets import, you need to set up API credentials.
                  </p>
                  <button
                    onClick={() => alert(GOOGLE_SHEETS_SETUP_INSTRUCTIONS)}
                    className="text-sm font-medium text-yellow-700 dark:text-yellow-300 underline hover:no-underline"
                  >
                    View Setup Instructions
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Google Sheets URL</label>
            <input
              type="url"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/..."
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
            />
            <p className="text-sm text-slate-500 mt-2">
              Paste the URL of your Google Sheet containing panelist data
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Required Columns:</h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• First Name</li>
              <li>• Full Name</li>
              <li>• Email</li>
              <li>• Zoom Join Link</li>
              <li>• Registration Tracking Link</li>
              <li>• Promotional Materials Link</li>
              <li>• Final Banner Link</li>
              <li>• Question 1 through Question 5</li>
            </ul>
          </div>

          <div className="flex gap-3">
            {onCancel && (
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSheetsImport}
              disabled={isImporting || !sheetUrl.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isImporting ? 'Importing...' : 'Import from Google Sheets'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
