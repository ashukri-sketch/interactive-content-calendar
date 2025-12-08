/**
 * TEAM & TASKS - Task Board Component
 * Kanban-style board with columns: To Do, In Progress, Needs Review, Completed
 */

import { Flag, Calendar, User, StickyNote } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  associatedCampaign: string;
  dueDate: string;
  role: 'editor' | 'copywriter' | 'manager';
  status: 'to-do' | 'in-progress' | 'needs-review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}

interface TaskBoardProps {
  tasks: Task[];
  darkMode: boolean;
  variant?: 'full' | 'compact';
  onTaskClick?: (task: Task) => void;
  onTaskMove?: (taskId: string, newStatus: Task['status']) => void;
}

const COLUMNS: Array<{ id: Task['status']; label: string; color: string }> = [
  { id: 'to-do', label: 'To Do', color: 'text-gray-600' },
  { id: 'in-progress', label: 'In Progress', color: 'text-calypso' },
  { id: 'needs-review', label: 'Needs Review', color: 'text-tulip' },
  { id: 'completed', label: 'Completed', color: 'text-pistachio' }
];

export function TaskBoard({
  tasks,
  darkMode,
  variant = 'full',
  onTaskClick,
  onTaskMove
}: TaskBoardProps) {
  const getTasksForColumn = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {COLUMNS.map(column => (
        <TaskColumn
          key={column.id}
          column={column}
          tasks={getTasksForColumn(column.id)}
          darkMode={darkMode}
          variant={variant}
          onTaskClick={onTaskClick}
          onTaskDrop={(taskId) => onTaskMove?.(taskId, column.id)}
        />
      ))}
    </div>
  );
}

function TaskColumn({
  column,
  tasks,
  darkMode,
  variant,
  onTaskClick,
  onTaskDrop
}: {
  column: { id: Task['status']; label: string; color: string };
  tasks: Task[];
  darkMode: boolean;
  variant: 'full' | 'compact';
  onTaskClick?: (task: Task) => void;
  onTaskDrop: (taskId: string) => void;
}) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onTaskDrop(taskId);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="rounded-2xl p-4 glass-panel"
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          {column.label}
        </h3>
        <span className={`
          px-2 py-0.5 rounded-full text-xs font-medium
          ${darkMode
            ? 'bg-white/10 text-white/70'
            : 'bg-neutral-200 text-neutral-700'
          }
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
            variant={variant}
            onClick={() => onTaskClick?.(task)}
          />
        ))}

        {tasks.length === 0 && (
          <p className={`
            text-center text-sm py-8
            ${darkMode ? 'text-white/40' : 'text-neutral-400'}
          `}>
            No tasks
          </p>
        )}
      </div>
    </div>
  );
}

function TaskCard({
  task,
  darkMode,
  variant,
  onClick
}: {
  task: Task;
  darkMode: boolean;
  variant: 'full' | 'compact';
  onClick: () => void;
}) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const priorityConfig = {
    low: { color: 'text-pistachio', bg: 'bg-pistachio/20', label: 'Low' },
    medium: { color: 'text-tulip', bg: 'bg-tulip/20', label: 'Medium' },
    high: { color: 'text-red-600', bg: 'bg-red-100', label: 'High' }
  };

  const roleConfig = {
    editor: { label: 'Editor', color: 'bg-calypso/20 text-calypso' },
    copywriter: { label: 'Copy', color: 'bg-purple-100 text-purple-700' },
    manager: { label: 'Manager', color: 'bg-pistachio/20 text-pistachio' }
  };

  const isCompact = variant === 'compact';

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      className={`
        p-3 rounded-xl cursor-move
        transition-all duration-200
        ${darkMode
          ? 'bg-white/10 hover:bg-white/20 border border-white/20'
          : 'bg-white hover:bg-neutral-50 border border-neutral-200'
        }
        shadow-sm hover:shadow-md
      `}
    >
      {/* Title */}
      <h4 className={`
        text-sm font-medium mb-2
        ${darkMode ? 'text-white' : 'text-neutral-900'}
      `}>
        {task.title}
      </h4>

      {/* Campaign Name */}
      {!isCompact && (
        <p className={`
          text-xs mb-2
          ${darkMode ? 'text-white/60' : 'text-neutral-600'}
        `}>
          {task.associatedCampaign}
        </p>
      )}

      {/* Metadata */}
      <div className="flex items-center gap-2 flex-wrap mb-2">
        {/* Priority */}
        <div className={`
          inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
          ${darkMode
            ? `${priorityConfig[task.priority].bg}/20 ${priorityConfig[task.priority].color}`
            : `${priorityConfig[task.priority].bg} ${priorityConfig[task.priority].color}`
          }
        `}>
          <Flag className="w-3 h-3" />
          {priorityConfig[task.priority].label}
        </div>

        {/* Role */}
        <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleConfig[task.role].color}`}>
          {roleConfig[task.role].label}
        </div>
      </div>

      {/* Due Date */}
      <div className={`
        flex items-center gap-1.5 text-xs
        ${darkMode ? 'text-white/60' : 'text-neutral-600'}
      `}>
        <Calendar className="w-3 h-3" />
        {task.dueDate}
      </div>

      {/* Notes indicator */}
      {!isCompact && task.notes && (
        <div className={`
          flex items-center gap-1.5 text-xs mt-2 pt-2 border-t
          ${darkMode ? 'text-white/60 border-white/10' : 'text-neutral-600 border-neutral-200'}
        `}>
          <StickyNote className="w-3 h-3" />
          Has notes
        </div>
      )}
    </div>
  );
}

// Sample data export
export const SAMPLE_TASKS: Task[] = [
  {
    id: '1',
    title: 'Edit Instagram reel',
    associatedCampaign: 'Product Launch Campaign',
    dueDate: '2025-11-15',
    role: 'editor',
    status: 'in-progress',
    priority: 'high',
    notes: 'Need to add transitions'
  },
  {
    id: '2',
    title: 'Write blog post copy',
    associatedCampaign: 'Success Story Blog',
    dueDate: '2025-11-18',
    role: 'copywriter',
    status: 'to-do',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Review LinkedIn post',
    associatedCampaign: 'Thought Leadership',
    dueDate: '2025-11-20',
    role: 'manager',
    status: 'needs-review',
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Final approval email newsletter',
    associatedCampaign: 'Monthly Newsletter',
    dueDate: '2025-11-10',
    role: 'manager',
    status: 'completed',
    priority: 'low'
  }
];