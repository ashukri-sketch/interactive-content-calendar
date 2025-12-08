import { User, Briefcase } from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  role: 'Editor' | 'Copywriter' | 'Social Lead' | 'Manager';
  activeProjects: number;
  workload: 'low' | 'medium' | 'high';
  avatar?: string;
}

interface TeamDirectoryPanelProps {
  darkMode: boolean;
  members: TeamMember[];
  onMemberClick?: (member: TeamMember) => void;
}

export function TeamDirectoryPanel({ darkMode, members, onMemberClick }: TeamDirectoryPanelProps) {
  return (
    <div className={`
      rounded-3xl p-6 backdrop-blur-3xl border
      ${darkMode
        ? 'bg-white/10 border-white/20 shadow-2xl shadow-black/20'
        : 'bg-white/60 border-white/80 shadow-2xl shadow-black/10'
      }
    `}>
      {/* Gradient overlay */}
      <div className={`
        absolute inset-0 rounded-3xl pointer-events-none
        ${darkMode
          ? 'bg-gradient-to-br from-white/10 to-transparent'
          : 'bg-gradient-to-br from-white/60 to-transparent'
        }
      `} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            <User className="w-5 h-5" />
            Team Directory
          </h3>
          <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
            {members.length} members
          </span>
        </div>

        {/* Team members list */}
        <div className="space-y-3">
          {members.map(member => (
            <TeamMemberCard
              key={member.id}
              member={member}
              darkMode={darkMode}
              onClick={() => onMemberClick?.(member)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamMemberCard({ 
  member, 
  darkMode, 
  onClick 
}: { 
  member: TeamMember; 
  darkMode: boolean; 
  onClick: () => void;
}) {
  const workloadColors = {
    low: darkMode ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200',
    medium: darkMode ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200',
    high: darkMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-2xl transition-all cursor-pointer backdrop-blur-md border
        ${darkMode
          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
          : 'bg-white/50 border-white/60 hover:bg-white/70 hover:border-white/90'
        }
        shadow-lg hover:shadow-xl
      `}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center text-lg
          ${darkMode
            ? 'bg-gradient-to-br from-blue-400 to-purple-500'
            : 'bg-gradient-to-br from-blue-500 to-purple-600'
          }
          text-white shadow-lg
        `}>
          {member.name.split(' ').map(n => n[0]).join('')}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h4 className={`mb-1 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            {member.name}
          </h4>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
              {member.role}
            </span>
            <span className={`text-xs ${darkMode ? 'text-white/40' : 'text-neutral-400'}`}>•</span>
            <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
              {member.activeProjects} active
            </span>
          </div>
        </div>

        {/* Workload indicator */}
        <div className={`
          px-3 py-1 rounded-full text-xs border
          ${workloadColors[member.workload]}
        `}>
          {member.workload}
        </div>
      </div>
    </div>
  );
}

// Sample data
export const SAMPLE_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Kim',
    role: 'Editor',
    activeProjects: 5,
    workload: 'high'
  },
  {
    id: '2',
    name: 'Emma Thompson',
    role: 'Copywriter',
    activeProjects: 3,
    workload: 'medium'
  },
  {
    id: '3',
    name: 'James Chen',
    role: 'Editor',
    activeProjects: 2,
    workload: 'low'
  },
  {
    id: '4',
    name: 'Sarah Mitchell',
    role: 'Social Lead',
    activeProjects: 4,
    workload: 'medium'
  },
  {
    id: '5',
    name: 'Mike Rodriguez',
    role: 'Copywriter',
    activeProjects: 3,
    workload: 'medium'
  },
  {
    id: '6',
    name: 'Rachel Adams',
    role: 'Manager',
    activeProjects: 8,
    workload: 'high'
  }
];
