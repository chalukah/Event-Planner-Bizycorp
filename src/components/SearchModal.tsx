import { useState, useEffect, useRef } from 'react';
import { Search, X, Calendar, FileText } from 'lucide-react';
import { useStore } from '../store';

export function SearchModal() {
  const searchModalOpen = useStore((s) => s.ui.searchModalOpen);
  const setSearchModalOpen = useStore((s) => s.setSearchModalOpen);
  const panelEvents = useStore((s) => s.panelEvents);
  const selectDate = useStore((s) => s.selectDate);
  const selectTemplate = useStore((s) => s.selectTemplate);
  const setMainTab = useStore((s) => s.setMainTab);

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchModalOpen) {
      setQuery('');
      setSelectedIndex(0);
      inputRef.current?.focus();
    }
  }, [searchModalOpen]);

  useEffect(() => {
    if (!searchModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  if (!searchModalOpen) return null;

  const results: Array<{
    type: 'date' | 'template';
    dateId: string;
    dateName: string;
    templateId?: string;
    templateName?: string;
    content?: string;
  }> = [];

  const lowerQuery = query.toLowerCase();

  panelEvents.forEach((date) => {
    if (date.name.toLowerCase().includes(lowerQuery)) {
      results.push({
        type: 'date',
        dateId: date.id,
        dateName: date.name
      });
    }

    date.templates.forEach((template) => {
      if (
        template.name.toLowerCase().includes(lowerQuery) ||
        template.content.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'template',
          dateId: date.id,
          dateName: date.name,
          templateId: template.id,
          templateName: template.name,
          content: template.content
        });
      }
    });
  });

  const handleSelect = (result: typeof results[0]) => {
    selectDate(result.dateId);
    if (result.templateId) {
      selectTemplate(result.templateId);
    }
    setMainTab('panel-events');
    setSearchModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 animate-fade-in"
      onClick={() => setSearchModalOpen(false)}
    >
      <div
        className="w-full max-w-2xl mx-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search dates, templates, and content..."
            className="flex-1 bg-transparent focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
          />
          <button
            onClick={() => setSearchModalOpen(false)}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              {query ? 'No results found' : 'Start typing to search...'}
            </div>
          ) : (
            <div className="p-2">
              {results.map((result, index) => (
                <button
                  key={`${result.dateId}-${result.templateId || 'date'}`}
                  onClick={() => handleSelect(result)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                    index === selectedIndex
                      ? 'bg-blue-100 dark:bg-blue-900/30'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {result.type === 'date' ? (
                        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-900 dark:text-slate-100">
                        {result.type === 'date' ? result.dateName : result.templateName}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {result.type === 'date'
                          ? `${panelEvents.find((d) => d.id === result.dateId)?.templates.length || 0} templates`
                          : result.dateName}
                      </div>
                      {result.type === 'template' && result.content && (
                        <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                          {result.content.substring(0, 100)}...
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600">
              ↑↓
            </kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600">
              Enter
            </kbd>
            Select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600">
              Esc
            </kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
