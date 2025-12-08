# Authentication & Personalization System Guide

## Overview

The Tahoe Content Calendar system includes a complete authentication and personalization layer with:

- ✅ Login screen (UI only - no backend)
- ✅ Hamburger menu navigation
- ✅ Slide-out team panel
- ✅ User dashboard header
- ✅ Comprehensive settings panel
- ✅ Enhanced task assignment
- ✅ Personalized calendar views

---

## 🔐 Authentication Flow

### Login Screen

The login screen provides a beautiful, animated entry point with:

**Features:**
- Email and password fields
- "Remember me" checkbox
- "Forgot password" link
- Animated background orbs
- Frosted glass card design
- Loading state during login
- Demo mode (accepts any credentials)

**Usage:**
```tsx
import { LoginScreen } from './components/tahoe/LoginScreen';

<LoginScreen
  darkMode={darkMode}
  onLogin={(email, password, remember) => {
    // Handle login logic
    console.log('Login:', email, remember);
  }}
  onForgotPassword={() => {
    // Handle password reset
  }}
/>
```

**Demo Mode:**
- Any email/password combination works
- User name is extracted from email (e.g., john.doe@example.com → "John Doe")
- No actual authentication - purely UI demonstration

---

## 🍔 Hamburger Menu System

### Hamburger Menu Button

MacOS-style three-line menu button with states:

**Variants:**
- Collapsed (shows hamburger icon)
- Open (shows X icon)
- Hover (animated glow effect)
- Rotation animation on toggle

**Usage:**
```tsx
import { HamburgerMenu } from './components/tahoe/HamburgerMenu';

<HamburgerMenu
  darkMode={darkMode}
  isOpen={menuIsOpen}
  onToggle={() => setMenuIsOpen(!menuIsOpen)}
/>
```

---

## 👥 Slide-Out Team Panel

A left-side slide-out panel with comprehensive team management:

### Sections

#### 1. Current User Header
- Profile avatar (gradient circle with initials)
- Display name
- Role label

#### 2. Quick Links
- **My Calendar View** - Navigate to personal calendar
- **My Tasks** - Open task board
- **Settings** - Open personalization settings

#### 3. Team Search
- Real-time search bar
- Filters by name or role
- Instant results

#### 4. Team Members List
- Profile avatars
- Names and roles
- Active project count
- Workload indicators (Low/Medium/High)
- Clickable to open member's task board

#### 5. Logout Button
- Red-themed warning style
- Ends current session

**Usage:**
```tsx
import { SlideOutTeamPanel } from './components/tahoe/SlideOutTeamPanel';

<SlideOutTeamPanel
  isOpen={isMenuOpen}
  darkMode={darkMode}
  currentUser={{
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Editor'
  }}
  teamMembers={SAMPLE_TEAM}
  onNavigate={(page) => {
    // Handle navigation: 'calendar', 'tasks', 'settings', 'close'
  }}
  onMemberClick={(member) => {
    // Open member's task board
  }}
  onLogout={() => {
    // Handle logout
  }}
/>
```

---

## 👤 User Dashboard Header

Compact user profile display in the top-right corner:

**Features:**
- Notification bell with badge
- User avatar and name
- Role display
- Dropdown menu
- Settings button

**Dropdown Options:**
- View Profile
- Email display
- (Extensible for more options)

**Usage:**
```tsx
import { UserDashboardHeader } from './components/tahoe/UserDashboardHeader';

<UserDashboardHeader
  darkMode={darkMode}
  user={{
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Editor',
    avatar: '/path/to/avatar.jpg' // optional
  }}
  onSettingsClick={() => setShowSettings(true)}
  onProfileClick={() => {}}
/>
```

---

## ⚙️ Settings Panel

Comprehensive personalization hub with three main sections:

### A. Theme Customization

#### Theme Mode Selector
Three options:
- **Light** - Bright, clean aesthetic
- **Dark** - Dark mode with high contrast
- **Tahoe Gradient** - Colorful gradient backgrounds

#### Background Image Upload
- Click or drag-and-drop upload
- Supports PNG, JPG up to 5MB
- Preview before applying

#### Background Blur Slider
- Range: 0-100%
- Real-time preview
- Works with uploaded images

#### Accent Color Selector
- 6 preset colors (Blue, Purple, Pink, Green, Orange, Red)
- Custom color picker for any HEX value
- Applied to buttons, links, highlights

#### Apply to My Calendar Only
- Toggle to limit customization to personal view
- When off, settings apply globally

---

### B. Calendar View Options

#### View Mode
- **Compact** - Dense, minimal spacing
- **Expanded** - More breathing room

#### Show Metadata Toggle
- Shows/hides extra details in calendar cells
- Includes: assigned date, editor, copywriter, summary

#### Default Platform Filter
Dropdown with options:
- All Platforms
- Email Only
- Instagram Only
- Facebook Only
- LinkedIn Only
- TikTok Only
- Website Only

---

### C. Team Identity

#### Profile Photo Upload
- Visual avatar preview
- Upload button
- Gradient fallback with initials

#### Display Name
- Text input for full name
- Updates across entire system

#### Role Selector
Dropdown with roles:
- Editor
- Copywriter
- Social Lead
- Manager
- Designer
- Strategist

---

### Settings Actions

**Save Changes** - Applies all settings
**Reset to Default** - Reverts to system defaults
**Cancel** - Closes without saving

