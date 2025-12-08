# 🚀 Quick Start Guide — Refined System

## Accessing the Refined System

1. **Navigate to "Refined System" view** in the top navigation
2. The system is organized into **4 collapsible sections**:
   - Status System
   - Tahoe Calendar Components
   - Team & Tasks
   - Auth & Settings

---

## Using Individual Components

### Status System Components

```tsx
import {
  CampaignNameTag,
  PlatformTag,
  ContentTypeTag,
  WorkflowStatusTag,
  StatusBlock
} from './components/status-system';

// Campaign Name
<CampaignNameTag
  value="Product Launch"
  darkMode={false}
  editable={true}
  onChange={(value) => console.log(value)}
/>

// Platform Tag
<PlatformTag 
  platform="instagram" 
  darkMode={false}
  compact={false}
/>

// Content Type
<ContentTypeTag 
  contentType="reel-short" 
  darkMode={false}
  compact={false}
/>

// Workflow Status
<WorkflowStatusTag 
  status="drafting" 
  darkMode={false}
  compact={false}
/>

// Full Status Block
<StatusBlock
  data={{
    campaignName: "Product Launch",
    platform: "instagram",
    contentType: "reel-short",
    contentSummary: "Exciting reveal...",
    assignedDate: "2025-11-15",
    editor: "Alex Kim",
    copywriter: "Emily Torres",
    workflowStatus: "drafting"
  }}
  darkMode={false}
  variant="expanded" // or "compact"
  editable={true}
  onChange={(updates) => console.log(updates)}
/>
```

---

### Calendar Components

```tsx
import {
  TahoeCalendarCell,
  TahoeMonthHeader,
  CampaignDetailPanel
} from './components/tahoe-calendar';

// Calendar Cell
<TahoeCalendarCell
  data={{
    campaignName: "Product Launch",
    platform: "instagram",
    contentType: "reel-short",
    workflowStatus: "drafting",
    assignedTo: ["AK", "ET"]
  }}
  darkMode={false}
  variant="detailed" // or "compact"
  onClick={() => openDetails()}
/>

// Month Header
<TahoeMonthHeader
  month={10}
  year={2025}
  onNavigate={(dir) => handleNavigate(dir)}
  darkMode={false}
  filters={{
    status: 'drafting',
    platform: 'instagram',
    teamMember: 'Alex Kim'
  }}
  onFilterChange={(filters) => setFilters(filters)}
/>

// Campaign Detail Panel
<CampaignDetailPanel
  data={{
    ...statusBlockData,
    priority: 'high',
    attachments: ['file1.pdf', 'file2.jpg']
  }}
  darkMode={false}
  isOpen={true}
  onClose={() => setIsOpen(false)}
  onChange={(data) => updateCampaign(data)}
/>
```

---

### Team & Tasks

```tsx
import {
  TeamMembersPanel,
  TaskBoard,
  SAMPLE_TEAM_MEMBERS,
  SAMPLE_TASKS
} from './components/team-tasks';

// Team Members
<TeamMembersPanel
  members={SAMPLE_TEAM_MEMBERS}
  darkMode={false}
  onMemberClick={(member) => console.log(member)}
/>

// Task Board
<TaskBoard
  tasks={SAMPLE_TASKS}
  darkMode={false}
  variant="full" // or "compact"
  onTaskClick={(task) => openTask(task)}
  onTaskMove={(taskId, status) => moveTask(taskId, status)}
/>
```

---

### Auth & Settings

```tsx
import {
  LoginScreen,
  UserDashboardHeader,
  SettingsPanel
} from './components/auth-settings';

// Login
<LoginScreen
  onLogin={(email, password, remember) => handleLogin(email, password)}
  darkMode={false}
/>

// User Header
<UserDashboardHeader
  user={{
    name: "Jordan Smith",
    role: "Content Manager"
  }}
  darkMode={false}
  onSettingsClick={() => openSettings()}
  onLogout={() => logout()}
  notificationCount={3}
/>

// Settings
<SettingsPanel
  currentSettings={settings}
  onSave={(newSettings) => saveSettings(newSettings)}
  onClose={() => closeSettings()}
  darkMode={false}
/>
```

---

## Component Variants Reference

### StatusBlock Variants
- **`compact`** — For calendar cells (minimal space)
- **`expanded`** — For detail panels (full information)

### Calendar Cell Variants
- **`compact`** — Tags only, member count
- **`detailed`** — Full avatar row, all metadata

### Content Summary Variants
- **`compact`** — 2 lines, truncated
- **`expanded`** — 4 lines, full text

### Assignment Panel Variants
- **`horizontal`** — Fields in a row
- **`stacked`** — Fields stacked vertically

### Task Board Variants
- **`full`** — All task details
- **`compact`** — Minimal task info

---

## Platform Types

