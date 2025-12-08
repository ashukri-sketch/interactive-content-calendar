/**
 * AUTH & SETTINGS - User Personalization / Settings Panel
 * Theme customization, calendar preferences, and user profile
 */

import { X, Upload, Image as ImageIcon, Palette, Eye, Calendar, User, Check } from 'lucide-react';
import { useState } from 'react';

export interface UserSettings {
  // Theme
  backgroundImage?: string;
  backgroundBlur: number; // 0-100
  accentColor: string;
  themeMode: 'light' | 'dark' | 'tahoe-gradient';
  applyToMyCalendarOnly: boolean;
  
  // Calendar View
  calendarView: 'compact' | 'expanded';
  showMetadata: boolean;
  defaultPlatformFilter?: string;
  
  // User Identity
  displayName: string;
  profilePhoto?: string;
  role: string;
}

interface SettingsPanelProps {
  currentSettings: UserSettings;
  onSave: (settings: UserSettings) => void;
  onClose: () => void;
  darkMode: boolean;
}

const ACCENT_COLORS = [
  { name: 'Calypso', value: '#006781' },
  { name: 'Ocean', value: '#00bfe3' },
  { name: 'Pistachio', value: '#95b730' },
  { name: 'Tulip', value: '#f0b52b' },
  { name: 'Coral', value: '#ff6b6b' },
  { name: 'Purple', value: '#9b59b6' },
  { name: 'Pink', value: '#e91e63' },
  { name: 'Teal', value: '#00bcd4' }
];

export function SettingsPanel({
  currentSettings,
  onSave,
  onClose,
  darkMode
}: SettingsPanelProps) {
  const [settings, setSettings] = useState<UserSettings>(currentSettings);
  const [activeTab, setActiveTab] = useState<'theme' | 'calendar' | 'profile'>('theme');

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-full max-w-3xl max-h-[90vh] z-50
          glass-panel rounded-3xl shadow-2xl
          animate-in zoom-in duration-300
        "
      >
        {/* Header */}
        <div className={`
          flex items-center justify-between p-6 border-b
          ${darkMode ? 'border-white/20' : 'border-neutral-200'}
        `}>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Settings & Personalization
          </h2>
          <button
            onClick={onClose}
            className={`
              p-2 rounded-xl transition-all
              ${darkMode
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-neutral-100 text-neutral-700'
              }
            `}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className={`
          flex gap-2 p-4 border-b
          ${darkMode ? 'border-white/20' : 'border-neutral-200'}
        `}>
          <TabButton
            icon={Palette}
            label="Theme"
            active={activeTab === 'theme'}
            onClick={() => setActiveTab('theme')}
            darkMode={darkMode}
          />
          <TabButton
            icon={Calendar}
            label="Calendar"
            active={activeTab === 'calendar'}
            onClick={() => setActiveTab('calendar')}
            darkMode={darkMode}
          />
          <TabButton
            icon={User}
            label="Profile"
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
            darkMode={darkMode}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'theme' && (
            <ThemeCustomization
              settings={settings}
              updateSetting={updateSetting}
              darkMode={darkMode}
            />
          )}
          {activeTab === 'calendar' && (
            <CalendarViewOptions
              settings={settings}
              updateSetting={updateSetting}
              darkMode={darkMode}
            />
          )}
          {activeTab === 'profile' && (
            <TeamIdentity
              settings={settings}
              updateSetting={updateSetting}
              darkMode={darkMode}
            />
          )}
        </div>

        {/* Footer Actions */}
        <div className={`
          flex items-center justify-between p-6 border-t
          ${darkMode ? 'border-white/20' : 'border-neutral-200'}
        `}>
          <button
            onClick={onClose}
            className={`
              px-6 py-2.5 rounded-xl font-medium transition-all
              ${darkMode
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }
            `}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl font-medium bg-calypso hover:bg-calypso/90 text-white transition-all shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

