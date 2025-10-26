import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { makeDefaultTemplates } from './utils/defaults';
import { safeParseJSON, validateDateGroupJSON, validateTemplateJSON } from './utils/json';

export type Template = {
  id: string;
  name: string;
  sort: number;
  type: 'html' | 'md';
  content: string;
  updatedAt: string;
};

export type DateGroup = {
  id: string;
  name: string;
  sort: number;
  templates: Template[];
};

export type MainTab = 'event-checklist' | 'panel-events' | 'mgmt-checklist';

type UIState = {
  theme: 'system' | 'light' | 'dark';
  sidebarOpen: boolean;
  lastMainTab: MainTab;
  selectedDateId?: string;
  selectedTemplateId?: string;
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

type Store = {
  eventChecklistSheetUrl: string;
  eventManagementSheetUrl: string;
  panelEvents: DateGroup[];
  ui: UIState;
  dirtyTemplates: Set<string>;

  // Sheet URLs
  setSheetUrl: (which: 'event' | 'mgmt', url: string) => void;

  // Date CRUD
  createDate: (name?: string) => string;
  renameDate: (id: string, name: string) => void;
  duplicateDate: (id: string) => string;
  deleteDate: (id: string) => void;
  reorderDates: (idsInOrder: string[]) => void;

  // Template CRUD
  renameTemplate: (dateId: string, tplId: string, name: string) => void;
  reorderTemplates: (dateId: string, idsInOrder: string[]) => void;
  updateTemplate: (dateId: string, tplId: string, patch: Partial<Template>) => void;
  resetTemplateToDefault: (dateId: string, tplId: string) => void;
  markTemplateClean: (tplId: string) => void;

  // Import/Export
  exportDate: (dateId: string) => string;
  importDate: (dateId: string, json: string, mode?: 'replace' | 'merge') => boolean;
  exportAll: () => string;
  importAll: (json: string, mode?: 'replace' | 'merge') => boolean;

  // UI
  setTheme: (theme: 'system' | 'light' | 'dark') => void;
  toggleSidebar: () => void;
  setMainTab: (tab: MainTab) => void;
  selectDate: (dateId?: string) => void;
  selectTemplate: (templateId?: string) => void;
  setSearchModalOpen: (open: boolean) => void;
  showConfirm: (title: string, message: string, onConfirm: () => void) => void;
  hideConfirm: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
};

const STORAGE_VERSION = '1.0';
const STORAGE_KEY = 'ecc:store';
const VERSION_KEY = 'ecc:version';

function createInitialDateGroups(): DateGroup[] {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  return [
    {
      id: crypto.randomUUID(),
      name: today.toISOString().split('T')[0],
      sort: 0,
      templates: makeDefaultTemplates()
    },
    {
      id: crypto.randomUUID(),
      name: nextWeek.toISOString().split('T')[0],
      sort: 1,
      templates: makeDefaultTemplates()
    }
  ];
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      eventChecklistSheetUrl: '',
      eventManagementSheetUrl: '',
      panelEvents: createInitialDateGroups(),
      dirtyTemplates: new Set(),
      ui: {
        theme: 'system',
        sidebarOpen: true,
        lastMainTab: 'panel-events',
        searchModalOpen: false
      },

      setSheetUrl: (which, url) => {
        const normalizedUrl = url.trim();
        const storageKey =
          which === 'event' ? 'ecc:eventChecklistSheetUrl' : 'ecc:eventManagementSheetUrl';

        if (which === 'event') {
          set(() => ({ eventChecklistSheetUrl: normalizedUrl }));
        } else {
          set(() => ({ eventManagementSheetUrl: normalizedUrl }));
        }

        if (normalizedUrl) {
          localStorage.setItem(storageKey, normalizedUrl);
        } else {
          localStorage.removeItem(storageKey);
        }
      },

      createDate: (name) => {
        const id = crypto.randomUUID();
        const newDate: DateGroup = {
          id,
          name: name || new Date().toISOString().split('T')[0],
          sort: get().panelEvents.length,
          templates: makeDefaultTemplates()
        };
        set((state) => ({
          panelEvents: [...state.panelEvents, newDate]
        }));
        return id;
      },

      renameDate: (id, name) => {
        set((state) => ({
          panelEvents: state.panelEvents.map((d) =>
            d.id === id ? { ...d, name } : d
          )
        }));
      },

      duplicateDate: (id) => {
        const date = get().panelEvents.find((d) => d.id === id);
        if (!date) return '';

        const newId = crypto.randomUUID();
        const newDate: DateGroup = {
          ...date,
          id: newId,
          name: `${date.name} (Copy)`,
          sort: get().panelEvents.length,
          templates: date.templates.map((t) => ({
            ...t,
            id: crypto.randomUUID(),
            updatedAt: new Date().toISOString()
          }))
        };

        set((state) => ({
          panelEvents: [...state.panelEvents, newDate]
        }));
        return newId;
      },

      deleteDate: (id) => {
        set((state) => ({
          panelEvents: state.panelEvents.filter((d) => d.id !== id),
          ui: {
            ...state.ui,
            selectedDateId: state.ui.selectedDateId === id ? undefined : state.ui.selectedDateId
          }
        }));
      },

      reorderDates: (idsInOrder) => {
        const dateMap = new Map(get().panelEvents.map((d) => [d.id, d]));
        const reordered = idsInOrder
          .map((id) => dateMap.get(id))
          .filter((d): d is DateGroup => d !== undefined)
          .map((d, i) => ({ ...d, sort: i }));
        set({ panelEvents: reordered });
      },

      renameTemplate: (dateId, tplId, name) => {
        set((state) => ({
          panelEvents: state.panelEvents.map((d) =>
            d.id === dateId
              ? {
                  ...d,
                  templates: d.templates.map((t) =>
                    t.id === tplId ? { ...t, name } : t
                  )
                }
              : d
          )
        }));
      },

      reorderTemplates: (dateId, idsInOrder) => {
        set((state) => ({
          panelEvents: state.panelEvents.map((d) => {
            if (d.id !== dateId) return d;
            const tplMap = new Map(d.templates.map((t) => [t.id, t]));
            const reordered = idsInOrder
              .map((id) => tplMap.get(id))
              .filter((t): t is Template => t !== undefined)
              .map((t, i) => ({ ...t, sort: i }));
            return { ...d, templates: reordered };
          })
        }));
      },

      updateTemplate: (dateId, tplId, patch) => {
        set((state) => {
          const newDirty = new Set(state.dirtyTemplates);
          newDirty.add(tplId);
          return {
            dirtyTemplates: newDirty,
            panelEvents: state.panelEvents.map((d) =>
              d.id === dateId
                ? {
                    ...d,
                    templates: d.templates.map((t) =>
                      t.id === tplId
                        ? { ...t, ...patch, updatedAt: new Date().toISOString() }
                        : t
                    )
                  }
                : d
            )
          };
        });
      },

      resetTemplateToDefault: (dateId, tplId) => {
        const date = get().panelEvents.find((d) => d.id === dateId);
        const template = date?.templates.find((t) => t.id === tplId);
        if (!template) return;

        // Reset to empty - in real app you'd use defaults
        get().updateTemplate(dateId, tplId, { content: '' });
      },

      markTemplateClean: (tplId) => {
        set((state) => {
          const newDirty = new Set(state.dirtyTemplates);
          newDirty.delete(tplId);
          return { dirtyTemplates: newDirty };
        });
      },

      exportDate: (dateId) => {
        const date = get().panelEvents.find((d) => d.id === dateId);
        if (!date) return '';
        return JSON.stringify(date, null, 2);
      },

      importDate: (dateId, json, mode = 'replace') => {
        const parsed = safeParseJSON(json);
        if (!parsed.success) {
          get().showToast('Invalid JSON: ' + parsed.error, 'error');
          return false;
        }

        if (!validateDateGroupJSON(parsed.data)) {
          get().showToast('Invalid date group format', 'error');
          return false;
        }

        const importedDate = parsed.data;

        // Validate templates
        const validTemplates = importedDate.templates.filter((t) =>
          validateTemplateJSON(t)
        );

        if (validTemplates.length === 0) {
          get().showToast('No valid templates found', 'error');
          return false;
        }

        set((state) => ({
          panelEvents: state.panelEvents.map((d) => {
            if (d.id !== dateId) return d;
            if (mode === 'replace') {
              return {
                ...d,
                templates: validTemplates.map((t, i) => ({
                  ...t,
                  id: crypto.randomUUID(),
                  sort: i,
                  updatedAt: new Date().toISOString()
                }))
              };
            } else {
              // Merge
              return {
                ...d,
                templates: [
                  ...d.templates,
                  ...validTemplates.map((t, i) => ({
                    ...t,
                    id: crypto.randomUUID(),
                    sort: d.templates.length + i,
                    updatedAt: new Date().toISOString()
                  }))
                ]
              };
            }
          })
        }));

        get().showToast('Import successful', 'success');
        return true;
      },

      exportAll: () => {
        const state = get();
        return JSON.stringify(
          {
            version: STORAGE_VERSION,
            eventChecklistSheetUrl: state.eventChecklistSheetUrl,
            eventManagementSheetUrl: state.eventManagementSheetUrl,
            panelEvents: state.panelEvents
          },
          null,
          2
        );
      },

      importAll: (json, mode = 'replace') => {
        const parsed = safeParseJSON(json);
        if (!parsed.success) {
          get().showToast('Invalid JSON: ' + parsed.error, 'error');
          return false;
        }

        const data = parsed.data as any;
        if (!Array.isArray(data.panelEvents)) {
          get().showToast('Invalid export format', 'error');
          return false;
        }

        if (mode === 'replace') {
          set({
            eventChecklistSheetUrl: data.eventChecklistSheetUrl || '',
            eventManagementSheetUrl: data.eventManagementSheetUrl || '',
            panelEvents: data.panelEvents
          });
        } else {
          set((state) => ({
            panelEvents: [...state.panelEvents, ...data.panelEvents]
          }));
        }

        get().showToast('Import successful', 'success');
        return true;
      },

      setTheme: (theme) => {
        set((state) => ({ ui: { ...state.ui, theme } }));
        applyTheme(theme);
      },

      toggleSidebar: () => {
        set((state) => ({ ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } }));
      },

      setMainTab: (tab) => {
        set((state) => ({ ui: { ...state.ui, lastMainTab: tab } }));
      },

      selectDate: (dateId) => {
        set((state) => ({
          ui: { ...state.ui, selectedDateId: dateId, selectedTemplateId: undefined }
        }));
      },

      selectTemplate: (templateId) => {
        set((state) => ({ ui: { ...state.ui, selectedTemplateId: templateId } }));
      },

      setSearchModalOpen: (open) => {
        set((state) => ({ ui: { ...state.ui, searchModalOpen: open } }));
      },

      showConfirm: (title, message, onConfirm) => {
        set((state) => ({
          ui: { ...state.ui, confirmDialog: { title, message, onConfirm } }
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
      }
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        eventChecklistSheetUrl: state.eventChecklistSheetUrl,
        eventManagementSheetUrl: state.eventManagementSheetUrl,
        panelEvents: state.panelEvents,
        ui: {
          theme: state.ui.theme,
          sidebarOpen: state.ui.sidebarOpen,
          lastMainTab: state.ui.lastMainTab
        }
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.ui.theme);
          localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
        }
      }
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
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const theme = useStore.getState().ui.theme;
    if (theme === 'system') {
      applyTheme('system');
    }
  });
}
