import { useState } from 'react';
import { Mail, Sparkles, User } from 'lucide-react';
import { usePanelStore } from '../panelStore';
import { EMAIL_TEMPLATES } from '../data/emailTemplates';
import { LinkCollectionModal } from './LinkCollectionModal';
import { PanelAssetsGenerator } from './PanelAssetsGenerator';

export function EmailGenerator() {
  const selectedEventId = usePanelStore((s) => s.ui.selectedEventId);
  const panelEvents = usePanelStore((s) => s.panelEvents);
  const generateEmails = usePanelStore((s) => s.generateEmails);

  const [showLinkModal, setShowLinkModal] = useState(false);

  const selectedEvent = panelEvents.find((e) => e.id === selectedEventId);

  if (!selectedEvent) return null;

  const hasGeneratedEmails = selectedEvent.generatedEmails.length > 0;
  const panelistCount = selectedEvent.panelists.length;
  const perPanelistTemplates = EMAIL_TEMPLATES.filter((t) => t.perPanelist).length;
  const generalTemplates = EMAIL_TEMPLATES.filter((t) => !t.perPanelist).length;
  const estimatedEmailCount = perPanelistTemplates * panelistCount + generalTemplates;

  const handleGenerate = () => {
    if (panelistCount === 0) {
      return;
    }
    generateEmails(selectedEvent.id);
    // Show link collection modal after generating emails
    setShowLinkModal(true);
  };

  const handleLinkCollectionComplete = () => {
    setShowLinkModal(false);
    // Regenerate emails with the updated links
    generateEmails(selectedEvent.id);
  };

  if (panelistCount === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Panelists Yet</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            You need to import panelists before generating emails.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Event: {selectedEvent.name}
          </p>
        </div>
      </div>
    );
  }

  if (!hasGeneratedEmails) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Ready to Generate Emails</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Generate personalized emails for all {panelistCount} panelists.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-semibold text-sm mb-2">What will be generated:</h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• {EMAIL_TEMPLATES.length} email templates</li>
              <li>• {perPanelistTemplates} per-panelist emails × {panelistCount} panelists</li>
              <li>• {generalTemplates} general emails</li>
              <li className="font-semibold text-blue-600 dark:text-blue-400 pt-1">
                = {estimatedEmailCount} total emails
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-100">
              Panelists:
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              {selectedEvent.panelists.map((p) => (
                <li key={p.id}>• {p.fullName}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleGenerate}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            Generate {estimatedEmailCount} Emails
          </button>

          {/* Panel Assets Generator */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <PanelAssetsGenerator eventId={selectedEvent.id} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showLinkModal && (
        <LinkCollectionModal
          eventId={selectedEvent.id}
          onClose={() => setShowLinkModal(false)}
          onComplete={handleLinkCollectionComplete}
        />
      )}
    </>
  );
}
