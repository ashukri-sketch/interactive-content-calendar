import { TahoeCalendarCell, TahoeCellData } from './TahoeCalendarCell';
import { TahoeMonthHeader, TahoeDayLabels } from './TahoeMonthHeader';
import { TeamMember } from './TeamDirectoryPanel';
import { Task } from './TaskBoard';

interface TahoeComponentsLibraryProps {
  darkMode: boolean;
}

export function TahoeComponentsLibrary({ darkMode }: TahoeComponentsLibraryProps) {
  const sampleCellData: TahoeCellData[] = [
    {
      campaignName: 'Q4 Launch',
      platform: 'instagram',
      contentType: 'reel',
      status: 'scheduled',
      team: ['AK', 'ET'],
      priority: 'high'
    }
  ];

  return (
    <div className={`
      min-h-screen p-8
      ${darkMode 
        ? 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }
    `}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className={darkMode ? 'text-white' : 'text-neutral-900'}>
            MacOS Tahoe Components Library
          </h1>
          <p className={darkMode ? 'text-white/60' : 'text-neutral-600'}>
            Frosted glass design system for content calendar
          </p>
        </div>

        {/* Calendar Cell Variants */}
        <ComponentSection title="Calendar Cell Component" darkMode={darkMode}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VariantCard title="Compact (Empty)" darkMode={darkMode}>
              <TahoeCalendarCell
                day={15}
                content={[]}
                darkMode={darkMode}
                variant="compact"
              />
            </VariantCard>

            <VariantCard title="Compact (With Content)" darkMode={darkMode}>
              <TahoeCalendarCell
                day={15}
                content={sampleCellData}
                darkMode={darkMode}
                variant="compact"
              />
            </VariantCard>

            <VariantCard title="Today Highlight" darkMode={darkMode}>
              <TahoeCalendarCell
                day={19}
                content={sampleCellData}
                darkMode={darkMode}
                isToday
              />
            </VariantCard>

            <VariantCard title="Past Day" darkMode={darkMode}>
              <TahoeCalendarCell
                day={10}
                content={sampleCellData}
                darkMode={darkMode}
                isPast
              />
            </VariantCard>

            <VariantCard title="Multiple Items" darkMode={darkMode}>
              <TahoeCalendarCell
                day={14}
                content={[
                  ...sampleCellData,
                  {
                    campaignName: 'Social Teaser',
                    platform: 'tiktok',
                    contentType: 'video',
                    status: 'drafting',
                    team: ['SM'],
                    priority: 'medium'
                  }
                ]}
                darkMode={darkMode}
              />
            </VariantCard>
          </div>
        </ComponentSection>

        {/* Month Header */}
        <ComponentSection title="Month Header Component" darkMode={darkMode}>
          <TahoeMonthHeader
            month={10}
            year={2025}
            darkMode={darkMode}
            onNavigate={() => {}}
          />
        </ComponentSection>

        {/* Day Labels */}
        <ComponentSection title="Day Labels" darkMode={darkMode}>
          <TahoeDayLabels darkMode={darkMode} />
        </ComponentSection>

        {/* Platform Badges */}
        <ComponentSection title="Platform Badges" darkMode={darkMode}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['email', 'instagram', 'tiktok', 'facebook', 'linkedin', 'website', 'multi'].map(platform => (
              <PlatformBadgeDemo key={platform} platform={platform} darkMode={darkMode} />
            ))}
          </div>
        </ComponentSection>

        {/* Status Chips */}
        <ComponentSection title="Workflow Status Chips" darkMode={darkMode}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'idea',
              'drafting',
              'editing',
              'needs-approval',
              'approved',
              'scheduled',
              'posted',
              'delayed',
              'cancelled'
            ].map(status => (
              <StatusChipDemo key={status} status={status} darkMode={darkMode} />
            ))}
          </div>
        </ComponentSection>

        {/* Content Type Badges */}
        <ComponentSection title="Content Type Badges" darkMode={darkMode}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['graphic', 'video', 'reel', 'story', 'carousel', 'copy'].map(type => (
              <ContentTypeBadgeDemo key={type} type={type} darkMode={darkMode} />
            ))}
          </div>
        </ComponentSection>

        {/* Priority Tags */}
        <ComponentSection title="Priority Tags" darkMode={darkMode}>
          <div className="grid grid-cols-3 gap-4">
            {['low', 'medium', 'high'].map(priority => (
              <PriorityTagDemo key={priority} priority={priority} darkMode={darkMode} />
            ))}
          </div>
        </ComponentSection>

        {/* Design Specifications */}
        <ComponentSection title="Design Specifications" darkMode={darkMode}>
          <div className={`
            p-6 rounded-2xl backdrop-blur-xl border
            ${darkMode
              ? 'bg-white/5 border-white/10'
              : 'bg-white/50 border-white/60'
            }
          `}>
            <ul className={`space-y-2 ${darkMode ? 'text-white/80' : 'text-neutral-700'}`}>
              <li>• <strong>Border Radius:</strong> 12-16px for cards, 8-12px for tags</li>
              <li>• <strong>Backdrop Blur:</strong> backdrop-blur-xl (24px) to backdrop-blur-3xl (64px)</li>
              <li>• <strong>Spacing Grid:</strong> 8-12px increments</li>
              <li>• <strong>Font Family:</strong> Inter (SF Pro alternative)</li>
              <li>• <strong>Shadows:</strong> Soft, layered shadows for depth</li>
              <li>• <strong>Opacity:</strong> 5-20% for dark mode, 40-80% for light mode</li>
              <li>• <strong>Gradients:</strong> Subtle from-white/from-transparent overlays</li>
              <li>• <strong>Transitions:</strong> 300ms duration for smooth interactions</li>
            </ul>
          </div>
        </ComponentSection>
      </div>
    </div>
  );
}

