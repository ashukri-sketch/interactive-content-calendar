/**
 * TAHOE CALENDAR COMPONENTS - Month Header
 * Frosted glass header with navigation and filters
 */

import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { WorkflowStatus } from '../status-system/WorkflowStatusTag';
import { PlatformType } from '../status-system/PlatformTag';

interface TahoeMonthHeaderProps {
  month: number; // 0-11
  year: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  darkMode: boolean;
  filters?: {
    status?: WorkflowStatus | null;
    platform?: PlatformType | null;
    teamMember?: string | null;
  };
  onFilterChange?: (filters: any) => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function TahoeMonthHeader({
  month,
  year,
  onNavigate,
  darkMode,
  filters,
  onFilterChange
}: TahoeMonthHeaderProps) {
  return (
    <div className="px-6 py-4 rounded-2xl mb-6 bg-gradient-primary shadow-lg">
      <div className="flex items-center justify-between">
        {/* Left: Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('prev')}
            className="p-2 rounded-xl transition-all hover:bg-white/10 text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-semibold min-w-[240px] text-center text-white">
            {MONTH_NAMES[month]} {year}
          </h2>

          <button
            onClick={() => onNavigate('next')}
            className="p-2 rounded-xl transition-all hover:bg-white/10 text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Filters */}
        <div className="flex items-center gap-3">
          <FilterButton
            label="Status"
            active={!!filters?.status}
            darkMode={darkMode}
            onClick={() => {
              // Filter dropdown would open here
            }}
          />
          <FilterButton
            label="Platform"
            active={!!filters?.platform}
            darkMode={darkMode}
            onClick={() => {
              // Filter dropdown would open here
            }}
          />
          <FilterButton
            label="Team"
            active={!!filters?.teamMember}
            darkMode={darkMode}
            onClick={() => {
              // Filter dropdown would open here
            }}
          />

          {/* Clear filters if any active */}
          {(filters?.status || filters?.platform || filters?.teamMember) && (
            <button
              onClick={() => onFilterChange?.({})}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-red-500/20 text-white hover:bg-red-500/30"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  darkMode,
  onClick
}: {
  label: string;
  active: boolean;
  darkMode: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
        transition-all
        ${active
          ? 'bg-tulip text-white'
          : 'glass-panel text-white hover:bg-white/20'
        }
      `}
    >
      <Filter className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

export function TahoeDayLabels({ darkMode }: { darkMode: boolean }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-3 mb-3">
      {days.map(day => (
        <div
          key={day}
          className={`
            text-center text-sm font-medium py-2
            ${darkMode ? 'text-white/60' : 'text-neutral-600'}
          `}
        >
          {day}
        </div>
      ))}
    </div>
  );
}