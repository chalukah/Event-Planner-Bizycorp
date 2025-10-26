import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PanelEvent, Panelist, GeneratedEmail, EventChecklist, EventPanelTracker } from './types';
import { EMAIL_TEMPLATES } from './data/emailTemplates';
import { replaceVariables, processConditionalSections, generateSubjectLine } from './utils/templateEngine';
import { EVENT_CHECKLIST_SEEDS } from './data/eventChecklistTemplate';

type UIState = {
  theme: 'system' | 'light' | 'dark';
  sidebarOpen: boolean;
  emailListCollapsed: boolean;
  selectedEventId?: string;
  selectedEmailId?: string;
  showEmailPreview: boolean;
  searchModalOpen: boolean;
  confirmDialog?: {
    title: string;
    message: string;
    onConfirm: () => void;
  };
  toast?: {
    message: string;
    type: 'success' | 'error' | 'info';
  };
};

type PanelStore = {
  panelEvents: PanelEvent[];
  eventChecklists: EventChecklist[];
  eventPanelTrackers: EventPanelTracker[];
  ui: UIState;

  // Event CRUD
  createEvent: (event: Omit<PanelEvent, 'id' | 'createdAt' | 'generatedEmails'>) => string;
  updateEvent: (id: string, updates: Partial<PanelEvent>) => void;
  deleteEvent: (id: string) => void;
  duplicateEvent: (id: string) => string;

  // Panelist Management
  addPanelist: (eventId: string, panelist: Omit<Panelist, 'id'>) => void;
  updatePanelist: (eventId: string, panelistId: string, updates: Partial<Panelist>) => void;
  deletePanelist: (eventId: string, panelistId: string) => void;
  importPanelists: (eventId: string, panelists: Omit<Panelist, 'id'>[]) => void;

  // Email Generation
  generateEmails: (eventId: string) => void;
  regenerateEmail: (eventId: string, emailId: string) => void;
  regenerateAllEmails: () => void;
  updateGeneratedEmail: (eventId: string, emailId: string, htmlContent: string) => void;
  deleteGeneratedEmail: (eventId: string, emailId: string) => void;

  // Post-Event Data
  updatePostEventData: (
    eventId: string,
    data: {
      recordingLink?: string;
      panelistUpdates?: Array<{
        panelistId: string;
        registrationCount?: number;
        attendeeListLink?: string;
        contributionSummary?: string;
      }>;
    }
  ) => void;

  // Event Checklist Management
  createEventChecklist: (checklist: Omit<EventChecklist, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateEventChecklist: (id: string, updates: Partial<EventChecklist>) => void;
  deleteEventChecklist: (id: string) => void;
  importEventChecklist: (checklist: EventChecklist) => void;

  // Event Panel Tracker Management
  createEventPanelTracker: (tracker: Omit<EventPanelTracker, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateEventPanelTracker: (id: string, updates: Partial<EventPanelTracker>) => void;
  deleteEventPanelTracker: (id: string) => void;
  importEventPanelTracker: (tracker: EventPanelTracker) => void;

  // Export/Import
  exportEvent: (eventId: string) => string;
  importEvent: (json: string) => boolean;

  // UI Actions
  setTheme: (theme: 'system' | 'light' | 'dark') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleEmailList: () => void;
  selectEvent: (eventId?: string) => void;
  selectEmail: (emailId?: string) => void;
  setShowEmailPreview: (show: boolean) => void;
  setSearchModalOpen: (open: boolean) => void;
  showConfirm: (title: string, message: string, onConfirm: () => void) => void;
  hideConfirm: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
};

function cloneChecklist(template: EventChecklist): EventChecklist {
  return {
    ...template,
    tasks: template.tasks.map((task) => ({ ...task }))
  };
}

export const usePanelStore = create<PanelStore>()(
  persist(
    (set, get) => ({
      panelEvents: [],
      eventChecklists: EVENT_CHECKLIST_SEEDS.map((checklist) => cloneChecklist(checklist)),
      eventPanelTrackers: [],
      ui: {
        theme: 'light',
        sidebarOpen: true,
        emailListCollapsed: false,
        showEmailPreview: true,
        searchModalOpen: false,
      },

      createEvent: (eventData) => {
        const id = crypto.randomUUID();
        const newEvent: PanelEvent = {
          ...eventData,
          id,
          createdAt: new Date().toISOString(),
          generatedEmails: [],
        };

        set((state) => ({
          panelEvents: [...state.panelEvents, newEvent],
        }));

        get().showToast('Panel event created', 'success');
        return id;
      },

      updateEvent: (id, updates) => {
        set((state) => ({
          panelEvents: state.panelEvents.map((event) =>
            event.id === id ? { ...event, ...updates } : event
          ),
        }));
      },

      deleteEvent: (id) => {
        set((state) => ({
          panelEvents: state.panelEvents.filter((e) => e.id !== id),
          ui: {
            ...state.ui,
            selectedEventId: state.ui.selectedEventId === id ? undefined : state.ui.selectedEventId,
          },
        }));
        get().showToast('Event deleted', 'success');
      },

      duplicateEvent: (id) => {
        const event = get().panelEvents.find((e) => e.id === id);
        if (!event) return '';

        const newId = crypto.randomUUID();
        const newEvent: PanelEvent = {
          ...event,
          id: newId,
          name: `${event.name} (Copy)`,
          createdAt: new Date().toISOString(),
          panelists: event.panelists.map((p) => ({
            ...p,
            id: crypto.randomUUID(),
          })),
          generatedEmails: [],
        };

        set((state) => ({
          panelEvents: [...state.panelEvents, newEvent],
        }));

        get().showToast('Event duplicated', 'success');
        return newId;
      },

      addPanelist: (eventId, panelistData) => {
        const panelist: Panelist = {
          ...panelistData,
          id: crypto.randomUUID(),
        };

        set((state) => ({
          panelEvents: state.panelEvents.map((event) =>
            event.id === eventId
              ? { ...event, panelists: [...event.panelists, panelist] }
              : event
          ),
        }));

        get().showToast('Panelist added', 'success');
      },

      updatePanelist: (eventId, panelistId, updates) => {
        set((state) => ({
          panelEvents: state.panelEvents.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  panelists: event.panelists.map((p) =>
                    p.id === panelistId ? { ...p, ...updates } : p
                  ),
                }
              : event
          ),
        }));
      },

      deletePanelist: (eventId, panelistId) => {
        set((state) => ({
          panelEvents: state.panelEvents.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  panelists: event.panelists.filter((p) => p.id !== panelistId),
                }
              : event
          ),
        }));
        get().showToast('Panelist removed', 'success');
      },

      importPanelists: (eventId, panelists) => {
        const panelistsWithIds = panelists.map((p) => ({
          ...p,
          id: crypto.randomUUID(),
        }));

        set((state) => ({
          panelEvents: state.panelEvents.map((event) =>
            event.id === eventId
              ? { ...event, panelists: panelistsWithIds }
              : event
          ),
        }));

        get().showToast(`${panelists.length} panelists imported`, 'success');
      },

      generateEmails: (eventId) => {
        const event = get().panelEvents.find((e) => e.id === eventId);
        if (!event) return;

        const generatedEmails: GeneratedEmail[] = [];

        EMAIL_TEMPLATES.forEach((template) => {
          if (template.perPanelist) {
            // Generate one email per panelist
            event.panelists.forEach((panelist) => {
              let htmlContent = replaceVariables(template.template, event, panelist);

              // Handle conditional sections for E+1 Thank You email
              if (template.code === 'E+1') {
                htmlContent = processConditionalSections(htmlContent, panelist.registrationCount);
              }

              generatedEmails.push({
                id: crypto.randomUUID(),
                templateId: template.id,
                panelistId: panelist.id,
                subject: generateSubjectLine(template.code, template.name, event, panelist),
                htmlContent,
                generatedAt: new Date().toISOString(),
              });
            });
          } else {
            // Generate one email for all panelists
            const htmlContent = replaceVariables(template.template, event);

            generatedEmails.push({
              id: crypto.randomUUID(),
              templateId: template.id,
              subject: generateSubjectLine(template.code, template.name, event),
              htmlContent,
              generatedAt: new Date().toISOString(),
            });
          }
        });

        set((state) => ({
          panelEvents: state.panelEvents.map((e) =>
            e.id === eventId ? { ...e, generatedEmails } : e
          ),
        }));

        get().showToast(
          `${generatedEmails.length} emails generated successfully`,
          'success'
        );
      },

      regenerateEmail: (eventId, emailId) => {
        const event = get().panelEvents.find((e) => e.id === eventId);
        if (!event) return;

        const email = event.generatedEmails.find((e) => e.id === emailId);
        if (!email) return;

        const template = EMAIL_TEMPLATES.find((t) => t.id === email.templateId);
        if (!template) return;

        const panelist = email.panelistId
          ? event.panelists.find((p) => p.id === email.panelistId)
          : undefined;

        let htmlContent = replaceVariables(template.template, event, panelist);

        if (template.code === 'E+1' && panelist) {
          htmlContent = processConditionalSections(htmlContent, panelist.registrationCount);
        }

        set((state) => ({
          panelEvents: state.panelEvents.map((e) =>
            e.id === eventId
              ? {
                  ...e,
                  generatedEmails: e.generatedEmails.map((ge) =>
                    ge.id === emailId
                      ? {
                          ...ge,
                          htmlContent,
                          generatedAt: new Date().toISOString(),
                        }
                      : ge
                  ),
                }
              : e
          ),
        }));

        get().showToast('Email regenerated', 'success');
      },

      regenerateAllEmails: () => {
        const events = get().panelEvents;
        let totalRegenerated = 0;

        events.forEach((event) => {
          if (event.panelists.length > 0) {
            get().generateEmails(event.id);
            totalRegenerated++;
          }
        });

        get().showToast(
          `Successfully regenerated emails for ${totalRegenerated} panel event(s)`,
          'success'
        );
      },

      updateGeneratedEmail: (eventId, emailId, htmlContent) => {
        set((state) => ({
          panelEvents: state.panelEvents.map((e) =>
            e.id === eventId
              ? {
                  ...e,
                  generatedEmails: e.generatedEmails.map((ge) =>
                    ge.id === emailId ? { ...ge, htmlContent } : ge
                  ),
                }
              : e
          ),
        }));
      },

      deleteGeneratedEmail: (eventId, emailId) => {
        set((state) => ({
          panelEvents: state.panelEvents.map((e) =>
            e.id === eventId
              ? {
                  ...e,
                  generatedEmails: e.generatedEmails.filter((ge) => ge.id !== emailId),
                }
              : e
          ),
        }));
      },

      updatePostEventData: (eventId, data) => {
        set((state) => ({
          panelEvents: state.panelEvents.map((event) => {
            if (event.id !== eventId) return event;

            let updatedEvent = { ...event };

            if (data.recordingLink) {
              updatedEvent.recordingLink = data.recordingLink;
            }

            if (data.panelistUpdates) {
              updatedEvent.panelists = event.panelists.map((panelist) => {
                const update = data.panelistUpdates!.find(
                  (u) => u.panelistId === panelist.id
                );
                return update ? { ...panelist, ...update } : panelist;
              });
            }

            return updatedEvent;
          }),
        }));

        get().showToast('Post-event data updated', 'success');
      },

      exportEvent: (eventId) => {
        const event = get().panelEvents.find((e) => e.id === eventId);
        if (!event) return '';
        return JSON.stringify(event, null, 2);
      },

      importEvent: (json) => {
        try {
          const event = JSON.parse(json) as PanelEvent;
          event.id = crypto.randomUUID();
          event.createdAt = new Date().toISOString();

          set((state) => ({
            panelEvents: [...state.panelEvents, event],
          }));

          get().showToast('Event imported successfully', 'success');
          return true;
        } catch (error) {
          get().showToast('Failed to import event', 'error');
          return false;
        }
      },

      setTheme: (theme) => {
        set((state) => ({ ui: { ...state.ui, theme } }));
        applyTheme(theme);
      },

      toggleSidebar: () => {
        set((state) => ({ ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } }));
      },

      setSidebarOpen: (open) => {
        set((state) => ({ ui: { ...state.ui, sidebarOpen: open } }));
      },

      toggleEmailList: () => {
        set((state) => ({ ui: { ...state.ui, emailListCollapsed: !state.ui.emailListCollapsed } }));
      },

      selectEvent: (eventId) => {
        set((state) => ({ ui: { ...state.ui, selectedEventId: eventId } }));
      },

      selectEmail: (emailId) => {
        set((state) => ({ ui: { ...state.ui, selectedEmailId: emailId } }));
      },

      setShowEmailPreview: (show) => {
        set((state) => ({ ui: { ...state.ui, showEmailPreview: show } }));
      },

      setSearchModalOpen: (open) => {
        set((state) => ({ ui: { ...state.ui, searchModalOpen: open } }));
      },

      showConfirm: (title, message, onConfirm) => {
        set((state) => ({
          ui: { ...state.ui, confirmDialog: { title, message, onConfirm } },
        }));
      },

      hideConfirm: () => {
        set((state) => ({ ui: { ...state.ui, confirmDialog: undefined } }));
      },

      showToast: (message, type = 'info') => {
        set((state) => ({ ui: { ...state.ui, toast: { message, type } } }));
        setTimeout(() => get().hideToast(), 3000);
      },

      hideToast: () => {
        set((state) => ({ ui: { ...state.ui, toast: undefined } }));
      },

      // Event Checklist Management
      createEventChecklist: (checklistData) => {
        const id = crypto.randomUUID();
        const newChecklist: EventChecklist = {
          ...checklistData,
          id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          eventChecklists: [...state.eventChecklists, newChecklist],
        }));

        get().showToast('Event checklist created', 'success');
        return id;
      },

      updateEventChecklist: (id, updates) => {
        set((state) => ({
          eventChecklists: state.eventChecklists.map((checklist) =>
            checklist.id === id
              ? { ...checklist, ...updates, updatedAt: new Date().toISOString() }
              : checklist
          ),
        }));
        get().showToast('Checklist updated', 'success');
      },

      deleteEventChecklist: (id) => {
        set((state) => ({
          eventChecklists: state.eventChecklists.filter((c) => c.id !== id),
        }));
        get().showToast('Checklist deleted', 'success');
      },

      importEventChecklist: (checklist) => {
        const newChecklist: EventChecklist = {
          ...checklist,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          eventChecklists: [...state.eventChecklists, newChecklist],
        }));

        get().showToast('Event checklist imported', 'success');
      },

      // Event Panel Tracker Management
      createEventPanelTracker: (trackerData) => {
        const id = crypto.randomUUID();
        const newTracker: EventPanelTracker = {
          ...trackerData,
          id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          eventPanelTrackers: [...state.eventPanelTrackers, newTracker],
        }));

        get().showToast('Event panel tracker created', 'success');
        return id;
      },

      updateEventPanelTracker: (id, updates) => {
        set((state) => ({
          eventPanelTrackers: state.eventPanelTrackers.map((tracker) =>
            tracker.id === id
              ? { ...tracker, ...updates, updatedAt: new Date().toISOString() }
              : tracker
          ),
        }));
        get().showToast('Tracker updated', 'success');
      },

      deleteEventPanelTracker: (id) => {
        set((state) => ({
          eventPanelTrackers: state.eventPanelTrackers.filter((t) => t.id !== id),
        }));
        get().showToast('Tracker deleted', 'success');
      },

      importEventPanelTracker: (tracker) => {
        const newTracker: EventPanelTracker = {
          ...tracker,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          eventPanelTrackers: [...state.eventPanelTrackers, newTracker],
        }));

        get().showToast('Event panel tracker imported', 'success');
      },
    }),
    {
      name: 'vbi-panel-store',
      partialize: (state) => ({
        panelEvents: state.panelEvents,
        eventChecklists: state.eventChecklists,
        eventPanelTrackers: state.eventPanelTrackers,
        ui: {
          theme: state.ui.theme,
          sidebarOpen: state.ui.sidebarOpen,
          emailListCollapsed: state.ui.emailListCollapsed,
          showEmailPreview: state.ui.showEmailPreview,
        },
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.ui.theme);

          // Remove any "Untitled Checklist" entries and ensure seed templates are present
          const seedIds = EVENT_CHECKLIST_SEEDS.map(s => s.id);
          const existingIds = state.eventChecklists.map(c => c.id);

          // Filter out untitled checklists
          const filteredChecklists = state.eventChecklists.filter(
            c => c.eventType !== 'Untitled Checklist' && c.eventTopic !== ''
          );

          // Add any missing seed templates
          const missingSeeds = EVENT_CHECKLIST_SEEDS.filter(
            seed => !existingIds.includes(seed.id)
          );

          state.eventChecklists = [
            ...missingSeeds.map(cloneChecklist),
            ...filteredChecklists
          ];
        }
      },
    }
  )
);

function applyTheme(theme: 'system' | 'light' | 'dark') {
  const root = document.documentElement;
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', prefersDark);
  } else {
    root.classList.toggle('dark', theme === 'dark');
  }
}

// Listen to system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const theme = usePanelStore.getState().ui.theme;
    if (theme === 'system') {
      applyTheme('system');
    }
  });
}
