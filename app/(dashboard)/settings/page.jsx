'use client';
import "../../../styles/settings.css";
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  const handleChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="theme-options">
        <label>
          <input
            type="radio"
            checked={theme === 'light'}
            onChange={() => handleChange('light')}
          />
          Light Mode
        </label>
        <label>
          <input
            type="radio"
            checked={theme === 'dark'}
            onChange={() => handleChange('dark')}
          />
          Dark Mode
        </label>
      </div>
    </div>
  );
}
