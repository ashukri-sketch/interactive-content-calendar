/**
 * TOP NAVIGATION BAR
 * Global navigation with theme toggle, user profile, and notifications
 */

import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  MessageSquare, 
  BarChart3,
  Settings,
  Bell,
  Moon,
  Sun,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';

export function TopNavBar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isDark = theme === 'dark';

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
    { path: '/team', label: 'Team', icon: Users },
    { path: '/chat', label: 'Chat', icon: MessageSquare },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`
        sticky top-0 z-50 px-6 py-3 glass-panel shadow-lg
      `}
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Content Calendar
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl font-medium
                    transition-all duration-200
                    ${active
                      ? 'bg-gradient-primary text-white shadow-lg'
                      : isDark
                      ? 'text-white/70 hover:bg-white/10'
                      : 'text-neutral-700 hover:bg-neutral-100'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={toggleTheme}
            className={`
              p-2.5 rounded-xl transition-all glass-panel
            `}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-neutral-700" />}
            </motion.div>
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className={`
              relative p-2.5 rounded-xl transition-all glass-panel
            `}
          >
            <Bell className={`w-5 h-5 ${isDark ? 'text-white' : 'text-neutral-700'}`} />
            <span className="absolute -top-1 -right-1 notification-badge">
              3
            </span>
          </motion.button>

          {/* Settings */}
          <Link to="/settings">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className={`
                p-2.5 rounded-xl transition-all glass-panel
              `}
            >
              <Settings className={`w-5 h-5 ${isDark ? 'text-white' : 'text-neutral-700'}`} />
            </motion.button>
          </Link>

          {/* User Profile */}
          {user && (
            <div className="flex items-center gap-3 pl-3 ml-3 border-l border-white/20">
              <div className="text-right">
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {user.name}
                </p>
                <p className={`text-xs ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                  {user.role}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center text-white font-medium shadow-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={logout}
                className={`
                  p-2 rounded-xl transition-all
                  ${isDark
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                    : 'bg-red-100 hover:bg-red-200 text-red-700'
                  }
                `}
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}