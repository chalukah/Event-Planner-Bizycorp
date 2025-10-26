import { Mail, User, Users, ChevronDown, ChevronRight, Link2, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { usePanelStore } from '../panelStore';
import { EMAIL_TEMPLATES } from '../data/emailTemplates';
import { LinkCollectionModal } from './LinkCollectionModal';

export function EmailsList() {
  const selectedEventId = usePanelStore((s) => s.ui.selectedEventId);
  const panelEvents = usePanelStore((s) => s.panelEvents);
  const selectedEmailId = usePanelStore((s) => s.ui.selectedEmailId);
  const selectEmail = usePanelStore((s) => s.selectEmail);
  const generateEmails = usePanelStore((s) => s.generateEmails);
  const regenerateAllEmails = usePanelStore((s) => s.regenerateAllEmails);

  const [expandedTemplates, setExpandedTemplates] = useState<Set<string>>(
    new Set(EMAIL_TEMPLATES.map((t) => t.id))
  );
  const [showLinkModal, setShowLinkModal] = useState(false);

  const selectedEvent = panelEvents.find((e) => e.id === selectedEventId);

  if (!selectedEvent || selectedEvent.generatedEmails.length === 0) return null;

  const handleLinkCollectionComplete = () => {
    setShowLinkModal(false);
    // Regenerate emails with the updated links
    if (selectedEventId) {
      generateEmails(selectedEventId);
    }
  };

  const toggleTemplate = (templateId: string) => {
    setExpandedTemplates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(templateId)) {
        newSet.delete(templateId);
      } else {
        newSet.add(templateId);
      }
      return newSet;
    });
  };

  // Group emails by template
  const emailsByTemplate = EMAIL_TEMPLATES.map((template) => {
    const emails = selectedEvent.generatedEmails.filter(
      (e) => e.templateId === template.id
    );

    return {
      template,
      emails,
    };
  }).filter((group) => group.emails.length > 0);

  return (
    <>
      {showLinkModal && selectedEventId && (
        <LinkCollectionModal
          eventId={selectedEventId}
          onClose={() => setShowLinkModal(false)}
          onComplete={handleLinkCollectionComplete}
        />
      )}

      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  Generated Emails ({selectedEvent.generatedEmails.length})
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {selectedEvent.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => regenerateAllEmails()}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  title="Regenerate all emails for all panel events with latest templates"
                >
                  <RefreshCw className="w-4 h-4" />
                  Update All Emails
                </button>
                <button
                  onClick={() => setShowLinkModal(true)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Link2 className="w-4 h-4" />
                  Edit Links
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-2 pb-10">
          {emailsByTemplate.map(({ template, emails }) => {
            const isExpanded = expandedTemplates.has(template.id);

            return (
              <div
              key={template.id}
              className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
            >
              {/* Template Header */}
              <button
                onClick={() => toggleTemplate(template.id)}
                className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                  <Mail className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <div className="text-left">
                    <div className="font-medium text-sm">
                      {template.code}: {template.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {template.sender} • {template.timing}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  {template.perPanelist ? (
                    <>
                      <User className="w-3 h-3" />
                      {emails.length} emails
                    </>
                  ) : (
                    <>
                      <Users className="w-3 h-3" />
                      General
                    </>
                  )}
                </div>
              </button>

              {/* Email List */}
              {isExpanded && (
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {emails.map((email) => {
                    const panelist = email.panelistId
                      ? selectedEvent.panelists.find((p) => p.id === email.panelistId)
                      : null;

                    const isSelected = email.id === selectedEmailId;

                    return (
                      <button
                        key={email.id}
                        onClick={() => selectEmail(email.id)}
                        className={`w-full text-left px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600'
                            : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            {panelist ? (
                              <div className="font-medium text-sm mb-1">
                                {panelist.fullName}
                              </div>
                            ) : (
                              <div className="font-medium text-sm mb-1">
                                {template.name}
                              </div>
                            )}
                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                              {email.subject}
                            </div>
                          </div>
                          {panelist?.registrationCount !== undefined && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
                              {panelist.registrationCount} regs
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
          </div>
        </div>
      </div>
    </>
  );
}
