import { useState } from 'react';
import { TahoeCalendarCellEnhanced, TahoeCellData } from './tahoe/TahoeCalendarCellEnhanced';
import { TahoeMonthHeader, TahoeDayLabels } from './tahoe/TahoeMonthHeader';
import { CampaignDetailPanel } from './tahoe/CampaignDetailPanel';
import { TeamDirectoryPanel, SAMPLE_TEAM, TeamMember } from './tahoe/TeamDirectoryPanel';
import { TaskBoard, SAMPLE_TASKS } from './tahoe/TaskBoard';
import { TahoeComponentsLibrary } from './tahoe/TahoeComponentsLibrary';
import { TahoeVariantShowcase } from './tahoe/TahoeVariantShowcase';
import { ArrowLeft, LayoutGrid, Package, Settings } from 'lucide-react';

interface TahoeSystemShowcaseProps {
  darkMode: boolean;
  onBack?: () => void;
}

export function TahoeSystemShowcase({ darkMode, onBack }: TahoeSystemShowcaseProps) {
  const [currentMonth, setCurrentMonth] = useState(10); // November
  const [currentYear, setCurrentYear] = useState(2025);
  const [showCampaignPanel, setShowCampaignPanel] = useState(false);
  const [showTaskBoard, setShowTaskBoard] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showComponents, setShowComponents] = useState(false);

  // Sample calendar data
  const sampleCalendarData: { [key: number]: TahoeCellData[] } = {
    4: [
      {
        campaignName: 'Product Launch',
        platform: 'instagram',
        contentType: 'reel',
        status: 'posted',
        team: ['AK', 'ET'],
        priority: 'high'
      }
    ],
    7: [
      {
        campaignName: 'Weekly Newsletter',
        platform: 'email',
        contentType: 'copy',
        status: 'posted',
        team: ['MR'],
        priority: 'medium'
      }
    ],
    11: [
      {
        campaignName: 'Feature Video',
        platform: 'instagram',
        contentType: 'reel',
        status: 'scheduled',
        team: ['AK', 'ET'],
        priority: 'high'
      }
    ],
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
    18: [
      {
        campaignName: 'Social Campaign',
        platform: 'multi',
        contentType: 'carousel',
        status: 'drafting',
        team: ['SM', 'AK'],
        priority: 'high'
      }
    ],
    21: [
      {
        campaignName: 'Webinar Promo',
        platform: 'linkedin',
        contentType: 'graphic',
        status: 'delayed',
        team: ['MR', 'JC'],
        priority: 'medium'
      }
    ],
    25: [
      {
        campaignName: 'Success Story',
        platform: 'linkedin',
        contentType: 'story',
        status: 'editing',
        team: ['AK', 'ET'],
        priority: 'medium'
      }
    ],
    28: [
      {
        campaignName: 'Month Report',
        platform: 'email',
        contentType: 'copy',
        status: 'needs-approval',
        team: ['ET'],
        priority: 'high'
      }
    ]
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

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setShowTaskBoard(true);
  };

  // Generate calendar grid
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const cells = [];
  
  // Empty cells for alignment
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(<div key={`empty-${i}`} className="min-h-[160px]" />);
  }

  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = 
      day === todayDate && 
      currentMonth === todayMonth && 
      currentYear === todayYear;
    
    const isPast = 
      currentYear < todayYear ||
      (currentYear === todayYear && currentMonth < todayMonth) ||
      (currentYear === todayYear && currentMonth === todayMonth && day < todayDate);

    cells.push(
      <TahoeCalendarCellEnhanced
        key={day}
        day={day}
        content={sampleCalendarData[day] || []}
        darkMode={darkMode}
        isToday={isToday}
        isPast={isPast}
        onExpand={() => setShowCampaignPanel(true)}
      />
    );
  }

  return (
    <div 
      className={`min-h-screen p-8 transition-colors ${
        darkMode 
          ? 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
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
          <div>
            <h1 className={`flex items-center gap-3 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              <LayoutGrid className="w-8 h-8" />
              MacOS Tahoe Content Calendar
            </h1>
            <p className={darkMode ? 'text-white/60' : 'text-neutral-600'}>
              Complete interactive system with frosted glass design
            </p>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Calendar section - takes 3 columns */}
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
              {cells}
            </div>
          </div>

          {/* Sidebar - takes 1 column */}
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
      {showCampaignPanel && (
        <CampaignDetailPanel
          darkMode={darkMode}
          onClose={() => setShowCampaignPanel(false)}
        />
      )}

      {showTaskBoard && selectedMember && (
        <TaskBoard
          darkMode={darkMode}
          memberName={selectedMember.name}
          tasks={SAMPLE_TASKS}
          onClose={() => {
            setShowTaskBoard(false);
            setSelectedMember(null);
          }}
        />
      )}

      {showComponents && (
        <TahoeComponentsLibrary
          darkMode={darkMode}
          onClose={() => setShowComponents(false)}
        />
      )}
    </div>
  );
}