# Tahoe Calendar Cell Variant System Guide

## Overview

The Tahoe Calendar Cell component features a comprehensive **swappable variant system** that allows you to customize how each metadata element is displayed. All tags and components within calendar cells can be switched between different visual styles without changing the underlying data structure.

## Component Architecture

### Enhanced Calendar Cell

The `TahoeCalendarCellEnhanced` component accepts variant props for each metadata type:

```tsx
<TahoeCalendarCellEnhanced
  day={15}
  content={cellData}
  darkMode={darkMode}
  // Swappable variant props
  platformVariant="pill"
  contentTypeVariant="icon-only"
  statusVariant="dot"
  teamVariant="avatars"
  priorityVariant="compact"
  showMetadata={true}
/>
```

## Available Variant Types

### 1. Platform Badge Variants

Controls how platform tags are displayed.

#### **Default** (Recommended)
- Icon + full platform name
- `px-1.5 py-0.5` padding
- Best for: Standard calendar views

```tsx
platformVariant="default"
// Displays: [📧 Email] [📷 Instagram] etc.
```

#### **Compact**
- Icon + 2-character abbreviation
- Minimal space usage
- Best for: Dense calendar views

```tsx
platformVariant="compact"
// Displays: [📧 Em] [📷 In] etc.
```

#### **Icon Only**
- Just the platform icon
- Maximum space efficiency
- Best for: Mobile or tight layouts

```tsx
platformVariant="icon-only"
// Displays: [📧] [📷] etc.
```

#### **Pill**
- Rounded pill style with icon + full name
- `px-2.5 py-1` padding
- Best for: Featured or expanded views

```tsx
platformVariant="pill"
// Displays: (📧 Email) (📷 Instagram) etc.
```

**Platform Icons:**
- Email → Mail icon (Yellow)
- Instagram → Instagram icon (Pink)
- TikTok → Video icon (Cyan)
- Facebook → Facebook icon (Blue)
- LinkedIn → LinkedIn icon (Indigo)
- Website → Globe icon (Purple)
- Multi-Platform → Layers icon (Neutral)

---

### 2. Content Type Badge Variants

Controls how content type tags are displayed.

#### **Default**
- Icon + content type label
- Neutral styling
- Best for: Standard views

```tsx
contentTypeVariant="default"
// Displays: [🖼️ Graphic] [🎥 Video] etc.
```

#### **Compact**
- Icon only with tooltip
- Space-saving
- Best for: Dense layouts

```tsx
contentTypeVariant="compact"
// Displays: [🖼️] [🎥] etc.
```

#### **Icon Only**
- Minimal icon badge
- Ultra-compact
- Best for: Mobile views

```tsx
contentTypeVariant="icon-only"
// Displays: Icon only in small square
```

**Content Type Icons:**
- Graphic → Image icon
- Video → Video icon
- Reel → Zap icon
- Story → Message icon
- Carousel → Layers icon
- Copy → FileText icon

---

### 3. Workflow Status Variants

Controls how workflow status chips are displayed.

#### **Default**
- Icon + full status label
- Standard chip style
- Best for: General use

```tsx
statusVariant="default"
// Displays: [💡 Idea] [✏️ Drafting] etc.
```

#### **Compact**
- Icon + first word only
- Saves horizontal space
- Best for: Narrow cells

```tsx
statusVariant="compact"
// Displays: [💡 Idea] [✏️ Drafting] [✅ Needs] etc.
```

#### **Pill**
- Rounded pill with icon + label
- Premium look
- Best for: Featured items

```tsx
statusVariant="pill"
// Displays: Rounded pill (💡 Idea)
```

#### **Dot**
- Colored dot + label (no icon)
- Minimal, clean look
- Best for: Professional views

```tsx
statusVariant="dot"
// Displays: • Idea • Drafting etc.
```

**Status Color Spectrum:**
- Idea → Neutral gray
- Drafting → Blue
- Editing → Yellow
- Needs Approval → Orange
- Approved → Green
- Scheduled → Purple
- Posted → Emerald
- Delayed → Red
- Cancelled → Rose

---

### 4. Team Display Variants

Controls how team member information is shown.

#### **Avatars** (Recommended)
- Gradient circle avatars with initials
- Visual and space-efficient
- Shows up to 3 + count
- Best for: Most calendar views

```tsx
teamVariant="avatars"
// Displays: [AK] [ET] [+2]
```

#### **Names**
- Comma-separated full names
- Text-based display
- Best for: Reports or exports

```tsx
teamVariant="names"
// Displays: "Alex Kim, Emma Thompson"
```

#### **Count**
- Number with user icon
- Ultra-compact
- Best for: High-density views

```tsx
teamVariant="count"
// Displays: [👤 3]
```

#### **Detailed**
- Avatar + name for each member
- Full information
- Best for: Expanded cell views

```tsx
teamVariant="detailed"
// Displays:
// [AK] Alex Kim
// [ET] Emma Thompson
```

---

### 5. Priority Tag Variants

Controls how priority indicators are displayed.

#### **Default**
- Flag icon + priority label
- Standard badge
- Best for: General use

```tsx
priorityVariant="default"
// Displays: [🚩 High] [🚩 Medium] [🚩 Low]
```

#### **Compact**
- Flag icon + first letter
- Space-saving
- Best for: Dense views

