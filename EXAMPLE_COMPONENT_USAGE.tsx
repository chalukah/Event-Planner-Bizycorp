/**
 * EXAMPLE: How to use the VBI Panel Email Generator backend
 *
 * This file shows example usage of the completed backend.
 * Copy these patterns when building the actual UI components.
 */

import React, { useState } from 'react';
import { usePanelStore } from './src/panelStore';
import { parseCSV, readFileAsText } from './src/utils/csvImport';
import { importPanelistsFromSheet } from './src/utils/googleSheetsAPI';
import { copyTextWithFallback } from './src/utils/clipboard';
import { EMAIL_TEMPLATES } from './src/data/emailTemplates';

// ============================================================================
// EXAMPLE 1: Create a New Panel Event
// ============================================================================

function CreateEventExample() {
  const createEvent = usePanelStore(s => s.createEvent);
  const [formData, setFormData] = useState({
    name: '',
    panelTitle: '',
    panelSubtitle: '',
    // ... other fields
  });

  const handleSubmit = () => {
    const eventId = createEvent({
      name: formData.name,
      panelTitle: formData.panelTitle,
      panelSubtitle: formData.panelSubtitle,
      panelPurpose: formData.panelPurpose,
      eventDate: formData.eventDate,
      eventDateFull: formData.eventDateFull,
      eventDateShort: formData.eventDateShort,
      eventDateMinus1: formData.eventDateMinus1,
      discussionPoints: [
        formData.discussionPoint1,
        formData.discussionPoint2,
        formData.discussionPoint3,
        formData.discussionPoint4,
        formData.discussionPoint5,
      ],
      briefTopicDescription: formData.briefTopicDescription,
      panelists: [], // Will import later
    });

    console.log('Event created with ID:', eventId);
    // Navigate to panelist import step
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        placeholder="Event Name (e.g., OCT 29 Panel Event)"
      />
      {/* Add more inputs for all fields */}
      <button type="submit">Create Event</button>
    </form>
  );
}

// ============================================================================
// EXAMPLE 2: Import Panelists from CSV
// ============================================================================

function ImportPanelistsFromCSVExample() {
  const importPanelists = usePanelStore(s => s.importPanelists);
  const selectedEventId = usePanelStore(s => s.ui.selectedEventId);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedEventId) return;

    try {
      // Read CSV file
      const csvText = await readFileAsText(file);

      // Parse CSV to panelist objects
      const panelists = parseCSV(csvText);

      // Import into selected event
      importPanelists(selectedEventId, panelists);

      console.log(`Imported ${panelists.length} panelists`);
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import CSV: ' + error.message);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      <p>Upload a CSV file with panelist data</p>
    </div>
  );
}

// ============================================================================
// EXAMPLE 3: Import Panelists from Google Sheets
// ============================================================================

