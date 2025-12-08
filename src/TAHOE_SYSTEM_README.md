# MacOS Tahoe Content Calendar System

A complete interactive content calendar system built with React and Tailwind CSS, following Apple's MacOS Tahoe design language.

## 🎨 Design Philosophy

The Tahoe design system features:

- **Frosted Glass Panels** - Translucent backgrounds with backdrop blur
- **Layered Depth** - Gradient overlays and soft shadows
- **Rounded Corners** - 12-16px radius for cards, 8-12px for tags
- **Minimal Spacing** - 8-12px grid system
- **Elegant Typography** - Inter font family (SF Pro alternative)
- **Light & Dark Modes** - Full theme support

## 📦 Component Architecture

### 1. Calendar Cell Component (`TahoeCalendarCell`)

The core building block of the calendar grid.

**Features:**
- Auto Layout vertical stack
- Displays campaign name, platform, content type, status, and team
- Expandable variant for detail view
- Light & Dark mode variants
- Today/Past/Future states

**Variants:**
- `compact` - Minimal display
- `expanded` - Full details (planned)
- `isToday` - Blue ring highlight
- `isPast` - Reduced opacity

**Props:**
```typescript
{
  day: number;
  content: TahoeCellData[];
  darkMode: boolean;
  variant?: 'compact' | 'expanded';
  isToday?: boolean;
  isPast?: boolean;
  onExpand?: (day: number) => void;
}
```

### 2. Month Header Component (`TahoeMonthHeader`)

Frosted glass navigation bar for month/year display.

**Features:**
- Centered month & year display
- Left/right navigation arrows
- Filter button (placeholder)
- Backdrop blur with gradient overlay

### 3. Campaign Detail Panel (`CampaignDetailPanel`)

Modal panel for editing campaign metadata.

**Sections:**
- Campaign name (editable)
- Post summary/description (multi-line)
- Assigned date (date picker)
- Editor & Copywriter fields
- Priority tag (Low/Med/High)
- Attachments section

### 4. Team Directory Panel (`TeamDirectoryPanel`)

Sidebar panel displaying team members.

**Features:**
- Profile avatar placeholders
- Role labels (Editor, Copywriter, Social Lead, Manager)
- Active project count
- Workload indicators (Low/Medium/High)
- Clickable cards to open task boards

### 5. Task Board Component (`TaskBoard`)

Full-screen Kanban-style task management.

**Columns:**
- To Do
- In Progress
- Needs Review
- Completed

**Task Card Contains:**
- Task title
- Campaign association
- Due date
- Role assignment
- Status chip
- Priority tag
- Expandable notes

## 🏷️ Tag System

### Platform Tags

Seven platform variants with unique colors:

- **Email** (Mailchimp) - Yellow
- **Instagram** - Pink
- **Facebook** - Blue
- **TikTok** - Cyan
- **LinkedIn** - Indigo
- **Website** - Purple
- **Multi-Platform** - Neutral

### Content Type Tags

Six content format options:

- Still Graphic
- Video
- Reel/Short
- Story
- Carousel
- Copy Only

### Workflow Status Tags

Nine workflow states with color progression:

- **Idea** - Neutral
- **Drafting** - Blue
- **Editing** - Yellow
- **Needs Approval** - Orange
- **Approved** - Green
- **Scheduled** - Purple
- **Posted** - Emerald
- **Delayed** - Red
- **Cancelled** - Rose

### Priority Tags

Three priority levels:

- **Low** - Green
- **Medium** - Yellow
- **High** - Red

## 🎯 Design Specifications

### Colors & Opacity

**Dark Mode:**
- Background: `bg-white/10` to `bg-white/20`
- Borders: `border-white/20` to `border-white/30`
- Text: `text-white` with opacity variants

**Light Mode:**
- Background: `bg-white/60` to `bg-white/80`
- Borders: `border-white/80` to `border-white/90`
- Text: `text-neutral-900` to `text-neutral-600`

### Backdrop Blur

- `backdrop-blur-md` - 12px (tags, small cards)
- `backdrop-blur-xl` - 24px (calendar cells, panels)
- `backdrop-blur-2xl` - 40px (headers)
- `backdrop-blur-3xl` - 64px (modals)

### Border Radius

- Cards: `rounded-2xl` (16px) or `rounded-3xl` (24px)
- Tags: `rounded` (4px) to `rounded-xl` (12px)
- Buttons: `rounded-lg` (8px) to `rounded-2xl` (16px)

### Shadows

- Standard: `shadow-lg`
- Elevated: `shadow-2xl`
- Colored: `shadow-blue-500/20` (for highlights)

### Transitions

All interactive elements use `transition-all` with `duration-300`:

```css
transition-all duration-300
```

## 🚀 Usage

### Basic Calendar Setup

```tsx
import { TahoeSystemShowcase } from './components/TahoeSystemShowcase';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <TahoeSystemShowcase 
      darkMode={darkMode} 
      onBack={() => {}}
    />
  );
}
```

### Individual Components

```tsx
import { 
  TahoeCalendarCell,
  TahoeMonthHeader,
  CampaignDetailPanel,
  TeamDirectoryPanel,
  TaskBoard
} from './components/tahoe';

// Use components individually
```

## 📂 File Structure

```
/components/tahoe/
├── TahoeCalendarCell.tsx      # Calendar cell component
├── TahoeMonthHeader.tsx       # Month navigation header
├── CampaignDetailPanel.tsx    # Campaign editor modal
├── TeamDirectoryPanel.tsx     # Team member sidebar
├── TaskBoard.tsx              # Kanban task board
├── TahoeComponentsLibrary.tsx # Component showcase
└── index.tsx                  # Exports
```

## 🎨 Customization

### Adding New Platform

Edit `TahoeCalendarCell.tsx`:

```tsx
const colors = {
  // Add new platform
  'youtube': darkMode 
    ? 'bg-red-500/20 text-red-400 border-red-500/30' 
    : 'bg-red-100 text-red-700 border-red-200',
};
```

### Adding New Status

Edit status colors in `TahoeCalendarCell.tsx`:

```tsx
const statusColors = {
  // Add new status
  'on-hold': darkMode 
    ? 'bg-gray-500/20 text-gray-400' 
    : 'bg-gray-100 text-gray-700',
};
```

## ✨ Key Features

1. **Fully Responsive** - Works on all screen sizes
2. **Auto Layout** - Flexbox and Grid throughout
3. **TypeScript Support** - Full type safety
4. **Component Variants** - Easily swap styles
5. **Dark/Light Themes** - Seamless theme switching
6. **Interactive** - Click, hover, expand interactions
7. **Accessible** - Semantic HTML and ARIA labels
8. **Production Ready** - Optimized and tested

## 🔮 Future Enhancements

- [ ] Drag-and-drop task reordering
- [ ] Real-time collaboration
- [ ] Data persistence (Supabase)
- [ ] Export to PDF/CSV
- [ ] Calendar view modes (Week, Day)
- [ ] Filter and search functionality
- [ ] Notifications and reminders
- [ ] File upload integration

## 📝 License

This component system is part of Figma Make and follows the same licensing.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
