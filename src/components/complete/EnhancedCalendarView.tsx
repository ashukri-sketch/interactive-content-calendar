import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, List, Grid3x3 } from 'lucide-react';
import { DraggableCampaignCard } from './DraggableCampaignCard';

interface Campaign {
  id: string;
  title: string;
  platform: string;
  contentType: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string[];
  dueDate: string;
  isOverdue?: boolean;
}

interface EnhancedCalendarViewProps {
  darkMode: boolean;
  campaigns: Campaign[];
  onCampaignMove?: (campaignId: string, newDate: string) => void;
  onCampaignClick?: (campaign: Campaign) => void;
}

export function EnhancedCalendarView({
  darkMode,
  campaigns,
  onCampaignMove,
  onCampaignClick
}: EnhancedCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(10); // November
  const [currentYear, setCurrentYear] = useState(2025);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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

  const getCampaignsForDate = (day: number): Campaign[] => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return campaigns.filter(c => c.dueDate === dateStr);
  };

  return (
    <div>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Month/Year Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="
              p-2 rounded-lg
              bg-white dark:bg-white/10
              border border-white-950/10 dark:border-white/20
              hover:bg-alto-50 dark:hover:bg-white/20
              transition-all
            "
          >
            <ChevronLeft className="w-5 h-5 text-white-950 dark:text-white" />
          </button>

          <h2 className="text-2xl text-white-950 dark:text-white min-w-[240px] text-center">
            {monthNames[currentMonth]} {currentYear}
          </h2>

          <button
            onClick={() => navigateMonth('next')}
            className="
              p-2 rounded-lg
              bg-white dark:bg-white/10
              border border-white-950/10 dark:border-white/20
              hover:bg-alto-50 dark:hover:bg-white/20
              transition-all
            "
          >
            <ChevronRight className="w-5 h-5 text-white-950 dark:text-white" />
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="
          flex items-center gap-2 p-1 rounded-xl
          bg-white dark:bg-white/10
          border border-white-950/10 dark:border-white/20
        ">
          <ViewModeButton
            icon={Calendar}
            label="Month"
            active={viewMode === 'month'}
            onClick={() => setViewMode('month')}
            darkMode={darkMode}
          />
          <ViewModeButton
            icon={List}
            label="Week"
            active={viewMode === 'week'}
            onClick={() => setViewMode('week')}
            darkMode={darkMode}
          />
          <ViewModeButton
            icon={Grid3x3}
            label="Day"
            active={viewMode === 'day'}
            onClick={() => setViewMode('day')}
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-3 mb-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center text-sm text-white-950/60 dark:text-white/60 font-medium py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[140px]" />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();
          const dayCampaigns = getCampaignsForDate(day);
          const hasOverdue = dayCampaigns.some(c => c.isOverdue);

          return (
            <CalendarDay
              key={day}
              day={day}
              isToday={isToday}
              hasOverdue={hasOverdue}
              campaigns={dayCampaigns}
              darkMode={darkMode}
              onCampaignClick={onCampaignClick}
              onDrop={(campaignId) => {
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                onCampaignMove?.(campaignId, dateStr);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function ViewModeButton({
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
        flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
        transition-all
        ${active
          ? 'bg-calypso text-white'
          : darkMode
          ? 'text-white/70 hover:bg-white/10'
          : 'text-white-950/70 hover:bg-alto-50'
        }
      `}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

function CalendarDay({
  day,
  isToday,
  hasOverdue,
  campaigns,
  darkMode,
  onCampaignClick,
  onDrop
}: {
  day: number;
  isToday: boolean;
  hasOverdue: boolean;
  campaigns: Campaign[];
  darkMode: boolean;
  onCampaignClick?: (campaign: Campaign) => void;
  onDrop?: (campaignId: string) => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const campaignId = e.dataTransfer.getData('campaignId');
    if (campaignId) {
      onDrop?.(campaignId);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        min-h-[140px] p-3 rounded-xl
        bg-white dark:bg-white/10
        border transition-all
        ${isDragOver
          ? 'border-calypso-600 border-2 bg-calypso/5'
          : 'border-white-950/10 dark:border-white/20'
        }
        ${isToday ? 'ring-2 ring-calypso' : ''}
      `}
    >
      {/* Day number */}
      <div className="flex items-center justify-between mb-2">
        <span className={`
          text-sm font-medium
          ${isToday
            ? 'text-calypso'
            : darkMode
            ? 'text-white'
            : 'text-white-950'
          }
        `}>
          {day}
        </span>
        {hasOverdue && (
          <span className="w-2 h-2 bg-red-500 rounded-full" />
        )}
      </div>

      {/* Campaigns */}
      <div className="space-y-1.5">
        {campaigns.slice(0, 3).map(campaign => (
          <DraggableCampaignCard
            key={campaign.id}
            campaign={campaign}
            darkMode={darkMode}
            compact
            onClick={() => onCampaignClick?.(campaign)}
          />
        ))}
        {campaigns.length > 3 && (
          <div className="text-xs text-white-950/60 dark:text-white/60 text-center py-1">
            +{campaigns.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
}
