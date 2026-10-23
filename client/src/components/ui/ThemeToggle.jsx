import { useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

const themes = [
  { id: 'dark', icon: Moon, label: 'Dark' },
  { id: 'light', icon: Sun, label: 'Light' },
  { id: 'system', icon: Monitor, label: 'System' },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'dark';
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const applyTheme = (value) => {
    const isDark = value === 'dark' || (value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('light', !isDark);
  };

  const handleChange = (value) => {
    setTheme(value);
    localStorage.setItem('theme', value);
    applyTheme(value);
  };

  const current = themes.find((t) => t.id === theme);
  const CurrentIcon = current?.icon || Moon;

  return (
    <div className="flex items-center gap-1 p-1 border border-border rounded-lg bg-surface">
      {themes.map((t) => {
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            onClick={() => handleChange(t.id)}
            className={`p-1.5 rounded transition-colors ${
              theme === t.id ? 'text-accent bg-card' : 'text-muted hover:text-foreground'
            }`}
            aria-label={`${t.label} theme`}
            title={t.label}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
}
