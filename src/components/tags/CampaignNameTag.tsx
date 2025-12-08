import { useState } from 'react';
import { Tag } from 'lucide-react';

interface CampaignNameTagProps {
  value: string;
  darkMode: boolean;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export function CampaignNameTag({ 
  value, 
  darkMode, 
  editable = true,
  onChange 
}: CampaignNameTagProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleSave = () => {
    if (onChange) onChange(localValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setLocalValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing && editable) {
    return (
      <div className="flex items-center gap-2">
        <span className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          Campaign:
        </span>
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          className={`flex-1 px-3 py-1.5 rounded-full text-xs ${
            darkMode
              ? 'bg-neutral-800 text-white border-neutral-600'
              : 'bg-white text-neutral-900 border-neutral-300'
          } border focus:outline-none focus:ring-2 ${
            darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
          }`}
        />
      </div>
    );
  }

  return (
    <div 
      onClick={() => editable && setIsEditing(true)}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
        darkMode
          ? 'bg-neutral-800 border-neutral-700'
          : 'bg-neutral-100 border-neutral-200'
      } border ${editable ? 'cursor-pointer hover:shadow-md' : ''} transition-all`}
    >
      <Tag className={`w-3 h-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
      <span className={`text-xs ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
        {value}
      </span>
    </div>
  );
}
