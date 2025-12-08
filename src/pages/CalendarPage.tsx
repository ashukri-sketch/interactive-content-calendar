/**
 * PAGE 3 — CALENDAR
 * Full interactive month calendar with filters and campaign cells
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { TahoeMonthHeader, TahoeDayLabels, TahoeCalendarCell } from '../components/tahoe-calendar';
import { motion } from 'motion/react';
import type { PlatformType } from '../components/status-system/PlatformTag';
import type { ContentType } from '../components/status-system/ContentTypeTag';
import type { WorkflowStatus } from '../components/status-system/WorkflowStatusTag';

interface Campaign {
  id: string;
  date: number;
  campaignName: string;
  platform: PlatformType;
  contentType: ContentType;
  workflowStatus: WorkflowStatus;
  assignedTo: string[];
}

export function CalendarPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  
  const [currentMonth, setCurrentMonth] = useState(10); // November
  const [currentYear, setCurrentYear] = useState(2025);
  const [filters, setFilters] = useState<any>({});

  // Sample campaign data
  const campaigns: Campaign[] = [
    {
      id: '1',
      date: 5,
      campaignName: 'Product Launch',
      platform: 'instagram',
      contentType: 'reel-short',
      workflowStatus: 'drafting',
      assignedTo: ['AK', 'ET']
    },
    {
      id: '2',
      date: 12,
      campaignName: 'Thought Leadership',
      platform: 'linkedin',
      contentType: 'still-graphic',
      workflowStatus: 'approved',
      assignedTo: ['SM']
    },
    {
      id: '3',
      date: 15,
      campaignName: 'Monthly Newsletter',
      platform: 'mailchimp',
      contentType: 'copy-only',
      workflowStatus: 'scheduled',
      assignedTo: ['ET', 'MC']
    },
    {
      id: '4',
      date: 18,
      campaignName: 'TikTok Challenge',
      platform: 'tiktok',
      contentType: 'video',
      workflowStatus: 'editing',
      assignedTo: ['AK', 'JD']
    },
    {
      id: '5',
      date: 22,
      campaignName: 'Facebook Ad Campaign',
      platform: 'facebook',
      contentType: 'carousel',
      workflowStatus: 'needs-approval',
      assignedTo: ['SM', 'ET']
    },
    {
      id: '6',
      date: 25,
      campaignName: 'Website Blog Post',
      platform: 'website',
      contentType: 'copy-only',
      workflowStatus: 'drafting',
      assignedTo: ['ET']
    }
  ];

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaign/${campaignId}`);
  };

  // Generate calendar days
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDay + 1;
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      return dayNumber;
    }
    return null;
  });

  const getCampaignsForDay = (day: number | null) => {
    if (!day) return [];
    return campaigns.filter(c => c.date === day);
  };

  return (
    <div className={`
      min-h-screen p-8
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
    `}>
      <div className="max-w-[1800px] mx-auto">
        {/* Month Header with Navigation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <TahoeMonthHeader
            month={currentMonth}
            year={currentYear}
            onNavigate={handleNavigate}
            darkMode={isDark}
            filters={filters}
            onFilterChange={setFilters}
          />
        </motion.div>

        {/* Day Labels */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <TahoeDayLabels darkMode={isDark} />
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-7 gap-3"
        >
          {calendarDays.map((day, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.01 }}
              className={`
                min-h-[140px] p-3 rounded-2xl glass-panel
                ${day ? '' : 'opacity-40'}
              `}
            >
              {day && (
                <>
                  {/* Day Number */}
                  <div className={`
                    text-sm font-medium mb-2
                    ${isDark ? 'text-white/80' : 'text-neutral-700'}
                  `}>
                    {day}
                  </div>

                  {/* Campaigns for this day */}
                  <div className="space-y-2">
                    {getCampaignsForDay(day).map(campaign => (
                      <TahoeCalendarCell
                        key={campaign.id}
                        data={campaign}
                        darkMode={isDark}
                        variant="compact"
                        onClick={() => handleCampaignClick(campaign.id)}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}