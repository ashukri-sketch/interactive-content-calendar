import { CalendarCell, ContentItem } from './CalendarCell';
import { ContentCard } from './ContentCard';
import { StatusTag, StatusType } from './StatusTag';

interface ComponentLibraryProps {
  darkMode: boolean;
}

export function ComponentLibrary({ darkMode }: ComponentLibraryProps) {
  return (
    <div className={`p-8 ${darkMode ? 'bg-neutral-900' : 'bg-neutral-50'} min-h-screen`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <ComponentSection title="Calendar Cell Variants" darkMode={darkMode}>
          <CalendarCellVariants darkMode={darkMode} />
        </ComponentSection>

        <ComponentSection title="Content Card Variants" darkMode={darkMode}>
          <ContentCardVariants darkMode={darkMode} />
        </ComponentSection>

        <ComponentSection title="Status Tag Variants" darkMode={darkMode}>
          <StatusTagVariants darkMode={darkMode} />
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

function CalendarCellVariants({ darkMode }: { darkMode: boolean }) {
  const sampleContent: ContentItem[] = [
    {
      id: '1',
      title: 'Product Launch',
      platform: 'LinkedIn',
      owner: 'Sarah M.',
      status: 'scheduled'
    }
  ];

  const emptyContent: ContentItem[] = [];

  return (
    <div className="space-y-6">
      <VariantGroup title="Default Cell (Empty)" darkMode={darkMode}>
        <div className="w-48">
          <CalendarCell
            day={15}
            content={emptyContent}
            darkMode={darkMode}
            variant="default"
          />
        </div>
      </VariantGroup>

      <VariantGroup title="Default Cell (With Content)" darkMode={darkMode}>
        <div className="w-48">
          <CalendarCell
            day={15}
            content={sampleContent}
            darkMode={darkMode}
            variant="default"
          />
        </div>
      </VariantGroup>

      <VariantGroup title="Today Cell" darkMode={darkMode}>
        <div className="w-48">
          <CalendarCell
            day={19}
            content={sampleContent}
            darkMode={darkMode}
            variant="today"
            isToday
          />
        </div>
      </VariantGroup>

      <VariantGroup title="Past Cell" darkMode={darkMode}>
        <div className="w-48">
          <CalendarCell
            day={10}
            content={sampleContent}
            darkMode={darkMode}
            variant="past"
          />
        </div>
      </VariantGroup>

      <VariantGroup title="Future Cell" darkMode={darkMode}>
        <div className="w-48">
          <CalendarCell
            day={25}
            content={sampleContent}
            darkMode={darkMode}
            variant="future"
          />
        </div>
      </VariantGroup>
    </div>
  );
}

function ContentCardVariants({ darkMode }: { darkMode: boolean }) {
  const sampleItems: ContentItem[] = [
    {
      id: '1',
      title: 'Product Launch Announcement',
      platform: 'LinkedIn',
      owner: 'Sarah M.',
      status: 'draft'
    },
    {
      id: '2',
      title: 'Weekly Newsletter',
      platform: 'Email',
      owner: 'Mike R.',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Feature Highlight Video',
      platform: 'YouTube',
      owner: 'Alex K.',
      status: 'posted'
    },
    {
      id: '4',
      title: 'Webinar Promotion',
      platform: 'Twitter',
      owner: 'Emma T.',
      status: 'delayed'
    }
  ];

  return (
    <div className="space-y-6">
      <VariantGroup title="Content Cards by Status" darkMode={darkMode}>
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          {sampleItems.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              darkMode={darkMode}
              onUpdate={() => {}}
            />
          ))}
        </div>
      </VariantGroup>
    </div>
  );
}

function StatusTagVariants({ darkMode }: { darkMode: boolean }) {
  const statuses: StatusType[] = ['draft', 'scheduled', 'posted', 'delayed'];

  return (
    <div className="space-y-6">
      <VariantGroup title="Default Variant" darkMode={darkMode}>
        <div className="flex flex-wrap gap-3">
          {statuses.map(status => (
            <StatusTag key={status} status={status} darkMode={darkMode} variant="default" />
          ))}
        </div>
      </VariantGroup>

      <VariantGroup title="With Icons" darkMode={darkMode}>
        <div className="flex flex-wrap gap-3">
          {statuses.map(status => (
            <StatusTag key={status} status={status} darkMode={darkMode} variant="default" showIcon />
          ))}
        </div>
      </VariantGroup>

      <VariantGroup title="Compact Variant" darkMode={darkMode}>
        <div className="flex flex-wrap gap-3">
          {statuses.map(status => (
            <StatusTag key={status} status={status} darkMode={darkMode} variant="compact" />
          ))}
        </div>
      </VariantGroup>

      <VariantGroup title="Pill Variant" darkMode={darkMode}>
        <div className="flex flex-wrap gap-3">
          {statuses.map(status => (
            <StatusTag key={status} status={status} darkMode={darkMode} variant="pill" showIcon />
          ))}
        </div>
      </VariantGroup>

      <VariantGroup title="Dot Variant" darkMode={darkMode}>
        <div className="flex flex-wrap gap-3">
          {statuses.map(status => (
            <StatusTag key={status} status={status} darkMode={darkMode} variant="dot" />
          ))}
        </div>
      </VariantGroup>

      <VariantGroup title="All Variants Comparison" darkMode={darkMode}>
        <div className="grid grid-cols-1 gap-4">
          {statuses.map(status => (
            <div key={status} className={`p-4 rounded-lg ${darkMode ? 'bg-neutral-800' : 'bg-white'}`}>
              <div className={`mb-3 text-sm ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
              <div className="flex flex-wrap gap-3">
                <StatusTag status={status} darkMode={darkMode} variant="default" />
                <StatusTag status={status} darkMode={darkMode} variant="default" showIcon />
                <StatusTag status={status} darkMode={darkMode} variant="compact" />
                <StatusTag status={status} darkMode={darkMode} variant="pill" showIcon />
                <StatusTag status={status} darkMode={darkMode} variant="dot" />
              </div>
            </div>
          ))}
        </div>
      </VariantGroup>
    </div>
  );
}

function VariantGroup({ 
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
      <h4 className={`mb-3 text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
        {title}
      </h4>
      {children}
    </div>
  );
}
