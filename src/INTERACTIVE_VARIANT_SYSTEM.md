# Interactive Component Variant System

## Overview

The **Hamburger Menu System** is a linked interactive component variant system where the hamburger button and slide-out panel work together as a unified component with different states.

This demonstrates advanced component architecture where multiple visual elements are controlled as **variants of a single interactive system**.

---

## 🔗 Linked Component Architecture

### Component Relationship

```
HamburgerMenuSystem
├── HamburgerButton (Always visible)
├── PanelBackdrop (Conditional)
└── SlidePanel (Animated)
```

**Key Concept:** The button and panel are NOT separate components—they are **variants** of the same component system.

---

## 📊 Variant States

### State 1: Collapsed (Default)

**Visual Elements:**
- ✅ Hamburger button visible
- ✅ Hamburger icon (3 lines)
- ❌ Panel hidden off-screen
- ❌ No backdrop overlay

**CSS:**
```css
button: rotate(0deg)
panel: translate(-100%)
backdrop: display: none
```

**User Experience:**
- Button shows menu icon
- Hover shows glow effect
- Click transitions to expanded state

---

### State 2: Expanded (Active)

**Visual Elements:**
- ✅ Hamburger button visible
- ✅ X icon (close)
- ✅ Panel slides in from left
- ✅ Backdrop overlay active
- ✅ Active indicator dot on button

**CSS:**
```css
button: rotate(90deg)
panel: translate(0)
backdrop: display: block, opacity: 1
```

**User Experience:**
- Button rotates and shows X icon
- Panel slides in with team list
- Backdrop dims background
- Click anywhere closes panel

---

## 🎨 Animation System

### Transition Specifications

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Button | `rotate` | 300ms | ease-out |
| Panel | `translateX` | 500ms | ease-out |
| Backdrop | `opacity` | 300ms | ease-out |
| Icon | `morph` | 300ms | ease-out |

### Animation Sequence

**Opening (Collapsed → Expanded):**
1. Button rotates 90° (300ms)
2. Icon morphs hamburger → X (300ms)
3. Backdrop fades in (300ms)
4. Panel slides in from left (500ms)
5. Active indicator appears

**Closing (Expanded → Collapsed):**
1. Panel slides out to left (500ms)
2. Backdrop fades out (300ms)
3. Icon morphs X → hamburger (300ms)
4. Button rotates back to 0° (300ms)
5. Active indicator disappears

---

## 💻 Implementation

### Basic Usage

```tsx
import { HamburgerMenuSystem } from './components/tahoe';

function App() {
  const [menuVariant, setMenuVariant] = useState<'collapsed' | 'expanded'>('collapsed');

  return (
    <HamburgerMenuSystem
      darkMode={false}
      variant={menuVariant}
      onVariantChange={setMenuVariant}
      currentUser={{
        name: 'Alex Rodriguez',
        email: 'alex@example.com',
        role: 'Content Lead'
      }}
      teamMembers={SAMPLE_TEAM}
      onNavigate={(page) => console.log('Navigate:', page)}
      onMemberClick={(member) => console.log('Member:', member)}
      onLogout={() => console.log('Logout')}
    />
  );
}
```

---

### Programmatic Control

```tsx
// Open menu programmatically
setMenuVariant('expanded');

// Close menu programmatically
setMenuVariant('collapsed');

// Toggle menu
setMenuVariant(prev => prev === 'expanded' ? 'collapsed' : 'expanded');
```

---

### Controlled vs Uncontrolled

#### Controlled Component (Recommended)
```tsx
const [variant, setVariant] = useState<'collapsed' | 'expanded'>('collapsed');

<HamburgerMenuSystem
  variant={variant}
  onVariantChange={setVariant}
  // ... other props
/>
```

#### Uncontrolled Component
```tsx
// Component manages its own state internally
<HamburgerMenuSystem
  variant="collapsed"
  onVariantChange={(newVariant) => {
    // Optional: React to changes
    console.log('Variant changed to:', newVariant);
  }}
/>
```

---

## 🎯 Component API

### Props

```typescript
interface HamburgerMenuSystemProps {
  // Theme
  darkMode: boolean;
  
  // State control (controlled component pattern)
  variant?: 'collapsed' | 'expanded';
  onVariantChange?: (variant: 'collapsed' | 'expanded') => void;
  
  // User data
  currentUser?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  
  // Team data
  teamMembers: TeamMember[];
  
  // Event handlers
  onNavigate?: (page: string) => void;
  onMemberClick?: (member: TeamMember) => void;
  onLogout?: () => void;
}
```

