import { TrendingUp, TrendingDown, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface DashboardMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  completedThisMonth: number;
  overdueItems: number;
  teamUtilization: number;
  avgCompletionTime: number;
  platformBreakdown: { platform: string; count: number }[];
  priorityBreakdown: { priority: string; count: number }[];
}

interface DashboardViewProps {
  darkMode: boolean;
  metrics: DashboardMetrics;
}

export function DashboardView({ darkMode, metrics }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Calendar}
          label="Total Campaigns"
          value={metrics.totalCampaigns}
          change={12}
          darkMode={darkMode}
          color="calypso"
        />
        <MetricCard
          icon={CheckCircle}
          label="Active Projects"
          value={metrics.activeCampaigns}
          change={8}
          darkMode={darkMode}
          color="pistachio"
        />
        <MetricCard
          icon={Clock}
          label="Completed This Month"
          value={metrics.completedThisMonth}
          change={-3}
          darkMode={darkMode}
          color="tulip"
        />
        <MetricCard
          icon={AlertCircle}
          label="Overdue Items"
          value={metrics.overdueItems}
          change={-15}
          darkMode={darkMode}
          color="error"
          isNegativeGood
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Breakdown */}
        <div className="
          p-6 rounded-xl
          bg-white dark:bg-white/10
          border border-white-950/10 dark:border-white/20
        ">
          <h3 className="text-white-950 dark:text-white mb-4">
            Platform Distribution
          </h3>
          <div className="space-y-3">
            {metrics.platformBreakdown.map(item => (
              <PlatformBar
                key={item.platform}
                platform={item.platform}
                count={item.count}
                total={metrics.totalCampaigns}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="
          p-6 rounded-xl
          bg-white dark:bg-white/10
          border border-white-950/10 dark:border-white/20
        ">
          <h3 className="text-white-950 dark:text-white mb-4">
            Priority Distribution
          </h3>
          <div className="space-y-3">
            {metrics.priorityBreakdown.map(item => (
              <PriorityBar
                key={item.priority}
                priority={item.priority as 'high' | 'medium' | 'low'}
                count={item.count}
                total={metrics.totalCampaigns}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team Utilization */}
        <div className="
          p-6 rounded-xl
          bg-white dark:bg-white/10
          border border-white-950/10 dark:border-white/20
        ">
          <h3 className="text-white-950 dark:text-white mb-4">
            Team Utilization
          </h3>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-bold text-calypso">
              {metrics.teamUtilization}%
            </span>
            <TrendingUp className="w-6 h-6 text-green-500 mb-2" />
          </div>
          <div className="w-full h-3 bg-white-950/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-calypso to-calypso-600 transition-all"
              style={{ width: `${metrics.teamUtilization}%` }}
            />
          </div>
        </div>

        {/* Avg Completion Time */}
        <div className="
          p-6 rounded-xl
          bg-white dark:bg-white/10
          border border-white-950/10 dark:border-white/20
        ">
          <h3 className="text-white-950 dark:text-white mb-4">
            Avg. Completion Time
          </h3>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-bold text-pistachio">
              {metrics.avgCompletionTime}
            </span>
            <span className="text-xl text-white-950/60 dark:text-white/60 mb-2">
              days
            </span>
            <TrendingDown className="w-6 h-6 text-green-500 mb-2" />
          </div>
          <p className="text-sm text-white-950/60 dark:text-white/60">
            3 days faster than last month
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  darkMode,
  color,
  isNegativeGood = false
}: {
  icon: any;
  label: string;
  value: number;
  change: number;
  darkMode: boolean;
  color: 'calypso' | 'pistachio' | 'tulip' | 'error';
  isNegativeGood?: boolean;
}) {
  const isPositive = isNegativeGood ? change < 0 : change > 0;
  const colorClasses = {
    calypso: 'bg-calypso/10 text-calypso',
    pistachio: 'bg-pistachio/10 text-pistachio',
    tulip: 'bg-tulip/10 text-tulip',
    error: 'bg-red-500/10 text-red-500'
  };

  return (
    <div className="
      p-6 rounded-xl
      bg-white dark:bg-white/10
      border border-white-950/10 dark:border-white/20
    ">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-sm text-white-950/60 dark:text-white/60 mb-1">
        {label}
      </p>
      <p className="text-3xl font-bold text-white-950 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function PlatformBar({
  platform,
  count,
  total,
  darkMode
}: {
  platform: string;
  count: number;
  total: number;
  darkMode: boolean;
}) {
  const percentage = (count / total) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-white-950 dark:text-white capitalize">
          {platform}
        </span>
        <span className="text-sm text-white-950/60 dark:text-white/60">
          {count} ({percentage.toFixed(0)}%)
        </span>
      </div>
      <div className="w-full h-2 bg-white-950/10 dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-calypso transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function PriorityBar({
  priority,
  count,
  total,
  darkMode
}: {
  priority: 'high' | 'medium' | 'low';
  count: number;
  total: number;
  darkMode: boolean;
}) {
  const percentage = (count / total) * 100;
  const colors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-white-950 dark:text-white capitalize">
          {priority} Priority
        </span>
        <span className="text-sm text-white-950/60 dark:text-white/60">
          {count} ({percentage.toFixed(0)}%)
        </span>
      </div>
      <div className="w-full h-2 bg-white-950/10 dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors[priority]} transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
