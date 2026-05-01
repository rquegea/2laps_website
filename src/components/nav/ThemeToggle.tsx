'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

function getSystemDark() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(dark: boolean) {
  if (dark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [userOverride, setUserOverride] = useState(false);

  useEffect(() => {
    // Determine initial state from localStorage, falling back to system preference
    const saved = localStorage.getItem('2laps-theme');
    if (saved) {
      setUserOverride(true);
      setIsDark(saved === 'dark');
    } else {
      setIsDark(getSystemDark());
    }

    // Track system changes when no user override is set
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    function onSystemChange(e: MediaQueryListEvent) {
      if (!localStorage.getItem('2laps-theme')) {
        setIsDark(e.matches);
        applyTheme(e.matches);
      }
    }
    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    setUserOverride(true);
    applyTheme(next);
    localStorage.setItem('2laps-theme', next ? 'dark' : 'light');
  }

  // suppress unused variable warning
  void userOverride;

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="p-1 text-ink-tertiary hover:text-ink transition-colors duration-150"
    >
      {isDark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
    </button>
  );
}
