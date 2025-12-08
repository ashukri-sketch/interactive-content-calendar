import { useState } from 'react';
import { Calendar, Flag, X } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  campaign: string;
  dueDate: string;
  role: 'Editor' | 'Copywriter' | 'Manager';
  status: 'idea' | 'drafting' | 'editing' | 'needs-approval' | 'approved' | 'scheduled' | 'posted';
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}

interface TaskBoardProps {
  darkMode: boolean;
  memberName: string;
  tasks: Task[];
  onClose?: () => void;
}

type Column = 'todo' | 'in-progress' | 'review' | 'completed';

export function TaskBoard({ darkMode, memberName, tasks, onClose }: TaskBoardProps) {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const columns: { id: Column; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Needs Review' },
    { id: 'completed', title: 'Completed' }
  ];

  // Simple task distribution for demo
  const getTasksForColumn = (columnId: Column): Task[] => {
    if (columnId === 'todo') return tasks.filter(t => t.status === 'idea');
    if (columnId === 'in-progress') return tasks.filter(t => ['drafting', 'editing'].includes(t.status));
    if (columnId === 'review') return tasks.filter(t => t.status === 'needs-approval');
    if (columnId === 'completed') return tasks.filter(t => ['approved', 'scheduled', 'posted'].includes(t.status));
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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className={darkMode ? 'text-white' : 'text-neutral-900'}>
                {memberName}'s Task Board
              </h2>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                {tasks.length} total tasks
              </p>
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
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskColumn({
  title,
  tasks,
  darkMode,
  expandedTask,
  onTaskClick
}: {
  title: string;
  tasks: Task[];
  darkMode: boolean;
  expandedTask: string | null;
  onTaskClick: (id: string | null) => void;
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
          <TaskCard
            key={task.id}
            task={task}
            darkMode={darkMode}
            expanded={expandedTask === task.id}
            onClick={() => onTaskClick(expandedTask === task.id ? null : task.id)}
          />
        ))}
      </div>
    </div>
  );
}

function TaskCard({
  task,
  darkMode,
  expanded,
  onClick
}: {
  task: Task;
  darkMode: boolean;
  expanded: boolean;
  onClick: () => void;
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
      onClick={onClick}
      className={`
        p-3 rounded-xl cursor-pointer transition-all backdrop-blur-md border
        ${darkMode
          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
          : 'bg-white/50 border-white/60 hover:bg-white/70 hover:border-white/90'
        }
        shadow-lg hover:shadow-xl
        ${expanded ? 'ring-2 ring-blue-500/50' : ''}
      `}
    >
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
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`px-2 py-0.5 rounded text-xs ${statusColors[task.status]}`}>
          {task.status}
        </span>
        <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs ${priorityColors[task.priority]}`}>
          <Flag className="w-3 h-3" />
          {task.priority}
        </span>
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

// Sample tasks
export const SAMPLE_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design Instagram Reel',
    campaign: 'Q4 Product Launch',
    dueDate: '2025-11-20',
    role: 'Editor',
    status: 'drafting',
    priority: 'high',
    notes: 'Need to showcase new features with customer testimonials'
  },
  {
    id: '2',
    title: 'Write email copy',
    campaign: 'Holiday Campaign 2025',
    dueDate: '2025-11-22',
    role: 'Copywriter',
    status: 'needs-approval',
    priority: 'medium',
    notes: 'End of year newsletter content'
  },
  {
    id: '3',
    title: 'Create infographic',
    campaign: 'Weekly Social Series',
    dueDate: '2025-11-18',
    role: 'Editor',
    status: 'approved',
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Brainstorm TikTok ideas',
    campaign: 'TikTok Trends',
    dueDate: '2025-11-25',
    role: 'Editor',
    status: 'idea',
    priority: 'low',
    notes: 'Behind the scenes content ideas'
  },
  {
    id: '5',
    title: 'Write carousel captions',
    campaign: 'Multi-Channel Push',
    dueDate: '2025-11-21',
    role: 'Copywriter',
    status: 'editing',
    priority: 'high'
  },
  {
    id: '6',
    title: 'Design blog header',
    campaign: 'Website Blog Series',
    dueDate: '2025-11-19',
    role: 'Editor',
    status: 'posted',
    priority: 'medium'
  }
];
