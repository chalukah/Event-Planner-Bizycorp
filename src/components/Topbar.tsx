import { Search, Copy, Menu, User } from 'lucide-react';
import { useStore } from '../store';
import { ThemeToggle } from './ThemeToggle';
import { copyTextWithFallback } from '../utils/clipboard';

export function Topbar() {
  const selectedDateId = useStore((s) => s.ui.selectedDateId);
  const panelEvents = useStore((s) => s.panelEvents);
  const setSearchModalOpen = useStore((s) => s.setSearchModalOpen);
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const showToast = useStore((s) => s.showToast);

  const selectedDate = panelEvents.find((d) => d.id === selectedDateId);

  const handleCopyAll = async () => {
    if (!selectedDate) {
      showToast('No date selected', 'error');
      return;
    }

    const sortedTemplates = [...selectedDate.templates].sort((a, b) => a.sort - b.sort);
    const combined = sortedTemplates
      .map((t) => `--- ${t.name} ---\n\n${t.content}`)
      .join('\n\n');

    const success = await copyTextWithFallback(combined);
    if (success) {
      showToast('All templates copied to clipboard', 'success');
    } else {
      showToast('Failed to copy', 'error');
    }
  };

  const handleSearch = () => {
    setSearchModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 no-print">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Events Control Center</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Search (Ctrl/Cmd + K)"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-xs bg-white dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-600">
              {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>

          {selectedDate && (
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Copy all templates"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copy All</span>
            </button>
          )}

          <ThemeToggle />

          <button
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            aria-label="User menu"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
