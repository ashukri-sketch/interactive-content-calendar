import { useState } from 'react';
import { CampaignNameTag } from './CampaignNameTag';
import { PlatformTag, PlatformType } from './PlatformTag';
import { ContentTypeTag, ContentType } from './ContentTypeTag';
import { ContentSummaryTag } from './ContentSummaryTag';
import { AssignmentTag } from './AssignmentTag';
import { WorkflowStatusTag, WorkflowStatus } from './WorkflowStatusTag';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  darkMode: boolean;
  variant?: 'compact' | 'default' | 'expanded';
  editable?: boolean;
  onChange?: (data: StatusBlockData) => void;
}

export function StatusBlock({ 
  data, 
  darkMode, 
  variant = 'default',
  editable = true,
  onChange 
}: StatusBlockProps) {
  const [isExpanded, setIsExpanded] = useState(variant === 'expanded');
  const [localData, setLocalData] = useState(data);

  const handleChange = (updates: Partial<StatusBlockData>) => {
    const newData = { ...localData, ...updates };
    setLocalData(newData);
    if (onChange) onChange(newData);
  };

  if (variant === 'compact') {
    return (
      <div 
        className={`p-3 rounded-xl ${
          darkMode
            ? 'bg-neutral-800 border-neutral-700'
            : 'bg-white border-neutral-200'
        } border hover:shadow-lg transition-all space-y-2`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between gap-2">
          <CampaignNameTag 
            value={localData.campaignName} 
            darkMode={darkMode}
            editable={editable}
            onChange={(campaignName) => handleChange({ campaignName })}
          />
          <WorkflowStatusTag 
            status={localData.workflowStatus} 
            darkMode={darkMode}
            variant="compact"
          />
        </div>

        {/* Platform and Content Type */}
        <div className="flex items-center gap-2">
          <PlatformTag 
            platform={localData.platform} 
            darkMode={darkMode}
            variant="compact"
          />
          <ContentTypeTag 
            contentType={localData.contentType} 
            darkMode={darkMode}
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`p-3 rounded-xl ${
        darkMode
          ? 'bg-neutral-800 border-neutral-700'
          : 'bg-white border-neutral-200'
      } border hover:shadow-lg transition-all space-y-3`}
    >
      {/* Campaign Name */}
      <div className="flex items-center justify-between">
        <CampaignNameTag 
          value={localData.campaignName} 
          darkMode={darkMode}
          editable={editable}
          onChange={(campaignName) => handleChange({ campaignName })}
        />
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-1 rounded hover:bg-opacity-50 ${
            darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
          }`}
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Platform and Content Type */}
      <div className="flex items-center gap-2 flex-wrap">
        <PlatformTag 
          platform={localData.platform} 
          darkMode={darkMode}
        />
        <ContentTypeTag 
          contentType={localData.contentType} 
          darkMode={darkMode}
        />
      </div>

      {/* Content Summary - Always visible but can expand */}
      {(isExpanded || variant === 'expanded') && (
        <>
          <ContentSummaryTag
            value={localData.contentSummary}
            darkMode={darkMode}
            editable={editable}
            expanded={isExpanded}
            onChange={(contentSummary) => handleChange({ contentSummary })}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
          />

          {/* Assignment Panel */}
          <AssignmentTag
            assignedDate={localData.assignedDate}
            editor={localData.editor}
            copywriter={localData.copywriter}
            darkMode={darkMode}
            editable={editable}
            onChange={({ assignedDate, editor, copywriter }) => 
              handleChange({ assignedDate, editor, copywriter })
            }
          />
        </>
      )}

      {/* Workflow Status */}
      <div>
        <WorkflowStatusTag 
          status={localData.workflowStatus} 
          darkMode={darkMode}
          variant="pill"
        />
      </div>
    </div>
  );
}

// Status Block Grid - for showcasing multiple blocks
export function StatusBlockGrid({ 
  blocks, 
  darkMode 
}: { 
  blocks: StatusBlockData[]; 
  darkMode: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blocks.map((block, index) => (
        <StatusBlock
          key={index}
          data={block}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
}
