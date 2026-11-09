'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('fahm-theme', callback);
  return () => window.removeEventListener('fahm-theme', callback);
};
const getSnapshot = () => document.documentElement.dataset.theme === 'dark';

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const toggle = () => {
    const theme = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('fahm-theme', theme); } catch { /* Preferences remain usable without storage. */ }
    window.dispatchEvent(new Event('fahm-theme'));
  };
  return <button className="icon-button theme-toggle" onClick={toggle} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>;
}
