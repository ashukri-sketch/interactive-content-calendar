import { useState } from 'react';
import { TahoeCalendarCellEnhanced, TahoeCellData, PlatformVariant, ContentTypeVariant, StatusVariant, TeamVariant, PriorityVariant } from './TahoeCalendarCellEnhanced';
import { ArrowLeft } from 'lucide-react';

interface TahoeVariantShowcaseProps {
  darkMode: boolean;
  onBack?: () => void;
}

export function TahoeVariantShowcase({ darkMode, onBack }: TahoeVariantShowcaseProps) {
  const [platformVariant, setPlatformVariant] = useState<PlatformVariant>('default');
  const [contentTypeVariant, setContentTypeVariant] = useState<ContentTypeVariant>('default');
  const [statusVariant, setStatusVariant] = useState<StatusVariant>('default');
  const [teamVariant, setTeamVariant] = useState<TeamVariant>('avatars');
  const [priorityVariant, setPriorityVariant] = useState<PriorityVariant>('default');
  const [showMetadata, setShowMetadata] = useState(false);

  const sampleData: TahoeCellData[] = [
    {
      campaignName: 'Q4 Product Launch',
      platform: 'instagram',
      contentType: 'reel',
      status: 'drafting',
      team: ['Alex Kim', 'Emma Thompson'],
      priority: 'high',
      assignedDate: '2025-11-20',
      editor: 'Alex Kim',
      copywriter: 'Emma Thompson',
      summary: 'Launch announcement video showcasing new features with customer testimonials'
    },
    {
      campaignName: 'Holiday Newsletter',
      platform: 'email',
      contentType: 'copy',
      status: 'needs-approval',
      team: ['Mike Rodriguez'],
      priority: 'medium',
      assignedDate: '2025-11-22',
      editor: 'James Chen',
      copywriter: 'Mike Rodriguez',
      summary: 'End of year newsletter with year in review stats'
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
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className={`
                p-3 rounded-2xl transition-all backdrop-blur-xl border shadow-lg
                ${darkMode
                  ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                  : 'bg-white/60 border-white/80 hover:bg-white/80 text-neutral-700'
                }
              `}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className={darkMode ? 'text-white' : 'text-neutral-900'}>
              Calendar Cell Variant System
            </h1>
            <p className={darkMode ? 'text-white/60' : 'text-neutral-600'}>
              Swappable tag and metadata components
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className={`
          rounded-3xl p-6 backdrop-blur-3xl border
          ${darkMode
            ? 'bg-white/10 border-white/20'
            : 'bg-white/60 border-white/80'
          }
        `}>
          <h2 className={`mb-6 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Variant Controls
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Platform Variant */}
            <VariantControl
              label="Platform Badge"
              darkMode={darkMode}
              options={[
                { value: 'default', label: 'Default' },
                { value: 'compact', label: 'Compact' },
                { value: 'icon-only', label: 'Icon Only' },
                { value: 'pill', label: 'Pill' }
              ]}
              value={platformVariant}
              onChange={(v) => setPlatformVariant(v as PlatformVariant)}
            />

            {/* Content Type Variant */}
            <VariantControl
              label="Content Type Badge"
              darkMode={darkMode}
              options={[
                { value: 'default', label: 'Default' },
                { value: 'compact', label: 'Compact' },
                { value: 'icon-only', label: 'Icon Only' }
              ]}
              value={contentTypeVariant}
              onChange={(v) => setContentTypeVariant(v as ContentTypeVariant)}
            />

            {/* Status Variant */}
            <VariantControl
              label="Status Chip"
              darkMode={darkMode}
              options={[
                { value: 'default', label: 'Default' },
                { value: 'compact', label: 'Compact' },
                { value: 'pill', label: 'Pill' },
                { value: 'dot', label: 'Dot' }
              ]}
              value={statusVariant}
              onChange={(v) => setStatusVariant(v as StatusVariant)}
            />

            {/* Team Variant */}
            <VariantControl
              label="Team Display"
              darkMode={darkMode}
              options={[
                { value: 'avatars', label: 'Avatars' },
                { value: 'names', label: 'Names' },
                { value: 'count', label: 'Count' },
                { value: 'detailed', label: 'Detailed' }
              ]}
              value={teamVariant}
              onChange={(v) => setTeamVariant(v as TeamVariant)}
            />

            {/* Priority Variant */}
            <VariantControl
              label="Priority Tag"
              darkMode={darkMode}
              options={[
                { value: 'default', label: 'Default' },
                { value: 'compact', label: 'Compact' },
                { value: 'flag-only', label: 'Flag Only' },
                { value: 'hidden', label: 'Hidden' }
              ]}
              value={priorityVariant}
              onChange={(v) => setPriorityVariant(v as PriorityVariant)}
            />

            {/* Metadata Toggle */}
            <div>
              <label className={`block text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                Show Metadata
              </label>
              <button
                onClick={() => setShowMetadata(!showMetadata)}
                className={`
                  w-full px-4 py-2 rounded-xl transition-all border
                  ${showMetadata
                    ? darkMode
                      ? 'bg-blue-500/30 border-blue-500/50 text-blue-300'
                      : 'bg-blue-100 border-blue-300 text-blue-700'
                    : darkMode
                    ? 'bg-white/10 border-white/20 text-white/70'
                    : 'bg-white/50 border-white/60 text-neutral-700'
                  }
                `}
              >
                {showMetadata ? 'Visible' : 'Hidden'}
              </button>
            </div>
          </div>
        </div>

        {/* Preview Grid */}
        <div>
          <h2 className={`mb-6 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Live Preview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Example 1: Regular day */}
            <TahoeCalendarCellEnhanced
              day={15}
              content={sampleData}
              darkMode={darkMode}
              platformVariant={platformVariant}
              contentTypeVariant={contentTypeVariant}
              statusVariant={statusVariant}
              teamVariant={teamVariant}
              priorityVariant={priorityVariant}
              showMetadata={showMetadata}
            />

            {/* Example 2: Today */}
            <TahoeCalendarCellEnhanced
              day={19}
              content={[sampleData[0]]}
              darkMode={darkMode}
              isToday
              platformVariant={platformVariant}
              contentTypeVariant={contentTypeVariant}
              statusVariant={statusVariant}
              teamVariant={teamVariant}
              priorityVariant={priorityVariant}
              showMetadata={showMetadata}
            />

            {/* Example 3: Past day */}
            <TahoeCalendarCellEnhanced
              day={10}
              content={[sampleData[1]]}
              darkMode={darkMode}
              isPast
              platformVariant={platformVariant}
              contentTypeVariant={contentTypeVariant}
              statusVariant={statusVariant}
              teamVariant={teamVariant}
              priorityVariant={priorityVariant}
              showMetadata={showMetadata}
            />

            {/* Example 4: Empty day */}
            <TahoeCalendarCellEnhanced
              day={25}
              content={[]}
              darkMode={darkMode}
              platformVariant={platformVariant}
              contentTypeVariant={contentTypeVariant}
              statusVariant={statusVariant}
              teamVariant={teamVariant}
              priorityVariant={priorityVariant}
              showMetadata={showMetadata}
            />
          </div>
        </div>

        {/* Variant Combinations */}
        <div>
          <h2 className={`mb-6 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Preset Combinations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PresetCard
              title="Compact View"
              description="Minimal space, maximum density"
              darkMode={darkMode}
              onApply={() => {
                setPlatformVariant('compact');
                setContentTypeVariant('icon-only');
                setStatusVariant('dot');
                setTeamVariant('count');
                setPriorityVariant('flag-only');
                setShowMetadata(false);
              }}
            />

            <PresetCard
              title="Detailed View"
              description="Full information display"
              darkMode={darkMode}
              onApply={() => {
                setPlatformVariant('pill');
                setContentTypeVariant('default');
                setStatusVariant('pill');
                setTeamVariant('detailed');
                setPriorityVariant('default');
                setShowMetadata(true);
              }}
            />

            <PresetCard
              title="Icon-Only View"
              description="Clean, icon-based design"
              darkMode={darkMode}
              onApply={() => {
                setPlatformVariant('icon-only');
                setContentTypeVariant('icon-only');
                setStatusVariant('dot');
                setTeamVariant('avatars');
                setPriorityVariant('flag-only');
                setShowMetadata(false);
              }}
            />
          </div>
        </div>

        {/* Specifications */}
        <div className={`
          rounded-3xl p-6 backdrop-blur-3xl border
          ${darkMode
            ? 'bg-white/10 border-white/20'
            : 'bg-white/60 border-white/80'
          }
        `}>
          <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Variant Specifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-sm mb-3 ${darkMode ? 'text-white/80' : 'text-neutral-800'}`}>
                Platform Badge Variants
              </h3>
              <ul className={`space-y-1 text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                <li>• <strong>Default:</strong> Icon + full label</li>
                <li>• <strong>Compact:</strong> Icon + 2-char label</li>
                <li>• <strong>Icon Only:</strong> Just the icon</li>
                <li>• <strong>Pill:</strong> Rounded pill with icon + label</li>
              </ul>
            </div>

            <div>
              <h3 className={`text-sm mb-3 ${darkMode ? 'text-white/80' : 'text-neutral-800'}`}>
                Status Chip Variants
              </h3>
              <ul className={`space-y-1 text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                <li>• <strong>Default:</strong> Icon + label</li>
                <li>• <strong>Compact:</strong> Icon + first word</li>
                <li>• <strong>Pill:</strong> Rounded pill style</li>
                <li>• <strong>Dot:</strong> Color dot + label</li>
              </ul>
            </div>

            <div>
              <h3 className={`text-sm mb-3 ${darkMode ? 'text-white/80' : 'text-neutral-800'}`}>
                Team Display Variants
              </h3>
              <ul className={`space-y-1 text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                <li>• <strong>Avatars:</strong> Gradient circle avatars</li>
                <li>• <strong>Names:</strong> Comma-separated names</li>
                <li>• <strong>Count:</strong> Number with user icon</li>
                <li>• <strong>Detailed:</strong> Avatar + name per member</li>
              </ul>
            </div>

            <div>
              <h3 className={`text-sm mb-3 ${darkMode ? 'text-white/80' : 'text-neutral-800'}`}>
                Priority Tag Variants
              </h3>
              <ul className={`space-y-1 text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                <li>• <strong>Default:</strong> Flag icon + label</li>
                <li>• <strong>Compact:</strong> Flag + first letter</li>
                <li>• <strong>Flag Only:</strong> Just the flag icon</li>
                <li>• <strong>Hidden:</strong> Completely hidden</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VariantControl({
  label,
  darkMode,
  options,
  value,
  onChange
}: {
  label: string;
  darkMode: boolean;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className={`block text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-4 py-2 rounded-xl transition-all backdrop-blur-md border
          ${darkMode
            ? 'bg-white/10 border-white/20 text-white focus:bg-white/15 focus:border-white/30'
            : 'bg-white/60 border-white/80 text-neutral-900 focus:bg-white/80 focus:border-neutral-300'
          }
          focus:outline-none focus:ring-2 focus:ring-blue-500/50
        `}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function PresetCard({
  title,
  description,
  darkMode,
  onApply
}: {
  title: string;
  description: string;
  darkMode: boolean;
  onApply: () => void;
}) {
  return (
    <div className={`
      p-6 rounded-2xl backdrop-blur-xl border transition-all
      ${darkMode
        ? 'bg-white/5 border-white/10 hover:bg-white/10'
        : 'bg-white/50 border-white/60 hover:bg-white/70'
      }
    `}>
      <h3 className={`mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </h3>
      <p className={`text-sm mb-4 ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
        {description}
      </p>
      <button
        onClick={onApply}
        className={`
          w-full px-4 py-2 rounded-xl transition-all
          ${darkMode
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
          }
        `}
      >
        Apply Preset
      </button>
    </div>
  );
}
