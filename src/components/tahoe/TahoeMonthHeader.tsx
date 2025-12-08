import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface TahoeMonthHeaderProps {
  month: number;
  year: number;
  darkMode: boolean;
  onNavigate: (direction: 'prev' | 'next') => void;
  onFilterClick?: () => void;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function TahoeMonthHeader({
  month,
  year,
  darkMode,
  onNavigate,
  onFilterClick
}: TahoeMonthHeaderProps) {
  return (
    <div className={`
      relative mb-8 rounded-2xl p-4 backdrop-blur-2xl border
      ${darkMode
        ? 'bg-white/10 border-white/20 shadow-2xl shadow-black/20'
        : 'bg-white/60 border-white/80 shadow-2xl shadow-black/10'
      }
    `}>
      {/* Gradient overlay */}
      <div className={`
        absolute inset-0 rounded-2xl
        ${darkMode
          ? 'bg-gradient-to-br from-white/10 to-transparent'
          : 'bg-gradient-to-br from-white/60 to-transparent'
        }
      `} style={{ pointerEvents: 'none' }} />

      <div className="relative z-10 flex items-center justify-between">
        {/* Left: Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('prev')}
            className={`
              p-2 rounded-xl transition-all
              ${darkMode
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-white/60 hover:bg-white/90 text-neutral-700'
              }
              shadow-lg
            `}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('next')}
            className={`
              p-2 rounded-xl transition-all
              ${darkMode
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-white/60 hover:bg-white/90 text-neutral-700'
              }
              shadow-lg
            `}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Month & Year */}
        <div className="text-center">
          <h2 className={`${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            {MONTHS[month]} {year}
          </h2>
        </div>

        {/* Right: Filters */}
        <button
          onClick={onFilterClick}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl transition-all
            ${darkMode
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-white/60 hover:bg-white/90 text-neutral-700'
            }
            shadow-lg
          `}
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filters</span>
        </button>
      </div>
    </div>
  );
}

// Day labels component
export function TahoeDayLabels({ darkMode }: { darkMode: boolean }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-3 mb-4">
      {days.map(day => (
        <div
          key={day}
          className={`
            text-center text-sm py-2 rounded-lg
            ${darkMode ? 'text-white/60' : 'text-neutral-600'}
          `}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