function ImportPanelistsFromSheetsExample() {
  const importPanelists = usePanelStore(s => s.importPanelists);
  const selectedEventId = usePanelStore(s => s.ui.selectedEventId);
  const [sheetUrl, setSheetUrl] = useState('');

  const handleImport = async () => {
    if (!selectedEventId) return;

    try {
      // Import from Google Sheets
      const panelists = await importPanelistsFromSheet(sheetUrl);

      // Import into selected event
      importPanelists(selectedEventId, panelists);

      console.log(`Imported ${panelists.length} panelists from Google Sheets`);
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import from Google Sheets: ' + error.message);
    }
  };

  return (
    <div>
      <input
        type="url"
        value={sheetUrl}
        onChange={e => setSheetUrl(e.target.value)}
        placeholder="Paste Google Sheets URL"
      />
      <button onClick={handleImport}>Import from Google Sheets</button>
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: Generate All Emails
// ============================================================================

function GenerateEmailsExample() {
  const generateEmails = usePanelStore(s => s.generateEmails);
  const selectedEventId = usePanelStore(s => s.ui.selectedEventId);
  const selectedEvent = usePanelStore(s =>
    s.panelEvents.find(e => e.id === s.ui.selectedEventId)
  );

  const handleGenerate = () => {
    if (!selectedEventId) return;

    // Generate all emails (16 templates × number of panelists)
    generateEmails(selectedEventId);

    console.log('Emails generated!');
  };

  return (
    <div>
      <h2>Event: {selectedEvent?.name}</h2>
      <p>Panelists: {selectedEvent?.panelists.length || 0}</p>
      <p>
        Will generate: {EMAIL_TEMPLATES.length} templates × {selectedEvent?.panelists.length || 0} panelists
        = {EMAIL_TEMPLATES.length * (selectedEvent?.panelists.length || 0)} emails
      </p>
      <button onClick={handleGenerate}>Generate All Emails</button>
    </div>
  );
}

// ============================================================================
// EXAMPLE 5: Display Generated Emails List
// ============================================================================

function EmailsListExample() {
  const selectedEvent = usePanelStore(s =>
    s.panelEvents.find(e => e.id === s.ui.selectedEventId)
  );
  const selectEmail = usePanelStore(s => s.selectEmail);

  if (!selectedEvent) return <div>No event selected</div>;

  // Group emails by template
  const emailsByTemplate = EMAIL_TEMPLATES.map(template => {
    const emails = selectedEvent.generatedEmails.filter(
      e => e.templateId === template.id
    );

    return {
      template,
      emails,
    };
  });

  return (
    <div>
      <h2>Generated Emails ({selectedEvent.generatedEmails.length})</h2>

      {emailsByTemplate.map(({ template, emails }) => (
        <div key={template.id}>
          <h3>{template.code}: {template.name}</h3>

          {template.perPanelist ? (
            // Show one email per panelist
            emails.map(email => {
              const panelist = selectedEvent.panelists.find(
                p => p.id === email.panelistId
              );

              return (
                <button
                  key={email.id}
                  onClick={() => selectEmail(email.id)}
                >
                  {panelist?.fullName}
                </button>
              );
            })
          ) : (
            // Show single email (not per-panelist)
            emails.map(email => (
              <button
                key={email.id}
                onClick={() => selectEmail(email.id)}
              >
                {template.name}
              </button>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// EXAMPLE 6: View and Copy Email
// ============================================================================

function EmailViewerExample() {
  const selectedEmailId = usePanelStore(s => s.ui.selectedEmailId);
  const selectedEvent = usePanelStore(s =>
    s.panelEvents.find(e => e.id === s.ui.selectedEventId)
  );

  const email = selectedEvent?.generatedEmails.find(
    e => e.id === selectedEmailId
  );

  if (!email) return <div>No email selected</div>;

  const handleCopyHTML = async () => {
    const success = await copyTextWithFallback(email.htmlContent);
    if (success) {
      alert('Email HTML copied! Paste into Outlook with Ctrl+V');
    } else {
      alert('Failed to copy');
    }
  };

  const handleCopySubject = async () => {
    await copyTextWithFallback(email.subject);
    alert('Subject line copied!');
  };

  return (
    <div>
      <div className="toolbar">
        <h2>{email.subject}</h2>
        <button onClick={handleCopyHTML}>Copy HTML</button>
        <button onClick={handleCopySubject}>Copy Subject</button>
      </div>

      <div className="split-view">
        {/* Left: HTML source (editable) */}
        <div className="editor">
          <h3>HTML Source</h3>
          <textarea
            value={email.htmlContent}
            onChange={e => {
              // Update email content
              usePanelStore.getState().updateGeneratedEmail(
                selectedEvent!.id,
                email.id,
                e.target.value
              );
            }}
            style={{ width: '100%', height: '100%', fontFamily: 'monospace' }}
          />
        </div>

        {/* Right: Live preview */}
        <div className="preview">
          <h3>Preview</h3>
          <iframe
            srcDoc={email.htmlContent}
            style={{ width: '100%', height: '100%', border: '1px solid #ccc' }}
            title="Email Preview"
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 7: Post-Event Data Editor
// ============================================================================

function PostEventDataExample() {
  const selectedEventId = usePanelStore(s => s.ui.selectedEventId);
  const selectedEvent = usePanelStore(s =>
    s.panelEvents.find(e => e.id === s.ui.selectedEventId)
  );
  const updatePostEventData = usePanelStore(s => s.updatePostEventData);
  const regenerateEmail = usePanelStore(s => s.regenerateEmail);

  const [recordingLink, setRecordingLink] = useState('');
  const [panelistData, setPanelistData] = useState<Record<string, any>>({});

  const handleSave = () => {
    if (!selectedEventId) return;

    // Update post-event data
    updatePostEventData(selectedEventId, {
      recordingLink,
      panelistUpdates: selectedEvent?.panelists.map(p => ({
        panelistId: p.id,
        registrationCount: panelistData[p.id]?.registrationCount,
        attendeeListLink: panelistData[p.id]?.attendeeListLink,
        contributionSummary: panelistData[p.id]?.contributionSummary,
      })),
    });

    // Regenerate E+1 thank you emails with conditional sections
    const thankYouEmails = selectedEvent?.generatedEmails.filter(e => {
      const template = EMAIL_TEMPLATES.find(t => t.id === e.templateId);
      return template?.code === 'E+1';
    });

    thankYouEmails?.forEach(email => {
      regenerateEmail(selectedEventId, email.id);
    });

    alert('Post-event data saved and thank you emails regenerated!');
  };

  if (!selectedEvent) return <div>No event selected</div>;

  return (
    <div>
      <h2>Post-Event Data</h2>

      <div>
        <label>Recording Link:</label>
        <input
          type="url"
          value={recordingLink}
          onChange={e => setRecordingLink(e.target.value)}
          placeholder="https://zoom.us/rec/share/..."
        />
      </div>

      <h3>Panelist Registration Data</h3>

      {selectedEvent.panelists.map(panelist => (
        <div key={panelist.id}>
          <h4>{panelist.fullName}</h4>

          <label>Registration Count:</label>
          <input
            type="number"
            value={panelistData[panelist.id]?.registrationCount || ''}
            onChange={e => setPanelistData({
              ...panelistData,
              [panelist.id]: {
                ...panelistData[panelist.id],
                registrationCount: parseInt(e.target.value),
              },
            })}
          />

          {(panelistData[panelist.id]?.registrationCount || 0) >= 10 && (
            <>
              <label>Attendee List Link:</label>
              <input
                type="url"
                value={panelistData[panelist.id]?.attendeeListLink || ''}
                onChange={e => setPanelistData({
                  ...panelistData,
                  [panelist.id]: {
                    ...panelistData[panelist.id],
                    attendeeListLink: e.target.value,
                  },
                })}
              />
            </>
          )}

          <label>Contribution Summary:</label>
          <textarea
            value={panelistData[panelist.id]?.contributionSummary || ''}
            onChange={e => setPanelistData({
              ...panelistData,
              [panelist.id]: {
                ...panelistData[panelist.id],
                contributionSummary: e.target.value,
              },
            })}
            placeholder="recruitment strategies, burnout prevention, and building career pathways"
          />
        </div>
      ))}

      <button onClick={handleSave}>Save and Regenerate Thank You Emails</button>
    </div>
  );
}

// ============================================================================
// EXAMPLE 8: Complete Workflow
// ============================================================================

function CompleteWorkflowExample() {
  /**
   * This shows the complete workflow from start to finish:
   *
   * 1. User creates new panel event
   * 2. User imports panelists from CSV or Google Sheets
   * 3. User clicks "Generate Emails"
   * 4. User browses generated emails
   * 5. User clicks an email to view
   * 6. User clicks "Copy HTML"
   * 7. User pastes into Outlook
   * 8. After event: User adds post-event data
   * 9. System regenerates E+1 emails with conditional sections
   * 10. User sends thank you emails
   */

  return (
    <div>
      <h1>VBI Panel Email Generator - Complete Workflow</h1>

      {/* Step 1: Create Event */}
      <section>
        <h2>Step 1: Create Panel Event</h2>
        <CreateEventExample />
      </section>

      {/* Step 2: Import Panelists */}
      <section>
        <h2>Step 2: Import Panelists</h2>
        <ImportPanelistsFromCSVExample />
        <ImportPanelistsFromSheetsExample />
      </section>

      {/* Step 3: Generate Emails */}
      <section>
        <h2>Step 3: Generate Emails</h2>
        <GenerateEmailsExample />
      </section>

      {/* Step 4: Browse Emails */}
      <section>
        <h2>Step 4: Browse Generated Emails</h2>
        <EmailsListExample />
      </section>

      {/* Step 5: View and Copy Email */}
      <section>
        <h2>Step 5: View and Copy Email</h2>
        <EmailViewerExample />
      </section>

      {/* Step 6: Post-Event Data */}
      <section>
        <h2>Step 6: Add Post-Event Data</h2>
        <PostEventDataExample />
      </section>
    </div>
  );
}

export default CompleteWorkflowExample;