**Usage:**
```tsx
import { SettingsPanel, UserSettings } from './components/tahoe/SettingsPanel';

const [settings, setSettings] = useState<UserSettings>({
  theme: {
    mode: 'light',
    backgroundBlur: 50,
    accentColor: '#3B82F6',
    applyToMyCalendarOnly: false
  },
  calendar: {
    viewMode: 'expanded',
    showMetadata: true,
    defaultPlatformFilter: 'all'
  },
  profile: {
    displayName: 'John Doe',
    role: 'Editor'
  }
});

<SettingsPanel
  darkMode={darkMode}
  currentSettings={settings}
  onSave={(newSettings) => setSettings(newSettings)}
  onClose={() => setShowSettings(false)}
/>
```

---

## ✅ Enhanced Task Assignment

### Task Board Enhancements

#### View Mode Toggle
- **My Tasks Only** - Shows only current user's tasks
- **All Team Tasks** - Shows entire team's workload

#### Task Actions
Each task card now includes:

**1. Assign to Me Button**
- Quick self-assignment
- Blue accent button
- Updates task owner instantly

**2. Reassign Button**
- Opens team member selector
- Shows all team members
- Click to reassign task

#### Reassign Panel
Modal overlay with:
- Team member list
- Profile avatars
- Names and roles
- Click to select assignee

**Usage:**
```tsx
import { TaskBoardEnhanced } from './components/tahoe/TaskBoardEnhanced';

<TaskBoardEnhanced
  darkMode={darkMode}
  memberName="John Doe"
  tasks={SAMPLE_TASKS}
  teamMembers={SAMPLE_TEAM}
  currentUserId="user-123"
  viewMode="my-tasks"
  onViewModeChange={(mode) => setViewMode(mode)}
  onAssignToMe={(taskId) => {
    // Handle task assignment
    console.log('Assigned:', taskId);
  }}
  onReassign={(taskId, memberId) => {
    // Handle task reassignment
    console.log('Reassigned:', taskId, 'to', memberId);
  }}
  onClose={() => setShowTaskBoard(false)}
/>
```

---

## 🎨 Personalized Calendar

### User-Specific Customization

When a user applies settings, their calendar displays:

1. **Custom Background**
   - Uploaded image with adjustable blur
   - Subtle overlay for readability

2. **Accent Color Highlights**
   - Buttons use user's accent color
   - Focus rings match accent
   - Active states themed

3. **View Preferences**
   - Compact or expanded cells
   - Metadata visibility
   - Platform filtering

4. **Theme Mode**
   - Light/Dark/Tahoe Gradient
   - Consistent across all panels

---

## 🔄 Complete Integration

### TahoeSystemWithAuth Component

The master component that brings everything together:

**Features:**
- Login screen on first load
- Hamburger menu after login
- Slide-out team panel
- Settings panel
- Personalized calendar
- Enhanced task board
- User dashboard header

**State Management:**
```tsx
// Auth state
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [currentUser, setCurrentUser] = useState(null);

// UI state
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [showSettings, setShowSettings] = useState(false);

// User settings
const [userSettings, setUserSettings] = useState<UserSettings>({...});
```

**Flow:**
1. User sees login screen
2. Enters credentials (any email/password works)
3. System extracts name from email
4. Redirects to personalized calendar
5. Can access hamburger menu → team panel
6. Can open settings to customize
7. Changes apply to calendar instantly
8. Can logout to return to login screen

---

## 📱 Navigation Structure

```
Login Screen
    ↓
Dashboard (Authenticated)
    ├── Hamburger Menu
    │   ├── Current User Header
    │   ├── Quick Links
    │   │   ├── My Calendar View
    │   │   ├── My Tasks
    │   │   └── Settings
    │   ├── Team Search
    │   ├── Team Members List
    │   └── Logout
    │
    ├── User Dashboard Header
    │   ├── Notifications
    │   ├── Profile Dropdown
    │   └── Settings Button
    │
    ├── Personalized Calendar
    │   ├── Custom Background
    │   ├── Accent Color
    │   ├── View Mode
    │   └── Platform Filter
    │
    └── Task Board (on demand)
        ├── View Mode Toggle
        ├── Task Cards with Actions
        └── Reassign Panel
```

---

## 🎯 Use Cases

### 1. New User Onboarding
```
Login → Settings → Customize Theme → Set Role → Start Using Calendar
```

### 2. Daily Workflow
```
Login → Check My Tasks → Assign Tasks → Review Calendar → Logout
```

### 3. Team Collaboration
```
Open Team Panel → Search Member → View Their Tasks → Reassign Work
```

### 4. Personalization
```
Settings → Upload Background → Choose Accent → Set View Preferences → Save
```

---

## 🔐 Security Notes

**Important:** This is a **UI-only** authentication system for demonstration purposes.

For production use, you would need to:
- ✅ Implement actual backend authentication (JWT, OAuth, etc.)
- ✅ Hash passwords securely
- ✅ Add CSRF protection
- ✅ Implement session management
- ✅ Add rate limiting
- ✅ Store user settings in database
- ✅ Add email verification
- ✅ Implement 2FA (optional)

---

## 💡 Best Practices

1. **Settings Persistence**
   - Save to localStorage for demo
   - Use database for production

2. **User Experience**
   - Show loading states during operations
   - Provide feedback on actions
   - Keep navigation intuitive

3. **Accessibility**
   - All modals have escape key handlers
   - Focus management in forms
   - ARIA labels on interactive elements

4. **Performance**
   - Lazy load heavy components
   - Debounce search inputs
   - Optimize re-renders

---

## 🚀 Quick Start

```tsx
import { TahoeSystemWithAuth } from './components/TahoeSystemWithAuth';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <TahoeSystemWithAuth
      darkMode={darkMode}
      onDarkModeToggle={() => setDarkMode(!darkMode)}
    />
  );
}
```

That's it! The system handles:
- Login flow
- Navigation
- Personalization
- Task management
- Team collaboration

---

**Built with React, TypeScript, and Tailwind CSS**
**Following MacOS Tahoe Design Language**
