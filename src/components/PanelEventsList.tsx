import { Calendar, Users, Mail, MoreVertical, Copy, Trash2, Download } from 'lucide-react';
import { useState } from 'react';
import { usePanelStore } from '../panelStore';
import { downloadText } from '../utils/download';

export function PanelEventsList() {
  const panelEvents = usePanelStore((s) => s.panelEvents);
  const selectedEventId = usePanelStore((s) => s.ui.selectedEventId);
  const selectEvent = usePanelStore((s) => s.selectEvent);
  const duplicateEvent = usePanelStore((s) => s.duplicateEvent);
  const deleteEvent = usePanelStore((s) => s.deleteEvent);
  const exportEvent = usePanelStore((s) => s.exportEvent);
  const showConfirm = usePanelStore((s) => s.showConfirm);
  const showToast = usePanelStore((s) => s.showToast);

  const [contextMenu, setContextMenu] = useState<string | null>(null);

  const handleDuplicate = (id: string, name: string) => {
    duplicateEvent(id);
    setContextMenu(null);
  };

  const handleDelete = (id: string, name: string) => {
    showConfirm(
      'Delete Event',
      `Are you sure you want to delete "${name}"? This will delete all generated emails.`,
      () => {
        deleteEvent(id);
        setContextMenu(null);
      }
    );
  };

  const handleExport = (id: string, name: string) => {
    const json = exportEvent(id);
    downloadText(`${name}.json`, json, 'application/json');
    setContextMenu(null);
    showToast('Event exported', 'success');
  };

  if (panelEvents.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500 dark:text-slate-400">
        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm">No panel events yet.</p>
        <p className="text-xs mt-1">Click "New Panel Event" to create one.</p>
      </div>
    );
  }

  const sortedEvents = [...panelEvents].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="p-3 space-y-2">
      {sortedEvents.map((event) => (
        <div
          key={event.id}
          onClick={() => selectEvent(event.id)}
          className={`relative group p-3 rounded-lg cursor-pointer transition-colors ${
            selectedEventId === event.id
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') selectEvent(event.id);
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm mb-1 truncate">{event.name}</div>

              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{event.panelists.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  <span>{event.generatedEmails.length}</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {new Date(event.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setContextMenu(contextMenu === event.id ? null : event.id);
                }}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="More options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {contextMenu === event.id && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setContextMenu(null);
                    }}
                  />
                  <div className="absolute right-0 top-8 z-20 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicate(event.id, event.name);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                    >
                      <Copy className="w-4 h-4" />
                      Duplicate
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExport(event.id, event.name);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(event.id, event.name);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors text-left"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {event.panelists.length > 0 && (
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-600 dark:text-slate-400">
                <span className="font-medium">Panelists:</span>{' '}
                {event.panelists.map((p) => p.firstName).join(', ')}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