---

## 🔧 Sub-Components

### 1. HamburgerButton

**Responsibility:** Display hamburger/X icon with interactions

**States:**
- Default (collapsed)
- Hovered
- Open (expanded)

**Visual Feedback:**
- Hover glow effect
- Rotation animation
- Active indicator dot

```tsx
<HamburgerButton
  darkMode={darkMode}
  isOpen={variant === 'expanded'}
  isHovered={buttonHovered}
  onToggle={() => setVariant('expanded')}
  onHoverChange={setButtonHovered}
/>
```

---

### 2. PanelBackdrop

**Responsibility:** Dim background when panel is open

**States:**
- Hidden (variant: collapsed)
- Visible (variant: expanded)

**Features:**
- Click to close panel
- Backdrop blur effect
- Fade animation

```tsx
{variant === 'expanded' && (
  <PanelBackdrop
    darkMode={darkMode}
    onClick={() => setVariant('collapsed')}
  />
)}
```

---

### 3. SlidePanel

**Responsibility:** Display team navigation and search

**States:**
- Hidden off-screen (variant: collapsed)
- Visible on-screen (variant: expanded)

**Features:**
- Slide animation from left
- User header
- Quick links
- Team search
- Member list
- Logout button

**Sections:**
1. Current User Header
2. Quick Links (Calendar, Tasks, Settings)
3. Search Bar
4. Team Members List
5. Logout Button

```tsx
<SlidePanel
  darkMode={darkMode}
  isOpen={variant === 'expanded'}
  currentUser={currentUser}
  teamMembers={filteredMembers}
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  onNavigate={handleNavigate}
  onMemberClick={handleMemberClick}
  onLogout={handleLogout}
/>
```

---

## 🎨 Styling System

### Frosted Glass Effect

**Button:**
```css
backdrop-filter: blur(12px);
background: rgba(255, 255, 255, 0.1); /* dark mode */
background: rgba(255, 255, 255, 0.6); /* light mode */
```

**Panel:**
```css
backdrop-filter: blur(64px);
background: rgba(23, 23, 23, 0.9); /* dark mode */
background: rgba(255, 255, 255, 0.9); /* light mode */
```

**Backdrop:**
```css
backdrop-filter: blur(8px);
background: rgba(0, 0, 0, 0.4);
```

---

### Theme Variants

#### Light Mode
- Button: `bg-white/60` with `border-white/80`
- Panel: `bg-white/90` with `border-white/80`
- Text: `text-neutral-900`
- Backdrop: `bg-black/40`

#### Dark Mode
- Button: `bg-white/10` with `border-white/20`
- Panel: `bg-neutral-900/90` with `border-white/20`
- Text: `text-white`
- Backdrop: `bg-black/60`

---

## 🔍 Accessibility

### ARIA Attributes

```tsx
<button
  aria-label={isOpen ? 'Close menu' : 'Open menu'}
  aria-expanded={isOpen}
>
```

### Keyboard Navigation

- **ESC Key:** Close panel (when open)
- **Tab:** Navigate through panel items
- **Enter/Space:** Activate buttons
- **Arrow Keys:** Navigate team list

### Focus Management

1. When panel opens: Focus moves to first interactive element
2. When panel closes: Focus returns to hamburger button
3. Tab trap: Focus stays within panel when open

---

## 📱 Responsive Behavior

### Mobile (< 768px)
- Panel width: 100% of screen
- Swipe gesture support (optional)
- Touch-friendly tap targets (min 44px)

### Tablet (768px - 1024px)
- Panel width: 320px
- Partial background dim
- Hover states enabled

### Desktop (> 1024px)
- Panel width: 320px
- Full backdrop overlay
- Hover states with animations

---

## 🎭 State Management Patterns

### Pattern 1: Simple Toggle

```tsx
const [isOpen, setIsOpen] = useState(false);

<HamburgerMenuSystem
  variant={isOpen ? 'expanded' : 'collapsed'}
  onVariantChange={(v) => setIsOpen(v === 'expanded')}
/>
```

### Pattern 2: With Side Effects

```tsx
const [variant, setVariant] = useState<'collapsed' | 'expanded'>('collapsed');

const handleVariantChange = (newVariant: 'collapsed' | 'expanded') => {
  setVariant(newVariant);
  
  // Side effects
  if (newVariant === 'expanded') {
    trackEvent('menu_opened');
  } else {
    trackEvent('menu_closed');
  }
};

<HamburgerMenuSystem
  variant={variant}
  onVariantChange={handleVariantChange}
/>
```