function TabButton({
  icon: Icon,
  label,
  active,
  onClick,
  darkMode
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
  darkMode: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all
        ${active
          ? 'bg-calypso text-white shadow-md'
          : darkMode
          ? 'text-white/70 hover:bg-white/10'
          : 'text-neutral-700 hover:bg-neutral-100'
        }
      `}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

function ThemeCustomization({
  settings,
  updateSetting,
  darkMode
}: {
  settings: UserSettings;
  updateSetting: (key: keyof UserSettings, value: any) => void;
  darkMode: boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Background Image */}
      <div>
        <label className={`text-sm font-medium mb-3 block ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Background Image
        </label>
        <div className={`
          p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all
          ${darkMode
            ? 'border-white/20 bg-white/5 hover:bg-white/10'
            : 'border-neutral-300 bg-neutral-50 hover:bg-neutral-100'
          }
        `}>
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className={`w-8 h-8 ${darkMode ? 'text-white/40' : 'text-neutral-400'}`} />
            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-neutral-700'}`}>
              Click to upload or select an image
            </p>
            <button className="mt-2 px-4 py-2 rounded-lg bg-calypso text-white text-sm font-medium hover:bg-calypso/90 transition-all">
              <Upload className="w-4 h-4 inline mr-1" />
              Choose Image
            </button>
          </div>
        </div>
      </div>

      {/* Background Blur */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Background Blur
          </label>
          <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
            {settings.backgroundBlur}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={settings.backgroundBlur}
          onChange={(e) => updateSetting('backgroundBlur', parseInt(e.target.value))}
          className="w-full h-2 rounded-full appearance-none bg-neutral-200 dark:bg-white/20"
          style={{
            background: `linear-gradient(to right, #006781 0%, #006781 ${settings.backgroundBlur}%, ${darkMode ? 'rgba(255,255,255,0.2)' : '#e5e5e5'} ${settings.backgroundBlur}%, ${darkMode ? 'rgba(255,255,255,0.2)' : '#e5e5e5'} 100%)`
          }}
        />
      </div>

      {/* Accent Color */}
      <div>
        <label className={`text-sm font-medium mb-3 block ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Accent Color
        </label>
        <div className="grid grid-cols-4 gap-3">
          {ACCENT_COLORS.map(color => (
            <button
              key={color.value}
              onClick={() => updateSetting('accentColor', color.value)}
              className={`
                p-3 rounded-xl transition-all relative
                ${settings.accentColor === color.value
                  ? 'ring-2 ring-offset-2 ring-calypso'
                  : ''
                }
              `}
              style={{ backgroundColor: color.value }}
            >
              {settings.accentColor === color.value && (
                <Check className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
              <span className="sr-only">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Mode */}
      <div>
        <label className={`text-sm font-medium mb-3 block ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Theme Mode
        </label>
        <div className="grid grid-cols-3 gap-3">
          <ThemeModeButton
            label="Light"
            active={settings.themeMode === 'light'}
            onClick={() => updateSetting('themeMode', 'light')}
            darkMode={darkMode}
          />
          <ThemeModeButton
            label="Dark"
            active={settings.themeMode === 'dark'}
            onClick={() => updateSetting('themeMode', 'dark')}
            darkMode={darkMode}
          />
          <ThemeModeButton
            label="Tahoe Gradient"
            active={settings.themeMode === 'tahoe-gradient'}
            onClick={() => updateSetting('themeMode', 'tahoe-gradient')}
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* Apply to My Calendar Only */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.applyToMyCalendarOnly}
          onChange={(e) => updateSetting('applyToMyCalendarOnly', e.target.checked)}
          className="w-5 h-5 rounded border-2 border-calypso text-calypso focus:ring-calypso"
        />
        <span className={`text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Apply theme to my calendar view only
        </span>
      </label>
    </div>
  );
}

function CalendarViewOptions({
  settings,
  updateSetting,
  darkMode
}: {
  settings: UserSettings;
  updateSetting: (key: keyof UserSettings, value: any) => void;
  darkMode: boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Calendar View Toggle */}
      <div>
        <label className={`text-sm font-medium mb-3 block ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Calendar View Style
        </label>
        <div className="grid grid-cols-2 gap-3">
          <ViewStyleButton
            label="Compact"
            description="Less detail, more campaigns visible"
            active={settings.calendarView === 'compact'}
            onClick={() => updateSetting('calendarView', 'compact')}
            darkMode={darkMode}
          />
          <ViewStyleButton
            label="Expanded"
            description="More details per campaign"
            active={settings.calendarView === 'expanded'}
            onClick={() => updateSetting('calendarView', 'expanded')}
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* Show Metadata Toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.showMetadata}
          onChange={(e) => updateSetting('showMetadata', e.target.checked)}
          className="w-5 h-5 rounded border-2 border-calypso text-calypso focus:ring-calypso"
        />
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Show extra metadata
          </p>
          <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
            Display additional tags and assignment info
          </p>
        </div>
      </label>

      {/* Default Platform Filter */}
      <div>
        <label className={`text-sm font-medium mb-3 block ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Default Platform Filter
        </label>
        <select
          value={settings.defaultPlatformFilter || ''}
          onChange={(e) => updateSetting('defaultPlatformFilter', e.target.value || undefined)}
          className={`
            w-full px-4 py-2.5 rounded-xl
            ${darkMode
              ? 'bg-white/10 border border-white/20 text-white'
              : 'bg-white border border-neutral-300 text-neutral-900'
            }
            outline-none focus:ring-2 focus:ring-calypso
          `}
        >
          <option value="">All Platforms</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="linkedin">LinkedIn</option>
          <option value="tiktok">TikTok</option>
          <option value="website">Website</option>
        </select>
      </div>
    </div>
  );
}

function TeamIdentity({
  settings,
  updateSetting,
  darkMode
}: {
  settings: UserSettings;
  updateSetting: (key: keyof UserSettings, value: any) => void;
  darkMode: boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div>
        <label className={`text-sm font-medium mb-3 block ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Profile Photo
        </label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-calypso to-calypso-600 flex items-center justify-center text-white text-2xl font-medium shadow-lg">
            {settings.displayName.split(' ').map(n => n[0]).join('')}
          </div>
          <button className="px-4 py-2 rounded-lg bg-calypso text-white text-sm font-medium hover:bg-calypso/90 transition-all">
            <Upload className="w-4 h-4 inline mr-1" />
            Upload New Photo
          </button>
        </div>
      </div>

      {/* Display Name */}
      <div>
        <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Display Name
        </label>
        <input
          type="text"
          value={settings.displayName}
          onChange={(e) => updateSetting('displayName', e.target.value)}
          className={`
            w-full px-4 py-2.5 rounded-xl
            ${darkMode
              ? 'bg-white/10 border border-white/20 text-white'
              : 'bg-white border border-neutral-300 text-neutral-900'
            }
            outline-none focus:ring-2 focus:ring-calypso
          `}
        />
      </div>

      {/* Role */}
      <div>
        <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Role
        </label>
        <select
          value={settings.role}
          onChange={(e) => updateSetting('role', e.target.value)}
          className={`
            w-full px-4 py-2.5 rounded-xl
            ${darkMode
              ? 'bg-white/10 border border-white/20 text-white'
              : 'bg-white border border-neutral-300 text-neutral-900'
            }
            outline-none focus:ring-2 focus:ring-calypso
          `}
        >
          <option value="editor">Editor</option>
          <option value="copywriter">Copywriter</option>
          <option value="social-lead">Social Lead</option>
          <option value="manager">Manager</option>
          <option value="designer">Designer</option>
        </select>
      </div>
    </div>
  );
}

function ThemeModeButton({
  label,
  active,
  onClick,
  darkMode
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  darkMode: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-3 rounded-xl font-medium transition-all
        ${active
          ? 'bg-calypso text-white shadow-md'
          : darkMode
          ? 'bg-white/10 text-white/70 hover:bg-white/20'
          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
        }
      `}
    >
      {label}
    </button>
  );
}

function ViewStyleButton({
  label,
  description,
  active,
  onClick,
  darkMode
}: {
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
  darkMode: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        p-4 rounded-xl text-left transition-all
        ${active
          ? 'bg-calypso text-white shadow-md'
          : darkMode
          ? 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
        }
      `}
    >
      <p className="font-medium mb-1">{label}</p>
      <p className={`text-xs ${active ? 'text-white/80' : darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
        {description}
      </p>
    </button>
  );
}