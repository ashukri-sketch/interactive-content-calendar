import { 
  Lightbulb, 
  PenTool, 
  Edit3, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  CheckCheck,
  PauseCircle,
  XCircle 
} from 'lucide-react';

export type WorkflowStatus = 
  | 'idea' 
  | 'drafting' 
  | 'editing' 
  | 'needs-approval' 
  | 'approved' 
  | 'scheduled' 
  | 'posted' 
  | 'delayed'
  | 'cancelled';

interface WorkflowStatusTagProps {
  status: WorkflowStatus;
  darkMode: boolean;
  variant?: 'default' | 'compact' | 'pill' | 'dot';
  showIcon?: boolean;
  onSelect?: (status: WorkflowStatus) => void;
}

const workflowConfig: Record<WorkflowStatus, {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  lightColor: string;
  darkColor: string;
  dotColor: string;
}> = {
  'idea': {
    label: 'Idea',
    icon: Lightbulb,
    lightColor: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    darkColor: 'bg-neutral-700 text-neutral-300 border-neutral-600',
    dotColor: 'bg-neutral-500'
  },
  'drafting': {
    label: 'Drafting',
    icon: PenTool,
    lightColor: 'bg-blue-100 text-blue-700 border-blue-200',
    darkColor: 'bg-blue-900/40 text-blue-400 border-blue-800',
    dotColor: 'bg-blue-500'
  },
  'editing': {
    label: 'Editing',
    icon: Edit3,
    lightColor: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    darkColor: 'bg-yellow-900/40 text-yellow-400 border-yellow-800',
    dotColor: 'bg-yellow-500'
  },
  'needs-approval': {
    label: 'Needs Approval',
    icon: AlertCircle,
    lightColor: 'bg-orange-100 text-orange-700 border-orange-200',
    darkColor: 'bg-orange-900/40 text-orange-400 border-orange-800',
    dotColor: 'bg-orange-500'
  },
  'approved': {
    label: 'Approved',
    icon: CheckCircle,
    lightColor: 'bg-green-100 text-green-700 border-green-200',
    darkColor: 'bg-green-900/40 text-green-400 border-green-800',
    dotColor: 'bg-green-500'
  },
  'scheduled': {
    label: 'Scheduled',
    icon: Clock,
    lightColor: 'bg-purple-100 text-purple-700 border-purple-200',
    darkColor: 'bg-purple-900/40 text-purple-400 border-purple-800',
    dotColor: 'bg-purple-500'
  },
  'posted': {
    label: 'Posted',
    icon: CheckCheck,
    lightColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    darkColor: 'bg-emerald-900/40 text-emerald-400 border-emerald-800',
    dotColor: 'bg-emerald-500'
  },
  'delayed': {
    label: 'Delayed',
    icon: PauseCircle,
    lightColor: 'bg-red-100 text-red-700 border-red-200',
    darkColor: 'bg-red-900/40 text-red-400 border-red-800',
    dotColor: 'bg-red-500'
  },
  'cancelled': {
    label: 'Cancelled',
    icon: XCircle,
    lightColor: 'bg-rose-100 text-rose-700 border-rose-200',
    darkColor: 'bg-rose-900/40 text-rose-400 border-rose-800',
    dotColor: 'bg-rose-500'
  }
};

export function WorkflowStatusTag({ 
  status, 
  darkMode, 
  variant = 'default',
  showIcon = true,
  onSelect 
}: WorkflowStatusTagProps) {
  const config = workflowConfig[status];
  const Icon = config.icon;
  const colorClass = darkMode ? config.darkColor : config.lightColor;

  if (variant === 'dot') {
    return (
      <div 
        onClick={() => onSelect?.(status)}
        className={`inline-flex items-center gap-2 ${onSelect ? 'cursor-pointer' : ''}`}
      >
        <span className={`w-2 h-2 rounded-full ${config.dotColor}`}></span>
        <span className={`text-xs ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
          {config.label}
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        onClick={() => onSelect?.(status)}
        className={`inline-flex items-center gap-1 px-2 py-1 rounded ${colorClass} border ${
          onSelect ? 'cursor-pointer hover:shadow-md' : ''
        } transition-all`}
      >
        {showIcon && <Icon className="w-3 h-3" />}
        <span className="text-xs">{config.label}</span>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <div 
        onClick={() => onSelect?.(status)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${colorClass} border ${
          onSelect ? 'cursor-pointer hover:shadow-md' : ''
        } transition-all`}
      >
        {showIcon && <Icon className="w-3.5 h-3.5" />}
        <span className="text-xs">{config.label}</span>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onSelect?.(status)}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${colorClass} border ${
        onSelect ? 'cursor-pointer hover:shadow-md' : ''
      } transition-all`}
    >
      {showIcon && <Icon className="w-4 h-4" />}
      <span className="text-xs">{config.label}</span>
    </div>
  );
}

// Workflow Status Selector
export function WorkflowStatusSelector({ 
  selected, 
  darkMode, 
  onSelect 
}: { 
  selected: WorkflowStatus; 
  darkMode: boolean; 
  onSelect: (status: WorkflowStatus) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const statuses: WorkflowStatus[] = [
    'idea',
    'drafting',
    'editing',
    'needs-approval',
    'approved',
    'scheduled',
    'posted',
    'delayed',
    'cancelled'
  ];

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        <WorkflowStatusTag status={selected} darkMode={darkMode} onSelect={() => setIsOpen(!isOpen)} />
      </div>
      
      {isOpen && (
        <div 
          className={`absolute z-10 mt-2 p-2 rounded-lg shadow-lg ${
            darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
          } border space-y-1 min-w-[180px]`}
        >
          {statuses.map(status => (
            <div 
              key={status}
              onClick={() => {
                onSelect(status);
                setIsOpen(false);
              }}
              className="w-full"
            >
              <WorkflowStatusTag status={status} darkMode={darkMode} />
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