function ComponentSection({ 
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
      <h2 className={`mb-6 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function VariantCard({ 
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
      <h4 className={`text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
        {title}
      </h4>
      {children}
    </div>
  );
}

function PlatformBadgeDemo({ platform, darkMode }: { platform: string; darkMode: boolean }) {
  const colors = {
    email: darkMode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200',
    instagram: darkMode ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' : 'bg-pink-100 text-pink-700 border-pink-200',
    tiktok: darkMode ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border-cyan-200',
    facebook: darkMode ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200',
    linkedin: darkMode ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-indigo-100 text-indigo-700 border-indigo-200',
    website: darkMode ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-200',
    multi: darkMode ? 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30' : 'bg-neutral-100 text-neutral-700 border-neutral-200'
  };

  return (
    <div className={`
      p-4 rounded-xl backdrop-blur-md border flex items-center justify-center
      ${colors[platform as keyof typeof colors]}
    `}>
      <span className="text-sm capitalize">{platform}</span>
    </div>
  );
}

function StatusChipDemo({ status, darkMode }: { status: string; darkMode: boolean }) {
  const colors = {
    'idea': darkMode ? 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30' : 'bg-neutral-100 text-neutral-700 border-neutral-200',
    'drafting': darkMode ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200',
    'editing': darkMode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'needs-approval': darkMode ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-200',
    'approved': darkMode ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200',
    'scheduled': darkMode ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-200',
    'posted': darkMode ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'delayed': darkMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-200',
    'cancelled': darkMode ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-rose-100 text-rose-700 border-rose-200'
  };

  return (
    <div className={`
      p-4 rounded-xl backdrop-blur-md border flex items-center justify-center
      ${colors[status as keyof typeof colors]}
    `}>
      <span className="text-sm capitalize">{status.replace('-', ' ')}</span>
    </div>
  );
}

function ContentTypeBadgeDemo({ type, darkMode }: { type: string; darkMode: boolean }) {
  return (
    <div className={`
      p-4 rounded-xl backdrop-blur-md border flex items-center justify-center
      ${darkMode ? 'bg-white/10 text-white/70 border-white/20' : 'bg-black/10 text-neutral-700 border-black/20'}
    `}>
      <span className="text-sm capitalize">{type}</span>
    </div>
  );
}

function PriorityTagDemo({ priority, darkMode }: { priority: string; darkMode: boolean }) {
  const colors = {
    low: darkMode ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200',
    medium: darkMode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200',
    high: darkMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <div className={`
      p-4 rounded-xl backdrop-blur-md border flex items-center justify-center
      ${colors[priority as keyof typeof colors]}
    `}>
      <span className="text-sm capitalize">{priority} Priority</span>
    </div>
  );
}
