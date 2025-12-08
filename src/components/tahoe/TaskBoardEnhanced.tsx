import { useState } from 'react';
import { Calendar, Flag, X, UserPlus, Users, User } from 'lucide-react';
import { Task } from './TaskBoard';
import { TeamMember } from './TeamDirectoryPanel';

interface TaskBoardEnhancedProps {
  darkMode: boolean;
  memberName: string;
  tasks: Task[];
  teamMembers: TeamMember[];
  currentUserId?: string;
  viewMode: 'my-tasks' | 'all-tasks';
  onViewModeChange?: (mode: 'my-tasks' | 'all-tasks') => void;
  onAssignToMe?: (taskId: string) => void;
  onReassign?: (taskId: string, memberId: string) => void;
  onClose?: () => void;
}

type Column = 'todo' | 'in-progress' | 'review' | 'completed';

export function TaskBoardEnhanced({
  darkMode,
  memberName,
  tasks,
  teamMembers,
  currentUserId,
  viewMode,
  onViewModeChange,
  onAssignToMe,
  onReassign,
  onClose
}: TaskBoardEnhancedProps) {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [reassignTask, setReassignTask] = useState<string | null>(null);

  const columns: { id: Column; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Needs Review' },
    { id: 'completed', title: 'Completed' }
  ];

  const getTasksForColumn = (columnId: Column): Task[] => {
    let filteredTasks = tasks;
    
    // Apply view mode filter
    if (viewMode === 'my-tasks' && currentUserId) {
      // Filter to only current user's tasks (simplified - in real app, check task assignee)
      filteredTasks = tasks;
    }

    if (columnId === 'todo') return filteredTasks.filter(t => t.status === 'idea');
    if (columnId === 'in-progress') return filteredTasks.filter(t => ['drafting', 'editing'].includes(t.status));
    if (columnId === 'review') return filteredTasks.filter(t => t.status === 'needs-approval');
    if (columnId === 'completed') return filteredTasks.filter(t => ['approved', 'scheduled', 'posted'].includes(t.status));
    return [];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${darkMode ? 'bg-black/60' : 'bg-black/40'} backdrop-blur-sm`}
        onClick={onClose}
      />

      {/* Board */}
      <div className={`
        relative w-full max-w-7xl max-h-[90vh] overflow-auto rounded-3xl p-8
        backdrop-blur-3xl border shadow-2xl
        ${darkMode
          ? 'bg-neutral-900/80 border-white/20 shadow-black/40'
          : 'bg-white/80 border-white/80 shadow-black/20'
        }
      `}>
        {/* Gradient overlay */}
        <div className={`
          absolute inset-0 rounded-3xl pointer-events-none
          ${darkMode
            ? 'bg-gradient-to-br from-white/5 to-transparent'
            : 'bg-gradient-to-br from-white/40 to-transparent'
          }
        `} />

        <div className="relative z-10">
          {/* Header with view mode toggle */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className={darkMode ? 'text-white' : 'text-neutral-900'}>
                {memberName}'s Task Board
              </h2>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                {tasks.length} total tasks
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View mode toggle */}
              <div className={`
                flex items-center gap-2 p-1 rounded-xl backdrop-blur-md border
                ${darkMode
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/60 border-white/80'
                }
              `}>
                <button
                  onClick={() => onViewModeChange?.('my-tasks')}
                  className={`
                    px-4 py-2 rounded-lg transition-all text-sm
                    ${viewMode === 'my-tasks'
                      ? darkMode
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-blue-500 text-white shadow-lg'
                      : darkMode
                      ? 'text-white/60 hover:text-white'
                      : 'text-neutral-600 hover:text-neutral-900'
                    }
                  `}
                >
                  My Tasks Only
                </button>
                <button
                  onClick={() => onViewModeChange?.('all-tasks')}
                  className={`
                    px-4 py-2 rounded-lg transition-all text-sm
                    ${viewMode === 'all-tasks'
                      ? darkMode
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-blue-500 text-white shadow-lg'
                      : darkMode
                      ? 'text-white/60 hover:text-white'
                      : 'text-neutral-600 hover:text-neutral-900'
                    }
                  `}
                >
                  All Team Tasks
                </button>
              </div>

              {onClose && (
                <button
                  onClick={onClose}
                  className={`
                    p-2 rounded-xl transition-all
                    ${darkMode
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-black/5 hover:bg-black/10 text-neutral-700'
                    }
                  `}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-4 gap-4">
            {columns.map(column => (
              <TaskColumn
                key={column.id}
                title={column.title}
                tasks={getTasksForColumn(column.id)}
                darkMode={darkMode}
                expandedTask={expandedTask}
                onTaskClick={setExpandedTask}
                onAssignToMe={onAssignToMe}
                onReassignClick={setReassignTask}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reassign panel */}
      {reassignTask && (
        <ReassignPanel
          darkMode={darkMode}
          taskId={reassignTask}
          teamMembers={teamMembers}
          onAssign={(memberId) => {
            onReassign?.(reassignTask, memberId);
            setReassignTask(null);
          }}
          onClose={() => setReassignTask(null)}
        />
      )}
    </div>
  );
}

function TaskColumn({
  title,
  tasks,
  darkMode,
  expandedTask,
  onTaskClick,
  onAssignToMe,
  onReassignClick
}: {
  title: string;
  tasks: Task[];
  darkMode: boolean;
  expandedTask: string | null;
  onTaskClick: (id: string | null) => void;
  onAssignToMe?: (taskId: string) => void;
  onReassignClick?: (taskId: string) => void;
}) {
  return (
    <div className={`
      rounded-2xl p-4 backdrop-blur-md border min-h-[400px]
      ${darkMode
        ? 'bg-white/5 border-white/10'
        : 'bg-white/40 border-white/60'
      }
    `}>
      {/* Column header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          {title}
        </h3>
        <span className={`
          px-2 py-0.5 rounded-full text-xs
          ${darkMode ? 'bg-white/10 text-white/60' : 'bg-black/10 text-neutral-600'}
        `}>
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map(task => (
          <EnhancedTaskCard
            key={task.id}
            task={task}
            darkMode={darkMode}
            expanded={expandedTask === task.id}
            onClick={() => onTaskClick(expandedTask === task.id ? null : task.id)}
            onAssignToMe={() => onAssignToMe?.(task.id)}
            onReassignClick={() => onReassignClick?.(task.id)}
          />
        ))}
      </div>
    </div>
  );
}

function EnhancedTaskCard({
  task,
  darkMode,
  expanded,
  onClick,
  onAssignToMe,
  onReassignClick
}: {
  task: Task;
  darkMode: boolean;
  expanded: boolean;
  onClick: () => void;
  onAssignToMe: () => void;
  onReassignClick: () => void;
}) {
  const priorityColors = {
    low: darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700',
    medium: darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700',
    high: darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
  };

  const statusColors = {
    'idea': darkMode ? 'bg-neutral-500/20 text-neutral-400' : 'bg-neutral-100 text-neutral-700',
    'drafting': darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700',
    'editing': darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700',
    'needs-approval': darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-700',
    'approved': darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700',
    'scheduled': darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700',
    'posted': darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
  };

  return (
    <div
      className={`
        p-3 rounded-xl transition-all backdrop-blur-md border
        ${darkMode
          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
          : 'bg-white/50 border-white/60 hover:bg-white/70 hover:border-white/90'
        }
        shadow-lg hover:shadow-xl
        ${expanded ? 'ring-2 ring-blue-500/50' : ''}
      `}
    >
      <div onClick={onClick} className="cursor-pointer">
        {/* Task title */}
        <h4 className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          {task.title}
        </h4>

        {/* Campaign */}
        <p className={`text-xs mb-2 ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
          {task.campaign}
        </p>

        {/* Due date */}
        <div className={`flex items-center gap-1.5 mb-2 text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
          <Calendar className="w-3 h-3" />
          {task.dueDate}
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className={`px-2 py-0.5 rounded text-xs ${statusColors[task.status]}`}>
            {task.status}
          </span>
          <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs ${priorityColors[task.priority]}`}>
            <Flag className="w-3 h-3" />
            {task.priority}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAssignToMe();
          }}
          className={`
            flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all
            ${darkMode
              ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30'
              : 'bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200'
            }
          `}
        >
          <UserPlus className="w-3 h-3" />
          Assign to Me
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReassignClick();
          }}
          className={`
            flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all
            ${darkMode
              ? 'bg-white/10 hover:bg-white/20 text-white/70'
              : 'bg-white/60 hover:bg-white/90 text-neutral-700'
            }
          `}
        >
          <Users className="w-3 h-3" />
          Reassign
        </button>
      </div>

      {/* Expanded content */}
      {expanded && task.notes && (
        <div className={`
          mt-3 pt-3 border-t text-xs
          ${darkMode ? 'border-white/10 text-white/70' : 'border-black/10 text-neutral-700'}
        `}>
          {task.notes}
        </div>
      )}
    </div>
  );
}

