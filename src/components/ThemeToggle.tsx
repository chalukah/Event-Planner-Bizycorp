import { Sun, Moon, Monitor } from 'lucide-react';
import { useStore } from '../store';

export function ThemeToggle() {
  const theme = useStore((s) => s.ui.theme);
  const setTheme = useStore((s) => s.setTheme);

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' }
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`p-2 rounded transition-colors ${
            theme === value
              ? 'bg-white dark:bg-slate-700 shadow-sm'
              : 'hover:bg-white/50 dark:hover:bg-slate-700/50'
          }`}
          aria-label={`${label} theme`}
          title={label}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
}
