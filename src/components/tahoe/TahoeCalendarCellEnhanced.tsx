import { useState } from 'react';
import { ChevronRight, Plus, Mail, Instagram, Facebook, Video as VideoIcon, Linkedin, Globe, Layers, Image, Zap, MessageSquare, FileText, Calendar, User, Flag, Lightbulb, PenTool, Edit3, AlertCircle, CheckCircle, Clock, CheckCheck, PauseCircle, XCircle } from 'lucide-react';

export interface TahoeCellData {
  campaignName: string;
  platform: 'email' | 'instagram' | 'tiktok' | 'facebook' | 'linkedin' | 'website' | 'multi';
  contentType: 'graphic' | 'video' | 'reel' | 'story' | 'carousel' | 'copy';
  status: 'idea' | 'drafting' | 'editing' | 'needs-approval' | 'approved' | 'scheduled' | 'posted' | 'delayed' | 'cancelled';
  team: string[];
  priority?: 'low' | 'medium' | 'high';
  assignedDate?: string;
  editor?: string;
  copywriter?: string;
  summary?: string;
}

export type PlatformVariant = 'default' | 'compact' | 'icon-only' | 'pill';
export type ContentTypeVariant = 'default' | 'compact' | 'icon-only';
export type StatusVariant = 'default' | 'compact' | 'pill' | 'dot';
export type TeamVariant = 'avatars' | 'names' | 'count' | 'detailed';
export type PriorityVariant = 'default' | 'compact' | 'flag-only' | 'hidden';

interface TahoeCalendarCellEnhancedProps {
  day: number;
  content: TahoeCellData[];
  darkMode: boolean;
  isToday?: boolean;
  isPast?: boolean;
  // Variant props for swappable components
  platformVariant?: PlatformVariant;
  contentTypeVariant?: ContentTypeVariant;
  statusVariant?: StatusVariant;
  teamVariant?: TeamVariant;
  priorityVariant?: PriorityVariant;
  showMetadata?: boolean;
  onExpand?: (day: number) => void;
}

