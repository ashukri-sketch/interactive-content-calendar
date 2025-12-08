import { CalendarCell, EmptyCalendarCell, ContentItem } from './CalendarCell';

interface CalendarGridProps {
  currentMonth: number;
  currentYear: number;
  darkMode: boolean;
}

// Sample data for demonstration
const sampleContent: { [key: string]: ContentItem[] } = {
  '2025-10-4': [
    { 
      id: '1',
      title: 'Product Launch Announcement', 
      platform: 'LinkedIn', 
      owner: 'Sarah M.', 
      status: 'posted' 
    }
  ],
  '2025-10-7': [
    { 
      id: '2',
      title: 'Weekly Newsletter', 
      platform: 'Email', 
      owner: 'Mike R.', 
      status: 'posted' 
    }
  ],
  '2025-10-11': [
    { 
      id: '3',
      title: 'Feature Highlight Video', 
      platform: 'YouTube', 
      owner: 'Alex K.', 
      status: 'scheduled' 
    }
  ],
  '2025-10-14': [
    { 
      id: '4',
      title: 'Blog Post: Best Practices', 
      platform: 'Blog', 
      owner: 'Emma T.', 
      status: 'scheduled' 
    },
    {
      id: '5',
      title: 'Social Media Teaser',
      platform: 'Twitter',
      owner: 'Sarah M.',
      status: 'draft'
    }
  ],
  '2025-10-18': [
    { 
      id: '6',
      title: 'Social Media Campaign', 
      platform: 'Instagram', 
      owner: 'Sarah M.', 
      status: 'draft' 
    }
  ],
  '2025-10-21': [
    { 
      id: '7',
      title: 'Webinar Promotion', 
      platform: 'Twitter', 
      owner: 'Mike R.', 
      status: 'delayed' 
    }
  ],
  '2025-10-25': [
    { 
      id: '8',
      title: 'Customer Success Story', 
      platform: 'LinkedIn', 
      owner: 'Alex K.', 
      status: 'draft' 
    }
  ],
  '2025-10-28': [
    { 
      id: '9',
      title: 'End of Month Report', 
      platform: 'Email', 
      owner: 'Emma T.', 
      status: 'scheduled' 
    }
  ]
};

export function CalendarGrid({ currentMonth, currentYear, darkMode }: CalendarGridProps) {
  // Get the first day of the month and total days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Get today's date for comparison
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Create array of all cells (including empty ones for alignment)
  const cells = [];
  
  // Add empty cells for days before the first of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(<EmptyCalendarCell key={`empty-${i}`} />);
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${currentYear}-${currentMonth}-${day}`;
    const content = sampleContent[dateKey] || [];
    
    // Determine cell variant
    const isToday = 
      day === todayDate && 
      currentMonth === todayMonth && 
      currentYear === todayYear;
    
    const isPast = 
      currentYear < todayYear ||
      (currentYear === todayYear && currentMonth < todayMonth) ||
      (currentYear === todayYear && currentMonth === todayMonth && day < todayDate);
    
    const variant = isToday ? 'today' : isPast ? 'past' : 'default';
    
    cells.push(
      <CalendarCell
        key={day}
        day={day}
        content={content}
        darkMode={darkMode}
        variant={variant}
        isToday={isToday}
      />
    );
  }

  return (
    <div className="grid grid-cols-7 gap-3">
      {cells}
    </div>
  );
}
