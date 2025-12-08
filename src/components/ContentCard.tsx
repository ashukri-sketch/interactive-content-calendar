import { useState } from 'react';
import { StatusTag } from './StatusTag';
import { Trash2, Edit2, Check, X } from 'lucide-react';

export interface ContentItem {
  id: string;
  title: string;
  platform: string;
  owner: string;
  status: 'draft' | 'scheduled' | 'posted' | 'delayed';
}

interface ContentCardProps {
  item: ContentItem;
  darkMode: boolean;
  variant?: 'default' | 'compact' | 'expanded';
  onUpdate: (item: ContentItem) => void;
  onDelete?: () => void;
}

export function ContentCard({ 
  item, 
  darkMode, 
  variant = 'default',
  onUpdate, 
  onDelete 
}: ContentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  const handleSave = () => {
    onUpdate(editedItem);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedItem(item);
    setIsEditing(false);
  };

  const getCardStyles = () => {
    const baseStyles = `p-2 rounded-lg transition-all cursor-pointer group relative`;
    const colorStyles = darkMode
      ? 'bg-neutral-750 hover:bg-neutral-700'
      : 'bg-neutral-50 hover:bg-neutral-100';
    
    return `${baseStyles} ${colorStyles}`;
  };

  if (isEditing) {
    return (
      <ContentCardEditMode
        item={editedItem}
        darkMode={darkMode}
        onChange={setEditedItem}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div
      className={getCardStyles()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsEditing(true)}
    >
      <ContentCardViewMode
        item={item}
        darkMode={darkMode}
        isHovered={isHovered}
        onDelete={onDelete}
      />
    </div>
  );
}

interface ContentCardViewModeProps {
  item: ContentItem;
  darkMode: boolean;
  isHovered: boolean;
  onDelete?: () => void;
}

function ContentCardViewMode({ item, darkMode, isHovered, onDelete }: ContentCardViewModeProps) {
  return (
    <>
      <div className={`text-xs mb-1 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        {item.title}
      </div>
      <div className={`text-xs mb-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
        {item.platform} • {item.owner}
      </div>
      <div className="flex items-center justify-between">
        <StatusTag status={item.status} darkMode={darkMode} variant="default" />
        {isHovered && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className={`p-1 rounded transition-colors ${
              darkMode
                ? 'hover:bg-neutral-600 text-neutral-400 hover:text-red-400'
                : 'hover:bg-neutral-200 text-neutral-600 hover:text-red-600'
            }`}
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}
      </div>
    </>
  );
}

interface ContentCardEditModeProps {
  item: ContentItem;
  darkMode: boolean;
  onChange: (item: ContentItem) => void;
  onSave: () => void;
  onCancel: () => void;
}

function ContentCardEditMode({ item, darkMode, onChange, onSave, onCancel }: ContentCardEditModeProps) {
  const inputStyles = `w-full px-2 py-1 rounded text-xs ${
    darkMode
      ? 'bg-neutral-800 text-white border-neutral-600 focus:border-blue-500'
      : 'bg-white text-neutral-900 border-neutral-300 focus:border-blue-400'
  } border focus:outline-none focus:ring-1 ${
    darkMode ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
  }`;

  return (
    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
      <input
        type="text"
        value={item.title}
        onChange={(e) => onChange({ ...item, title: e.target.value })}
        className={inputStyles}
        placeholder="Content title"
        autoFocus
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          value={item.platform}
          onChange={(e) => onChange({ ...item, platform: e.target.value })}
          className={inputStyles}
          placeholder="Platform"
        />
        <input
          type="text"
          value={item.owner}
          onChange={(e) => onChange({ ...item, owner: e.target.value })}
          className={inputStyles}
          placeholder="Owner"
        />
      </div>
      <select
        value={item.status}
        onChange={(e) => onChange({ ...item, status: e.target.value as ContentItem['status'] })}
        className={inputStyles}
      >
        <option value="draft">Draft</option>
        <option value="scheduled">Scheduled</option>
        <option value="posted">Posted</option>
        <option value="delayed">Delayed</option>
      </select>
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1 rounded text-xs transition-colors ${
            darkMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <Check className="w-3 h-3" />
          Save
        </button>
        <button
          onClick={onCancel}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1 rounded text-xs transition-colors ${
            darkMode
              ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
              : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
          }`}
        >
          <X className="w-3 h-3" />
          Cancel
        </button>
      </div>
    </div>
  );
}