```tsx
priorityVariant="compact"
// Displays: [🚩 H] [🚩 M] [🚩 L]
```

#### **Flag Only**
- Just the colored flag icon
- Minimal indicator
- Best for: Icon-based layouts

```tsx
priorityVariant="flag-only"
// Displays: [🚩] (color-coded)
```

#### **Hidden**
- Completely hidden
- No priority display
- Best for: When priority isn't needed

```tsx
priorityVariant="hidden"
// Displays: Nothing
```

**Priority Colors:**
- High → Red
- Medium → Yellow
- Low → Green

---

## Metadata Toggle

### Show Metadata

When `showMetadata={true}`, additional campaign information is displayed:

- **Assigned Date** - Calendar icon + date
- **Editor** - User icon + editor name
- **Copywriter** - Pen icon + copywriter name
- **Summary** - Post description (line-clamped to 2 lines)

```tsx
showMetadata={true}
// Shows expandable metadata section below main tags
```

---

## Preset Combinations

### Compact View
**Use Case:** Maximum density, minimal space

```tsx
platformVariant="compact"
contentTypeVariant="icon-only"
statusVariant="dot"
teamVariant="count"
priorityVariant="flag-only"
showMetadata={false}
```

### Detailed View
**Use Case:** Full information display

```tsx
platformVariant="pill"
contentTypeVariant="default"
statusVariant="pill"
teamVariant="detailed"
priorityVariant="default"
showMetadata={true}
```

### Icon-Only View
**Use Case:** Clean, visual-focused design

```tsx
platformVariant="icon-only"
contentTypeVariant="icon-only"
statusVariant="dot"
teamVariant="avatars"
priorityVariant="flag-only"
showMetadata={false}
```

### Mobile View
**Use Case:** Small screen optimization

```tsx
platformVariant="icon-only"
contentTypeVariant="compact"
statusVariant="compact"
teamVariant="count"
priorityVariant="hidden"
showMetadata={false}
```

---

## Usage Examples

### Basic Implementation

```tsx
import { TahoeCalendarCellEnhanced } from './components/tahoe';

function MyCalendar() {
  const cellData = [{
    campaignName: 'Q4 Launch',
    platform: 'instagram',
    contentType: 'reel',
    status: 'drafting',
    team: ['Alex Kim', 'Emma Thompson'],
    priority: 'high',
    assignedDate: '2025-11-20',
    editor: 'Alex Kim',
    copywriter: 'Emma Thompson'
  }];

  return (
    <TahoeCalendarCellEnhanced
      day={15}
      content={cellData}
      darkMode={false}
      platformVariant="pill"
      statusVariant="pill"
      teamVariant="avatars"
      showMetadata={true}
    />
  );
}
```

### Dynamic Variant Switching

```tsx
function CalendarWithControls() {
  const [variant, setVariant] = useState('default');

  return (
    <>
      <select onChange={(e) => setVariant(e.target.value)}>
        <option value="default">Default</option>
        <option value="compact">Compact</option>
        <option value="detailed">Detailed</option>
      </select>

      <TahoeCalendarCellEnhanced
        day={15}
        content={cellData}
        darkMode={false}
        platformVariant={
          variant === 'compact' ? 'compact' : 
          variant === 'detailed' ? 'pill' : 'default'
        }
        // ... other variant props
      />
    </>
  );
}
```

### Responsive Variants

```tsx
function ResponsiveCell() {
  const isMobile = window.innerWidth < 768;

  return (
    <TahoeCalendarCellEnhanced
      day={15}
      content={cellData}
      darkMode={false}
      platformVariant={isMobile ? 'icon-only' : 'default'}
      contentTypeVariant={isMobile ? 'icon-only' : 'default'}
      statusVariant={isMobile ? 'dot' : 'pill'}
      teamVariant={isMobile ? 'count' : 'avatars'}
      priorityVariant={isMobile ? 'hidden' : 'default'}
    />
  );
}
```

---

## Variant System Benefits

✅ **Flexibility** - Swap visual styles without changing data
✅ **Consistency** - All variants follow Tahoe design language
✅ **Performance** - Minimal re-renders with variant changes
✅ **Accessibility** - All variants maintain semantic HTML
✅ **Customization** - Mix and match for unique layouts
✅ **Scalability** - Easy to add new variants

---

## Interactive Demo

Visit the **Variants** view in the application to:

1. Test all variant combinations live
2. See real-time preview of changes
3. Apply preset combinations
4. Export variant settings
5. Compare side-by-side layouts

---

## TypeScript Support

All variants are fully typed:

```typescript
type PlatformVariant = 'default' | 'compact' | 'icon-only' | 'pill';
type ContentTypeVariant = 'default' | 'compact' | 'icon-only';
type StatusVariant = 'default' | 'compact' | 'pill' | 'dot';
type TeamVariant = 'avatars' | 'names' | 'count' | 'detailed';
type PriorityVariant = 'default' | 'compact' | 'flag-only' | 'hidden';
```

---

## Best Practices

1. **Consistency**: Use the same variant set across your calendar for visual harmony
2. **Context**: Choose variants based on screen size and information density needs
3. **Testing**: Preview variants in both light and dark modes
4. **User Preference**: Consider allowing users to save their preferred variant settings
5. **Performance**: Variants are optimized - no performance penalty for switching

---

**Built with React, TypeScript, and Tailwind CSS**
**Following MacOS Tahoe Design Language**
