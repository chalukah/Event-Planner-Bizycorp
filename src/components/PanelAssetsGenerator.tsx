import React, { useState } from 'react';
import { FolderPlus, Download, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { usePanelStore } from '../panelStore';
import {
  getPanelAssetsPath,
  getPanelFolderStructure,
  generateAllPanelDocuments,
} from '../utils/panelAssetsManager';

interface PanelAssetsGeneratorProps {
  eventId: string;
}

export const PanelAssetsGenerator: React.FC<PanelAssetsGeneratorProps> = ({ eventId }) => {
  const { panelEvents } = usePanelStore();
  const event = panelEvents.find((e) => e.id === eventId);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocs, setGeneratedDocs] = useState<Map<string, string>>(new Map());
  const [showInstructions, setShowInstructions] = useState(false);

  if (!event) return null;

  const handleGenerateAssets = async () => {
    setIsGenerating(true);

    try {
      // Generate all documents
      const documents = await generateAllPanelDocuments(event);
      setGeneratedDocs(documents);
      setShowInstructions(true);
    } catch (error) {
      console.error('Error generating panel assets:', error);
      alert('Error generating panel assets. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadDocument = (filePath: string, content: string) => {
    const fileName = filePath.split('\\').pop() || 'document.html';
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    generatedDocs.forEach((content, filePath) => {
      setTimeout(() => {
        handleDownloadDocument(filePath, content);
      }, 100); // Small delay between downloads
    });
  };

  const basePath = getPanelAssetsPath(event);
  const folders = getPanelFolderStructure(event);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <FolderPlus className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Panel Assets & Documents</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Generate all promotional materials and documents for this panel event.
          </p>

          {!showInstructions ? (
            <button
              onClick={handleGenerateAssets}
              disabled={isGenerating || event.panelists.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Generate Panel Assets
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">
                  {generatedDocs.size} documents generated successfully!
                </span>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-100">
                  📁 Folder Structure
                </h4>
                <p className="text-xs text-blue-800 dark:text-blue-200 mb-2">
                  Create these folders manually or use the path below:
                </p>
                <div className="bg-white dark:bg-slate-800 rounded p-3 font-mono text-xs overflow-x-auto mb-3">
                  {basePath}
                </div>
                <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                  {folders.slice(1).map((folder, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="opacity-50">└─</span>
                      <span>{folder.replace(basePath + '\\', '')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm">Generated Documents</h4>
                  <button
                    onClick={handleDownloadAll}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4" />
                    Download All
                  </button>
                </div>

                <div className="space-y-2">
                  {Array.from(generatedDocs.entries()).map(([filePath, content], index) => {
                    const fileName = filePath.split('\\').pop() || 'document.html';
                    const folderName = filePath
                      .split('\\')
                      .slice(-2, -1)[0];

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-sm">{fileName}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {folderName}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownloadDocument(filePath, content)}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    <p className="font-semibold mb-1">Next Steps:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Create the folder structure shown above</li>
                      <li>Download all documents using the buttons</li>
                      <li>Save each document in its corresponding folder</li>
                      <li>
                        Add Canva banners manually to "Promo Banners" and "Zoom Landing Banners"
                        folders
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowInstructions(false)}
                className="text-sm text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              >
                ← Back
              </button>
            </div>
          )}

          {event.panelists.length === 0 && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">
              Please add panelists before generating assets.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
