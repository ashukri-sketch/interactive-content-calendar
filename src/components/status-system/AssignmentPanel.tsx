/**
 * STATUS SYSTEM - Assignment + Ownership Panel
 * Shows assigned date, editor, and copywriter
 */

import { Calendar, PenTool, FileEdit } from 'lucide-react';

interface AssignmentPanelProps {
  assignedDate: string;
  editor: string;
  copywriter: string;
  onDateChange?: (value: string) => void;
  onEditorChange?: (value: string) => void;
  onCopywriterChange?: (value: string) => void;
  darkMode: boolean;
  variant?: 'horizontal' | 'stacked';
  editable?: boolean;
}

export function AssignmentPanel({
  assignedDate,
  editor,
  copywriter,
  onDateChange,
  onEditorChange,
  onCopywriterChange,
  darkMode,
  variant = 'stacked',
  editable = false
}: AssignmentPanelProps) {
  const isHorizontal = variant === 'horizontal';

  return (
    <div className={`
      p-3 rounded-lg
      ${darkMode
        ? 'bg-white/5 border border-white/10'
        : 'bg-neutral-50 border border-neutral-200'
      }
    `}>
      <div className={`
        ${isHorizontal ? 'flex items-center gap-4' : 'space-y-3'}
      `}>
        {/* Assigned Date */}
        <AssignmentField
          icon={Calendar}
          label="Assigned Date"
          value={assignedDate}
          onChange={onDateChange}
          darkMode={darkMode}
          editable={editable}
          placeholder="YYYY-MM-DD"
          type="date"
        />

        {/* Editor */}
        <AssignmentField
          icon={PenTool}
          label="Editor"
          value={editor}
          onChange={onEditorChange}
          darkMode={darkMode}
          editable={editable}
          placeholder="Editor name"
        />

        {/* Copywriter */}
        <AssignmentField
          icon={FileEdit}
          label="Copywriter"
          value={copywriter}
          onChange={onCopywriterChange}
          darkMode={darkMode}
          editable={editable}
          placeholder="Copywriter name"
        />
      </div>
    </div>
  );
}

function AssignmentField({
  icon: Icon,
  label,
  value,
  onChange,
  darkMode,
  editable,
  placeholder,
  type = 'text'
}: {
  icon: any;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  darkMode: boolean;
  editable: boolean;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={`w-3.5 h-3.5 ${darkMode ? 'text-white/60' : 'text-neutral-600'}`} />
        <label className={`
          text-xs font-medium
          ${darkMode ? 'text-white/60' : 'text-neutral-600'}
        `}>
          {label}
        </label>
      </div>

      {editable ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full px-2 py-1 rounded text-sm
            ${darkMode
              ? 'bg-white/10 border border-white/20 text-white'
              : 'bg-white border border-neutral-300 text-neutral-900'
            }
            outline-none focus:ring-2 focus:ring-calypso
          `}
        />
      ) : (
        <span className={`text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          {value || '—'}
        </span>
      )}
    </div>
  );
}
