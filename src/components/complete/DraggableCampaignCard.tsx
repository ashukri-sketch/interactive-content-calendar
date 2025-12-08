import { Flag, GripVertical, Clock, Users } from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  platform: string;
  contentType: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string[];
  dueDate: string;
  isOverdue?: boolean;
}

interface DraggableCampaignCardProps {
  campaign: Campaign;
  darkMode: boolean;
  compact?: boolean;
  onClick?: () => void;
}

export function DraggableCampaignCard({
  campaign,
  darkMode,
  compact = false,
  onClick
}: DraggableCampaignCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('campaignId', campaign.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      instagram: 'bg-pink-500',
      facebook: 'bg-blue-600',
      linkedin: 'bg-blue-700',
      tiktok: 'bg-black dark:bg-white',
      twitter: 'bg-sky-500',
      youtube: 'bg-red-600',
      email: 'bg-calypso',
      website: 'bg-pistachio'
    };
    return colors[platform.toLowerCase()] || 'bg-gray-500';
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'idea': 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300',
      'drafting': 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300',
      'editing': 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300',
      'approved': 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300',
      'scheduled': 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300',
      'posted': 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
    };
    return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityClass = (priority: 'high' | 'medium' | 'low') => {
    const classes = {
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low'
    };
    return classes[priority];
  };

  if (compact) {
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        onClick={onClick}
        className={`
          group p-2 rounded-lg cursor-move
          bg-white dark:bg-white/5
          border border-white-950/10 dark:border-white/20
          hover:shadow-md transition-all
          ${campaign.isOverdue ? 'border-l-4 border-l-red-500' : ''}
        `}
      >
        <div className="flex items-center gap-2">
          <GripVertical className="w-3 h-3 text-white-950/30 dark:text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className={`w-2 h-2 rounded-full ${getPlatformColor(campaign.platform)}`} />
          <p className="text-xs text-white-950 dark:text-white truncate flex-1">
            {campaign.title}
          </p>
          {campaign.isOverdue && (
            <Clock className="w-3 h-3 text-red-500 flex-shrink-0" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      className={`
        group p-4 rounded-xl cursor-move
        bg-white dark:bg-white/10
        border border-white-950/10 dark:border-white/20
        hover:shadow-lg hover:border-calypso/50 transition-all
        ${campaign.isOverdue ? 'border-l-4 border-l-red-500' : ''}
      `}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <GripVertical className="w-5 h-5 text-white-950/30 dark:text-white/30 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
        
        <div className="flex-1">
          <h4 className="text-white-950 dark:text-white mb-1">
            {campaign.title}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Platform badge */}
            <span className={`px-2 py-0.5 rounded text-xs text-white ${getPlatformColor(campaign.platform)}`}>
              {campaign.platform}
            </span>
            
            {/* Status badge */}
            <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(campaign.status)}`}>
              {campaign.status}
            </span>
            
            {/* Priority badge */}
            <span className={`px-2 py-0.5 rounded text-xs ${getPriorityClass(campaign.priority)}`}>
              <Flag className="w-3 h-3 inline mr-1" />
              {campaign.priority}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        {/* Assigned team members */}
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3 text-white-950/60 dark:text-white/60" />
          <span className="text-white-950/60 dark:text-white/60">
            {campaign.assignedTo.join(', ')}
          </span>
        </div>

        {/* Overdue indicator */}
        {campaign.isOverdue && (
          <div className="flex items-center gap-1 text-red-500">
            <Clock className="w-3 h-3" />
            <span>Overdue</span>
          </div>
        )}
      </div>
    </div>
  );
}
