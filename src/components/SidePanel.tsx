import { useState } from 'react';
import { Users, FileText, Palette, Layers } from 'lucide-react';
import { StatusTagShowcase } from './StatusTag';

interface SidePanelProps {
  darkMode: boolean;
}

export function SidePanel({ darkMode }: SidePanelProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'team' | 'legend' | 'components'>('notes');

  return (
    <div
      className={`w-80 border-l ${
        darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
      } overflow-auto`}
    >
      <div className="p-6">
        {/* Tab Navigation */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <TabButton
            icon={<FileText className="w-4 h-4" />}
            label="Notes"
            active={activeTab === 'notes'}
            onClick={() => setActiveTab('notes')}
            darkMode={darkMode}
          />
          <TabButton
            icon={<Users className="w-4 h-4" />}
            label="Team"
            active={activeTab === 'team'}
            onClick={() => setActiveTab('team')}
            darkMode={darkMode}
          />
          <TabButton
            icon={<Palette className="w-4 h-4" />}
            label="Legend"
            active={activeTab === 'legend'}
            onClick={() => setActiveTab('legend')}
            darkMode={darkMode}
          />
          <TabButton
            icon={<Layers className="w-4 h-4" />}
            label="Variants"
            active={activeTab === 'components'}
            onClick={() => setActiveTab('components')}
            darkMode={darkMode}
          />
        </div>

        {/* Content */}
        {activeTab === 'notes' && <NotesSection darkMode={darkMode} />}
        {activeTab === 'team' && <TeamSection darkMode={darkMode} />}
        {activeTab === 'legend' && <LegendSection darkMode={darkMode} />}
        {activeTab === 'components' && <ComponentsSection darkMode={darkMode} />}
      </div>
    </div>
  );
}

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  darkMode: boolean;
}

function TabButton({ icon, label, active, onClick, darkMode }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
        active
          ? darkMode
            ? 'bg-neutral-700 text-white'
            : 'bg-neutral-100 text-neutral-900'
          : darkMode
          ? 'text-neutral-400 hover:bg-neutral-750'
          : 'text-neutral-600 hover:bg-neutral-50'
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

function NotesSection({ darkMode }: { darkMode: boolean }) {
  const [notes, setNotes] = useState(
    'Content planning for November:\n\n• Focus on product launch campaign\n• Increase social media engagement\n• Prepare year-end content\n• Schedule holiday announcements'
  );

  return (
    <div>
      <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        Planning Notes
      </h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className={`w-full h-64 p-3 rounded-lg text-sm resize-none ${
          darkMode
            ? 'bg-neutral-750 text-neutral-300 border-neutral-600'
            : 'bg-neutral-50 text-neutral-900 border-neutral-200'
        } border focus:outline-none focus:ring-2 ${
          darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
        }`}
        placeholder="Add your content planning notes here..."
      />
    </div>
  );
}

function TeamSection({ darkMode }: { darkMode: boolean }) {
  const teamMembers = [
    { name: 'Sarah Mitchell', role: 'Content Lead', color: 'bg-purple-500' },
    { name: 'Mike Rodriguez', role: 'Social Media Manager', color: 'bg-blue-500' },
    { name: 'Alex Kim', role: 'Video Producer', color: 'bg-green-500' },
    { name: 'Emma Thompson', role: 'Copywriter', color: 'bg-orange-500' },
    { name: 'James Chen', role: 'Designer', color: 'bg-pink-500' }
  ];

  return (
    <div>
      <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        Team Responsibilities
      </h3>
      <div className="space-y-3">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              darkMode ? 'bg-neutral-750' : 'bg-neutral-50'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-white text-sm`}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className={`text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {member.name}
                </div>
                <div className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {member.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LegendSection({ darkMode }: { darkMode: boolean }) {
  const statusItems = [
    {
      status: 'Draft',
      description: 'Content is being created or reviewed',
      lightColor: 'bg-neutral-200 text-neutral-700',
      darkColor: 'bg-neutral-700 text-neutral-300'
    },
    {
      status: 'Scheduled',
      description: 'Content is approved and scheduled for publishing',
      lightColor: 'bg-blue-100 text-blue-700',
      darkColor: 'bg-blue-900/40 text-blue-400'
    },
    {
      status: 'Posted',
      description: 'Content has been published successfully',
      lightColor: 'bg-green-100 text-green-700',
      darkColor: 'bg-green-900/40 text-green-400'
    },
    {
      status: 'Delayed',
      description: 'Content publishing has been postponed',
      lightColor: 'bg-orange-100 text-orange-700',
      darkColor: 'bg-orange-900/40 text-orange-400'
    }
  ];

  return (
    <div>
      <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        Status Legend
      </h3>
      <div className="space-y-4">
        {statusItems.map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  darkMode ? item.darkColor : item.lightColor
                }`}
              >
                {item.status}
              </span>
            </div>
            <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-neutral-750' : 'bg-neutral-50'}`}>
        <h4 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Quick Tips
        </h4>
        <ul className={`text-xs space-y-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          <li>• Click any content card to edit details</li>
          <li>• Hover over dates to add new content</li>
          <li>• Use arrow buttons to navigate months</li>
          <li>• Today's date is highlighted with a blue ring</li>
        </ul>
      </div>
    </div>
  );
}

function ComponentsSection({ darkMode }: { darkMode: boolean }) {
  return (
    <div>
      <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        Component Variants
      </h3>
      
      <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-neutral-750' : 'bg-neutral-50'}`}>
        <p className={`text-xs mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          This calendar is built with reusable component variants:
        </p>
        <ul className={`text-xs space-y-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          <li>• <span className={darkMode ? 'text-white' : 'text-neutral-900'}>Calendar Cells</span> - Default, Today, Past, Future</li>
          <li>• <span className={darkMode ? 'text-white' : 'text-neutral-900'}>Content Cards</span> - Editable with delete action</li>
          <li>• <span className={darkMode ? 'text-white' : 'text-neutral-900'}>Status Tags</span> - 5 visual variants</li>
        </ul>
      </div>

      <StatusTagShowcase darkMode={darkMode} />
    </div>
  );
}