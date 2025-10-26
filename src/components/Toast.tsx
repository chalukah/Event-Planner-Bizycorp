import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { usePanelStore } from '../panelStore';

export function Toast() {
  const toast = usePanelStore((s) => s.ui.toast);
  const hideToast = usePanelStore((s) => s.hideToast);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  const colors = {
    success: 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800'
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50 animate-slide-in"
      role="status"
      aria-live="polite"
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg max-w-md ${colors[toast.type]}`}
      >
        {icons[toast.type]}
        <p className="flex-1 text-sm font-medium">{toast.message}</p>
        <button
          onClick={hideToast}
          className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
