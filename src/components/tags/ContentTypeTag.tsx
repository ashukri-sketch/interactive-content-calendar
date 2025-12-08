import { Image, Video, Layers, Zap, MessageSquare, FileText } from 'lucide-react';

export type ContentType = 
  | 'still-graphic' 
  | 'video' 
  | 'carousel' 
  | 'reel' 
  | 'story' 
  | 'copy-only';

interface ContentTypeTagProps {
  contentType: ContentType;
  darkMode: boolean;
  variant?: 'default' | 'icon-only';
  onSelect?: (type: ContentType) => void;
}

const contentTypeConfig: Record<ContentType, {
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  lightColor: string;
  darkColor: string;
}> = {
  'still-graphic': {
    label: 'Still Graphic',
    shortLabel: 'Graphic',
    icon: Image,
    lightColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    darkColor: 'bg-emerald-900/30 text-emerald-400 border-emerald-800'
  },
  'video': {
    label: 'Video',
    shortLabel: 'Video',
    icon: Video,
    lightColor: 'bg-rose-100 text-rose-700 border-rose-200',
    darkColor: 'bg-rose-900/30 text-rose-400 border-rose-800'
  },
  'carousel': {
    label: 'Carousel',
    shortLabel: 'Carousel',
    icon: Layers,
    lightColor: 'bg-violet-100 text-violet-700 border-violet-200',
    darkColor: 'bg-violet-900/30 text-violet-400 border-violet-800'
  },
  'reel': {
    label: 'Reel/Short',
    shortLabel: 'Reel',
    icon: Zap,
    lightColor: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
    darkColor: 'bg-fuchsia-900/30 text-fuchsia-400 border-fuchsia-800'
  },
  'story': {
    label: 'Story',
    shortLabel: 'Story',
    icon: MessageSquare,
    lightColor: 'bg-amber-100 text-amber-700 border-amber-200',
    darkColor: 'bg-amber-900/30 text-amber-400 border-amber-800'
  },
  'copy-only': {
    label: 'Copy-only',
    shortLabel: 'Text',
    icon: FileText,
    lightColor: 'bg-slate-100 text-slate-700 border-slate-200',
    darkColor: 'bg-slate-700/30 text-slate-400 border-slate-600'
  }
};

export function ContentTypeTag({ 
  contentType, 
  darkMode, 
  variant = 'default',
  onSelect 
}: ContentTypeTagProps) {
  const config = contentTypeConfig[contentType];
  const Icon = config.icon;
  const colorClass = darkMode ? config.darkColor : config.lightColor;

  if (variant === 'icon-only') {
    return (
      <div 
        onClick={() => onSelect?.(contentType)}
        className={`inline-flex items-center justify-center w-6 h-6 rounded ${colorClass} border ${
          onSelect ? 'cursor-pointer hover:shadow-md' : ''
        } transition-all`}
        title={config.label}
      >
        <Icon className="w-3 h-3" />
      </div>
    );
  }

  return (
    <div 
      onClick={() => onSelect?.(contentType)}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${colorClass} border ${
        onSelect ? 'cursor-pointer hover:shadow-md' : ''
      } transition-all`}
    >
      <Icon className="w-3 h-3" />
      <span className="text-xs">{config.shortLabel}</span>
    </div>
  );
}
