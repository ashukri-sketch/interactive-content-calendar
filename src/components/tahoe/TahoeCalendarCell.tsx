import { useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';

export interface TahoeCellData {
  campaignName: string;
  platform: 'email' | 'instagram' | 'tiktok' | 'facebook' | 'linkedin' | 'website' | 'multi';
  contentType: 'graphic' | 'video' | 'reel' | 'story' | 'carousel' | 'copy';
  status: 'idea' | 'drafting' | 'editing' | 'needs-approval' | 'approved' | 'scheduled' | 'posted' | 'delayed' | 'cancelled';
  team: string[];
  priority?: 'low' | 'medium' | 'high';
}

interface TahoeCalendarCellProps {
  day: number;
  content: TahoeCellData[];
  darkMode: boolean;
  variant?: 'compact' | 'expanded';
  isToday?: boolean;
  isPast?: boolean;
  onExpand?: (day: number) => void;
}

export function TahoeCalendarCell({
  day,
  content,
  darkMode,
  variant = 'compact',
  isToday = false,
  isPast = false,
  onExpand
}: TahoeCalendarCellProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCellStyles = () => {
    const base = `
      relative min-h-[160px] rounded-2xl p-3 transition-all duration-300
      backdrop-blur-xl border
    `;
    
    if (darkMode) {
      return `${base} ${
        isToday
          ? 'bg-blue-500/20 border-blue-400/50 shadow-lg shadow-blue-500/20'
          : isPast
          ? 'bg-white/5 border-white/10 opacity-60'
          : 'bg-white/10 border-white/20 hover:bg-white/15'
      }`;
    } else {
      return `${base} ${
        isToday
          ? 'bg-blue-100/60 border-blue-400/40 shadow-lg shadow-blue-200/50'
          : isPast
          ? 'bg-black/5 border-black/10 opacity-70'
          : 'bg-white/60 border-white/80 hover:bg-white/80'
      }`;
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={getCellStyles()}
    >
      {/* Gradient overlay for depth */}
      <div className={`absolute inset-0 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-white/5 to-transparent'
          : 'bg-gradient-to-br from-white/40 to-transparent'
      }`} style={{ pointerEvents: 'none' }} />

      <div className="relative z-10">
        {/* Day number */}
        <div className="flex items-center justify-between mb-3">
          <span className={`
            inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm
            ${isToday
              ? darkMode
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                : 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
              : darkMode
              ? 'text-white/80'
              : 'text-neutral-700'
            }
          `}>
            {day}
          </span>

          {isHovered && (
            <button
              onClick={() => onExpand?.(day)}
              className={`
                p-1.5 rounded-lg transition-all
                ${darkMode
                  ? 'bg-white/10 hover:bg-white/20 text-white/80'
                  : 'bg-black/5 hover:bg-black/10 text-neutral-700'
                }
              `}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Content items */}
        <div className="space-y-2">
          {content.map((item, index) => (
            <TahoeCellContent key={index} data={item} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TahoeCellContent({ data, darkMode }: { data: TahoeCellData; darkMode: boolean }) {
  return (
    <div className={`
      p-2 rounded-xl transition-all cursor-pointer group
      backdrop-blur-md border
      ${darkMode
        ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
        : 'bg-white/50 border-white/60 hover:bg-white/70 hover:border-white/90'
      }
    `}>
      {/* Campaign name */}
      <div className={`text-xs mb-1.5 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        {data.campaignName}
      </div>

      {/* Platform & Type badges */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <TahoePlatformBadge platform={data.platform} darkMode={darkMode} />
        <TahoeContentTypeBadge type={data.contentType} darkMode={darkMode} />
      </div>

      {/* Status */}
      <TahoeStatusChip status={data.status} darkMode={darkMode} />

      {/* Team avatars */}
      {data.team.length > 0 && (
        <div className="flex items-center gap-1 mt-2">
          {data.team.slice(0, 3).map((member, i) => (
            <div
              key={i}
              className={`
                w-5 h-5 rounded-full flex items-center justify-center text-xs
                ${darkMode
                  ? 'bg-gradient-to-br from-blue-400 to-purple-500'
                  : 'bg-gradient-to-br from-blue-500 to-purple-600'
                }
                text-white shadow-sm
              `}
            >
              {member[0]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TahoePlatformBadge({ platform, darkMode }: { platform: string; darkMode: boolean }) {
  const colors = {
    email: darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700',
    instagram: darkMode ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-700',
    tiktok: darkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700',
    facebook: darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
    linkedin: darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-700',
    website: darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
    multi: darkMode ? 'bg-neutral-500/20 text-neutral-400' : 'bg-neutral-100 text-neutral-700'
  };

  return (
    <span className={`px-1.5 py-0.5 rounded text-xs ${colors[platform as keyof typeof colors]}`}>
      {platform}
    </span>
  );
}

function TahoeContentTypeBadge({ type, darkMode }: { type: string; darkMode: boolean }) {
  return (
    <span className={`
      px-1.5 py-0.5 rounded text-xs
      ${darkMode ? 'bg-white/10 text-white/70' : 'bg-black/10 text-neutral-700'}
    `}>
      {type}
    </span>
  );
}

function TahoeStatusChip({ status, darkMode }: { status: string; darkMode: boolean }) {
  const statusColors = {
    'idea': darkMode ? 'bg-neutral-500/20 text-neutral-400' : 'bg-neutral-100 text-neutral-700',
    'drafting': darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
    'editing': darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700',
    'needs-approval': darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-700',
    'approved': darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700',
    'scheduled': darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
    'posted': darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
    'delayed': darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700',
    'cancelled': darkMode ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-700'
  };

  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${statusColors[status as keyof typeof statusColors]}`}>
      {status}
    </span>
  );
}