function ReassignPanel({
  darkMode,
  taskId,
  teamMembers,
  onAssign,
  onClose
}: {
  darkMode: boolean;
  taskId: string;
  teamMembers: TeamMember[];
  onAssign: (memberId: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-8">
      <div
        className={`absolute inset-0 ${darkMode ? 'bg-black/60' : 'bg-black/40'} backdrop-blur-sm`}
        onClick={onClose}
      />

      <div className={`
        relative w-full max-w-md rounded-3xl p-6 backdrop-blur-3xl border shadow-2xl
        ${darkMode
          ? 'bg-neutral-900/90 border-white/20'
          : 'bg-white/90 border-white/80'
        }
      `}>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className={darkMode ? 'text-white' : 'text-neutral-900'}>
              Reassign Task
            </h3>
            <button
              onClick={onClose}
              className={`
                p-2 rounded-xl transition-all
                ${darkMode
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-black/5 hover:bg-black/10 text-neutral-700'
                }
              `}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {teamMembers.map(member => (
              <button
                key={member.id}
                onClick={() => onAssign(member.id)}
                className={`
                  w-full p-3 rounded-xl transition-all backdrop-blur-md border text-left
                  ${darkMode
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    : 'bg-white/50 border-white/60 hover:bg-white/70 hover:border-white/90'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    bg-gradient-to-br from-blue-400 to-purple-500 text-white
                  `}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                      {member.name}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                      {member.role}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
