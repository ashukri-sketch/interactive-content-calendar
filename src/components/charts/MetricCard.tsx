/**
 * METRIC CARD COMPONENT
 * Displays a single metric with sparkline and change indicator
 */

import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number; // Percentage change
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  sparklineData?: number[];
  darkMode: boolean;
  gradient?: string;
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  trend = 'neutral',
  sparklineData,
  darkMode,
  gradient
}: MetricCardProps) {
  const trendColor = 
    trend === 'up' ? 'text-green-500' :
    trend === 'down' ? 'text-red-500' :
    'text-yellow-500';

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden p-6 rounded-2xl glass-panel shadow-lg hover:shadow-xl transition-all"
    >
      {/* Background Gradient */}
      {gradient && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{ background: gradient }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
              {title}
            </p>
            <h3 className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              {value}
            </h3>
          </div>
          
          <div className="p-3 rounded-xl bg-calypso/10">
            <Icon className="w-6 h-6 text-calypso" />
          </div>
        </div>

        {/* Change Indicator */}
        {change !== undefined && (
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${trendColor}`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
              vs last period
            </span>
          </div>
        )}

        {/* Sparkline */}
        {sparklineData && sparklineData.length > 0 && (
          <div className="mt-4 h-12">
            <Sparkline data={sparklineData} darkMode={darkMode} color={gradient} />
          </div>
        )}
      </div>

      {/* Shimmer Effect on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}

function Sparkline({ data, darkMode, color }: { data: number[]; darkMode: boolean; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const width = 100;
  const height = 100;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${Math.random()}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={darkMode ? '#00bfe3' : '#006781'} stopOpacity="0.3" />
          <stop offset="100%" stopColor={darkMode ? '#00bfe3' : '#006781'} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={darkMode ? '#00bfe3' : '#006781'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#gradient-${Math.random()})`}
      />
    </svg>
  );
}