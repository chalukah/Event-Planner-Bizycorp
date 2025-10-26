import { useState, useEffect } from 'react';
import { Plus, Settings, FileText, TrendingUp } from 'lucide-react';
import { usePanelStore } from './panelStore';
// import { Topbar } from './components/Topbar';
import { ThemeToggle } from './components/ThemeToggle';
import { Toast } from './components/Toast';
import { ConfirmDialog } from './components/ConfirmDialog';
import { PanelEventsList } from './components/PanelEventsList';
import { PanelEventCreator } from './components/PanelEventCreator';
import { PanelistImporter } from './components/PanelistImporter';
import { EmailGenerator } from './components/EmailGenerator';
import { EmailsList } from './components/EmailsList';
import { EmailViewer } from './components/EmailViewer';
import { PostEventDataEditor } from './components/PostEventDataEditor';
import { EventPanelTrackerViewer } from './components/EventPanelTrackerViewer';
import { EventChecklistSheetTab } from './components/EventChecklistSheetTab';

type AppView =
  | 'empty'
  | 'create-event'
  | 'import-panelists'
  | 'generate-emails'
  | 'view-emails'
  | 'post-event'
  | 'event-checklist'
  | 'panel-tracker';

function App() {
  const selectedEventId = usePanelStore((s) => s.ui.selectedEventId);
  const panelEvents = usePanelStore((s) => s.panelEvents);
  const sidebarOpen = usePanelStore((s) => s.ui.sidebarOpen);
  const emailListCollapsed = usePanelStore((s) => s.ui.emailListCollapsed);
  const toggleSidebar = usePanelStore((s) => s.toggleSidebar);
  const selectEvent = usePanelStore((s) => s.selectEvent);

  const [view, setView] = useState<AppView>('empty');

  const selectedEvent = panelEvents.find((e) => e.id === selectedEventId);

  // Determine which view to show
  useEffect(() => {
    if (!selectedEvent) {
      setView('empty');
    } else if (selectedEvent.panelists.length === 0) {
      setView('import-panelists');
    } else if (selectedEvent.generatedEmails.length === 0) {
      setView('generate-emails');
    } else {
      setView('view-emails');
    }
  }, [selectedEvent?.id, selectedEvent?.panelists.length, selectedEvent?.generatedEmails.length]);

  const handleCreateEvent = () => {
    setView('create-event');
  };

  const handleEventCreated = (eventId: string) => {
    selectEvent(eventId);
    setView('import-panelists');
  };

  const handlePanelistsImported = () => {
    setView('generate-emails');
  };

  const handleShowPostEvent = () => {
    setView('post-event');
  };

  const handlePostEventComplete = () => {
    setView('view-emails');
  };

  const handlePostEventCancel = () => {
    setView('view-emails');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.includes('Mac');
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (cmdOrCtrl && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Topbar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-lg font-semibold">VBI Panel Email Generator</h1>
          </div>

          <div className="flex items-center gap-3">
            {selectedEvent && selectedEvent.generatedEmails.length > 0 && (
              <button
                onClick={handleShowPostEvent}
                className="flex items-center gap-2 px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Post-Event Data
              </button>
            )}

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 lg:w-80 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <button
                onClick={handleCreateEvent}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                New Panel Event
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-slate-200 dark:border-slate-700">
              <div className="flex">
                <button
                  onClick={() => setView('empty')}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                    !['event-checklist', 'panel-tracker'].includes(view)
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  Events
                </button>
                <button
                  onClick={() => setView('event-checklist')}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                    view === 'event-checklist'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  Checklist
                </button>
                <button
                  onClick={() => setView('panel-tracker')}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                    view === 'panel-tracker'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <TrendingUp className="w-3 h-3" />
                  Tracker
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {!['event-checklist', 'panel-tracker'].includes(view) && <PanelEventsList />}
              {view === 'event-checklist' && (
                <div className="p-4 text-sm text-slate-600 dark:text-slate-400">
                  Paste the Google Sheet embed link and upload Excel/CSV files to sync the checklist.
                </div>
              )}
              {view === 'panel-tracker' && (
                <div className="p-4 text-sm text-slate-600 dark:text-slate-400">
                  Upload an Event Panel Tracker file to track registrations
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main id="main-content" className="flex-1 overflow-hidden flex">
          {view === 'empty' && (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Plus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Welcome to VBI Panel Email Generator</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Create your first panel event to generate personalized emails for your panelists.
                </p>
                <button
                  onClick={handleCreateEvent}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create Your First Event
                </button>
              </div>
            </div>
          )}

          {view === 'create-event' && (
            <div className="flex-1 overflow-y-auto">
              <PanelEventCreator
                onComplete={handleEventCreated}
                onCancel={() => setView('empty')}
              />
            </div>
          )}

          {view === 'import-panelists' && selectedEvent && (
            <div className="flex-1 overflow-y-auto">
              <PanelistImporter
                eventId={selectedEvent.id}
                onComplete={handlePanelistsImported}
              />
            </div>
          )}

          {view === 'generate-emails' && <EmailGenerator />}

          {view === 'view-emails' && (
            <>
              {!emailListCollapsed && (
                <div className="w-80 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all duration-300">
                  <EmailsList />
                </div>
              )}
              <EmailViewer />
            </>
          )}

          {view === 'post-event' && selectedEvent && (
            <PostEventDataEditor
              onComplete={handlePostEventComplete}
              onCancel={handlePostEventCancel}
            />
          )}

          {view === 'event-checklist' && <EventChecklistSheetTab />}

          {view === 'panel-tracker' && <EventPanelTrackerViewer />}
        </main>
      </div>

      {/* Global Components */}
      <Toast />
      <ConfirmDialog />
    </div>
  );
}

export default App;
