import { useState } from 'react';
import { CampaignNameTag } from './tags/CampaignNameTag';
import { PlatformTag, PlatformType } from './tags/PlatformTag';
import { ContentTypeTag, ContentType } from './tags/ContentTypeTag';
import { ContentSummaryTag } from './tags/ContentSummaryTag';
import { AssignmentTag } from './tags/AssignmentTag';
import { WorkflowStatusTag, WorkflowStatus } from './tags/WorkflowStatusTag';
import { StatusBlock, StatusBlockData } from './tags/StatusBlock';
import { TagSystemDocs } from './TagSystemDocs';
import { ArrowLeft, BookOpen, Palette } from 'lucide-react';

interface TagSystemShowcaseProps {
  darkMode: boolean;
  onBack?: () => void;
}

export function TagSystemShowcase({ darkMode, onBack }: TagSystemShowcaseProps) {
  const [activeView, setActiveView] = useState<'components' | 'docs'>('components');
  
  const platforms: PlatformType[] = [
    'mailchimp', 'instagram', 'facebook', 'tiktok', 'linkedin', 'website', 'multi-platform'
  ];

  const contentTypes: ContentType[] = [
    'still-graphic', 'video', 'carousel', 'reel', 'story', 'copy-only'
  ];

  const workflowStatuses: WorkflowStatus[] = [
    'idea', 'drafting', 'editing', 'needs-approval', 'approved', 'scheduled', 'posted', 'delayed', 'cancelled'
  ];

  const sampleBlocks: StatusBlockData[] = [
    {
      campaignName: 'Q4 Product Launch',
      platform: 'instagram',
      contentType: 'reel',
      contentSummary: 'Launch announcement video showcasing new features with customer testimonials',
      assignedDate: '2025-11-20',
      editor: 'Alex Kim',
      copywriter: 'Emma Thompson',
      workflowStatus: 'drafting'
    },
    {
      campaignName: 'Holiday Campaign 2025',
      platform: 'mailchimp',
      contentType: 'copy-only',
      contentSummary: 'End of year newsletter with year in review stats and holiday promotion',
      assignedDate: '2025-11-22',
      editor: 'James Chen',
      copywriter: 'Sarah Mitchell',
      workflowStatus: 'needs-approval'
    },
    {
      campaignName: 'Weekly Social Series',
      platform: 'linkedin',
      contentType: 'still-graphic',
      contentSummary: 'Industry insights infographic - data visualization of market trends',
      assignedDate: '2025-11-18',
      editor: 'Alex Kim',
      copywriter: 'Mike Rodriguez',
      workflowStatus: 'scheduled'
    },
    {
      campaignName: 'TikTok Trends',
      platform: 'tiktok',
      contentType: 'video',
      contentSummary: 'Behind the scenes content showing team culture and workplace environment',
      assignedDate: '2025-11-25',
      editor: 'Sarah Mitchell',
      copywriter: 'Emma Thompson',
      workflowStatus: 'idea'
    },
    {
      campaignName: 'Multi-Channel Push',
      platform: 'multi-platform',
      contentType: 'carousel',
      contentSummary: 'Product feature highlights - 5 slide carousel explaining key benefits',
      assignedDate: '2025-11-21',
      editor: 'James Chen',
      copywriter: 'Mike Rodriguez',
      workflowStatus: 'approved'
    },
    {
      campaignName: 'Website Blog Series',
      platform: 'website',
      contentType: 'still-graphic',
      contentSummary: 'Header image for best practices guide article',
      assignedDate: '2025-11-19',
      editor: 'Alex Kim',
      copywriter: 'Sarah Mitchell',
      workflowStatus: 'posted'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-neutral-900' : 'bg-neutral-50'} p-8`}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-white hover:bg-neutral-100'
              } transition-colors`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className={darkMode ? 'text-white' : 'text-neutral-900'}>
              Modular Tag System
            </h1>
            <p className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Complete component library with variants for content calendar
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveView('components')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeView === 'components'
                ? darkMode
                  ? 'bg-neutral-700 text-white'
                  : 'bg-neutral-200 text-neutral-900'
                : darkMode
                ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                : 'bg-white text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span className="text-sm">Components</span>
          </button>
          <button
            onClick={() => setActiveView('docs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeView === 'docs'
                ? darkMode
                  ? 'bg-neutral-700 text-white'
                  : 'bg-neutral-200 text-neutral-900'
                : darkMode
                ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                : 'bg-white text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-sm">Documentation</span>
          </button>
        </div>

        {/* Components View */}
        {activeView === 'components' && (
          <>
            {/* Campaign Name Tag */}
            <ShowcaseSection title="Campaign Name Tag" darkMode={darkMode}>
              <div className="flex flex-wrap gap-3">
                <CampaignNameTag value="Q4 Product Launch" darkMode={darkMode} />
                <CampaignNameTag value="Holiday Campaign 2025" darkMode={darkMode} />
                <CampaignNameTag value="Weekly Social Series" darkMode={darkMode} />
              </div>
            </ShowcaseSection>

            {/* Platform Tags */}
            <ShowcaseSection title="Platform Tags" darkMode={darkMode}>
              <div className="space-y-4">
                <div>
                  <h4 className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Default Variant
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {platforms.map(platform => (
                      <PlatformTag key={platform} platform={platform} darkMode={darkMode} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Compact Variant
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map(platform => (
                      <PlatformTag key={platform} platform={platform} darkMode={darkMode} variant="compact" />
                    ))}
                  </div>
                </div>
              </div>
            </ShowcaseSection>

            {/* Content Type Tags */}
            <ShowcaseSection title="Content Type Tags" darkMode={darkMode}>
              <div className="space-y-4">
                <div>
                  <h4 className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Default Variant
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {contentTypes.map(type => (
                      <ContentTypeTag key={type} contentType={type} darkMode={darkMode} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Icon Only Variant
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {contentTypes.map(type => (
                      <ContentTypeTag key={type} contentType={type} darkMode={darkMode} variant="icon-only" />
                    ))}
                  </div>
                </div>
              </div>
            </ShowcaseSection>

            {/* Content Summary Tag */}
            <ShowcaseSection title="Content Summary Tag" darkMode={darkMode}>
              <div className="max-w-md">
                <ContentSummaryTag
                  value="Launch announcement video showcasing new features with customer testimonials and product demonstrations"
                  darkMode={darkMode}
                />
              </div>
            </ShowcaseSection>

            {/* Assignment Tag */}
            <ShowcaseSection title="Assignment & Ownership Tag" darkMode={darkMode}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <AssignmentTag
                  assignedDate="2025-11-20"
                  editor="Alex Kim"
                  copywriter="Emma Thompson"
                  darkMode={darkMode}
                />
                <AssignmentTag
                  assignedDate="2025-11-22"
                  editor="James Chen"
                  copywriter="Sarah Mitchell"
                  darkMode={darkMode}
                  variant="compact"
                />
              </div>
            </ShowcaseSection>

            {/* Workflow Status Tags */}
            <ShowcaseSection title="Workflow Status Tags" darkMode={darkMode}>
              <div className="space-y-4">
                <div>
                  <h4 className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Default Variant
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {workflowStatuses.map(status => (
                      <WorkflowStatusTag key={status} status={status} darkMode={darkMode} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Pill Variant
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {workflowStatuses.map(status => (
                      <WorkflowStatusTag key={status} status={status} darkMode={darkMode} variant="pill" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Compact Variant
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {workflowStatuses.map(status => (
                      <WorkflowStatusTag key={status} status={status} darkMode={darkMode} variant="compact" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Dot Variant
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {workflowStatuses.map(status => (
                      <WorkflowStatusTag key={status} status={status} darkMode={darkMode} variant="dot" />
                    ))}
                  </div>
                </div>
              </div>
            </ShowcaseSection>

            {/* Complete Status Blocks */}
            <ShowcaseSection title="Complete Status Blocks" darkMode={darkMode}>
              <div className="space-y-4">
                <div>
                  <h4 className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Compact Variant
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sampleBlocks.slice(0, 3).map((block, index) => (
                      <StatusBlock key={index} data={block} darkMode={darkMode} variant="compact" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Default Variant
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sampleBlocks.slice(0, 2).map((block, index) => (
                      <StatusBlock key={index} data={block} darkMode={darkMode} variant="default" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`text-sm mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Expanded Variant
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {sampleBlocks.slice(0, 2).map((block, index) => (
                      <StatusBlock key={index} data={block} darkMode={darkMode} variant="expanded" />
                    ))}
                  </div>
                </div>
              </div>
            </ShowcaseSection>

            {/* All Sample Blocks */}
            <ShowcaseSection title="Sample Content Blocks" darkMode={darkMode}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleBlocks.map((block, index) => (
                  <StatusBlock key={index} data={block} darkMode={darkMode} />
                ))}
              </div>
            </ShowcaseSection>
          </>
        )}

        {/* Documentation View */}
        {activeView === 'docs' && (
          <TagSystemDocs darkMode={darkMode} />
        )}
      </div>
    </div>
  );
}

function ShowcaseSection({ 
  title, 
  children, 
  darkMode 
}: { 
  title: string; 
  children: React.ReactNode; 
  darkMode: boolean;
}) {
  return (
    <div>
      <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </h2>
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-neutral-800' : 'bg-white'
      } border ${darkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
        {children}
      </div>
    </div>
  );
}