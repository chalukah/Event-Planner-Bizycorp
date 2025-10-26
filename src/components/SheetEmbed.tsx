import { useState } from 'react';
import { ExternalLink, RefreshCw, ZoomIn, ZoomOut, Copy, Settings, Trash2 } from 'lucide-react';
import { useStore } from '../store';
import { copyTextWithFallback } from '../utils/clipboard';

type SheetEmbedProps = {
  urlKey: 'event' | 'mgmt';
};

export function SheetEmbed({ urlKey }: SheetEmbedProps) {
  const url = useStore((s) =>
    urlKey === 'event' ? s.eventChecklistSheetUrl : s.eventManagementSheetUrl
  );
  const setSheetUrl = useStore((s) => s.setSheetUrl);
  const showToast = useStore((s) => s.showToast);

  const [zoom, setZoom] = useState(100);
  const [key, setKey] = useState(0);

  const title = urlKey === 'event' ? 'Event Checklist' : 'Event Management Checklist';

  const handleReplaceUrl = () => {
    const newUrl = prompt('Enter Google Sheet URL:', url);
    if (newUrl !== null) {
      setSheetUrl(urlKey, newUrl);
      showToast('Sheet URL updated', 'success');
      setKey((k) => k + 1);
    }
  };

  const handleCopyUrl = async () => {
    if (!url) {
      showToast('No sheet URL set', 'error');
      return;
    }
    const success = await copyTextWithFallback(url);
    if (success) {
      showToast('Sheet URL copied', 'success');
    } else {
      showToast('Failed to copy URL', 'error');
    }
  };

  const handleRefresh = () => {
    setKey((k) => k + 1);
    showToast('Sheet refreshed', 'success');
  };

  const handleZoomIn = () => {
    setZoom((z) => Math.min(200, z + 10));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(50, z - 10));
  };

  const handleZoomReset = () => {
    setZoom(100);
  };

  const handleOpenInNewTab = () => {
    if (!url) {
      showToast('No sheet URL set', 'error');
      return;
    }
    window.open(url, '_blank');
  };

  const handleClearUrl = () => {
    if (!url) {
      showToast('No sheet URL set', 'error');
      return;
    }
    const confirmed = window.confirm('Remove the current Google Sheet URL?');
    if (!confirmed) {
      return;
    }
    setSheetUrl(urlKey, '');
    setZoom(100);
    setKey((k) => k + 1);
    showToast('Sheet URL removed', 'success');
  };

  if (!url) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50 dark:bg-slate-900/50">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            No Google Sheet URL configured. Click the button below to set one.
          </p>
          <button
            onClick={handleReplaceUrl}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Set Sheet URL
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <h2 className="font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReplaceUrl}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            title="Replace Sheet URL"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={handleOpenInNewTab}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={handleRefresh}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomReset}
              className="px-2 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors"
              title="Reset zoom"
            >
              {zoom}%
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleCopyUrl}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            title="Copy Sheet URL"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={handleClearUrl}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            title="Remove Sheet URL"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-slate-50 dark:bg-slate-900">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top left',
            width: `${(100 / zoom) * 100}%`,
            height: `${(100 / zoom) * 100}%`
          }}
        >
          <iframe
            key={key}
            src={url}
            className="w-full h-full border-0"
            title={title}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </div>
    </div>
  );
}
