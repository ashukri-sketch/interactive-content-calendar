/**
 * TEAM & TASKS - Team Members Panel
 * List of team members with roles and workload indicators
 */

import { User, Mail, MessageSquare } from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  role: 'editor' | 'copywriter' | 'social-lead' | 'manager' | 'designer';
  profilePicture?: string;
  activeProjects: number;
  workload: 'low' | 'medium' | 'high';
  email?: string;
}

interface TeamMembersPanelProps {
  members: TeamMember[];
  darkMode: boolean;
  onMemberClick?: (member: TeamMember) => void;
}

const ROLE_LABELS = {
  'editor': 'Editor',
  'copywriter': 'Copywriter',
  'social-lead': 'Social Lead',
  'manager': 'Manager',
  'designer': 'Designer'
};

export function TeamMembersPanel({
  members,
  darkMode,
  onMemberClick
}: TeamMembersPanelProps) {
  return (
    <div className="rounded-2xl p-6 glass-panel shadow-lg">
      {/* Header */}
      <h3 className={`
        text-lg font-semibold mb-4
        ${darkMode ? 'text-white' : 'text-neutral-900'}
      `}>
        Team Members
      </h3>

      {/* Members List */}
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
  const workloadConfig = {
    low: {
      label: 'Low',
      color: darkMode
        ? 'bg-pistachio/20 text-pistachio border-pistachio/30'
        : 'bg-pistachio/10 text-pistachio border-pistachio/30'
    },
    medium: {
      label: 'Medium',
      color: darkMode
        ? 'bg-tulip/20 text-tulip border-tulip/30'
        : 'bg-tulip/10 text-tulip border-tulip/30'
    },
    high: {
      label: 'High',
      color: darkMode
        ? 'bg-red-500/20 text-red-400 border-red-500/30'
        : 'bg-red-100 text-red-700 border-red-300'
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-xl cursor-pointer
        transition-all duration-200
        ${darkMode
          ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
          : 'bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-300'
        }
      `}
    >
      <div className="flex items-center gap-3">
        {/* Profile Picture / Avatar */}
        {member.profilePicture ? (
          <img
            src={member.profilePicture}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-calypso to-calypso-600 flex items-center justify-center text-white font-medium">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}

        {/* Info */}
        <div className="flex-1">
          <h4 className={`
            font-medium mb-0.5
            ${darkMode ? 'text-white' : 'text-neutral-900'}
          `}>
            {member.name}
          </h4>
          <p className={`
            text-sm
            ${darkMode ? 'text-white/60' : 'text-neutral-600'}
          `}>
            {ROLE_LABELS[member.role]}
          </p>
        </div>

        {/* Right Side - Stats */}
        <div className="flex flex-col items-end gap-2">
          {/* Active Projects Count */}
          <div className={`
            px-2.5 py-0.5 rounded-full text-xs font-medium
            ${darkMode
              ? 'bg-calypso/20 text-calypso-600 border border-calypso/30'
              : 'bg-calypso/10 text-calypso border border-calypso/30'
            }
          `}>
            {member.activeProjects} {member.activeProjects === 1 ? 'project' : 'projects'}
          </div>

          {/* Workload Indicator */}
          <div className={`
            px-2.5 py-0.5 rounded-full text-xs font-medium border
            ${workloadConfig[member.workload].color}
          `}>
            {workloadConfig[member.workload].label}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
        <button className={`
          flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
          transition-all
          ${darkMode
            ? 'bg-white/10 text-white hover:bg-white/20'
            : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
          }
        `}>
          <Mail className="w-3.5 h-3.5" />
          Email
        </button>
        <button className={`
          flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
          transition-all
          ${darkMode
            ? 'bg-white/10 text-white hover:bg-white/20'
            : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
          }
        `}>
          <MessageSquare className="w-3.5 h-3.5" />
          Message
        </button>
      </div>
    </div>
  );
}

// Sample data export
export const SAMPLE_TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Kim',
    role: 'editor',
    activeProjects: 5,
    workload: 'high',
    email: 'alex.kim@example.com'
  },
  {
    id: '2',
    name: 'Emily Torres',
    role: 'copywriter',
    activeProjects: 3,
    workload: 'medium',
    email: 'emily.torres@example.com'
  },
  {
    id: '3',
    name: 'Sarah Miller',
    role: 'social-lead',
    activeProjects: 7,
    workload: 'high',
    email: 'sarah.miller@example.com'
  },
  {
    id: '4',
    name: 'Jordan Davis',
    role: 'designer',
    activeProjects: 2,
    workload: 'low',
    email: 'jordan.davis@example.com'
  },
  {
    id: '5',
    name: 'Michael Chen',
    role: 'manager',
    activeProjects: 4,
    workload: 'medium',
    email: 'michael.chen@example.com'
  }
];