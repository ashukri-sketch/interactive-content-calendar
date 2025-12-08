import { useState } from 'react';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid';
import { SidePanel } from './components/SidePanel';
import { TagSystemShowcase } from './components/TagSystemShowcase';
import { TahoeSystemShowcase } from './components/TahoeSystemShowcase';
import { TahoeVariantShowcase } from './components/tahoe/TahoeVariantShowcase';
import { TahoeSystemWithAuth } from './components/TahoeSystemWithAuth';
import { HamburgerMenuShowcase } from './components/tahoe/HamburgerMenuShowcase';
import { CompleteContentCalendar } from './components/CompleteContentCalendar';
import { RefinedSystemShowcase } from './components/RefinedSystemShowcase';
import { Moon, Sun, Calendar, Layout, Sparkles, Settings, LogIn, Menu, CheckSquare, Layers } from 'lucide-react';

export default function AppWithTagSystem() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(10); // November (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [view, setView] = useState<'calendar' | 'showcase' | 'tahoe' | 'variants' | 'auth' | 'hamburger' | 'complete' | 'refined'>('calendar');

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

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
      {/* Top Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {/* View Toggle */}
        <div className={`flex gap-1 p-1 rounded-lg ${
          darkMode ? 'bg-neutral-800' : 'bg-white'
        } shadow-lg`}>
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
              view === 'calendar'
                ? darkMode
                  ? 'bg-neutral-700 text-white'
                  : 'bg-neutral-100 text-neutral-900'
                : darkMode
                ? 'text-neutral-400 hover:text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Calendar</span>
          </button>
          <button
            onClick={() => setView('showcase')}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
              view === 'showcase'
                ? darkMode
                  ? 'bg-neutral-700 text-white'
                  : 'bg-neutral-100 text-neutral-900'
                : darkMode
                ? 'text-neutral-400 hover:text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span className="text-sm">Tag System</span>
          </button>
          <button
            onClick={() => setView('tahoe')}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
              view === 'tahoe'
                ? darkMode
                  ? 'bg-neutral-700 text-white'
                  : 'bg-neutral-100 text-neutral-900'
                : darkMode
                ? 'text-neutral-400 hover:text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Tahoe System</span>
          </button>
          <button
            onClick={() => setView('variants')}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
              view === 'variants'
                ? darkMode
                  ? 'bg-neutral-700 text-white'
                  : 'bg-neutral-100 text-neutral-900'
                : darkMode
                ? 'text-neutral-400 hover:text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Variants</span>
          </button>
          <button
            onClick={() => setView('auth')}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
              view === 'auth'
                ? darkMode
                  ? 'bg-neutral-700 text-white'
                  : 'bg-neutral-100 text-neutral-900'
                : darkMode
                ? 'text-neutral-400 hover:text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span className="text-sm">Auth</span>
          </button>
          <button
            onClick={() => setView('hamburger')}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
              view === 'hamburger'
                ? darkMode
                  ? 'bg-neutral-700 text-white'
                  : 'bg-neutral-100 text-neutral-900'
                : darkMode
                ? 'text-neutral-400 hover:text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Menu className="w-4 h-4" />
            <span className="text-sm">Hamburger Menu</span>
          </button>
          <button
            onClick={() => setView('complete')}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
              view === 'complete'
                ? darkMode
                  ? 'bg-neutral-700 text-white'
                  : 'bg-neutral-100 text-neutral-900'
                : darkMode
                ? 'text-neutral-400 hover:text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span className="text-sm">Complete Content</span>
          </button>
          <button
            onClick={() => setView('refined')}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
              view === 'refined'
                ? darkMode
                  ? 'bg-neutral-700 text-white'
                  : 'bg-neutral-100 text-neutral-900'
                : darkMode
                ? 'text-neutral-400 hover:text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-sm">Refined System</span>
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-lg transition-colors ${
            darkMode 
              ? 'bg-neutral-800 text-yellow-400 hover:bg-neutral-700' 
              : 'bg-white text-neutral-700 hover:bg-neutral-100'
          } shadow-lg`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Content */}
      {view === 'calendar' ? (
        <div className="flex h-screen">
          {/* Main Calendar Area */}
          <div className="flex-1 p-8 overflow-auto">
            <CalendarHeader
              currentMonth={currentMonth}
              currentYear={currentYear}
              onNavigate={navigateMonth}
              darkMode={darkMode}
            />
            <CalendarGrid
              currentMonth={currentMonth}
              currentYear={currentYear}
              darkMode={darkMode}
            />
          </div>

          {/* Side Panel */}
          <SidePanel darkMode={darkMode} />
        </div>
      ) : view === 'showcase' ? (
        <div className="pt-20">
          <TagSystemShowcase darkMode={darkMode} onBack={() => setView('calendar')} />
        </div>
      ) : view === 'tahoe' ? (
        <div className="pt-20">
          <TahoeSystemShowcase darkMode={darkMode} onBack={() => setView('calendar')} />
        </div>
      ) : view === 'variants' ? (
        <div className="pt-20">
          <TahoeVariantShowcase darkMode={darkMode} onBack={() => setView('calendar')} />
        </div>
      ) : view === 'auth' ? (
        <div className="pt-20">
          <TahoeSystemWithAuth darkMode={darkMode} onBack={() => setView('calendar')} />
        </div>
      ) : view === 'hamburger' ? (
        <div className="pt-20">
          <HamburgerMenuShowcase darkMode={darkMode} onBack={() => setView('calendar')} />
        </div>
      ) : view === 'complete' ? (
        <div className="pt-20">
          <CompleteContentCalendar darkMode={darkMode} onBack={() => setView('calendar')} />
        </div>
      ) : (
        <div className="pt-20">
          <RefinedSystemShowcase darkMode={darkMode} onBack={() => setView('calendar')} />
        </div>
      )}
    </div>
  );
}