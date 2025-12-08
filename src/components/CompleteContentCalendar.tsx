import { useState } from 'react';
import { ContentCalendarHeader } from './complete/ContentCalendarHeader';
import { EnhancedCalendarView } from './complete/EnhancedCalendarView';
import { DashboardView } from './complete/DashboardView';
import { TeamChatView } from './complete/TeamChatView';

interface CompleteContentCalendarProps {
  darkMode: boolean;
  onDarkModeToggle?: () => void;
}

export function CompleteContentCalendar({ darkMode }: CompleteContentCalendarProps) {
  const [currentView, setCurrentView] = useState<'calendar' | 'dashboard' | 'chat'>('calendar');

  // Sample data
  const [campaigns] = useState([
    {
      id: '1',
      title: 'Product Launch Campaign',
      platform: 'instagram',
      contentType: 'reel',
      status: 'scheduled',
      priority: 'high' as const,
      assignedTo: ['AK', 'ET'],
      dueDate: '2025-11-04',
      isOverdue: false
    },
    {
      id: '2',
      title: 'Feature Announcement Video',
      platform: 'youtube',
      contentType: 'video',
      status: 'drafting',
      priority: 'high' as const,
      assignedTo: ['SM', 'JD'],
      dueDate: '2025-11-11',
      isOverdue: false
    },
    {
      id: '3',
      title: 'Blog Post: Success Story',
      platform: 'website',
      contentType: 'article',
      status: 'editing',
      priority: 'medium' as const,
      assignedTo: ['ET'],
      dueDate: '2025-11-14',
      isOverdue: false
    },
    {
      id: '4',
      title: 'LinkedIn Thought Leadership',
      platform: 'linkedin',
      contentType: 'article',
      status: 'approved',
      priority: 'medium' as const,
      assignedTo: ['AK'],
      dueDate: '2025-11-18',
      isOverdue: false
    },
    {
      id: '5',
      title: 'Email Newsletter',
      platform: 'email',
      contentType: 'newsletter',
      status: 'idea',
      priority: 'low' as const,
      assignedTo: ['SM'],
      dueDate: '2025-11-25',
      isOverdue: false
    },
    {
      id: '6',
      title: 'TikTok Trend Response',
      platform: 'tiktok',
      contentType: 'reel',
      status: 'drafting',
      priority: 'high' as const,
      assignedTo: ['JD'],
      dueDate: '2025-11-02',
      isOverdue: true
    }
  ]);

  const dashboardMetrics = {
    totalCampaigns: 42,
    activeCampaigns: 18,
    completedThisMonth: 12,
    overdueItems: 3,
    teamUtilization: 78,
    avgCompletionTime: 5,
    platformBreakdown: [
      { platform: 'Instagram', count: 15 },
      { platform: 'LinkedIn', count: 10 },
      { platform: 'Email', count: 8 },
      { platform: 'YouTube', count: 5 },
      { platform: 'Website', count: 4 }
    ],
    priorityBreakdown: [
      { priority: 'high', count: 12 },
      { priority: 'medium', count: 20 },
      { priority: 'low', count: 10 }
    ]
  };

  const [chatMessages] = useState([
    {
      id: '1',
      sender: 'Alex Kim',
      content: 'Hey team, just finished the Instagram reel draft. Can someone review?',
      timestamp: '10:23 AM',
      isCurrentUser: false
    },
    {
      id: '2',
      sender: 'You',
      content: 'Sure! I\'ll take a look now.',
      timestamp: '10:25 AM',
      isCurrentUser: true
    },
    {
      id: '3',
      sender: 'Sarah Miller',
      content: 'Don\'t forget we have the client call at 2 PM to discuss the product launch strategy.',
      timestamp: '10:27 AM',
      isCurrentUser: false
    },
    {
      id: '4',
      sender: 'Emily Torres',
      content: 'I\'ve uploaded the blog post draft to the shared drive.',
      timestamp: '10:30 AM',
      isCurrentUser: false,
      hasAttachment: true,
      attachmentName: 'blog-draft-nov.docx'
    },
    {
      id: '5',
      sender: 'You',
      content: 'Thanks Emily! I\'ll review it this afternoon.',
      timestamp: '10:32 AM',
      isCurrentUser: true
    }
  ]);

  const handleExport = (type: 'campaigns' | 'tasks') => {
    console.log(`Exporting ${type}...`);
    
    // Generate CSV content
    let csvContent = '';
    
    if (type === 'campaigns') {
      csvContent = 'Title,Platform,Status,Priority,Assigned To,Due Date\n';
      campaigns.forEach(campaign => {
        csvContent += `"${campaign.title}","${campaign.platform}","${campaign.status}","${campaign.priority}","${campaign.assignedTo.join(', ')}","${campaign.dueDate}"\n`;
      });
    }
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleCampaignMove = (campaignId: string, newDate: string) => {
    console.log(`Moving campaign ${campaignId} to ${newDate}`);
    // In a real app, update the campaign's dueDate
  };

  const handleCampaignClick = (campaign: any) => {
    console.log('Campaign clicked:', campaign);
    // In a real app, open campaign detail modal
  };

  const handleSendMessage = (content: string, attachment?: File) => {
    console.log('Sending message:', content, attachment);
    // In a real app, send message to backend
  };

  const overdueCount = campaigns.filter(c => c.isOverdue).length;
  const notificationCount = overdueCount + 3; // 3 additional notifications

  return (
    <div className={`
      min-h-screen p-8
      ${darkMode
        ? 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900'
        : 'bg-alto-50'
      }
    `}>
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <ContentCalendarHeader
          darkMode={darkMode}
          currentView={currentView}
          onViewChange={setCurrentView}
          onExport={handleExport}
          notificationCount={notificationCount}
          overdueCount={overdueCount}
          currentUser={{
            name: 'Jordan Smith',
            role: 'Content Manager'
          }}
        />

        {/* Main Content */}
        <div className="mt-8">
          {currentView === 'calendar' && (
            <EnhancedCalendarView
              darkMode={darkMode}
              campaigns={campaigns}
              onCampaignMove={handleCampaignMove}
              onCampaignClick={handleCampaignClick}
            />
          )}

          {currentView === 'dashboard' && (
            <DashboardView
              darkMode={darkMode}
              metrics={dashboardMetrics}
            />
          )}

          {currentView === 'chat' && (
            <TeamChatView
              darkMode={darkMode}
              messages={chatMessages}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
