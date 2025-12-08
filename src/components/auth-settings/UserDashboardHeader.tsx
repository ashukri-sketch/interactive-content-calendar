/**
 * AUTH & SETTINGS - User Dashboard Header
 * Shows current user profile, role, and settings access
 */

import { Settings, LogOut, Bell, User } from 'lucide-react';

interface UserDashboardHeaderProps {
  user: {
    name: string;
    role: string;
    profilePicture?: string;
  };
  darkMode: boolean;
  onSettingsClick: () => void;
  onLogout: () => void;
  notificationCount?: number;
}

export function UserDashboardHeader({
  user,
  darkMode,
  onSettingsClick,
  onLogout,
  notificationCount = 0
}: UserDashboardHeaderProps) {
  return (
    <div className={`
      px-6 py-4 rounded-2xl mb-6
      backdrop-blur-3xl border
      ${darkMode
        ? 'bg-white/10 border-white/20'
        : 'bg-white border-neutral-200'
      }
      shadow-lg
    `}>
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-calypso/30"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-calypso to-calypso-600 flex items-center justify-center text-white text-lg font-medium shadow-lg">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}

          {/* Name & Role */}
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              {user.name}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
              {user.role}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className={`
            relative p-2.5 rounded-xl transition-all
            ${darkMode
              ? 'hover:bg-white/10 text-white'
              : 'hover:bg-neutral-100 text-neutral-700'
            }
          `}>
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={onSettingsClick}
            className={`
              p-2.5 rounded-xl transition-all
              ${darkMode
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-neutral-100 text-neutral-700'
              }
            `}
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all
              ${darkMode
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
              }
            `}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
