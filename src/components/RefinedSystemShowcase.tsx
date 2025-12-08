/**
 * REFINED SYSTEM SHOWCASE
 * Organized display of all components matching the specification
 * Sections: Status System, Tahoe Calendar, Team & Tasks, Auth & Settings
 */

import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

// Status System imports
import {
  CampaignNameTag,
  PlatformTag,
  ContentTypeTag,
  ContentSummaryTag,
  AssignmentPanel,
  WorkflowStatusTag,
  StatusBlock,
  type StatusBlockData
} from './status-system';

// Tahoe Calendar imports
import {
  TahoeCalendarCell,
  TahoeMonthHeader,
  TahoeDayLabels,
  CampaignDetailPanel
} from './tahoe-calendar';

// Team & Tasks imports
import {
  TeamMembersPanel,
  SAMPLE_TEAM_MEMBERS,
  TaskBoard,
  SAMPLE_TASKS
} from './team-tasks';

// Auth & Settings imports
import {
  LoginScreen,
  UserDashboardHeader,
  SettingsPanel,
  type UserSettings
} from './auth-settings';

interface RefinedSystemShowcaseProps {
  darkMode: boolean;
  onBack?: () => void;
}

export function RefinedSystemShowcase({ darkMode, onBack }: RefinedSystemShowcaseProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('status-system');
  const [showLoginDemo, setShowLoginDemo] = useState(false);
  const [showSettingsDemo, setShowSettingsDemo] = useState(false);
  const [showCampaignDetail, setShowCampaignDetail] = useState(false);

  // Sample data
  const sampleStatusData: StatusBlockData = {
    campaignName: 'Product Launch Campaign',
    platform: 'instagram',
    contentType: 'reel-short',
    contentSummary: 'Exciting product reveal with behind-the-scenes footage and customer testimonials. Focus on key features and benefits.',
    assignedDate: '2025-11-15',
    editor: 'Alex Kim',
    copywriter: 'Emily Torres',
    workflowStatus: 'drafting'
  };

  const sampleSettings: UserSettings = {
    backgroundImage: undefined,
    backgroundBlur: 50,
    accentColor: '#006781',
    themeMode: 'dark',
    applyToMyCalendarOnly: false,
    calendarView: 'expanded',
    showMetadata: true,
    defaultPlatformFilter: undefined,
    displayName: 'Jordan Smith',
    profilePhoto: undefined,
    role: 'Content Manager'
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className={`
      min-h-screen p-8
      ${darkMode
        ? 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900'
        : 'bg-alto-50'
      }
    `}>
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {onBack && (
            <button
              onClick={onBack}
              className={`
                p-3 rounded-2xl transition-all backdrop-blur-xl border shadow-lg
                ${darkMode
                  ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                  : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                }
              `}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className={darkMode ? 'text-white' : 'text-neutral-900'}>
              Refined System — MacOS Tahoe Style
            </h1>
            <p className={darkMode ? 'text-white/60' : 'text-neutral-600'}>
              Modular components matching the design specification
            </p>
          </div>
        </div>

        {/* SECTION 1: STATUS SYSTEM */}
        <ShowcaseSection
          title="1. Status System"
          description="Modular tagging components with composite Status Block"
          expanded={expandedSection === 'status-system'}
          onToggle={() => toggleSection('status-system')}
          darkMode={darkMode}
        >
          <div className="space-y-6">
            {/* Individual Components */}
            <ComponentDemo
              title="Campaign Name Tag"
              darkMode={darkMode}
            >
              <CampaignNameTag
                value="Product Launch Campaign"
                darkMode={darkMode}
                editable={false}
              />
            </ComponentDemo>

            <ComponentDemo
              title="Platform Tags"
              darkMode={darkMode}
            >
              <div className="flex flex-wrap gap-2">
                <PlatformTag platform="instagram" darkMode={darkMode} />
                <PlatformTag platform="facebook" darkMode={darkMode} />
                <PlatformTag platform="linkedin" darkMode={darkMode} />
                <PlatformTag platform="tiktok" darkMode={darkMode} />
                <PlatformTag platform="website" darkMode={darkMode} />
                <PlatformTag platform="multi-platform" darkMode={darkMode} />
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="Content Type Tags"
              darkMode={darkMode}
            >
              <div className="flex flex-wrap gap-2">
                <ContentTypeTag contentType="still-graphic" darkMode={darkMode} />
                <ContentTypeTag contentType="video" darkMode={darkMode} />
                <ContentTypeTag contentType="carousel" darkMode={darkMode} />
                <ContentTypeTag contentType="reel-short" darkMode={darkMode} />
                <ContentTypeTag contentType="story" darkMode={darkMode} />
                <ContentTypeTag contentType="copy-only" darkMode={darkMode} />
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="Workflow Status Tags"
              darkMode={darkMode}
            >
              <div className="flex flex-wrap gap-2">
                <WorkflowStatusTag status="idea" darkMode={darkMode} />
                <WorkflowStatusTag status="drafting" darkMode={darkMode} />
                <WorkflowStatusTag status="editing" darkMode={darkMode} />
                <WorkflowStatusTag status="needs-approval" darkMode={darkMode} />
                <WorkflowStatusTag status="approved" darkMode={darkMode} />
                <WorkflowStatusTag status="scheduled" darkMode={darkMode} />
                <WorkflowStatusTag status="posted" darkMode={darkMode} />
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="Content Summary Tag"
              darkMode={darkMode}
            >
              <div className="max-w-md">
                <ContentSummaryTag
                  value="Exciting product reveal with behind-the-scenes footage and customer testimonials."
                  darkMode={darkMode}
                  variant="compact"
                />
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="Assignment Panel"
              darkMode={darkMode}
            >
              <div className="max-w-md">
                <AssignmentPanel
                  assignedDate="2025-11-15"
                  editor="Alex Kim"
                  copywriter="Emily Torres"
                  darkMode={darkMode}
                  variant="stacked"
                />
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="Composite Status Block — Compact"
              darkMode={darkMode}
            >
              <div className="max-w-sm">
                <StatusBlock
                  data={sampleStatusData}
                  darkMode={darkMode}
                  variant="compact"
                />
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="Composite Status Block — Expanded"
              darkMode={darkMode}
            >
              <div className="max-w-md">
                <StatusBlock
                  data={sampleStatusData}
                  darkMode={darkMode}
                  variant="expanded"
                  editable={true}
                />
              </div>
            </ComponentDemo>
          </div>
        </ShowcaseSection>

        {/* SECTION 2: TAHOE CALENDAR COMPONENTS */}
        <ShowcaseSection
          title="2. Tahoe Calendar Components"
          description="Interactive calendar with frosted glass design"
          expanded={expandedSection === 'tahoe-calendar'}
          onToggle={() => toggleSection('tahoe-calendar')}
          darkMode={darkMode}
        >
          <div className="space-y-6">
            <ComponentDemo
              title="Calendar Cell — Compact"
              darkMode={darkMode}
            >
              <div className="max-w-xs">
                <TahoeCalendarCell
                  data={{
                    campaignName: 'Product Launch',
                    platform: 'instagram',
                    contentType: 'reel-short',
                    workflowStatus: 'drafting',
                    assignedTo: ['AK', 'ET']
                  }}
                  darkMode={darkMode}
                  variant="compact"
                />
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="Calendar Cell — Detailed"
              darkMode={darkMode}
            >
              <div className="max-w-xs">
                <TahoeCalendarCell
                  data={{
                    campaignName: 'Product Launch',
                    platform: 'instagram',
                    contentType: 'reel-short',
                    workflowStatus: 'drafting',
                    assignedTo: ['AK', 'ET', 'SM']
                  }}
                  darkMode={darkMode}
                  variant="detailed"
                  onClick={() => setShowCampaignDetail(true)}
                />
              </div>
            </ComponentDemo>

            <ComponentDemo
              title="Month Header with Filters"
              darkMode={darkMode}
            >
              <TahoeMonthHeader
                month={10}
                year={2025}
                onNavigate={() => {}}
                darkMode={darkMode}
              />
            </ComponentDemo>

            <ComponentDemo
              title="Day Labels"
              darkMode={darkMode}
            >
              <TahoeDayLabels darkMode={darkMode} />
            </ComponentDemo>

            <div className="text-center">
              <button
                onClick={() => setShowCampaignDetail(true)}
                className="px-4 py-2 rounded-xl bg-calypso text-white hover:bg-calypso/90 transition-all"
              >
                Open Campaign Detail Panel
              </button>
            </div>
          </div>
        </ShowcaseSection>

        {/* SECTION 3: TEAM & TASKS */}
        <ShowcaseSection
          title="3. Team & Tasks"
          description="Team directory and task management board"
          expanded={expandedSection === 'team-tasks'}
          onToggle={() => toggleSection('team-tasks')}
          darkMode={darkMode}
        >
          <div className="space-y-6">
            <ComponentDemo
              title="Team Members Panel"
              darkMode={darkMode}
            >
              <TeamMembersPanel
                members={SAMPLE_TEAM_MEMBERS}
                darkMode={darkMode}
              />
            </ComponentDemo>

            <ComponentDemo
              title="Task Board (Kanban)"
              darkMode={darkMode}
            >
              <TaskBoard
                tasks={SAMPLE_TASKS}
                darkMode={darkMode}
                variant="full"
              />
            </ComponentDemo>
          </div>
        </ShowcaseSection>

        {/* SECTION 4: AUTH & SETTINGS */}
        <ShowcaseSection
          title="4. Auth & Settings"
          description="Login screen, user header, and personalization"
          expanded={expandedSection === 'auth-settings'}
          onToggle={() => toggleSection('auth-settings')}
          darkMode={darkMode}
        >
          <div className="space-y-6">
            <ComponentDemo
              title="User Dashboard Header"
              darkMode={darkMode}
            >
              <UserDashboardHeader
                user={{
                  name: 'Jordan Smith',
                  role: 'Content Manager'
                }}
                darkMode={darkMode}
                onSettingsClick={() => setShowSettingsDemo(true)}
                onLogout={() => {}}
                notificationCount={3}
              />
            </ComponentDemo>

            <div className="text-center space-x-3">
              <button
                onClick={() => setShowLoginDemo(true)}
                className="px-4 py-2 rounded-xl bg-calypso text-white hover:bg-calypso/90 transition-all"
              >
                View Login Screen
              </button>
              <button
                onClick={() => setShowSettingsDemo(true)}
                className="px-4 py-2 rounded-xl bg-calypso text-white hover:bg-calypso/90 transition-all"
              >
                Open Settings Panel
              </button>
            </div>
          </div>
        </ShowcaseSection>
      </div>

      {/* Modals */}
      {showLoginDemo && (
        <div className="fixed inset-0 z-50">
          <button
            onClick={() => setShowLoginDemo(false)}
            className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-red-500 text-white z-10"
          >
            Close Demo
          </button>
          <LoginScreen
            onLogin={() => setShowLoginDemo(false)}
            darkMode={darkMode}
          />
        </div>
      )}

      {showSettingsDemo && (
        <SettingsPanel
          currentSettings={sampleSettings}
          onSave={() => setShowSettingsDemo(false)}
          onClose={() => setShowSettingsDemo(false)}
          darkMode={darkMode}
        />
      )}

      {showCampaignDetail && (
        <CampaignDetailPanel
          data={{
            ...sampleStatusData,
            priority: 'high',
            attachments: ['campaign-brief.pdf', 'mood-board.jpg']
          }}
          darkMode={darkMode}
          isOpen={showCampaignDetail}
          onClose={() => setShowCampaignDetail(false)}
        />
      )}
    </div>
  );
}

function ShowcaseSection({
  title,
  description,
  expanded,
  onToggle,
  darkMode,
  children
}: {
  title: string;
  description: string;
  expanded: boolean;
  onToggle: () => void;
  darkMode: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`
      rounded-3xl border overflow-hidden
      backdrop-blur-3xl shadow-lg
      ${darkMode
        ? 'bg-white/10 border-white/20'
        : 'bg-white border-neutral-200'
      }
    `}>
      <button
        onClick={onToggle}
        className={`
          w-full px-6 py-4 flex items-center justify-between
          ${darkMode ? 'hover:bg-white/5' : 'hover:bg-neutral-50'}
          transition-colors
        `}
      >
        <div className="text-left">
          <h2 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            {title}
          </h2>
          <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
            {description}
          </p>
        </div>
        {expanded ? (
          <ChevronUp className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-neutral-900'}`} />
        ) : (
          <ChevronDown className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-neutral-900'}`} />
        )}
      </button>

      {expanded && (
        <div className={`
          px-6 py-6 border-t
          ${darkMode ? 'border-white/20' : 'border-neutral-200'}
        `}>
          {children}
        </div>
      )}
    </div>
  );
}

function ComponentDemo({
  title,
  darkMode,
  children
}: {
  title: string;
  darkMode: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`
      p-4 rounded-xl
      ${darkMode
        ? 'bg-white/5 border border-white/10'
        : 'bg-neutral-50 border border-neutral-200'
      }
    `}>
      <h3 className={`
        text-sm font-medium mb-3
        ${darkMode ? 'text-white/80' : 'text-neutral-700'}
      `}>
        {title}
      </h3>
      {children}
    </div>
  );
}
