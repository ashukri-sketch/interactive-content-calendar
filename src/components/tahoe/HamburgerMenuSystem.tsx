import { useState } from 'react';
import { Menu, X, Search, Calendar, CheckSquare, Settings, LogOut } from 'lucide-react';
import { TeamMember } from './TeamDirectoryPanel';

/**
 * Interactive Component Variant System
 * Hamburger Menu Button ←→ Slide-Out Panel
 * 
 * Variants:
 * - Collapsed: Only button visible
 * - Expanded: Button + panel visible
 * - Hover: Interactive hover states
 * - Light/Dark: Theme variants
 */

interface HamburgerMenuSystemProps {
  darkMode: boolean;
  currentUser?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  teamMembers: TeamMember[];
  variant?: 'collapsed' | 'expanded';
  onVariantChange?: (variant: 'collapsed' | 'expanded') => void;
  onNavigate?: (page: string) => void;
  onMemberClick?: (member: TeamMember) => void;
  onLogout?: () => void;
}

export function HamburgerMenuSystem({
  darkMode,
  currentUser,
  teamMembers,
  variant = 'collapsed',
  onVariantChange,
  onNavigate,
  onMemberClick,
  onLogout
}: HamburgerMenuSystemProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [buttonHovered, setButtonHovered] = useState(false);

  const isOpen = variant === 'expanded';

  const toggleVariant = () => {
    const newVariant = isOpen ? 'collapsed' : 'expanded';
    onVariantChange?.(newVariant);
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Hamburger Button - Always Visible */}
      <HamburgerButton
        darkMode={darkMode}
        isOpen={isOpen}
        isHovered={buttonHovered}
        onToggle={toggleVariant}
        onHoverChange={setButtonHovered}
      />

      {/* Backdrop - Visible when expanded */}
      {isOpen && (
        <PanelBackdrop
          darkMode={darkMode}
          onClick={() => onVariantChange?.('collapsed')}
        />
      )}

      {/* Slide-Out Panel - Animated based on variant */}
      <SlidePanel
        darkMode={darkMode}
        isOpen={isOpen}
        currentUser={currentUser}
        teamMembers={filteredMembers}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={(page) => {
          onNavigate?.(page);
          if (page !== 'close') {
            onVariantChange?.('collapsed');
          }
        }}
        onMemberClick={(member) => {
          onMemberClick?.(member);
          onVariantChange?.('collapsed');
        }}
        onLogout={() => {
          onLogout?.();
          onVariantChange?.('collapsed');
        }}
      />
    </>
  );
}

/**
 * Hamburger Button Component
 * Interactive states: default, hover, open
 */
function HamburgerButton({
  darkMode,
  isOpen,
  isHovered,
  onToggle,
  onHoverChange
}: {
  darkMode: boolean;
  isOpen: boolean;
  isHovered: boolean;
  onToggle: () => void;
  onHoverChange: (hovered: boolean) => void;
}) {
  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className={`
        relative w-12 h-12 rounded-2xl transition-all duration-300
        backdrop-blur-xl border shadow-lg
        ${darkMode
          ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
          : 'bg-white/60 border-white/80 hover:bg-white/90 text-neutral-700'
        }
        ${isOpen ? 'rotate-90' : 'rotate-0'}
      `}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      {/* Gradient overlay */}
      <div className={`
        absolute inset-0 rounded-2xl pointer-events-none transition-opacity
        ${darkMode
          ? 'bg-gradient-to-br from-white/10 to-transparent'
          : 'bg-gradient-to-br from-white/60 to-transparent'
        }
      `} />

      {/* Icon - morphs between hamburger and X */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {isOpen ? (
          <X className="w-6 h-6 transition-all duration-300" />
        ) : (
          <Menu className="w-6 h-6 transition-all duration-300" />
        )}
      </div>

      {/* Hover glow effect */}
      {isHovered && !isOpen && (
        <div className={`
          absolute inset-0 rounded-2xl transition-opacity
          ${darkMode
            ? 'bg-blue-500/20 shadow-lg shadow-blue-500/20'
            : 'bg-blue-400/20 shadow-lg shadow-blue-400/20'
          }
          animate-pulse
        `} />
      )}

      {/* Active indicator when panel is open */}
      {isOpen && (
        <div className={`
          absolute -right-1 -top-1 w-3 h-3 rounded-full
          ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}
          shadow-lg animate-pulse
        `} />
      )}
    </button>
  );
}

