import { useState } from 'react';
import { AlignLeft, Maximize2, Minimize2 } from 'lucide-react';

interface ContentSummaryTagProps {
  value: string;
  darkMode: boolean;
  editable?: boolean;
  expanded?: boolean;
  onChange?: (value: string) => void;
  onToggleExpand?: () => void;
}

export function ContentSummaryTag({ 
  value, 
  darkMode, 
  editable = true,
  expanded = false,
  onChange,
  onToggleExpand
}: ContentSummaryTagProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleSave = () => {
    if (onChange) onChange(localValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setLocalValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing && editable) {
    return (
      <div className={`p-2 rounded-lg ${
        darkMode
          ? 'bg-neutral-800 border-neutral-700'
          : 'bg-neutral-50 border-neutral-200'
      } border`}>
        <div className="flex items-center gap-2 mb-1">
          <AlignLeft className={`w-3 h-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
          <span className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Post Topic / Description
          </span>
        </div>
        <textarea
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          rows={expanded ? 4 : 2}
          className={`w-full px-2 py-1.5 rounded text-xs resize-none ${
            darkMode
              ? 'bg-neutral-750 text-white border-neutral-600'
              : 'bg-white text-neutral-900 border-neutral-300'
          } border focus:outline-none focus:ring-2 ${
            darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
          }`}
          placeholder="Enter content description..."
        />
      </div>
    );
  }

  return (
    <div 
      className={`p-2 rounded-lg ${
        darkMode
          ? 'bg-neutral-800 border-neutral-700'
          : 'bg-neutral-50 border-neutral-200'
      } border ${editable ? 'cursor-pointer hover:shadow-md' : ''} transition-all`}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-2">
          <AlignLeft className={`w-3 h-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
          <span className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Post Topic / Description
          </span>
        </div>
        {onToggleExpand && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className={`p-0.5 rounded hover:bg-opacity-50 ${
              darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-200'
            }`}
          >
            {expanded ? (
              <Minimize2 className="w-3 h-3" />
            ) : (
              <Maximize2 className="w-3 h-3" />
            )}
          </button>
        )}
      </div>
      <div 
        onClick={() => editable && setIsEditing(true)}
        className={`text-xs ${darkMode ? 'text-neutral-300' : 'text-neutral-700'} ${
          expanded ? '' : 'line-clamp-2'
        }`}
      >
        {value || 'No description added'}
      </div>
    </div>
  );
}
