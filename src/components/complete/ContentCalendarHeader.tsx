import { useState } from 'react';
import { Download, Bell, Search, Calendar, LayoutDashboard, MessageSquare, Settings, User } from 'lucide-react';

interface ContentCalendarHeaderProps {
  darkMode: boolean;
  currentView: 'calendar' | 'dashboard' | 'chat';
  onViewChange: (view: 'calendar' | 'dashboard' | 'chat') => void;
  onExport: (type: 'campaigns' | 'tasks') => void;
  notificationCount: number;
  overdueCount: number;
  currentUser?: {
    name: string;
    role: string;
  };
}

export function ContentCalendarHeader({
  darkMode,
  currentView,
  onViewChange,
  onExport,
  notificationCount,
  overdueCount,
  currentUser
}: ContentCalendarHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);

  return (
    <header className="mb-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        {/* Logo & Title */}
        <div>
          <h1 className="text-white-950 dark:text-white mb-1">
            Content Calendar
          </h1>
          <p className="text-sm text-white-950/60 dark:text-white/60">
            Manage campaigns, tasks, and team collaboration
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Global Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white-950/40 dark:text-white/40" />
            <input
              type="text"
              placeholder="Search everything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-64 pl-10 pr-4 py-2 rounded-xl
                bg-white dark:bg-white/10
                border border-white-950/10 dark:border-white/20
                text-sm text-white-950 dark:text-white
                placeholder-white-950/40 dark:placeholder-white/40
                focus:outline-none focus:ring-2 focus:ring-calypso-600
                transition-all
              "
            />
          </div>

          {/* Export */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="
                px-4 py-2 rounded-xl flex items-center gap-2
                bg-calypso hover:bg-calypso/90 text-white
                transition-all shadow-md hover:shadow-lg
              "
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            {showExportMenu && (
              <div className="
                absolute top-full right-0 mt-2 w-48
                bg-white dark:bg-white rounded-xl
                border border-white-950/10 dark:border-white/20
                shadow-xl z-50
              ">
                <button
                  onClick={() => {
                    onExport('campaigns');
                    setShowExportMenu(false);
                  }}
                  className="
                    w-full px-4 py-2.5 text-left text-sm
                    text-white-950 dark:text-white/90
                    hover:bg-alto-50 dark:hover:bg-white/10
                    rounded-t-xl transition-colors
                  "
                >
                  Export Campaigns (CSV)
                </button>
                <button
                  onClick={() => {
                    onExport('tasks');
                    setShowExportMenu(false);
                  }}
                  className="
                    w-full px-4 py-2.5 text-left text-sm
                    text-white-950 dark:text-white/90
                    hover:bg-alto-50 dark:hover:bg-white/10
                    rounded-b-xl transition-colors
                  "
                >
                  Export Tasks (CSV)
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="
            relative p-2.5 rounded-xl
            bg-white dark:bg-white/10
            border border-white-950/10 dark:border-white/20
            hover:bg-alto-50 dark:hover:bg-white/20
            transition-all
          ">
            <Bell className="w-5 h-5 text-white-950 dark:text-white" />
            {notificationCount > 0 && (
              <span className="notification-badge absolute -top-1 -right-1">
                {notificationCount}
              </span>
            )}
            {overdueCount > 0 && (
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-white" />
            )}
          </button>

          {/* User Profile */}
          {currentUser && (
            <div className="
              flex items-center gap-3 px-4 py-2 rounded-xl
              bg-white dark:bg-white/10
              border border-white-950/10 dark:border-white/20
            ">
              <div className="
                w-8 h-8 rounded-full flex items-center justify-center
                bg-gradient-to-br from-calypso to-calypso-600 text-white text-sm
              ">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm text-white-950 dark:text-white">
                  {currentUser.name}
                </p>
                <p className="text-xs text-white-950/60 dark:text-white/60">
                  {currentUser.role}
                </p>
              </div>
            </div>
          )}

          {/* Settings */}
          <button className="
            p-2.5 rounded-xl
            bg-white dark:bg-white/10
            border border-white-950/10 dark:border-white/20
            hover:bg-alto-50 dark:hover:bg-white/20
            transition-all
          ">
            <Settings className="w-5 h-5 text-white-950 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Tabbed Navigation */}
      <div className="
        flex items-center gap-2 p-1 rounded-xl
        bg-white dark:bg-white/10
        border border-white-950/10 dark:border-white/20
      ">
        <TabButton
          icon={Calendar}
          label="Calendar"
          active={currentView === 'calendar'}
          onClick={() => onViewChange('calendar')}
          darkMode={darkMode}
        />
        <TabButton
          icon={LayoutDashboard}
          label="Dashboard"
          active={currentView === 'dashboard'}
          onClick={() => onViewChange('dashboard')}
          darkMode={darkMode}
        />
        <TabButton
          icon={MessageSquare}
          label="Team Chat"
          active={currentView === 'chat'}
          onClick={() => onViewChange('chat')}
          darkMode={darkMode}
          badge={3}
        />
      </div>
    </header>
  );
}

function TabButton({
  icon: Icon,
  label,
  active,
  onClick,
  darkMode,
  badge
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
  darkMode: boolean;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
        transition-all relative
        ${active
          ? 'bg-calypso text-white shadow-md'
          : darkMode
          ? 'text-white/70 hover:bg-white/10'
          : 'text-white-950/70 hover:bg-alto-50'
        }
      `}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
      {badge && badge > 0 && (
        <span className="notification-badge absolute -top-1 -right-1">
          {badge}
        </span>
      )}
    </button>
  );
}