/**
 * Panel Backdrop Component
 * Appears when panel is expanded
 */
function PanelBackdrop({
  darkMode,
  onClick
}: {
  darkMode: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 animate-in fade-in"
      onClick={onClick}
      aria-hidden="true"
    />
  );
}

/**
 * Slide Panel Component
 * Animated panel that slides in from left
 */
function SlidePanel({
  darkMode,
  isOpen,
  currentUser,
  teamMembers,
  searchQuery,
  onSearchChange,
  onNavigate,
  onMemberClick,
  onLogout
}: {
  darkMode: boolean;
  isOpen: boolean;
  currentUser?: { name: string; email: string; role: string; avatar?: string };
  teamMembers: TeamMember[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigate: (page: string) => void;
  onMemberClick: (member: TeamMember) => void;
  onLogout: () => void;
}) {
  return (
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
      aria-hidden={!isOpen}
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
          <CurrentUserHeader
            darkMode={darkMode}
            user={currentUser}
          />
        )}

        {/* Quick links */}
        <nav className="mb-6 space-y-2">
          <QuickLink
            icon={Calendar}
            label="My Calendar View"
            darkMode={darkMode}
            onClick={() => onNavigate('calendar')}
          />
          <QuickLink
            icon={CheckSquare}
            label="My Tasks"
            darkMode={darkMode}
            onClick={() => onNavigate('tasks')}
          />
          <QuickLink
            icon={Settings}
            label="Settings"
            darkMode={darkMode}
            onClick={() => onNavigate('settings')}
          />
        </nav>

        {/* Search bar */}
        <SearchBar
          darkMode={darkMode}
          value={searchQuery}
          onChange={onSearchChange}
        />

        {/* Team members list */}
        <TeamMembersList
          darkMode={darkMode}
          members={teamMembers}
          onMemberClick={onMemberClick}
        />

        {/* Logout button */}
        <LogoutButton
          darkMode={darkMode}
          onClick={onLogout}
        />
      </div>
    </div>
  );
}

/**
 * Current User Header Component
 */
function CurrentUserHeader({
  darkMode,
  user
}: {
  darkMode: boolean;
  user: { name: string; email: string; role: string };
}) {
  return (
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
          {user.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <h3 className={`text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            {user.name}
          </h3>
          <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Quick Link Component
 */
function QuickLink({
  icon: Icon,
  label,
  darkMode,
  onClick
}: {
  icon: any;
  label: string;
  darkMode: boolean;
  onClick: () => void;
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

/**
 * Search Bar Component
 */
function SearchBar({
  darkMode,
  value,
  onChange
}: {
  darkMode: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            flex-1 bg-transparent outline-none text-sm
            ${darkMode ? 'text-white placeholder-white/40' : 'text-neutral-900 placeholder-neutral-400'}
          `}
        />
      </div>
    </div>
  );
}

/**
 * Team Members List Component
 */
function TeamMembersList({
  darkMode,
  members,
  onMemberClick
}: {
  darkMode: boolean;
  members: TeamMember[];
  onMemberClick: (member: TeamMember) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto">
      <h4 className={`text-xs mb-3 ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
        TEAM MEMBERS ({members.length})
      </h4>
      <div className="space-y-2">
        {members.map(member => (
          <TeamMemberItem
            key={member.id}
            member={member}
            darkMode={darkMode}
            onClick={() => onMemberClick(member)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Team Member Item Component
 */
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

/**
 * Logout Button Component
 */
function LogoutButton({
  darkMode,
  onClick
}: {
  darkMode: boolean;
  onClick: () => void;
}) {
  return (
    <div className="mt-6 pt-6 border-t border-white/10">
      <button
        onClick={onClick}
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
  );
}
