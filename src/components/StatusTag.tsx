import { Circle, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export type StatusType = 'draft' | 'scheduled' | 'posted' | 'delayed';
export type StatusVariant = 'default' | 'compact' | 'pill' | 'dot';

interface StatusTagProps {
  status: StatusType;
  darkMode: boolean;
  variant?: StatusVariant;
  showIcon?: boolean;
}

const statusConfig: Record<StatusType, {
  light: string;
  dark: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  dotColor: string;
}> = {
  draft: {
    light: 'bg-neutral-200 text-neutral-700 border-neutral-300',
    dark: 'bg-neutral-700 text-neutral-300 border-neutral-600',
    label: 'Draft',
    icon: Circle,
    dotColor: 'bg-neutral-500'
  },
  scheduled: {
    light: 'bg-blue-100 text-blue-700 border-blue-200',
    dark: 'bg-blue-900/40 text-blue-400 border-blue-800',
    label: 'Scheduled',
    icon: Clock,
    dotColor: 'bg-blue-500'
  },
  posted: {
    light: 'bg-green-100 text-green-700 border-green-200',
    dark: 'bg-green-900/40 text-green-400 border-green-800',
    label: 'Posted',
    icon: CheckCircle,
    dotColor: 'bg-green-500'
  },
  delayed: {
    light: 'bg-orange-100 text-orange-700 border-orange-200',
    dark: 'bg-orange-900/40 text-orange-400 border-orange-800',
    label: 'Delayed',
    icon: AlertCircle,
    dotColor: 'bg-orange-500'
  }
};

export function StatusTag({ status, darkMode, variant = 'default', showIcon = false }: StatusTagProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  if (variant === 'dot') {
    return <StatusTagDot status={status} config={config} />;
  }

  if (variant === 'compact') {
    return <StatusTagCompact status={status} config={config} darkMode={darkMode} />;
  }

  if (variant === 'pill') {
    return <StatusTagPill status={status} config={config} darkMode={darkMode} showIcon={showIcon} Icon={Icon} />;
  }

  return <StatusTagDefault status={status} config={config} darkMode={darkMode} showIcon={showIcon} Icon={Icon} />;
}

// Default variant
function StatusTagDefault({ 
  config, 
  darkMode, 
  showIcon, 
  Icon 
}: { 
  config: typeof statusConfig[StatusType];
  darkMode: boolean;
  showIcon: boolean;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const colorClass = darkMode ? config.dark : config.light;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${colorClass}`}>
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </span>
  );
}

// Compact variant - smaller padding
function StatusTagCompact({ 
  config, 
  darkMode 
}: { 
  config: typeof statusConfig[StatusType];
  darkMode: boolean;
}) {
  const colorClass = darkMode ? config.dark : config.light;
  
  return (
    <span className={`inline-block px-1.5 py-0.5 rounded text-xs ${colorClass}`}>
      {config.label}
    </span>
  );
}

// Pill variant - fully rounded with border
function StatusTagPill({ 
  config, 
  darkMode, 
  showIcon, 
  Icon 
}: { 
  config: typeof statusConfig[StatusType];
  darkMode: boolean;
  showIcon: boolean;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const colorClass = darkMode ? config.dark : config.light;
  
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs border ${colorClass}`}>
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </span>
  );
}

// Dot variant - just a colored dot with label
function StatusTagDot({ 
  config 
}: { 
  config: typeof statusConfig[StatusType];
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${config.dotColor}`}></span>
      <span className="text-xs">{config.label}</span>
    </span>
  );
}

// Status Tag Variants Showcase Component (for reference/documentation)
export function StatusTagShowcase({ darkMode }: { darkMode: boolean }) {
  const statuses: StatusType[] = ['draft', 'scheduled', 'posted', 'delayed'];
  
  return (
    <div className="space-y-4">
      <div>
        <h4 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>Default</h4>
        <div className="flex flex-wrap gap-2">
          {statuses.map(status => (
            <StatusTag key={status} status={status} darkMode={darkMode} variant="default" />
          ))}
        </div>
      </div>

      <div>
        <h4 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>With Icons</h4>
        <div className="flex flex-wrap gap-2">
          {statuses.map(status => (
            <StatusTag key={status} status={status} darkMode={darkMode} variant="default" showIcon />
          ))}
        </div>
      </div>

      <div>
        <h4 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>Compact</h4>
        <div className="flex flex-wrap gap-2">
          {statuses.map(status => (
            <StatusTag key={status} status={status} darkMode={darkMode} variant="compact" />
          ))}
        </div>
      </div>

      <div>
        <h4 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>Pill</h4>
        <div className="flex flex-wrap gap-2">
          {statuses.map(status => (
            <StatusTag key={status} status={status} darkMode={darkMode} variant="pill" showIcon />
          ))}
        </div>
      </div>

      <div>
        <h4 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>Dot</h4>
        <div className="flex flex-wrap gap-2">
          {statuses.map(status => (
            <StatusTag key={status} status={status} darkMode={darkMode} variant="dot" />
          ))}
        </div>
      </div>
    </div>
  );
}
