/**
 * STATUS SYSTEM - Composite Status Block Component
 * Combines all subcomponents into a responsive, auto-layout block
 * Variants: Compact (calendar cell) and Expanded (detail view)
 */

import { CampaignNameTag } from './CampaignNameTag';
import { PlatformTag, PlatformType } from './PlatformTag';
import { ContentTypeTag, ContentType } from './ContentTypeTag';
import { ContentSummaryTag } from './ContentSummaryTag';
import { AssignmentPanel } from './AssignmentPanel';
import { WorkflowStatusTag, WorkflowStatus } from './WorkflowStatusTag';

export interface StatusBlockData {
  campaignName: string;
  platform: PlatformType;
  contentType: ContentType;
  contentSummary: string;
  assignedDate: string;
  editor: string;
  copywriter: string;
  workflowStatus: WorkflowStatus;
}

interface StatusBlockProps {
  data: StatusBlockData;
  onChange?: (data: Partial<StatusBlockData>) => void;
  darkMode: boolean;
  variant?: 'compact' | 'expanded';
  editable?: boolean;
}

export function StatusBlock({
  data,
  onChange,
  darkMode,
  variant = 'compact',
  editable = false
}: StatusBlockProps) {
  const isCompact = variant === 'compact';

  const updateField = (field: keyof StatusBlockData, value: string) => {
    onChange?.({ [field]: value });
  };

  if (isCompact) {
    return (
      <div className={`
        p-3 rounded-xl space-y-2
        ${darkMode
          ? 'bg-white/5 backdrop-blur-xl border border-white/20'
          : 'bg-white border border-neutral-200'
        }
        shadow-sm
      `}>
        {/* Campaign Name */}
        <CampaignNameTag
          value={data.campaignName}
          onChange={(v) => updateField('campaignName', v)}
          darkMode={darkMode}
          editable={editable}
        />

        {/* Tags Row */}
        <div className="flex items-center gap-2 flex-wrap">
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

        {/* Summary - Truncated */}
        <p className={`
          text-xs line-clamp-2
          ${darkMode ? 'text-white/70' : 'text-neutral-600'}
        `}>
          {data.contentSummary}
        </p>

        {/* Assignment - Minimal */}
        <div className={`
          flex items-center gap-2 text-xs
          ${darkMode ? 'text-white/60' : 'text-neutral-500'}
        `}>
          <span>{data.editor}</span>
          <span>•</span>
          <span>{data.copywriter}</span>
        </div>
      </div>
    );
  }

  // Expanded variant - Full detail view
  return (
    <div className={`
      p-6 rounded-2xl space-y-4
      ${darkMode
        ? 'bg-white/10 backdrop-blur-3xl border border-white/20'
        : 'bg-white border border-neutral-200'
      }
      shadow-lg
    `}>
      {/* 1. Campaign Name */}
      <CampaignNameTag
        value={data.campaignName}
        onChange={(v) => updateField('campaignName', v)}
        darkMode={darkMode}
        editable={editable}
      />

      {/* 2. Platform Tag */}
      <div>
        <label className={`
          text-xs font-medium mb-2 block
          ${darkMode ? 'text-white/60' : 'text-neutral-600'}
        `}>
          Platform
        </label>
        <PlatformTag
          platform={data.platform}
          darkMode={darkMode}
        />
      </div>

      {/* 3. Content Type Tag */}
      <div>
        <label className={`
          text-xs font-medium mb-2 block
          ${darkMode ? 'text-white/60' : 'text-neutral-600'}
        `}>
          Content Type
        </label>
        <ContentTypeTag
          contentType={data.contentType}
          darkMode={darkMode}
        />
      </div>

      {/* 4. Content Summary */}
      <ContentSummaryTag
        value={data.contentSummary}
        onChange={(v) => updateField('contentSummary', v)}
        darkMode={darkMode}
        variant="expanded"
        editable={editable}
      />

      {/* 5. Assignment Panel */}
      <AssignmentPanel
        assignedDate={data.assignedDate}
        editor={data.editor}
        copywriter={data.copywriter}
        onDateChange={(v) => updateField('assignedDate', v)}
        onEditorChange={(v) => updateField('editor', v)}
        onCopywriterChange={(v) => updateField('copywriter', v)}
        darkMode={darkMode}
        variant="stacked"
        editable={editable}
      />

      {/* 6. Workflow Status Tag */}
      <div>
        <label className={`
          text-xs font-medium mb-2 block
          ${darkMode ? 'text-white/60' : 'text-neutral-600'}
        `}>
          Workflow Status
        </label>
        <WorkflowStatusTag
          status={data.workflowStatus}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}
