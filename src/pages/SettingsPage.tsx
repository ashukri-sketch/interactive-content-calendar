/**
 * PAGE 7 — SETTINGS
 * Theme customization and user preferences
 */

import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SettingsPanel, type UserSettings } from '../components/auth-settings';

export function SettingsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [settings, setSettings] = useState<UserSettings>({
    backgroundImage: undefined,
    backgroundBlur: 50,
    accentColor: '#006781',
    themeMode: theme,
    applyToMyCalendarOnly: false,
    calendarView: 'expanded',
    showMetadata: true,
    defaultPlatformFilter: undefined,
    displayName: 'Jordan Smith',
    profilePhoto: undefined,
    role: 'Content Manager'
  });

  const handleSave = (newSettings: UserSettings) => {
    setSettings(newSettings);
    // Save to backend/localStorage
  };

  return (
    <div className={`
      min-h-screen p-8
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
    `}>
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-8 p-8 rounded-2xl bg-gradient-primary">
          <h1 className="text-3xl font-semibold mb-2 text-white">
            Settings
          </h1>
          <p className="text-white/80">
            Customize your experience
          </p>
        </div>
        
        <SettingsPanel
          currentSettings={settings}
          onSave={handleSave}
          onClose={() => {}}
          darkMode={isDark}
        />
      </div>
    </div>
  );
}