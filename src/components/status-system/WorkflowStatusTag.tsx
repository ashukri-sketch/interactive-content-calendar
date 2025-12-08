/**
 * STATUS SYSTEM - Workflow Status Tag Component
 * Color-coded status indicators for content workflow
 */

import { 
  Lightbulb, 
  PenTool, 
  Edit3, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  CheckCheck,
  XCircle,
  Pause
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
  compact?: boolean;
}

const WORKFLOW_CONFIG = {
  'idea': {
    label: 'Idea',
    icon: Lightbulb,
    color: 'bg-gray-500',
    lightBg: 'bg-gray-100',
    lightText: 'text-gray-700',
    lightBorder: 'border-gray-300'
  },
  'drafting': {
    label: 'Drafting',
    icon: PenTool,
    color: 'bg-calypso',
    lightBg: 'bg-calypso/10',
    lightText: 'text-calypso',
    lightBorder: 'border-calypso/30'
  },
  'editing': {
    label: 'Editing',
    icon: Edit3,
    color: 'bg-tulip',
    lightBg: 'bg-tulip/10',
    lightText: 'text-tulip',
    lightBorder: 'border-tulip/30'
  },
  'needs-approval': {
    label: 'Needs Approval',
    icon: AlertCircle,
    color: 'bg-orange-500',
    lightBg: 'bg-orange-100',
    lightText: 'text-orange-700',
    lightBorder: 'border-orange-300'
  },
  'approved': {
    label: 'Approved',
    icon: CheckCircle,
    color: 'bg-pistachio',
    lightBg: 'bg-pistachio/10',
    lightText: 'text-pistachio',
    lightBorder: 'border-pistachio/30'
  },
  'scheduled': {
    label: 'Scheduled',
    icon: Clock,
    color: 'bg-purple-500',
    lightBg: 'bg-purple-100',
    lightText: 'text-purple-700',
    lightBorder: 'border-purple-300'
  },
  'posted': {
    label: 'Posted',
    icon: CheckCheck,
    color: 'bg-pistachio',
    lightBg: 'bg-pistachio/10',
    lightText: 'text-pistachio-600',
    lightBorder: 'border-pistachio/30'
  },
  'delayed': {
    label: 'Delayed',
    icon: Pause,
    color: 'bg-red-500',
    lightBg: 'bg-red-100',
    lightText: 'text-red-700',
    lightBorder: 'border-red-300'
  },
  'cancelled': {
    label: 'Cancelled',
    icon: XCircle,
    color: 'bg-red-600',
    lightBg: 'bg-red-100',
    lightText: 'text-red-700',
    lightBorder: 'border-red-300'
  }
};

export function WorkflowStatusTag({ status, darkMode, compact = false }: WorkflowStatusTagProps) {
  const config = WORKFLOW_CONFIG[status];
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