export function TahoeCalendarCellEnhanced({
  day,
  content,
  darkMode,
  isToday = false,
  isPast = false,
  platformVariant = 'default',
  contentTypeVariant = 'default',
  statusVariant = 'default',
  teamVariant = 'avatars',
  priorityVariant = 'default',
  showMetadata = false,
  onExpand
}: TahoeCalendarCellEnhancedProps) {
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
            <TahoeCellContentEnhanced
              key={index}
              data={item}
              darkMode={darkMode}
              platformVariant={platformVariant}
              contentTypeVariant={contentTypeVariant}
              statusVariant={statusVariant}
              teamVariant={teamVariant}
              priorityVariant={priorityVariant}
              showMetadata={showMetadata}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TahoeCellContentEnhanced({ 
  data, 
  darkMode,
  platformVariant,
  contentTypeVariant,
  statusVariant,
  teamVariant,
  priorityVariant,
  showMetadata
}: { 
  data: TahoeCellData; 
  darkMode: boolean;
  platformVariant: PlatformVariant;
  contentTypeVariant: ContentTypeVariant;
  statusVariant: StatusVariant;
  teamVariant: TeamVariant;
  priorityVariant: PriorityVariant;
  showMetadata: boolean;
}) {
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
      <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
        <PlatformBadge platform={data.platform} darkMode={darkMode} variant={platformVariant} />
        <ContentTypeBadge type={data.contentType} darkMode={darkMode} variant={contentTypeVariant} />
      </div>

      {/* Status */}
      <div className="mb-1.5">
        <StatusChip status={data.status} darkMode={darkMode} variant={statusVariant} />
      </div>

      {/* Priority (if not hidden) */}
      {priorityVariant !== 'hidden' && data.priority && (
        <div className="mb-1.5">
          <PriorityTag priority={data.priority} darkMode={darkMode} variant={priorityVariant} />
        </div>
      )}

      {/* Team display */}
      {data.team.length > 0 && (
        <TeamDisplay team={data.team} darkMode={darkMode} variant={teamVariant} />
      )}

      {/* Metadata (expandable) */}
      {showMetadata && (
        <div className={`mt-2 pt-2 border-t space-y-1 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
          {data.assignedDate && (
            <div className={`flex items-center gap-1 text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
              <Calendar className="w-3 h-3" />
              {data.assignedDate}
            </div>
          )}
          {data.editor && (
            <div className={`flex items-center gap-1 text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
              <User className="w-3 h-3" />
              Editor: {data.editor}
            </div>
          )}
          {data.copywriter && (
            <div className={`flex items-center gap-1 text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
              <PenTool className="w-3 h-3" />
              Copy: {data.copywriter}
            </div>
          )}
          {data.summary && (
            <div className={`text-xs line-clamp-2 ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
              {data.summary}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Platform Badge with variants
function PlatformBadge({ platform, darkMode, variant }: { platform: string; darkMode: boolean; variant: PlatformVariant }) {
  const platformConfig = {
    email: { icon: Mail, label: 'Email', color: 'yellow' },
    instagram: { icon: Instagram, label: 'Instagram', color: 'pink' },
    tiktok: { icon: VideoIcon, label: 'TikTok', color: 'cyan' },
    facebook: { icon: Facebook, label: 'Facebook', color: 'blue' },
    linkedin: { icon: Linkedin, label: 'LinkedIn', color: 'indigo' },
    website: { icon: Globe, label: 'Website', color: 'purple' },
    multi: { icon: Layers, label: 'Multi', color: 'neutral' }
  };

  const config = platformConfig[platform as keyof typeof platformConfig];
  const Icon = config.icon;

  const colors = {
    yellow: darkMode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200',
    pink: darkMode ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' : 'bg-pink-100 text-pink-700 border-pink-200',
    cyan: darkMode ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border-cyan-200',
    blue: darkMode ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200',
    indigo: darkMode ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-indigo-100 text-indigo-700 border-indigo-200',
    purple: darkMode ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-200',
    neutral: darkMode ? 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30' : 'bg-neutral-100 text-neutral-700 border-neutral-200'
  };

  const colorClass = colors[config.color as keyof typeof colors];

  if (variant === 'icon-only') {
    return (
      <div className={`p-1 rounded border ${colorClass}`} title={config.label}>
        <Icon className="w-3 h-3" />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs border ${colorClass}`}>
        <Icon className="w-3 h-3" />
        <span>{config.label.slice(0, 2)}</span>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${colorClass}`}>
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs border ${colorClass}`}>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </div>
  );
}

// Content Type Badge with variants
function ContentTypeBadge({ type, darkMode, variant }: { type: string; darkMode: boolean; variant: ContentTypeVariant }) {
  const typeConfig = {
    graphic: { icon: Image, label: 'Graphic' },
    video: { icon: VideoIcon, label: 'Video' },
    reel: { icon: Zap, label: 'Reel' },
    story: { icon: MessageSquare, label: 'Story' },
    carousel: { icon: Layers, label: 'Carousel' },
    copy: { icon: FileText, label: 'Copy' }
  };

  const config = typeConfig[type as keyof typeof typeConfig];
  const Icon = config.icon;

  const colorClass = darkMode ? 'bg-white/10 text-white/70 border-white/20' : 'bg-black/10 text-neutral-700 border-black/20';

  if (variant === 'icon-only') {
    return (
      <div className={`p-1 rounded border ${colorClass}`} title={config.label}>
        <Icon className="w-3 h-3" />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs border ${colorClass}`}>
        <Icon className="w-3 h-3" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs border ${colorClass}`}>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </div>
  );
}

// Status Chip with variants
function StatusChip({ status, darkMode, variant }: { status: string; darkMode: boolean; variant: StatusVariant }) {
  const statusConfig = {
    'idea': { icon: Lightbulb, label: 'Idea', color: 'neutral' },
    'drafting': { icon: PenTool, label: 'Drafting', color: 'blue' },
    'editing': { icon: Edit3, label: 'Editing', color: 'yellow' },
    'needs-approval': { icon: AlertCircle, label: 'Needs Approval', color: 'orange' },
    'approved': { icon: CheckCircle, label: 'Approved', color: 'green' },
    'scheduled': { icon: Clock, label: 'Scheduled', color: 'purple' },
    'posted': { icon: CheckCheck, label: 'Posted', color: 'emerald' },
    'delayed': { icon: PauseCircle, label: 'Delayed', color: 'red' },
    'cancelled': { icon: XCircle, label: 'Cancelled', color: 'rose' }
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  const Icon = config.icon;

  const colors = {
    neutral: darkMode ? 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30' : 'bg-neutral-100 text-neutral-700 border-neutral-200',
    blue: darkMode ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200',
    yellow: darkMode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200',
    orange: darkMode ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-200',
    green: darkMode ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200',
    purple: darkMode ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-200',
    emerald: darkMode ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border-emerald-200',
    red: darkMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-200',
    rose: darkMode ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-rose-100 text-rose-700 border-rose-200'
  };

  const colorClass = colors[config.color as keyof typeof colors];

  if (variant === 'dot') {
    return (
      <div className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${colorClass}`} />
        <span className={`text-xs ${darkMode ? 'text-white/70' : 'text-neutral-700'}`}>
          {config.label}
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${colorClass}`}>
        <Icon className="w-3 h-3" />
        <span>{config.label.split(' ')[0]}</span>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${colorClass}`}>
        <Icon className="w-3.5 h-3.5" />
        <span>{config.label}</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${colorClass}`}>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </div>
  );
}

// Priority Tag with variants
function PriorityTag({ priority, darkMode, variant }: { priority: string; darkMode: boolean; variant: PriorityVariant }) {
  const colors = {
    low: darkMode ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200',
    medium: darkMode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200',
    high: darkMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-200'
  };

  const colorClass = colors[priority as keyof typeof colors];

  if (variant === 'flag-only') {
    return (
      <div className={`inline-flex p-1 rounded border ${colorClass}`} title={`${priority} priority`}>
        <Flag className="w-3 h-3" />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs border ${colorClass}`}>
        <Flag className="w-3 h-3" />
        <span>{priority[0].toUpperCase()}</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${colorClass}`}>
      <Flag className="w-3 h-3" />
      <span className="capitalize">{priority}</span>
    </div>
  );
}

// Team Display with variants
function TeamDisplay({ team, darkMode, variant }: { team: string[]; darkMode: boolean; variant: TeamVariant }) {
  if (variant === 'count') {
    return (
      <div className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs
        ${darkMode ? 'bg-white/10 text-white/70' : 'bg-black/10 text-neutral-700'}
      `}>
        <User className="w-3 h-3" />
        <span>{team.length}</span>
      </div>
    );
  }

  if (variant === 'names') {
    return (
      <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
        {team.join(', ')}
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className="space-y-1">
        {team.map((member, i) => (
          <div key={i} className={`flex items-center gap-1 text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
            <div className={`
              w-4 h-4 rounded-full flex items-center justify-center text-xs
              ${darkMode
                ? 'bg-gradient-to-br from-blue-400 to-purple-500'
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
              }
              text-white
            `}>
              {member[0]}
            </div>
            <span>{member}</span>
          </div>
        ))}
      </div>
    );
  }

  // Default: avatars
  return (
    <div className="flex items-center gap-1 mt-2">
      {team.slice(0, 3).map((member, i) => (
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
          title={member}
        >
          {member[0]}
        </div>
      ))}
      {team.length > 3 && (
        <div className={`
          w-5 h-5 rounded-full flex items-center justify-center text-xs
          ${darkMode ? 'bg-white/20 text-white/70' : 'bg-black/20 text-neutral-700'}
        `}>
          +{team.length - 3}
        </div>
      )}
    </div>
  );
}
