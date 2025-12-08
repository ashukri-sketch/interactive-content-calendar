import { useState } from 'react';
import { ContentCard } from './ContentCard';
import { Plus } from 'lucide-react';

export interface ContentItem {
  id: string;
  title: string;
  platform: string;
  owner: string;
  status: 'draft' | 'scheduled' | 'posted' | 'delayed';
}

interface CalendarCellProps {
  day: number;
  content: ContentItem[];
  darkMode: boolean;
  variant?: 'default' | 'today' | 'past' | 'future';
  isToday?: boolean;
  onAddContent?: (day: number) => void;
  onUpdateContent?: (day: number, items: ContentItem[]) => void;
}

export function CalendarCell({ 
  day, 
  content, 
  darkMode, 
  variant = 'default',
  isToday = false,
  onAddContent,
  onUpdateContent 
}: CalendarCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [items, setItems] = useState<ContentItem[]>(content);

  const addNewItem = () => {
    const newItem: ContentItem = {
      id: `${Date.now()}-${Math.random()}`,
      title: 'New Content',
      platform: 'Platform',
      owner: 'Owner',
      status: 'draft'
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

  const updateItem = (index: number, updatedItem: ContentItem) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    setItems(newItems);
    if (onUpdateContent) {
      onUpdateContent(day, newItems);
    }
  };

  const deleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    if (onUpdateContent) {
      onUpdateContent(day, newItems);
    }
  };

  // Variant-based styling
  const getCellStyles = () => {
    const baseStyles = `min-h-[160px] rounded-xl p-3 transition-all ${
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

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={getCellStyles()}
    >
      {/* Day Number */}
      <CalendarDayNumber day={day} variant={variant} darkMode={darkMode} />

      {/* Add Button */}
      {isHovered && (
        <button
          onClick={addNewItem}
          className={`absolute top-3 right-3 p-1 rounded transition-colors ${
            darkMode
              ? 'hover:bg-neutral-700 text-neutral-400'
              : 'hover:bg-neutral-100 text-neutral-600'
          }`}
        >
          <Plus className="w-4 h-4" />
        </button>
      )}

      {/* Content Items */}
      <div className="space-y-2 mt-2">
        {items.map((item, index) => (
          <ContentCard
            key={item.id}
            item={item}
            darkMode={darkMode}
            onUpdate={(updatedItem) => updateItem(index, updatedItem)}
            onDelete={() => deleteItem(index)}
          />
        ))}
      </div>
    </div>
  );
}

interface CalendarDayNumberProps {
  day: number;
  variant: 'default' | 'today' | 'past' | 'future';
  darkMode: boolean;
}

function CalendarDayNumber({ day, variant, darkMode }: CalendarDayNumberProps) {
  const getNumberStyles = () => {
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
    <span
      className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${getNumberStyles()}`}
    >
      {day}
    </span>
  );
}

// Empty Cell Component for alignment
export function EmptyCalendarCell() {
  return <div className="min-h-[160px]" />;
}
