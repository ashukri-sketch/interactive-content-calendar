/**
 * STATUS SYSTEM - Content Type Tag Component
 * Type of content being created
 */

import { Image, Video, LayoutGrid, Smartphone, Clock, FileText } from 'lucide-react';

export type ContentType = 
  | 'still-graphic'
  | 'video'
  | 'carousel'
  | 'reel-short'
  | 'story'
  | 'copy-only';

interface ContentTypeTagProps {
  contentType: ContentType;
  darkMode: boolean;
  compact?: boolean;
}

const CONTENT_TYPE_CONFIG = {
  'still-graphic': {
    label: 'Still Graphic',
    icon: Image,
    color: 'bg-blue-500',
    lightBg: 'bg-blue-100',
    lightText: 'text-blue-700',
    lightBorder: 'border-blue-200'
  },
  'video': {
    label: 'Video',
    icon: Video,
    color: 'bg-purple-500',
    lightBg: 'bg-purple-100',
    lightText: 'text-purple-700',
    lightBorder: 'border-purple-200'
  },
  'carousel': {
    label: 'Carousel',
    icon: LayoutGrid,
    color: 'bg-green-500',
    lightBg: 'bg-green-100',
    lightText: 'text-green-700',
    lightBorder: 'border-green-200'
  },
  'reel-short': {
    label: 'Reel/Short',
    icon: Smartphone,
    color: 'bg-pink-500',
    lightBg: 'bg-pink-100',
    lightText: 'text-pink-700',
    lightBorder: 'border-pink-200'
  },
  'story': {
    label: 'Story',
    icon: Clock,
    color: 'bg-orange-500',
    lightBg: 'bg-orange-100',
    lightText: 'text-orange-700',
    lightBorder: 'border-orange-200'
  },
  'copy-only': {
    label: 'Copy-only',
    icon: FileText,
    color: 'bg-gray-500',
    lightBg: 'bg-gray-100',
    lightText: 'text-gray-700',
    lightBorder: 'border-gray-200'
  }
};

export function ContentTypeTag({ contentType, darkMode, compact = false }: ContentTypeTagProps) {
  const config = CONTENT_TYPE_CONFIG[contentType];
  const Icon = config.icon;

  if (compact) {
    return (
      <div className={`
        inline-flex items-center justify-center
        w-6 h-6 rounded-lg ${config.color}
        shadow-sm
      `}>
        <Icon className="w-3.5 h-3.5 text-white" />
      </div>
    );
  }

  return (
    <div className={`
      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
      ${darkMode
        ? `${config.color} text-white`
        : `${config.lightBg} ${config.lightText} border ${config.lightBorder}`
      }
    `}>
      <Icon className="w-3.5 h-3.5" />
      <span className="text-xs font-medium">{config.label}</span>
    </div>
  );
}
