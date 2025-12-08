import { Settings, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface UserDashboardHeaderProps {
  darkMode: boolean;
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

export function UserDashboardHeader({
  darkMode,
  user,
  onSettingsClick,
  onProfileClick
}: UserDashboardHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={`
      flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-xl border
      ${darkMode
        ? 'bg-white/10 border-white/20'
        : 'bg-white/60 border-white/80'
      }
    `}>
      {/* Gradient overlay */}
      <div className={`
        absolute inset-0 rounded-2xl pointer-events-none
        ${darkMode
          ? 'bg-gradient-to-br from-white/5 to-transparent'
          : 'bg-gradient-to-br from-white/40 to-transparent'
        }
      `} />

      <div className="relative z-10 flex items-center gap-4 w-full">
        {/* Notifications */}
        <button className={`
          relative p-2.5 rounded-xl transition-all
          ${darkMode
            ? 'bg-white/10 hover:bg-white/20 text-white'
            : 'bg-white/60 hover:bg-white/90 text-neutral-700'
          }
        `}>
          <Bell className="w-5 h-5" />
          {/* Notification badge */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-current" />
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User profile section */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`
              flex items-center gap-3 px-4 py-2 rounded-xl transition-all
              ${darkMode
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-white/60 hover:bg-white/90 text-neutral-700'
              }
            `}
          >
            {/* Avatar */}
            <div className={`
              w-9 h-9 rounded-full flex items-center justify-center
              bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-lg
            `}>
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>

            {/* User info */}
            <div className="text-left">
              <p className={`text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                {user.name}
              </p>
              <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                {user.role}
              </p>
            </div>

            <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className={`
              absolute right-0 top-full mt-2 w-56 rounded-2xl backdrop-blur-xl border shadow-2xl
              ${darkMode
                ? 'bg-neutral-900/90 border-white/20'
                : 'bg-white/90 border-white/80'
              }
            `}>
              <div className="p-2">
                <button
                  onClick={() => {
                    onProfileClick?.();
                    setShowDropdown(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left
                    ${darkMode
                      ? 'hover:bg-white/10 text-white/80'
                      : 'hover:bg-white/60 text-neutral-700'
                    }
                  `}
                >
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center
                    ${darkMode ? 'bg-white/10' : 'bg-black/10'}
                  `}>
                    👤
                  </div>
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                      View Profile
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                      {user.email}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings button */}
        <button
          onClick={onSettingsClick}
          className={`
            p-2.5 rounded-xl transition-all
            ${darkMode
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-white/60 hover:bg-white/90 text-neutral-700'
            }
          `}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
