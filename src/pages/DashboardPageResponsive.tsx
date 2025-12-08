/**
 * DASHBOARD PAGE — FULLY RESPONSIVE
 * Overview hub with metrics, charts, tasks, and quick actions
 * Uses Design System primitives and responsive utilities
 */

import { useTheme } from '../contexts/ThemeContext';
import { MetricCard } from '../components/charts/MetricCard';
import { Container, Grid, VStack, HStack } from '../design-system';
import { useResponsive } from '../design-system/hooks/useResponsive';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Mail, 
  MousePointerClick, 
  UserPlus,
  Plus,
  Calendar,
  CheckSquare,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function DashboardPageResponsive() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { isMobile, isTablet, isDesktop } = useResponsive();

  // Sample metrics data
  const metrics = [
    {
      title: 'Total Posts',
      value: '247',
      change: 12.5,
      icon: TrendingUp,
      trend: 'up' as const,
      sparklineData: [65, 72, 68, 75, 82, 78, 85, 92],
      gradient: 'linear-gradient(135deg, rgba(0,103,129,0.75), rgba(0,191,227,0.65))'
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      change: 8.2,
      icon: Users,
      trend: 'up' as const,
      sparklineData: [3.2, 3.5, 3.8, 4.1, 4.3, 4.5, 4.7, 4.8],
      gradient: 'linear-gradient(140deg, rgba(149,183,48,0.75), rgba(240,181,43,0.65))'
    },
    {
      title: 'Total Reach',
      value: '127K',
      change: 15.3,
      icon: Eye,
      trend: 'up' as const,
      sparklineData: [95, 102, 108, 115, 118, 122, 125, 127],
      gradient: 'linear-gradient(150deg, rgba(240,181,43,0.8), rgba(255,215,115,0.6))'
    },
    {
      title: 'Email Open Rate',
      value: '32.4%',
      change: -2.1,
      icon: Mail,
      trend: 'down' as const,
      sparklineData: [35, 34, 33.5, 33, 32.8, 32.5, 32.3, 32.4],
      gradient: 'linear-gradient(135deg, rgba(0,103,129,0.75), rgba(0,191,227,0.65))'
    },
    {
      title: 'Click Rate',
      value: '5.2%',
      change: 3.7,
      icon: MousePointerClick,
      trend: 'up' as const,
      sparklineData: [4.5, 4.7, 4.8, 4.9, 5.0, 5.1, 5.15, 5.2],
      gradient: 'linear-gradient(140deg, rgba(149,183,48,0.75), rgba(240,181,43,0.65))'
    },
    {
      title: 'Followers',
      value: '+1.2K',
      change: 18.9,
      icon: UserPlus,
      trend: 'up' as const,
      sparklineData: [800, 850, 900, 950, 1000, 1100, 1150, 1200],
      gradient: 'linear-gradient(150deg, rgba(240,181,43,0.8), rgba(255,215,115,0.6))'
    },
  ];

  const upcomingTasks = [
    { id: '1', title: 'Review Instagram Campaign', dueDate: 'Today, 2:00 PM', priority: 'high' as const },
    { id: '2', title: 'Finalize LinkedIn Post Copy', dueDate: 'Today, 4:30 PM', priority: 'medium' as const },
    { id: '3', title: 'Schedule Email Blast', dueDate: 'Tomorrow, 10:00 AM', priority: 'high' as const },
    { id: '4', title: 'Update Website Content', dueDate: 'Tomorrow, 3:00 PM', priority: 'low' as const },
  ];

  const recentActivity = [
    { id: '1', action: 'Sarah Chen approved', item: 'Product Launch Campaign', time: '10 mins ago' },
    { id: '2', action: 'Michael Torres edited', item: 'Email Newsletter Draft', time: '25 mins ago' },
    { id: '3', action: 'Alex Kim published', item: 'Instagram Reel', time: '1 hour ago' },
    { id: '4', action: 'Emily Rodriguez commented on', item: 'Q4 Strategy Doc', time: '2 hours ago' },
  ];

  return (
    <div className={`
      min-h-screen
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
    `}>
      {/* Hero Header - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          ${isMobile ? 'mb-6' : 'mb-12'}
        `}
      >
        <Container maxWidth="7xl">
          <div className={`
            primary-gradient text-white
            ${isMobile ? 'rounded-2xl p-6' : isTablet ? 'rounded-3xl p-8' : 'rounded-3xl p-12'}
          `}>
            <VStack gap={isMobile ? 2 : 4}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                <h1 className={`
                  font-semibold
                  ${isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl'}
                `}>
                  Dashboard
                </h1>
                <p className={`
                  text-white/80
                  ${isMobile ? 'text-base mt-2' : 'text-xl mt-4'}
                `}>
                  Welcome back! Here's your content performance overview
                </p>
              </motion.div>

              {/* Quick Actions - Responsive Layout */}
              <HStack 
                gap={isMobile ? 2 : 3} 
                wrap={true}
                className="mt-4"
              >
                <Link to="/calendar">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center gap-2 bg-white/20 hover:bg-white/30
                      text-white font-medium rounded-xl transition-all
                      ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'}
                    `}
                  >
                    <Calendar className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                    <span className={isMobile ? 'hidden sm:inline' : ''}>Calendar</span>
                  </motion.button>
                </Link>
                
                <Link to="/tasks">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center gap-2 bg-white/20 hover:bg-white/30
                      text-white font-medium rounded-xl transition-all
                      ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'}
                    `}
                  >
                    <CheckSquare className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                    <span className={isMobile ? 'hidden sm:inline' : ''}>Tasks</span>
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-2 bg-white text-calypso font-medium
                    rounded-xl transition-all shadow-lg hover:shadow-xl
                    ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base'}
                  `}
                >
                  <Plus className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                  New Campaign
                </motion.button>
              </HStack>
            </VStack>
          </div>
        </Container>
      </motion.div>

      <Container maxWidth="7xl">
        <VStack gap={isMobile ? 6 : 8}>
          {/* Metrics Grid - Fully Responsive */}
          <Grid
            columns={{
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 3
            }}
            gap={isMobile ? 3 : 4}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MetricCard
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  icon={metric.icon}
                  trend={metric.trend}
                  sparklineData={metric.sparklineData}
                  darkMode={isDark}
                />
              </motion.div>
            ))}
          </Grid>

          {/* Main Content - Responsive Two Column Layout */}
          <Grid
            columns={{
              xs: 1,
              lg: 2
            }}
            gap={isMobile ? 4 : 6}
          >
            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`
                glass-panel
                ${isMobile ? 'rounded-xl p-4' : 'rounded-2xl p-6'}
              `}
            >
              <HStack justify="between" align="center" className="mb-6">
                <h2 className={`
                  font-semibold
                  ${isDark ? 'text-white' : 'text-neutral-900'}
                  ${isMobile ? 'text-lg' : 'text-2xl'}
                `}>
                  Upcoming Tasks
                </h2>
                <Link to="/tasks">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      text-calypso hover:text-calypso/80 transition-colors
                      flex items-center gap-1
                      ${isMobile ? 'text-sm' : 'text-base'}
                    `}
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </HStack>

              <VStack gap={3}>
                {upcomingTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    whileHover={{ scale: 1.02 }}
                    className={`
                      p-4 rounded-xl cursor-pointer transition-all
                      ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-neutral-50 hover:bg-neutral-100'}
                    `}
                  >
                    <HStack justify="between" align="start">
                      <VStack gap={1}>
                        <span className={`
                          font-medium
                          ${isDark ? 'text-white' : 'text-neutral-900'}
                          ${isMobile ? 'text-sm' : 'text-base'}
                        `}>
                          {task.title}
                        </span>
                        <span className={`
                          ${isDark ? 'text-white/60' : 'text-neutral-600'}
                          ${isMobile ? 'text-xs' : 'text-sm'}
                        `}>
                          {task.dueDate}
                        </span>
                      </VStack>
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${task.priority === 'high' ? 'priority-high' : 
                          task.priority === 'medium' ? 'priority-medium' : 
                          'priority-low'}
                      `}>
                        {task.priority}
                      </span>
                    </HStack>
                  </motion.div>
                ))}
              </VStack>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={`
                glass-panel
                ${isMobile ? 'rounded-xl p-4' : 'rounded-2xl p-6'}
              `}
            >
              <h2 className={`
                font-semibold mb-6
                ${isDark ? 'text-white' : 'text-neutral-900'}
                ${isMobile ? 'text-lg' : 'text-2xl'}
              `}>
                Recent Activity
              </h2>

              <VStack gap={4}>
                {recentActivity.map((activity) => (
                  <HStack key={activity.id} gap={3} align="start">
                    <div className={`
                      flex-shrink-0 w-2 h-2 rounded-full bg-calypso mt-2
                    `} />
                    <VStack gap={1} className="flex-1">
                      <p className={`
                        ${isDark ? 'text-white' : 'text-neutral-900'}
                        ${isMobile ? 'text-sm' : 'text-base'}
                      `}>
                        <span className="font-medium">{activity.action}</span>
                        {' '}
                        <span className={isDark ? 'text-white/80' : 'text-neutral-700'}>
                          {activity.item}
                        </span>
                      </p>
                      <span className={`
                        ${isDark ? 'text-white/50' : 'text-neutral-500'}
                        ${isMobile ? 'text-xs' : 'text-sm'}
                      `}>
                        {activity.time}
                      </span>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </motion.div>
          </Grid>
        </VStack>
      </Container>
    </div>
  );
}
