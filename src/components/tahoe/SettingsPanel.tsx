import { useState } from 'react';
import { X, Upload, Palette, Eye, User, Save, RotateCcw } from 'lucide-react';

interface SettingsPanelProps {
  darkMode: boolean;
  onClose: () => void;
  currentSettings?: UserSettings;
  onSave?: (settings: UserSettings) => void;
}

export interface UserSettings {
  theme: {
    mode: 'light' | 'dark' | 'tahoe-gradient';
    backgroundImage?: string;
    backgroundBlur: number;
    accentColor: string;
    applyToMyCalendarOnly: boolean;
  };
  calendar: {
    viewMode: 'compact' | 'expanded';
    showMetadata: boolean;
    defaultPlatformFilter: string;
  };
  profile: {
    displayName: string;
    role: string;
    photo?: string;
  };
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: {
    mode: 'light',
    backgroundBlur: 50,
    accentColor: '#3B82F6',
    applyToMyCalendarOnly: false
  },
  calendar: {
    viewMode: 'expanded',
    showMetadata: true,
    defaultPlatformFilter: 'all'
  },
  profile: {
    displayName: '',
    role: 'Editor'
  }
};

export function SettingsPanel({ darkMode, onClose, currentSettings, onSave }: SettingsPanelProps) {
  const [settings, setSettings] = useState<UserSettings>(currentSettings || DEFAULT_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSettings = (section: keyof UserSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave?.(settings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setHasChanges(true);
  };

  const accentColors = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Purple', value: '#A855F7' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Green', value: '#10B981' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Red', value: '#EF4444' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${darkMode ? 'bg-black/60' : 'bg-black/40'} backdrop-blur-sm`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`
        relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-3xl p-8
        backdrop-blur-3xl border shadow-2xl
        ${darkMode
          ? 'bg-neutral-900/80 border-white/20 shadow-black/40'
          : 'bg-white/80 border-white/80 shadow-black/20'
        }
      `}>
        {/* Gradient overlay */}
        <div className={`
          absolute inset-0 rounded-3xl pointer-events-none
          ${darkMode
            ? 'bg-gradient-to-br from-white/5 to-transparent'
            : 'bg-gradient-to-br from-white/40 to-transparent'
          }
        `} />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className={darkMode ? 'text-white' : 'text-neutral-900'}>
                Personalization Settings
              </h2>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                Customize your calendar experience
              </p>
            </div>
            <button
              onClick={onClose}
              className={`
                p-2 rounded-xl transition-all
                ${darkMode
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-black/5 hover:bg-black/10 text-neutral-700'
                }
              `}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {/* Theme Customization */}
            <SettingsSection title="Theme Customization" icon={Palette} darkMode={darkMode}>
              {/* Theme mode selector */}
              <div>
                <label className={`block text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                  Theme Mode
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['light', 'dark', 'tahoe-gradient'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => updateSettings('theme', 'mode', mode)}
                      className={`
                        px-4 py-3 rounded-xl transition-all border
                        ${settings.theme.mode === mode
                          ? darkMode
                            ? 'bg-blue-500/30 border-blue-500/50 text-blue-300'
                            : 'bg-blue-100 border-blue-300 text-blue-700'
                          : darkMode
                          ? 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15'
                          : 'bg-white/50 border-white/60 text-neutral-700 hover:bg-white/70'
                        }
                      `}
                    >
                      <span className="capitalize text-sm">{mode.replace('-', ' ')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background image uploader */}
              <div>
                <label className={`block text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                  Background Image
                </label>
                <div className={`
                  p-6 rounded-xl border-2 border-dashed text-center transition-all cursor-pointer
                  ${darkMode
                    ? 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                    : 'bg-white/40 border-neutral-300 hover:bg-white/60 hover:border-neutral-400'
                  }
                `}>
                  <Upload className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-white/40' : 'text-neutral-400'}`} />
                  <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                    Click to upload or drag and drop
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-white/40' : 'text-neutral-500'}`}>
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>

              {/* Background blur slider */}
              <div>
                <label className={`block text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                  Background Blur: {settings.theme.backgroundBlur}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.theme.backgroundBlur}
                  onChange={(e) => updateSettings('theme', 'backgroundBlur', Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              {/* Accent color selector */}
              <div>
                <label className={`block text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                  Accent Color
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {accentColors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => updateSettings('theme', 'accentColor', color.value)}
                      className={`
                        relative w-full aspect-square rounded-xl transition-all
                        ${settings.theme.accentColor === color.value
                          ? 'ring-4 ring-offset-2 ring-current scale-110'
                          : 'hover:scale-105'
                        }
                      `}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {settings.theme.accentColor === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {/* Custom color picker */}
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.theme.accentColor}
                    onChange={(e) => updateSettings('theme', 'accentColor', e.target.value)}
                    className="w-12 h-12 rounded-xl cursor-pointer"
                  />
                  <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                    Custom color
                  </span>
                </div>
              </div>

              {/* Apply to my calendar only toggle */}
              <label className="flex items-center justify-between cursor-pointer">
                <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                  Apply to My Calendar Only
                </span>
                <input
                  type="checkbox"
                  checked={settings.theme.applyToMyCalendarOnly}
                  onChange={(e) => updateSettings('theme', 'applyToMyCalendarOnly', e.target.checked)}
                  className="w-5 h-5 rounded accent-blue-500"
                />
              </label>
            </SettingsSection>

            {/* Calendar View Options */}
            <SettingsSection title="Calendar View Options" icon={Eye} darkMode={darkMode}>
              {/* View mode */}
              <div>
                <label className={`block text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                  View Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['compact', 'expanded'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => updateSettings('calendar', 'viewMode', mode)}
                      className={`
                        px-4 py-3 rounded-xl transition-all border
                        ${settings.calendar.viewMode === mode
                          ? darkMode
                            ? 'bg-blue-500/30 border-blue-500/50 text-blue-300'
                            : 'bg-blue-100 border-blue-300 text-blue-700'
                          : darkMode
                          ? 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15'
                          : 'bg-white/50 border-white/60 text-neutral-700 hover:bg-white/70'
                        }
                      `}
                    >
                      <span className="capitalize text-sm">{mode}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Show metadata toggle */}
              <label className="flex items-center justify-between cursor-pointer">
                <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                  Show Metadata in Calendar Cells
                </span>
                <input
                  type="checkbox"
                  checked={settings.calendar.showMetadata}
                  onChange={(e) => updateSettings('calendar', 'showMetadata', e.target.checked)}
                  className="w-5 h-5 rounded accent-blue-500"
                />
              </label>

              {/* Default platform filter */}
              <div>
                <label className={`block text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                  Default Platform Filter
                </label>
                <select
                  value={settings.calendar.defaultPlatformFilter}
                  onChange={(e) => updateSettings('calendar', 'defaultPlatformFilter', e.target.value)}
                  className={`
                    w-full px-4 py-3 rounded-xl transition-all backdrop-blur-md border
                    ${darkMode
                      ? 'bg-white/10 border-white/20 text-white focus:bg-white/15 focus:border-white/30'
                      : 'bg-white/60 border-white/80 text-neutral-900 focus:bg-white/80 focus:border-neutral-300'
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  `}
                >
                  <option value="all">All Platforms</option>
                  <option value="email">Email Only</option>
                  <option value="instagram">Instagram Only</option>
                  <option value="facebook">Facebook Only</option>
                  <option value="linkedin">LinkedIn Only</option>
                  <option value="tiktok">TikTok Only</option>
                  <option value="website">Website Only</option>
                </select>
              </div>
            </SettingsSection>

            {/* Team Identity */}
            <SettingsSection title="Team Identity" icon={User} darkMode={darkMode}>
              {/* Profile photo */}
              <div>
                <label className={`block text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className={`
                    w-20 h-20 rounded-full flex items-center justify-center text-2xl
                    bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-lg
                  `}>
                    {settings.profile.displayName.split(' ').map(n => n[0]).join('') || '?'}
                  </div>
                  <button className={`
                    px-4 py-2 rounded-xl transition-all
                    ${darkMode
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-white/60 hover:bg-white/90 text-neutral-700'
                    }
                  `}>
                    Upload Photo
                  </button>
                </div>
              </div>

              {/* Display name */}
              <div>
                <label className={`block text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                  Display Name
                </label>
                <input
                  type="text"
                  value={settings.profile.displayName}
                  onChange={(e) => updateSettings('profile', 'displayName', e.target.value)}
                  placeholder="Enter your name"
                  className={`
                    w-full px-4 py-3 rounded-xl transition-all backdrop-blur-md border
                    ${darkMode
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/30'
                      : 'bg-white/60 border-white/80 text-neutral-900 placeholder-neutral-400 focus:bg-white/80 focus:border-neutral-300'
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  `}
                />
              </div>

              {/* Role selector */}
              <div>
                <label className={`block text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                  Role
                </label>
                <select
                  value={settings.profile.role}
                  onChange={(e) => updateSettings('profile', 'role', e.target.value)}
                  className={`
                    w-full px-4 py-3 rounded-xl transition-all backdrop-blur-md border
                    ${darkMode
                      ? 'bg-white/10 border-white/20 text-white focus:bg-white/15 focus:border-white/30'
                      : 'bg-white/60 border-white/80 text-neutral-900 focus:bg-white/80 focus:border-neutral-300'
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50
                  `}
                >
                  <option value="Editor">Editor</option>
                  <option value="Copywriter">Copywriter</option>
                  <option value="Social Lead">Social Lead</option>
                  <option value="Manager">Manager</option>
                  <option value="Designer">Designer</option>
                  <option value="Strategist">Strategist</option>
                </select>
              </div>
            </SettingsSection>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-8 pt-8 border-t border-white/10">
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`
                flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all shadow-lg
                ${hasChanges
                  ? darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                  : darkMode
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }
              `}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={handleReset}
              className={`
                px-6 py-3 rounded-xl transition-all flex items-center gap-2
                ${darkMode
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-black/5 hover:bg-black/10 text-neutral-700'
                }
              `}
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </button>
            <button
              onClick={onClose}
              className={`
                px-6 py-3 rounded-xl transition-all
                ${darkMode
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-black/5 hover:bg-black/10 text-neutral-700'
                }
              `}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({
  title,
  icon: Icon,
  darkMode,
  children
}: {
  title: string;
  icon: any;
  darkMode: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`
      p-6 rounded-2xl backdrop-blur-xl border
      ${darkMode
        ? 'bg-white/5 border-white/10'
        : 'bg-white/50 border-white/60'
      }
    `}>
      <h3 className={`flex items-center gap-2 mb-6 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        <Icon className="w-5 h-5" />
        {title}
      </h3>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}
