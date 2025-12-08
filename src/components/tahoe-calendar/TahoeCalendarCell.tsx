/**
 * TAHOE CALENDAR COMPONENTS - Calendar Cell
 * Contains campaign tags with light/dark variants
 * Variants: Compact (tags only) and Detailed (includes status block preview)
 */

import { PlatformTag, PlatformType } from '../status-system/PlatformTag';
import { ContentTypeTag, ContentType } from '../status-system/ContentTypeTag';
import { WorkflowStatusTag, WorkflowStatus } from '../status-system/WorkflowStatusTag';

interface TahoeCalendarCellData {
  campaignName: string;
  platform: PlatformType;
  contentType: ContentType;
  workflowStatus: WorkflowStatus;
  assignedTo: string[]; // Team member initials
}

interface TahoeCalendarCellProps {
  data: TahoeCalendarCellData;
  darkMode: boolean;
  variant?: 'compact' | 'detailed';
  onClick?: () => void;
}

export function TahoeCalendarCell({
  data,
  darkMode,
  variant = 'compact',
  onClick
}: TahoeCalendarCellProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      onClick={onClick}
      className={`
        p-2.5 rounded-xl cursor-pointer
        transition-all duration-200
        ${darkMode
          ? 'bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:border-white/30'
          : 'bg-white border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300'
        }
        shadow-sm hover:shadow-md
      `}
    >
      {/* Campaign Name */}
      <h4 className={`
        text-xs font-medium mb-2 truncate
        ${darkMode ? 'text-white' : 'text-neutral-900'}
      `}>
        {data.campaignName}
      </h4>

      {/* Tags */}
      <div className="flex items-center gap-1.5 mb-2">
        <PlatformTag
          platform={data.platform}
          darkMode={darkMode}
          compact
        />
        <ContentTypeTag
          contentType={data.contentType}
          darkMode={darkMode}
          compact
        />
        <WorkflowStatusTag
          status={data.workflowStatus}
          darkMode={darkMode}
          compact
        />
      </div>

      {/* Assigned Team Members */}
      {!isCompact && data.assignedTo.length > 0 && (
        <div className="flex items-center gap-1">
          {data.assignedTo.map((initials, i) => (
            <div
              key={i}
              className={`
                w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium
                bg-gradient-to-br from-calypso to-calypso-600 text-white
                ${i > 0 ? '-ml-1' : ''}
                border-2 ${darkMode ? 'border-white/20' : 'border-white'}
              `}
            >
              {initials}
            </div>
          ))}
        </div>
      )}

      {/* Compact view - just count */}
      {isCompact && data.assignedTo.length > 0 && (
        <div className={`
          text-[10px] font-medium
          ${darkMode ? 'text-white/60' : 'text-neutral-500'}
        `}>
          {data.assignedTo.length} assigned
        </div>
      )}
    </div>
  );
}
