/**
 * PAGE 2 — DASHBOARD
 * Overview hub with metrics, charts, tasks, and quick actions
 */

import { useTheme } from '../contexts/ThemeContext';
import { MetricCard } from '../components/charts/MetricCard';
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

export function DashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
    }
  ];

  const upcomingTasks = [
    { id: 1, title: 'Review Instagram reel', campaign: 'Product Launch', due: 'Today', priority: 'high' },
    { id: 2, title: 'Finalize blog post copy', campaign: 'Thought Leadership', due: 'Tomorrow', priority: 'medium' },
    { id: 3, title: 'Schedule newsletter', campaign: 'Monthly Update', due: 'Nov 20', priority: 'low' }
  ];

  const recentActivity = [
    { id: 1, user: 'Alex Kim', action: 'completed editing on', item: 'Instagram Reel #47', time: '2 hours ago' },
    { id: 2, user: 'Emily Torres', action: 'submitted copy for', item: 'Blog Post: Success Story', time: '4 hours ago' },
    { id: 3, user: 'Sarah Miller', action: 'scheduled', item: 'Facebook Campaign', time: '5 hours ago' }
  ];

  return (
    <div className={`
      min-h-screen p-8
      ${isDark
        ? 'bg-[#050609]'
        : 'bg-[#f7f7f7]'
      }
    `}>
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Header with Gradient */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-8 rounded-2xl bg-gradient-primary mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2 text-white">
                Dashboard
              </h1>
              <p className="text-white/80">
                Welcome back! Here's your content overview.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <Link to="/calendar">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    flex items-center gap-2 px-5 py-3 rounded-xl font-medium
                    glass-panel text-white
                    transition-all shadow-lg
                  "
                >
                  <Calendar className="w-5 h-5" />
                  New Campaign
                </motion.button>
              </Link>
              <Link to="/tasks">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    flex items-center gap-2 px-5 py-3 rounded-xl font-medium
                    bg-tulip text-white
                    transition-all shadow-lg hover:shadow-xl
                  "
                >
                  <Plus className="w-5 h-5" />
                  New Task
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <MetricCard {...metric} darkMode={isDark} />
            </motion.div>
          ))}
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Tasks */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl glass-panel shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Upcoming Tasks
              </h2>
              <Link to="/tasks">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 text-sm font-medium text-calypso hover:text-calypso-600"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <motion.div
                  key={task.id}
                  whileHover={{ x: 4 }}
                  className={`
                    p-4 rounded-xl border cursor-pointer
                    ${isDark
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-white border-neutral-200 hover:bg-neutral-50'
                    }
                    transition-all
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckSquare className="w-4 h-4 text-calypso" />
                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                          {task.title}
                        </h3>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                        {task.campaign}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xs ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                        {task.due}
                      </span>
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${task.priority === 'high'
                          ? 'priority-high'
                          : task.priority === 'medium'
                          ? 'priority-medium'
                          : 'bg-pistachio/20 text-pistachio-600'
                        }
                      `}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl glass-panel shadow-lg"
          >
            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Recent Activity
            </h2>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center text-white font-medium text-sm shadow-lg flex-shrink-0">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      <span className="font-medium">{activity.user}</span>
                      {' '}{activity.action}{' '}
                      <span className="font-medium">{activity.item}</span>
                    </p>
                    <p className={`text-xs ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}