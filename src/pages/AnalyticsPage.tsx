/**
 * PAGE 9 — ANALYTICS
 * Full social and email reporting with charts
 */

import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { MetricCard } from '../components/charts/MetricCard';
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Mail,
  MousePointerClick,
  Users,
  Calendar,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';

export function AnalyticsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [dateRange, setDateRange] = useState('last-30-days');
  const [platform, setPlatform] = useState('all');

  // Social Metrics
  const socialMetrics = [
    {
      title: 'Total Reach',
      value: '127K',
      change: 15.3,
      icon: Eye,
      trend: 'up' as const,
      sparklineData: [95, 102, 108, 115, 118, 122, 125, 127],
      gradient: 'linear-gradient(135deg, rgba(0,103,129,0.75), rgba(0,191,227,0.65))'
    },
    {
      title: 'Engagement',
      value: '8.9K',
      change: 22.1,
      icon: Heart,
      trend: 'up' as const,
      sparklineData: [6.2, 6.8, 7.2, 7.8, 8.1, 8.4, 8.7, 8.9],
      gradient: 'linear-gradient(140deg, rgba(149,183,48,0.75), rgba(240,181,43,0.65))'
    },
    {
      title: 'Comments',
      value: '2.4K',
      change: 8.5,
      icon: MessageCircle,
      trend: 'up' as const,
      sparklineData: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.35, 2.4],
      gradient: 'linear-gradient(150deg, rgba(240,181,43,0.8), rgba(255,215,115,0.6))'
    },
    {
      title: 'Shares',
      value: '1.8K',
      change: 12.3,
      icon: Share2,
      trend: 'up' as const,
      sparklineData: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.75, 1.8],
      gradient: 'linear-gradient(135deg, rgba(0,103,129,0.75), rgba(0,191,227,0.65))'
    }
  ];

  // Email Metrics
  const emailMetrics = [
    {
      title: 'Total Sends',
      value: '45.2K',
      change: 5.7,
      icon: Mail,
      trend: 'up' as const,
      sparklineData: [38, 40, 41, 42, 43, 44, 44.5, 45.2],
      gradient: 'linear-gradient(140deg, rgba(149,183,48,0.75), rgba(240,181,43,0.65))'
    },
    {
      title: 'Open Rate',
      value: '32.4%',
      change: -2.1,
      icon: Eye,
      trend: 'down' as const,
      sparklineData: [35, 34, 33.5, 33, 32.8, 32.5, 32.3, 32.4],
      gradient: 'linear-gradient(150deg, rgba(240,181,43,0.8), rgba(255,215,115,0.6))'
    },
    {
      title: 'Click Rate',
      value: '5.2%',
      change: 3.7,
      icon: MousePointerClick,
      trend: 'up' as const,
      sparklineData: [4.5, 4.7, 4.8, 4.9, 5.0, 5.1, 5.15, 5.2],
      gradient: 'linear-gradient(135deg, rgba(0,103,129,0.75), rgba(0,191,227,0.65))'
    },
    {
      title: 'Subscribers',
      value: '12.8K',
      change: 8.9,
      icon: Users,
      trend: 'up' as const,
      sparklineData: [11, 11.5, 11.8, 12.0, 12.2, 12.4, 12.6, 12.8],
      gradient: 'linear-gradient(140deg, rgba(149,183,48,0.75), rgba(240,181,43,0.65))'
    }
  ];

  const topPosts = [
    { id: 1, title: 'Product Reveal Reel', platform: 'Instagram', reach: '45K', engagement: '4.2K' },
    { id: 2, title: 'Behind the Scenes', platform: 'TikTok', reach: '38K', engagement: '3.8K' },
    { id: 3, title: 'Customer Success Story', platform: 'LinkedIn', reach: '22K', engagement: '1.9K' }
  ];

  return (
    <div className={`
      min-h-screen p-8
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
    `}>
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Header with Gradient */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-8 rounded-2xl bg-gradient-accent mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2 text-white">
                Analytics
              </h1>
              <p className="text-white/80">
                Track your content performance across all channels
              </p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 rounded-xl font-medium glass-panel text-white outline-none focus:ring-2 focus:ring-white/40"
              >
                <option value="last-7-days">Last 7 Days</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-90-days">Last 90 Days</option>
              </select>

              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="px-4 py-2 rounded-xl font-medium glass-panel text-white outline-none focus:ring-2 focus:ring-white/40"
              >
                <option value="all">All Platforms</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="linkedin">LinkedIn</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Social Media Analytics */}
        <div>
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}
          >
            Social Media Performance
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <MetricCard {...metric} darkMode={isDark} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Email Analytics */}
        <div>
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}
          >
            Email Marketing Performance
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emailMetrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <MetricCard {...metric} darkMode={isDark} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Performing Posts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            p-6 rounded-2xl backdrop-blur-xl border
            ${isDark ? 'bg-[rgba(15,18,24,0.9)] border-white/10' : 'bg-[rgba(255,255,255,0.9)] border-neutral-200'}
          `}
        >
          <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Top Performing Posts
          </h2>
          
          <div className="space-y-3">
            {topPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  p-4 rounded-xl border flex items-center justify-between
                  ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-neutral-200'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-medium text-white
                    bg-gradient-to-br from-calypso to-calypso-600
                  `}>
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                      {post.platform}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                      Reach
                    </p>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      {post.reach}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                      Engagement
                    </p>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      {post.engagement}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}