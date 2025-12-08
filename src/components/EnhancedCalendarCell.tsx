import { useState } from 'react';
import { StatusBlock, StatusBlockData } from './tags/StatusBlock';
import { Plus } from 'lucide-react';

interface EnhancedCalendarCellProps {
  day: number;
  content: StatusBlockData[];
  darkMode: boolean;
  variant?: 'default' | 'today' | 'past' | 'future';
  isToday?: boolean;
  onAddContent?: (day: number) => void;
  onUpdateContent?: (day: number, items: StatusBlockData[]) => void;
}

export function EnhancedCalendarCell({ 
  day, 
  content, 
  darkMode, 
  variant = 'default',
  isToday = false,
  onAddContent,
  onUpdateContent 
}: EnhancedCalendarCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [items, setItems] = useState<StatusBlockData[]>(content);

  const addNewItem = () => {
    const newItem: StatusBlockData = {
      campaignName: 'New Campaign',
      platform: 'instagram',
      contentType: 'still-graphic',
      contentSummary: '',
      assignedDate: new Date().toISOString().split('T')[0],
      editor: 'Team Member',
      copywriter: 'Team Member',
      workflowStatus: 'idea'
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    if (onUpdateContent) {
      onUpdateContent(day, newItems);
    }
    if (onAddContent) {
      onAddContent(day);
    }
  };

  const updateItem = (index: number, updatedItem: StatusBlockData) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    setItems(newItems);
    if (onUpdateContent) {
      onUpdateContent(day, newItems);
    }
  };

  // Variant-based styling
  const getCellStyles = () => {
    const baseStyles = `min-h-[200px] rounded-xl p-3 transition-all ${
      darkMode
        ? 'bg-neutral-800 border border-neutral-700'
        : 'bg-white border border-neutral-200'
    }`;

    const variantStyles = {
      default: '',
      today: darkMode ? 'ring-2 ring-blue-500' : 'ring-2 ring-blue-400',
      past: darkMode ? 'opacity-60' : 'opacity-70',
      future: ''
    };

    return `${baseStyles} ${variantStyles[variant]} hover:shadow-lg`;
  };

  const getDayNumberStyles = () => {
    if (variant === 'today') {
      return darkMode
        ? 'bg-blue-600 text-white'
        : 'bg-blue-500 text-white';
    }
    
    if (variant === 'past') {
      return darkMode
        ? 'text-neutral-500'
        : 'text-neutral-400';
    }

    return darkMode ? 'text-neutral-400' : 'text-neutral-600';
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={getCellStyles()}
    >
      {/* Day Number and Add Button */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${getDayNumberStyles()}`}
        >
          {day}
        </span>
        {isHovered && (
          <button
            onClick={addNewItem}
            className={`p-1 rounded transition-colors ${
              darkMode
                ? 'hover:bg-neutral-700 text-neutral-400'
                : 'hover:bg-neutral-100 text-neutral-600'
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content Items */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <StatusBlock
            key={index}
            data={item}
            darkMode={darkMode}
            variant="compact"
            onChange={(updatedItem) => updateItem(index, updatedItem)}
          />
        ))}
      </div>
    </div>
  );
}
