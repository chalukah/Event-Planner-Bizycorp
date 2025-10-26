import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import { usePanelStore } from '../panelStore';

export function ConfirmDialog() {
  const dialog = usePanelStore((s) => s.ui.confirmDialog);
  const hideConfirm = usePanelStore((s) => s.hideConfirm);

  useEffect(() => {
    if (!dialog) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideConfirm();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dialog, hideConfirm]);

  if (!dialog) return null;

  const handleConfirm = () => {
    dialog.onConfirm();
    hideConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in"
      onClick={hideConfirm}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full mx-4 animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 id="confirm-title" className="text-lg font-semibold mb-2">
                {dialog.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {dialog.message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={hideConfirm}
            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            autoFocus
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