```typescript
type PlatformType = 
  | 'mailchimp'
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'linkedin'
  | 'website'
  | 'multi-platform';
```

---

## Content Types

```typescript
type ContentType = 
  | 'still-graphic'
  | 'video'
  | 'carousel'
  | 'reel-short'
  | 'story'
  | 'copy-only';
```

---

## Workflow Statuses

```typescript
type WorkflowStatus = 
  | 'idea'
  | 'drafting'
  | 'editing'
  | 'needs-approval'
  | 'approved'
  | 'scheduled'
  | 'posted'
  | 'delayed'
  | 'cancelled';
```

---

## Custom Colors

Use these Tailwind classes:

```tsx
// Background
className="bg-calypso"
className="bg-calypso-600"
className="bg-pistachio"
className="bg-tulip"
className="bg-alto-50"

// Text
className="text-calypso"
className="text-calypso-600"
className="text-pistachio"
className="text-tulip"
className="text-white-950"

// Border
className="border-calypso"
```

---

## Sample Data

All sample data is exported for testing:

```tsx
import { SAMPLE_TEAM_MEMBERS } from './components/team-tasks';
import { SAMPLE_TASKS } from './components/team-tasks';

console.log(SAMPLE_TEAM_MEMBERS);
// [{ id, name, role, activeProjects, workload, email }, ...]

console.log(SAMPLE_TASKS);
// [{ id, title, associatedCampaign, dueDate, role, status, priority }, ...]
```

---

## Theming

Every component accepts a `darkMode` prop:

```tsx
const [darkMode, setDarkMode] = useState(false);

<StatusBlock data={data} darkMode={darkMode} />
<TahoeCalendarCell data={data} darkMode={darkMode} />
<TeamMembersPanel members={members} darkMode={darkMode} />
```

---

## Complete StatusBlockData Interface

```typescript
interface StatusBlockData {
  campaignName: string;
  platform: PlatformType;
  contentType: ContentType;
  contentSummary: string;
  assignedDate: string; // YYYY-MM-DD
  editor: string;
  copywriter: string;
  workflowStatus: WorkflowStatus;
}
```

---

## Building a Full Calendar

```tsx
import { useState } from 'react';
import { 
  TahoeMonthHeader, 
  TahoeDayLabels,
  TahoeCalendarCell 
} from './components/tahoe-calendar';

function MyCalendar() {
  const [month, setMonth] = useState(10);
  const [year, setYear] = useState(2025);

  const campaigns = [
    // Your campaign data
  ];

  return (
    <div>
      <TahoeMonthHeader
        month={month}
        year={year}
        onNavigate={(dir) => {
          // Handle month navigation
        }}
        darkMode={false}
      />
      
      <TahoeDayLabels darkMode={false} />
      
      <div className="grid grid-cols-7 gap-3">
        {/* Generate day cells */}
        {daysInMonth.map(day => (
          <div key={day}>
            {getCampaignsForDay(day).map(campaign => (
              <TahoeCalendarCell
                key={campaign.id}
                data={campaign}
                darkMode={false}
                variant="compact"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Tips

1. **Start with Compact Variants**
   - Use compact variants in tight spaces
   - Switch to expanded in modals/panels

2. **Compose Components**
   - StatusBlock uses all subcomponents
   - You can use subcomponents individually too

3. **Maintain Consistency**
   - Pass `darkMode` consistently
   - Use same spacing scale (8px grid)

4. **Sample Data First**
   - Test with `SAMPLE_TEAM_MEMBERS` and `SAMPLE_TASKS`
   - Then connect to your real data

5. **Explore the Showcase**
   - View "Refined System" to see all components
   - Try clicking buttons to see modals/panels

---

## File Paths

```
/components/
├── status-system/
│   ├── CampaignNameTag.tsx
│   ├── PlatformTag.tsx
│   ├── ContentTypeTag.tsx
│   ├── ContentSummaryTag.tsx
│   ├── AssignmentPanel.tsx
│   ├── WorkflowStatusTag.tsx
│   ├── StatusBlock.tsx
│   └── index.tsx
│
├── tahoe-calendar/
│   ├── TahoeCalendarCell.tsx
│   ├── TahoeMonthHeader.tsx
│   ├── CampaignDetailPanel.tsx
│   └── index.tsx
│
├── team-tasks/
│   ├── TeamMembersPanel.tsx
│   ├── TaskBoard.tsx
│   └── index.tsx
│
└── auth-settings/
    ├── LoginScreen.tsx
    ├── UserDashboardHeader.tsx
    ├── SettingsPanel.tsx
    └── index.tsx
```

---

## Next Steps

1. Open the **Refined System** view
2. Explore each section
3. Try the interactive demos (Login, Settings, Campaign Detail)
4. Copy component code for your project
5. Customize with your data

---

**Happy Building! 🚀**
