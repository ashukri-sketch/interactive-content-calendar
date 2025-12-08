import { Mail, Instagram, Facebook, Video, Linkedin, Globe, Layers } from 'lucide-react';

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
  variant?: 'default' | 'compact';
  onSelect?: (platform: PlatformType) => void;
}

const platformConfig: Record<PlatformType, {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  lightColor: string;
  darkColor: string;
  accentLight: string;
  accentDark: string;
}> = {
  mailchimp: {
    label: 'Email',
    icon: Mail,
    lightColor: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    darkColor: 'bg-yellow-900/20 text-yellow-400 border-yellow-800',
    accentLight: 'bg-yellow-500',
    accentDark: 'bg-yellow-400'
  },
  instagram: {
    label: 'Instagram',
    icon: Instagram,
    lightColor: 'bg-pink-50 text-pink-700 border-pink-200',
    darkColor: 'bg-pink-900/20 text-pink-400 border-pink-800',
    accentLight: 'bg-pink-500',
    accentDark: 'bg-pink-400'
  },
  facebook: {
    label: 'Facebook',
    icon: Facebook,
    lightColor: 'bg-blue-50 text-blue-700 border-blue-200',
    darkColor: 'bg-blue-900/20 text-blue-400 border-blue-800',
    accentLight: 'bg-blue-600',
    accentDark: 'bg-blue-400'
  },
  tiktok: {
    label: 'TikTok',
    icon: Video,
    lightColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    darkColor: 'bg-cyan-900/20 text-cyan-400 border-cyan-800',
    accentLight: 'bg-cyan-500',
    accentDark: 'bg-cyan-400'
  },
  linkedin: {
    label: 'LinkedIn',
    icon: Linkedin,
    lightColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    darkColor: 'bg-indigo-900/20 text-indigo-400 border-indigo-800',
    accentLight: 'bg-indigo-600',
    accentDark: 'bg-indigo-400'
  },
  website: {
    label: 'Website',
    icon: Globe,
    lightColor: 'bg-purple-50 text-purple-700 border-purple-200',
    darkColor: 'bg-purple-900/20 text-purple-400 border-purple-800',
    accentLight: 'bg-purple-500',
    accentDark: 'bg-purple-400'
  },
  'multi-platform': {
    label: 'Multi-Platform',
    icon: Layers,
    lightColor: 'bg-neutral-50 text-neutral-700 border-neutral-200',
    darkColor: 'bg-neutral-700 text-neutral-300 border-neutral-600',
    accentLight: 'bg-neutral-500',
    accentDark: 'bg-neutral-400'
  }
};

export function PlatformTag({ platform, darkMode, variant = 'default', onSelect }: PlatformTagProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;
  const colorClass = darkMode ? config.darkColor : config.lightColor;
  const accentClass = darkMode ? config.accentDark : config.accentLight;

  if (variant === 'compact') {
    return (
      <div 
        onClick={() => onSelect?.(platform)}
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${colorClass} border ${
          onSelect ? 'cursor-pointer hover:shadow-md' : ''
        } transition-all`}
      >
        <Icon className="w-3 h-3" />
        <span className="text-xs">{config.label}</span>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onSelect?.(platform)}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${colorClass} border ${
        onSelect ? 'cursor-pointer hover:shadow-md' : ''
      } transition-all`}
    >
      <div className={`w-5 h-5 rounded ${accentClass} flex items-center justify-center`}>
        <Icon className="w-3 h-3 text-white" />
      </div>
      <span className="text-xs">{config.label}</span>
    </div>
  );
}

// Platform selector component
export function PlatformSelector({ 
  selected, 
  darkMode, 
  onSelect 
}: { 
  selected: PlatformType; 
  darkMode: boolean; 
  onSelect: (platform: PlatformType) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const platforms: PlatformType[] = [
    'mailchimp',
    'instagram', 
    'facebook',
    'tiktok',
    'linkedin',
    'website',
    'multi-platform'
  ];

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        <PlatformTag platform={selected} darkMode={darkMode} onSelect={() => setIsOpen(!isOpen)} />
      </div>
      
      {isOpen && (
        <div 
          className={`absolute z-10 mt-2 p-2 rounded-lg shadow-lg ${
            darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
          } border space-y-1`}
        >
          {platforms.map(platform => (
            <div 
              key={platform}
              onClick={() => {
                onSelect(platform);
                setIsOpen(false);
              }}
            >
              <PlatformTag platform={platform} darkMode={darkMode} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function useState<T>(initialValue: T): [T, (value: T) => void] {
  return [initialValue, () => {}] as [T, (value: T) => void];
}
