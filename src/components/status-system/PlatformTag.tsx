/**
 * STATUS SYSTEM - Platform Tag Component
 * Where content is posted with distinct icons and colors
 */

import { Mail, Instagram, Facebook, Video, Linkedin, Globe, Grid3x3 } from 'lucide-react';

export type PlatformType = 
  | 'mailchimp'
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'linkedin'
  | 'website'
  | 'multi-platform';

interface PlatformTagProps {
  platform: PlatformType;
  darkMode: boolean;
  compact?: boolean;
}

const PLATFORM_CONFIG = {
  mailchimp: {
    label: 'Mailchimp Email',
    icon: Mail,
    color: 'bg-tulip',
    lightBg: 'bg-tulip/10',
    lightText: 'text-tulip',
    lightBorder: 'border-tulip/30'
  },
  instagram: {
    label: 'Instagram',
    icon: Instagram,
    color: 'bg-pink-500',
    lightBg: 'bg-pink-100',
    lightText: 'text-pink-700',
    lightBorder: 'border-pink-200'
  },
  facebook: {
    label: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    lightBg: 'bg-blue-100',
    lightText: 'text-blue-700',
    lightBorder: 'border-blue-200'
  },
  tiktok: {
    label: 'TikTok',
    icon: Video,
    color: 'bg-black dark:bg-white',
    lightBg: 'bg-neutral-100',
    lightText: 'text-neutral-900',
    lightBorder: 'border-neutral-200'
  },
  linkedin: {
    label: 'LinkedIn',
    icon: Linkedin,
    color: 'bg-calypso',
    lightBg: 'bg-calypso/10',
    lightText: 'text-calypso',
    lightBorder: 'border-calypso/30'
  },
  website: {
    label: 'Website',
    icon: Globe,
    color: 'bg-pistachio',
    lightBg: 'bg-pistachio/10',
    lightText: 'text-pistachio',
    lightBorder: 'border-pistachio/30'
  },
  'multi-platform': {
    label: 'Multi-platform',
    icon: Grid3x3,
    color: 'bg-gradient-primary',
    lightBg: 'bg-calypso/10',
    lightText: 'text-calypso',
    lightBorder: 'border-calypso/30'
  }
};

export function PlatformTag({ platform, darkMode, compact = false }: PlatformTagProps) {
  const config = PLATFORM_CONFIG[platform];
  const Icon = config.icon;

  if (compact) {
    return (
      <div className={`
        inline-flex items-center justify-center
        w-6 h-6 rounded-full ${config.color}
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