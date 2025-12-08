import { useState } from 'react';
import { Search, Calendar, CheckSquare, Settings, LogOut, User, Briefcase, TrendingUp } from 'lucide-react';
import { TeamMember } from './TeamDirectoryPanel';

interface SlideOutTeamPanelProps {
  isOpen: boolean;
  darkMode: boolean;
  currentUser?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  teamMembers: TeamMember[];
  onNavigate?: (page: string) => void;
  onMemberClick?: (member: TeamMember) => void;
  onLogout?: () => void;
}

export function SlideOutTeamPanel({
  isOpen,
  darkMode,
  currentUser,
  teamMembers,
  onNavigate,
  onMemberClick,
  onLogout
}: SlideOutTeamPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => onNavigate?.('close')}
        />
      )}

      {/* Slide-out panel */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 z-50
          backdrop-blur-3xl border-r shadow-2xl
          transition-transform duration-500 ease-out
          ${darkMode
            ? 'bg-neutral-900/90 border-white/20 shadow-black/40'
            : 'bg-white/90 border-white/80 shadow-black/20'
          }
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Gradient overlay */}
        <div className={`
          absolute inset-0 pointer-events-none
          ${darkMode
            ? 'bg-gradient-to-br from-white/5 to-transparent'
            : 'bg-gradient-to-br from-white/40 to-transparent'
          }
        `} />

        <div className="relative z-10 h-full flex flex-col p-6">
          {/* Current user header */}
          {currentUser && (
            <div className={`
              mb-6 p-4 rounded-2xl backdrop-blur-md border
              ${darkMode
                ? 'bg-white/10 border-white/20'
                : 'bg-white/60 border-white/80'
              }
            `}>
              <div className="flex items-center gap-3">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-lg
                  bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-lg
                `}>
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {currentUser.name}
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                    {currentUser.role}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick links */}
          <nav className="mb-6 space-y-2">
            <QuickLink
              icon={Calendar}
              label="My Calendar View"
              darkMode={darkMode}
              onClick={() => onNavigate?.('calendar')}
            />
            <QuickLink
              icon={CheckSquare}
              label="My Tasks"
              darkMode={darkMode}
              onClick={() => onNavigate?.('tasks')}
            />
            <QuickLink
              icon={Settings}
              label="Settings"
              darkMode={darkMode}
              onClick={() => onNavigate?.('settings')}
            />
          </nav>

          {/* Search bar */}
          <div className="mb-4">
            <div className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-md border
              ${darkMode
                ? 'bg-white/10 border-white/20 focus-within:bg-white/15 focus-within:border-white/30'
                : 'bg-white/60 border-white/80 focus-within:bg-white/80 focus-within:border-neutral-300'
              }
            `}>
              <Search className={`w-4 h-4 ${darkMode ? 'text-white/60' : 'text-neutral-600'}`} />
              <input
                type="text"
                placeholder="Search team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`
                  flex-1 bg-transparent outline-none text-sm
                  ${darkMode ? 'text-white placeholder-white/40' : 'text-neutral-900 placeholder-neutral-400'}
                `}
              />
            </div>
          </div>

          {/* Team members list */}
          <div className="flex-1 overflow-y-auto">
            <h4 className={`text-xs mb-3 ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
              TEAM MEMBERS ({filteredMembers.length})
            </h4>
            <div className="space-y-2">
              {filteredMembers.map(member => (
                <TeamMemberItem
                  key={member.id}
                  member={member}
                  darkMode={darkMode}
                  onClick={() => onMemberClick?.(member)}
                />
              ))}
            </div>
          </div>

          {/* Logout button */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={onLogout}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${darkMode
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30'
                  : 'bg-red-100 hover:bg-red-200 text-red-700 border border-red-200'
                }
              `}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function QuickLink({
  icon: Icon,
  label,
  darkMode,
  onClick
}: {
  icon: any;
  label: string;
  darkMode: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all
        ${darkMode
          ? 'hover:bg-white/10 text-white/80 hover:text-white'
          : 'hover:bg-white/60 text-neutral-700 hover:text-neutral-900'
        }
      `}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm">{label}</span>
    </button>
  );
}

function TeamMemberItem({
  member,
  darkMode,
  onClick
}: {
  member: TeamMember;
  darkMode: boolean;
  onClick: () => void;
}) {
  const workloadColors = {
    low: darkMode ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200',
    medium: darkMode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200',
    high: darkMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-full p-3 rounded-xl transition-all backdrop-blur-md border
        ${darkMode
          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
          : 'bg-white/50 border-white/60 hover:bg-white/70 hover:border-white/90'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`
          w-10 h-10 rounded-full flex items-center justify-center text-sm
          bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-lg
        `}>
          {member.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1 text-left">
          <h5 className={`text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            {member.name}
          </h5>
          <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
            {member.role}
          </p>
        </div>
        <div className={`px-2 py-0.5 rounded-full text-xs border ${workloadColors[member.workload]}`}>
          {member.activeProjects}
        </div>
      </div>
    </button>
  );
}
