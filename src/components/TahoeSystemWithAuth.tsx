import { useState } from 'react';
import { LoginScreen } from './tahoe/LoginScreen';
import { HamburgerMenuSystem } from './tahoe/HamburgerMenuSystem';
import { UserDashboardHeader } from './tahoe/UserDashboardHeader';
import { SettingsPanel, UserSettings } from './tahoe/SettingsPanel';
import { TahoeCalendarCellEnhanced, TahoeCellData } from './tahoe/TahoeCalendarCellEnhanced';
import { TahoeMonthHeader, TahoeDayLabels } from './tahoe/TahoeMonthHeader';
import { CampaignDetailPanel } from './tahoe/CampaignDetailPanel';
import { TeamDirectoryPanel, SAMPLE_TEAM, TeamMember } from './tahoe/TeamDirectoryPanel';
import { TaskBoardEnhanced } from './tahoe/TaskBoardEnhanced';
import { SAMPLE_TASKS } from './tahoe/TaskBoard';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface TahoeSystemWithAuthProps {
  darkMode: boolean;
  onBack?: () => void;
  onDarkModeToggle?: () => void;
}

export function TahoeSystemWithAuth({ darkMode, onBack, onDarkModeToggle }: TahoeSystemWithAuthProps) {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // UI state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCampaignPanel, setShowCampaignPanel] = useState(false);
  const [showTaskBoard, setShowTaskBoard] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [taskViewMode, setTaskViewMode] = useState<'my-tasks' | 'all-tasks'>('my-tasks');

  // User settings
  const [userSettings, setUserSettings] = useState<UserSettings>({
    theme: {
      mode: darkMode ? 'dark' : 'light',
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
  });

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(10);
  const [currentYear, setCurrentYear] = useState(2025);

  // Sample calendar data
  const sampleCalendarData: { [key: number]: TahoeCellData[] } = {
    4: [{
      campaignName: 'Product Launch',
      platform: 'instagram',
      contentType: 'reel',
      status: 'posted',
      team: ['AK', 'ET'],
      priority: 'high'
    }],
    11: [{
      campaignName: 'Feature Video',
      platform: 'instagram',
      contentType: 'reel',
      status: 'scheduled',
      team: ['AK', 'ET'],
      priority: 'high'
    }],
    14: [
      {
        campaignName: 'Blog Post',
        platform: 'website',
        contentType: 'graphic',
        status: 'scheduled',
        team: ['ET', 'SM'],
        priority: 'medium'
      },
      {
        campaignName: 'Social Teaser',
        platform: 'tiktok',
        contentType: 'reel',
        status: 'drafting',
        team: ['SM'],
        priority: 'medium'
      }
    ],
    18: [{
      campaignName: 'Social Campaign',
      platform: 'multi',
      contentType: 'carousel',
      status: 'drafting',
      team: ['SM', 'AK'],
      priority: 'high'
    }],
    25: [{
      campaignName: 'Success Story',
      platform: 'linkedin',
      contentType: 'story',
      status: 'editing',
      team: ['AK', 'ET'],
      priority: 'medium'
    }]
  };

  const handleLogin = (email: string, password: string, remember: boolean) => {
    // Demo login - extract name from email
    const name = email.split('@')[0].split('.').map(n => 
      n.charAt(0).toUpperCase() + n.slice(1)
    ).join(' ');
    
    setCurrentUser({
      id: '1',
      name: name,
      email: email,
      role: userSettings.profile.role
    });
    
    setUserSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        displayName: name
      }
    }));
    
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setIsMenuOpen(false);
  };

  const handleNavigation = (page: string) => {
    setIsMenuOpen(false);
    
    switch (page) {
      case 'settings':
        setShowSettings(true);
        break;
      case 'tasks':
        setShowTaskBoard(true);
        setSelectedMember(SAMPLE_TEAM[0]);
        break;
      case 'calendar':
        // Already on calendar
        break;
      case 'close':
        setIsMenuOpen(false);
        break;
    }
  };

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setShowTaskBoard(true);
    setIsMenuOpen(false);
  };

  const handleSaveSettings = (settings: UserSettings) => {
    setUserSettings(settings);
    
    // Update current user if display name changed
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        name: settings.profile.displayName,
        role: settings.profile.role
      });
    }
    
    setShowSettings(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  // Generate calendar grid
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return (
      <LoginScreen
        darkMode={darkMode}
        onLogin={handleLogin}
        onForgotPassword={() => alert('Password reset would be sent to your email')}
      />
    );
  }

  // Custom background based on user settings
  const getBackgroundStyle = () => {
    if (userSettings.theme.backgroundImage) {
      return {
        backgroundImage: `url(${userSettings.theme.backgroundImage})`,
        filter: `blur(${userSettings.theme.backgroundBlur}px)`
      };
    }
    return {};
  };

  const getAccentColor = () => userSettings.theme.accentColor;

  return (
    <div 
      className={`min-h-screen p-8 transition-colors relative ${
        userSettings.theme.mode === 'dark'
          ? 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900'
          : userSettings.theme.mode === 'tahoe-gradient'
          ? 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}
      style={{ accentColor: getAccentColor() }}
    >
      {/* Custom background overlay */}
      {userSettings.theme.backgroundImage && (
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={getBackgroundStyle()}
        />
      )}

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Top navigation */}
        <div className="flex items-center gap-4 mb-8">
          {/* Hamburger menu system - linked button + panel */}
          <HamburgerMenuSystem
            darkMode={darkMode}
            currentUser={currentUser}
            teamMembers={SAMPLE_TEAM}
            variant={isMenuOpen ? 'expanded' : 'collapsed'}
            onVariantChange={(variant) => setIsMenuOpen(variant === 'expanded')}
            onNavigate={handleNavigation}
            onMemberClick={handleMemberClick}
            onLogout={handleLogout}
          />

          {onBack && (
            <button
              onClick={onBack}
              className={`
                p-3 rounded-2xl transition-all backdrop-blur-xl border shadow-lg
                ${darkMode
                  ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                  : 'bg-white/60 border-white/80 hover:bg-white/80 text-neutral-700'
                }
              `}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div className="flex-1">
            <h1 className={`flex items-center gap-3 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              <Sparkles className="w-8 h-8" />
              Content Calendar
            </h1>
            <p className={darkMode ? 'text-white/60' : 'text-neutral-600'}>
              Welcome back, {currentUser?.name}
            </p>
          </div>

          {/* User dashboard header */}
          <UserDashboardHeader
            darkMode={darkMode}
            user={currentUser}
            onSettingsClick={() => setShowSettings(true)}
            onProfileClick={() => {}}
          />
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Calendar section */}
          <div className="xl:col-span-3 space-y-6">
            {/* Month header */}
            <TahoeMonthHeader
              month={currentMonth}
              year={currentYear}
              darkMode={darkMode}
              onNavigate={navigateMonth}
              onFilterClick={() => {}}
            />

            {/* Day labels */}
            <TahoeDayLabels darkMode={darkMode} />

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-3">
              {/* Empty cells */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[160px]" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = 
                  day === today.getDate() && 
                  currentMonth === today.getMonth() && 
                  currentYear === today.getFullYear();

                return (
                  <TahoeCalendarCellEnhanced
                    key={day}
                    day={day}
                    content={sampleCalendarData[day] || []}
                    darkMode={darkMode}
                    isToday={isToday}
                    platformVariant="default"
                    contentTypeVariant="default"
                    statusVariant="pill"
                    teamVariant="avatars"
                    priorityVariant="default"
                    showMetadata={userSettings.calendar.showMetadata}
                    onExpand={() => setShowCampaignPanel(true)}
                  />
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TeamDirectoryPanel
              darkMode={darkMode}
              members={SAMPLE_TEAM}
              onMemberClick={handleMemberClick}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      {showSettings && (
        <SettingsPanel
          darkMode={darkMode}
          currentSettings={userSettings}
          onSave={handleSaveSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showCampaignPanel && (
        <CampaignDetailPanel
          darkMode={darkMode}
          onClose={() => setShowCampaignPanel(false)}
        />
      )}

      {showTaskBoard && selectedMember && (
        <TaskBoardEnhanced
          darkMode={darkMode}
          memberName={selectedMember.name}
          tasks={SAMPLE_TASKS}
          teamMembers={SAMPLE_TEAM}
          currentUserId={currentUser?.id}
          viewMode={taskViewMode}
          onViewModeChange={setTaskViewMode}
          onAssignToMe={(taskId) => console.log('Assign to me:', taskId)}
          onReassign={(taskId, memberId) => console.log('Reassign:', taskId, memberId)}
          onClose={() => {
            setShowTaskBoard(false);
            setSelectedMember(null);
          }}
        />
      )}
    </div>
  );
}