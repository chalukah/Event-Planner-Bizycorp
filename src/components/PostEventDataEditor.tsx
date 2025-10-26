import { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { usePanelStore } from '../panelStore';
import { EMAIL_TEMPLATES } from '../data/emailTemplates';

type PostEventDataEditorProps = {
  onComplete?: () => void;
  onCancel?: () => void;
};

export function PostEventDataEditor({ onComplete, onCancel }: PostEventDataEditorProps) {
  const selectedEventId = usePanelStore((s) => s.ui.selectedEventId);
  const panelEvents = usePanelStore((s) => s.panelEvents);
  const updatePostEventData = usePanelStore((s) => s.updatePostEventData);
  const regenerateEmail = usePanelStore((s) => s.regenerateEmail);
  const showToast = usePanelStore((s) => s.showToast);

  const selectedEvent = panelEvents.find((e) => e.id === selectedEventId);

  const [recordingLink, setRecordingLink] = useState('');
  const [panelistData, setPanelistData] = useState<
    Record<
      string,
      {
        registrationCount: number;
        attendeeListLink: string;
        contributionSummary: string;
      }
    >
  >({});

  useEffect(() => {
    if (!selectedEvent) return;

    setRecordingLink(selectedEvent.recordingLink || '');

    const initialData: typeof panelistData = {};
    selectedEvent.panelists.forEach((p) => {
      initialData[p.id] = {
        registrationCount: p.registrationCount || 0,
        attendeeListLink: p.attendeeListLink || '',
        contributionSummary: p.contributionSummary || '',
      };
    });
    setPanelistData(initialData);
  }, [selectedEvent?.id]);

  if (!selectedEvent) return null;

  const handleSave = () => {
    // Update post-event data
    updatePostEventData(selectedEvent.id, {
      recordingLink,
      panelistUpdates: selectedEvent.panelists.map((p) => ({
        panelistId: p.id,
        registrationCount: panelistData[p.id]?.registrationCount || 0,
        attendeeListLink: panelistData[p.id]?.attendeeListLink || '',
        contributionSummary: panelistData[p.id]?.contributionSummary || '',
      })),
    });

    // Find and regenerate E+1 Thank You emails
    const thankYouTemplate = EMAIL_TEMPLATES.find((t) => t.code === 'E+1');
    if (thankYouTemplate) {
      const thankYouEmails = selectedEvent.generatedEmails.filter(
        (e) => e.templateId === thankYouTemplate.id
      );

      thankYouEmails.forEach((email) => {
        regenerateEmail(selectedEvent.id, email.id);
      });

      showToast(
        `Post-event data saved and ${thankYouEmails.length} thank you emails regenerated`,
        'success'
      );
    } else {
      showToast('Post-event data saved', 'success');
    }

    if (onComplete) {
      onComplete();
    }
  };

  const updatePanelistField = (
    panelistId: string,
    field: keyof typeof panelistData[string],
    value: string | number
  ) => {
    setPanelistData((prev) => ({
      ...prev,
      [panelistId]: {
        ...prev[panelistId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Post-Event Data</h1>
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
            disabled={!onCancel}
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Emails
            </span>
          </button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                About Post-Event Data
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                After your panel event, add the recording link and registration counts. The system
                will automatically regenerate thank you emails with conditional sections:
              </p>
              <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1 ml-4">
                <li>• 10+ registrations: Includes attendee list link</li>
                <li>• 25+ registrations: Includes podcast qualification message</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recording Link */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            Recording Link <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={recordingLink}
            onChange={(e) => setRecordingLink(e.target.value)}
            placeholder="https://zoom.us/rec/share/..."
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
          />
          <p className="text-sm text-slate-500 mt-1">
            The Zoom recording link for the panel event
          </p>
        </div>

        {/* Panelist Data */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Panelist Registration Data</h2>

          <div className="space-y-6">
            {selectedEvent.panelists.map((panelist) => {
              const data = panelistData[panelist.id] || {
                registrationCount: 0,
                attendeeListLink: '',
                contributionSummary: '',
              };
              const hasAttendeeList = data.registrationCount >= 10;
              const hasPodcastQualification = data.registrationCount >= 25;

              return (
                <div
                  key={panelist.id}
                  className="border border-slate-200 dark:border-slate-700 rounded-lg p-4"
                >
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    {panelist.fullName}
                    {hasPodcastQualification && (
                      <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                        🎉 Podcast Qualified
                      </span>
                    )}
                    {hasAttendeeList && !hasPodcastQualification && (
                      <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                        ✓ Gets Attendee List
                      </span>
                    )}
                  </h3>

                  <div className="space-y-4">
                    {/* Registration Count */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Registration Count <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={data.registrationCount}
                        onChange={(e) =>
                          updatePanelistField(
                            panelist.id,
                            'registrationCount',
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
                      />
                      <p className="text-sm text-slate-500 mt-1">
                        Number of registrations from their unique tracking link
                      </p>
                    </div>

                    {/* Attendee List Link (only if 10+) */}
                    {hasAttendeeList && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Attendee List Link
                          {data.registrationCount >= 10 && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <input
                          type="url"
                          value={data.attendeeListLink}
                          onChange={(e) =>
                            updatePanelistField(panelist.id, 'attendeeListLink', e.target.value)
                          }
                          placeholder="https://docs.google.com/spreadsheets/..."
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
                        />
                        <p className="text-sm text-slate-500 mt-1">
                          Link to attendee list (required for 10+ registrations)
                        </p>
                      </div>
                    )}

                    {/* Contribution Summary */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Contribution Summary <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={data.contributionSummary}
                        onChange={(e) =>
                          updatePanelistField(panelist.id, 'contributionSummary', e.target.value)
                        }
                        placeholder="recruitment strategies, burnout prevention, and building career pathways"
                        rows={2}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
                      />
                      <p className="text-sm text-slate-500 mt-1">
                        Brief summary of what this panelist discussed
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            Save and Regenerate Thank You Emails
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <p className="font-semibold mb-1">What happens when you save:</p>
              <ol className="space-y-1 ml-4 list-decimal">
                <li>Post-event data is saved to the database</li>
                <li>E+1 Thank You emails are regenerated for each panelist</li>
                <li>Conditional sections are automatically included/excluded based on registration counts</li>
                <li>You can immediately copy and send the thank you emails</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
