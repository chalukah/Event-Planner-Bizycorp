import { useState } from 'react';
import { Copy, Download, RotateCcw, Code, Eye, CheckCircle, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { usePanelStore } from '../panelStore';
import { EMAIL_TEMPLATES } from '../data/emailTemplates';
import { copyTextWithFallback } from '../utils/clipboard';
import { downloadText } from '../utils/download';
import { generateEmailFilename } from '../utils/templateEngine';

export function EmailViewer() {
  const selectedEventId = usePanelStore((s) => s.ui.selectedEventId);
  const selectedEmailId = usePanelStore((s) => s.ui.selectedEmailId);
  const emailListCollapsed = usePanelStore((s) => s.ui.emailListCollapsed);
  const panelEvents = usePanelStore((s) => s.panelEvents);
  const updateGeneratedEmail = usePanelStore((s) => s.updateGeneratedEmail);
  const regenerateEmail = usePanelStore((s) => s.regenerateEmail);
  const toggleEmailList = usePanelStore((s) => s.toggleEmailList);
  const showToast = usePanelStore((s) => s.showToast);

  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [editedContent, setEditedContent] = useState('');
  const [hasEdits, setHasEdits] = useState(false);

  const selectedEvent = panelEvents.find((e) => e.id === selectedEventId);
  const email = selectedEvent?.generatedEmails.find((e) => e.id === selectedEmailId);
  const template = email ? EMAIL_TEMPLATES.find((t) => t.id === email.templateId) : null;
  const panelist = email?.panelistId
    ? selectedEvent?.panelists.find((p) => p.id === email.panelistId)
    : null;

  if (!email || !selectedEvent || !template) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select an email to view</p>
        </div>
      </div>
    );
  }

  // Initialize edited content
  if (!hasEdits && editedContent !== email.htmlContent) {
    setEditedContent(email.htmlContent);
  }

  const handleCopyHTML = async () => {
    const content = hasEdits ? editedContent : email.htmlContent;
    const success = await copyTextWithFallback(content);
    if (success) {
      showToast('Email HTML copied! Paste into Outlook with Ctrl+V', 'success');
    } else {
      showToast('Failed to copy', 'error');
    }
  };

  const handleCopySubject = async () => {
    const success = await copyTextWithFallback(email.subject);
    if (success) {
      showToast('Subject line copied!', 'success');
    } else {
      showToast('Failed to copy subject', 'error');
    }
  };

  const handleDownload = () => {
    const content = hasEdits ? editedContent : email.htmlContent;
    const filename = generateEmailFilename(selectedEvent, template.name, panelist || undefined);
    downloadText(filename, content, 'text/html');
    showToast('Email downloaded', 'success');
  };

  const handleRegenerate = () => {
    regenerateEmail(selectedEvent.id, email.id);
    setEditedContent(email.htmlContent);
    setHasEdits(false);
  };

  const handleSaveEdits = () => {
    if (!selectedEvent || !email) return;
    updateGeneratedEmail(selectedEvent.id, email.id, editedContent);
    setHasEdits(false);
    showToast('Changes saved', 'success');
  };

  const handleContentChange = (value: string) => {
    setEditedContent(value);
    setHasEdits(value !== email.htmlContent);
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                {template.code}
              </span>
              {panelist && (
                <span className="text-xs font-medium px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                  {panelist.fullName}
                </span>
              )}
              {hasEdits && (
                <span className="text-xs font-medium px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded">
                  Edited
                </span>
              )}
            </div>
            <h2 className="font-semibold text-sm">{email.subject}</h2>
          </div>

          <button
            onClick={handleCopySubject}
            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
            title="Copy subject line"
          >
            <Copy className="w-4 h-4" />
            Subject
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleEmailList}
            className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            title={emailListCollapsed ? "Show emails list" : "Hide emails list"}
          >
            {emailListCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          <button
            onClick={handleCopyHTML}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Copy className="w-4 h-4" />
            Copy HTML for Outlook
          </button>

          {hasEdits && (
            <button
              onClick={handleSaveEdits}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Save Changes
            </button>
          )}

          <button
            onClick={handleDownload}
            className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            title="Download HTML"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleRegenerate}
            className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            title="Regenerate from template"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="ml-auto flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setViewMode('preview')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'preview'
                  ? 'bg-white dark:bg-slate-700 shadow-sm'
                  : 'hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
              title="Preview"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'code'
                  ? 'bg-white dark:bg-slate-700 shadow-sm'
                  : 'hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
              title="HTML Source"
            >
              <Code className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'code' ? (
          <textarea
            value={editedContent}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            spellCheck={false}
          />
        ) : (
          <div className="h-full overflow-y-auto bg-slate-50 dark:bg-slate-900">
            <div className="max-w-3xl mx-auto p-8">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                <iframe
                  srcDoc={hasEdits ? editedContent : email.htmlContent}
                  className="w-full border-0"
                  style={{ minHeight: '600px' }}
                  title="Email Preview"
                  sandbox="allow-same-origin"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="border-t border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/20 p-3">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>To send in Outlook:</strong> Click "Copy HTML for Outlook" → Open Outlook →
          Create new email → Paste (Ctrl+V) → Add recipients → Send!
        </p>
      </div>
    </div>
  );
}
