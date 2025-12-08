import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HamburgerMenuProps {
  darkMode: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export function HamburgerMenu({ darkMode, isOpen, onToggle }: HamburgerMenuProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative w-12 h-12 rounded-2xl transition-all duration-300
        backdrop-blur-xl border shadow-lg
        ${darkMode
          ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
          : 'bg-white/60 border-white/80 hover:bg-white/90 text-neutral-700'
        }
        ${isOpen ? 'rotate-90' : 'rotate-0'}
      `}
    >
      {/* Gradient overlay */}
      <div className={`
        absolute inset-0 rounded-2xl pointer-events-none
        ${darkMode
          ? 'bg-gradient-to-br from-white/10 to-transparent'
          : 'bg-gradient-to-br from-white/60 to-transparent'
        }
      `} />

      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-300" />
        ) : (
          <Menu className="w-6 h-6 transition-transform duration-300" />
        )}
      </div>

      {/* Hover glow effect */}
      {isHovered && !isOpen && (
        <div className={`
          absolute inset-0 rounded-2xl
          ${darkMode
            ? 'bg-blue-500/20 shadow-lg shadow-blue-500/20'
            : 'bg-blue-400/20 shadow-lg shadow-blue-400/20'
          }
          animate-pulse
        `} />
      )}
    </button>
  );
}