### Pattern 3: Context Integration

```tsx
const { menuOpen, setMenuOpen } = useAppContext();

<HamburgerMenuSystem
  variant={menuOpen ? 'expanded' : 'collapsed'}
  onVariantChange={(v) => setMenuOpen(v === 'expanded')}
/>
```

---

## 🧪 Testing

### Unit Tests

```typescript
describe('HamburgerMenuSystem', () => {
  it('should toggle variant on button click', () => {
    const onVariantChange = jest.fn();
    render(<HamburgerMenuSystem variant="collapsed" onVariantChange={onVariantChange} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onVariantChange).toHaveBeenCalledWith('expanded');
  });

  it('should close panel when backdrop is clicked', () => {
    const onVariantChange = jest.fn();
    render(<HamburgerMenuSystem variant="expanded" onVariantChange={onVariantChange} />);
    
    fireEvent.click(screen.getByTestId('backdrop'));
    expect(onVariantChange).toHaveBeenCalledWith('collapsed');
  });
});
```

---

## 🎯 Use Cases

### 1. Mobile Navigation
```tsx
// Replace top navigation with hamburger menu on mobile
const isMobile = useMediaQuery('(max-width: 768px)');

{isMobile ? (
  <HamburgerMenuSystem {...props} />
) : (
  <TopNavigation {...props} />
)}
```

### 2. Admin Dashboard
```tsx
// Team management panel for admins
<HamburgerMenuSystem
  teamMembers={allTeamMembers}
  onMemberClick={(member) => openAdminPanel(member)}
  currentUser={adminUser}
/>
```

### 3. Workspace Switcher
```tsx
// Switch between different workspaces
<HamburgerMenuSystem
  teamMembers={workspaces.map(w => ({ ...w, role: w.type }))}
  onMemberClick={(workspace) => switchWorkspace(workspace)}
/>
```

---

## 🚀 Performance Optimization

### 1. Lazy Loading
```tsx
const SlidePanel = lazy(() => import('./SlidePanel'));

{variant === 'expanded' && (
  <Suspense fallback={<div>Loading...</div>}>
    <SlidePanel {...props} />
  </Suspense>
)}
```

### 2. Memoization
```tsx
const filteredMembers = useMemo(
  () => teamMembers.filter(m => m.name.includes(searchQuery)),
  [teamMembers, searchQuery]
);
```

### 3. Debounced Search
```tsx
const [searchQuery, setSearchQuery] = useState('');
const debouncedSearch = useDebounce(searchQuery, 300);

// Use debouncedSearch for filtering
```

---

## 💡 Best Practices

1. ✅ **Always use controlled component pattern**
   - Maintain variant state in parent
   - React to onVariantChange callback

2. ✅ **Handle navigation properly**
   - Close panel after navigation
   - Update active state

3. ✅ **Provide user feedback**
   - Loading states during async operations
   - Success/error messages

4. ✅ **Maintain accessibility**
   - ARIA labels
   - Keyboard navigation
   - Focus management

5. ✅ **Test thoroughly**
   - Unit tests for state transitions
   - Integration tests for user flows
   - Accessibility audits

---

## 🎨 Customization Options

### Custom Animations

```tsx
// Override transition duration
<HamburgerMenuSystem
  transitionDuration={300}
  variant={variant}
  // ...
/>
```

### Custom Styling

```tsx
// Pass className for custom styling
<HamburgerMenuSystem
  buttonClassName="custom-button-class"
  panelClassName="custom-panel-class"
  variant={variant}
  // ...
/>
```

### Custom Position

```tsx
// Position panel on right instead of left
<HamburgerMenuSystem
  panelPosition="right"
  variant={variant}
  // ...
/>
```

---

## 📚 Related Documentation

- [AUTH_SYSTEM_GUIDE.md](./AUTH_SYSTEM_GUIDE.md) - Authentication & personalization
- [VARIANT_SYSTEM_GUIDE.md](./VARIANT_SYSTEM_GUIDE.md) - Calendar cell variants
- [TAHOE_SYSTEM_README.md](./TAHOE_SYSTEM_README.md) - MacOS Tahoe design

---

**Built with React, TypeScript, and Tailwind CSS**
**Following MacOS Tahoe Design Language**
**Interactive Component Variant System Architecture**
