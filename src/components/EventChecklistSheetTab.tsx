import { useRef, useState } from 'react';
import { Upload, Loader2, PanelLeftClose, LayoutGrid, Globe } from 'lucide-react';
import { usePanelStore } from '../panelStore';
import { useStore } from '../store';
import type { EventChecklist } from '../types';
import { readExcelFile, parseEventChecklist, parseCSVFile } from '../utils/excelParser';
import { syncChecklistToGoogleSheet } from '../utils/googleSheetsAPI';
import { SheetEmbed } from './SheetEmbed';
import { EventChecklistViewer } from './EventChecklistViewer';

/**
 * Event Checklist tab that embeds the Google Sheet and lets users
 * import Excel/CSV files to sync the structured data back to Google Sheets.
 */
export function EventChecklistSheetTab() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importEventChecklist = usePanelStore((s) => s.importEventChecklist);
  const showToast = usePanelStore((s) => s.showToast);
  const setSidebarOpen = usePanelStore((s) => s.setSidebarOpen);
  const sheetUrl = useStore((s) => s.eventChecklistSheetUrl);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [viewMode, setViewMode] = useState<'internal' | 'sheet'>('internal');

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsProcessing(true);

    try {
      let checklist: EventChecklist | null = null;

      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const workbook = await readExcelFile(file);
        checklist = parseEventChecklist(workbook);
      } else if (file.name.endsWith('.csv')) {
        const parsed = await parseCSVFile(file);
        if (parsed && 'tasks' in parsed) {
          checklist = parsed as EventChecklist;
        }
      } else {
        showToast('Please upload an Excel (.xlsx) or CSV file', 'error');
      }

      if (!checklist) {
        return;
      }

      importEventChecklist(checklist);

      if (!sheetUrl) {
        showToast('Checklist imported. Configure a Google Sheet URL to sync the data.', 'info');
        return;
      }

      setIsSyncing(true);
      await syncChecklistToGoogleSheet(sheetUrl, checklist);
      showToast('Google Sheet updated successfully', 'success');
    } catch (error) {
      console.error('Failed to import checklist', error);
      showToast('Failed to import checklist', 'error');
    } finally {
      setIsProcessing(false);
      setIsSyncing(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Event Checklist Workspace
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {viewMode === 'internal'
              ? 'Review and edit the built-in template directly inside the app.'
              : 'Sync with the shared Google Sheet or upload Excel/CSV files to push updates.'}
          </p>
          <div className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button
              onClick={() => setViewMode('internal')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'internal'
                  ? 'bg-blue-600 text-white'
                  : 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Built-in Checklist
            </button>
            <button
              onClick={() => setViewMode('sheet')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'sheet'
                  ? 'bg-blue-600 text-white'
                  : 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Google Sheet
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(false)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
            Collapse
          </button>
          {viewMode === 'sheet' && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                onClick={handleUploadClick}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isSyncing ? 'Syncing...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Excel/CSV
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </header>

      <div className={`flex-1 overflow-hidden ${viewMode === 'sheet' ? 'bg-slate-50 dark:bg-slate-900' : ''}`}>
        {viewMode === 'sheet' ? (
          <SheetEmbed urlKey="event" />
        ) : (
          <div className="h-full overflow-y-auto bg-slate-50 dark:bg-slate-900">
            <EventChecklistViewer />
          </div>
        )}
      </div>
    </div>
  );
}
