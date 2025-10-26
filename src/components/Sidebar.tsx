import { FileSpreadsheet, Calendar, ListChecks, Plus } from 'lucide-react';
import { useStore, MainTab } from '../store';

export function Sidebar() {
  const sidebarOpen = useStore((s) => s.ui.sidebarOpen);
  const lastMainTab = useStore((s) => s.ui.lastMainTab);
  const setMainTab = useStore((s) => s.setMainTab);
  const createDate = useStore((s) => s.createDate);
  const selectDate = useStore((s) => s.selectDate);
  const showToast = useStore((s) => s.showToast);

  const tabs: Array<{ id: MainTab; label: string; icon: typeof FileSpreadsheet }> = [
    { id: 'event-checklist', label: 'Event Checklist', icon: FileSpreadsheet },
    { id: 'panel-events', label: 'Panel Events', icon: Calendar },
    { id: 'mgmt-checklist', label: 'Event Management', icon: ListChecks }
  ];

  const handleNewDate = () => {
    const dateStr = prompt('Enter date (YYYY-MM-DD):');
    if (!dateStr) return;

    const id = createDate(dateStr);
    selectDate(id);
    setMainTab('panel-events');
    showToast('Date created', 'success');
  };

  if (!sidebarOpen) {
    return null;
  }

  return (
    <aside className="w-64 lg:w-72 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex flex-col no-print">
      <nav className="p-3 space-y-1" aria-label="Main navigation">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setMainTab(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              lastMainTab === id
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {lastMainTab === 'panel-events' && (
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-3 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handleNewDate}
              className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              New Date
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <DatesList />
          </div>
        </div>
      )}
    </aside>
  );
}

function DatesList() {
  const panelEvents = useStore((s) => s.panelEvents);
  const selectedDateId = useStore((s) => s.ui.selectedDateId);
  const selectDate = useStore((s) => s.selectDate);
  const deleteDate = useStore((s) => s.deleteDate);
  const duplicateDate = useStore((s) => s.duplicateDate);
  const showConfirm = useStore((s) => s.showConfirm);
  const showToast = useStore((s) => s.showToast);
  const exportDate = useStore((s) => s.exportDate);

  if (panelEvents.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">
        No dates yet. Click "New Date" to create one.
      </div>
    );
  }

  const sortedDates = [...panelEvents].sort((a, b) => a.sort - b.sort);

  const handleDelete = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    showConfirm(
      'Delete Date',
      `Are you sure you want to delete "${name}" and all its templates?`,
      () => {
        deleteDate(id);
        showToast('Date deleted', 'success');
      }
    );
  };

  const handleDuplicate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newId = duplicateDate(id);
    selectDate(newId);
    showToast('Date duplicated', 'success');
  };

  const handleExport = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const json = exportDate(id);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Date exported', 'success');
  };

  return (
    <div className="space-y-1">
      {sortedDates.map((date) => (
        <div
          key={date.id}
          onClick={() => selectDate(date.id)}
          className={`group p-3 rounded-lg cursor-pointer transition-colors ${
            selectedDateId === date.id
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') selectDate(date.id);
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{date.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {date.templates.length} templates
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => handleDuplicate(date.id, e)}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                title="Duplicate"
                aria-label="Duplicate date"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={(e) => handleExport(date.id, date.name, e)}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                title="Export"
                aria-label="Export date"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button
                onClick={(e) => handleDelete(date.id, date.name, e)}
                className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 rounded"
                title="Delete"
                aria-label="Delete date"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
