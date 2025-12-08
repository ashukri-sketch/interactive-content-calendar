import { useState } from 'react';
import { Calendar, User, Pencil } from 'lucide-react';

interface AssignmentTagProps {
  assignedDate: string;
  editor: string;
  copywriter: string;
  darkMode: boolean;
  editable?: boolean;
  variant?: 'default' | 'compact';
  onChange?: (data: { assignedDate: string; editor: string; copywriter: string }) => void;
}

export function AssignmentTag({ 
  assignedDate, 
  editor, 
  copywriter, 
  darkMode,
  editable = true,
  variant = 'default',
  onChange 
}: AssignmentTagProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState({ assignedDate, editor, copywriter });

  const handleSave = () => {
    if (onChange) onChange(localData);
    setIsEditing(false);
  };

  if (isEditing && editable) {
    return (
      <div className={`p-2 rounded-lg ${
        darkMode
          ? 'bg-neutral-800 border-neutral-700'
          : 'bg-neutral-50 border-neutral-200'
      } border space-y-2`}>
        <div className="flex items-center gap-2">
          <Calendar className={`w-3 h-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
          <input
            type="date"
            value={localData.assignedDate}
            onChange={(e) => setLocalData({ ...localData, assignedDate: e.target.value })}
            className={`flex-1 px-2 py-1 rounded text-xs ${
              darkMode
                ? 'bg-neutral-750 text-white border-neutral-600'
                : 'bg-white text-neutral-900 border-neutral-300'
            } border focus:outline-none focus:ring-1 ${
              darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
            }`}
          />
        </div>
        <div className="flex items-center gap-2">
          <User className={`w-3 h-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
          <input
            type="text"
            placeholder="Editor"
            value={localData.editor}
            onChange={(e) => setLocalData({ ...localData, editor: e.target.value })}
            className={`flex-1 px-2 py-1 rounded text-xs ${
              darkMode
                ? 'bg-neutral-750 text-white border-neutral-600'
                : 'bg-white text-neutral-900 border-neutral-300'
            } border focus:outline-none focus:ring-1 ${
              darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
            }`}
          />
        </div>
        <div className="flex items-center gap-2">
          <Pencil className={`w-3 h-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
          <input
            type="text"
            placeholder="Copywriter"
            value={localData.copywriter}
            onChange={(e) => setLocalData({ ...localData, copywriter: e.target.value })}
            className={`flex-1 px-2 py-1 rounded text-xs ${
              darkMode
                ? 'bg-neutral-750 text-white border-neutral-600'
                : 'bg-white text-neutral-900 border-neutral-300'
            } border focus:outline-none focus:ring-1 ${
              darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
            }`}
          />
        </div>
        <button
          onClick={handleSave}
          className={`w-full px-3 py-1 rounded text-xs ${
            darkMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Save
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        onClick={() => editable && setIsEditing(true)}
        className={`p-2 rounded-lg ${
          darkMode
            ? 'bg-neutral-800 border-neutral-700'
            : 'bg-neutral-50 border-neutral-200'
        } border ${editable ? 'cursor-pointer hover:shadow-md' : ''} transition-all`}
      >
        <div className="flex items-center gap-2 text-xs">
          <Calendar className={`w-3 h-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
          <span className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>
            {assignedDate}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => editable && setIsEditing(true)}
      className={`p-2 rounded-lg ${
        darkMode
          ? 'bg-neutral-800 border-neutral-700'
          : 'bg-neutral-50 border-neutral-200'
      } border ${editable ? 'cursor-pointer hover:shadow-md' : ''} transition-all space-y-1.5`}
    >
      <div className="flex items-center gap-2">
        <Calendar className={`w-3 h-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
        <span className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          Assigned:
        </span>
        <span className={`text-xs ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
          {assignedDate}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <User className={`w-3 h-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
        <div className="flex-1">
          <div className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Editor: <span className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>{editor}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Pencil className={`w-3 h-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
        <div className="flex-1">
          <div className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Copy: <span className={darkMode ? 'text-neutral-300' : 'text-neutral-700'}>{copywriter}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
