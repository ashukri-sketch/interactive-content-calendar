import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentMonth: number;
  currentYear: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  darkMode: boolean;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function CalendarHeader({ currentMonth, currentYear, onNavigate, darkMode }: CalendarHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            {monthNames[currentMonth]} {currentYear}
          </h1>
          <p className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Content Calendar
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('prev')}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            } shadow`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('next')}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            } shadow`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Week Day Headers */}
      <div className="grid grid-cols-7 gap-3 mb-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className={`text-center py-2 ${
              darkMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
