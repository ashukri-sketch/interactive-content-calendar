/**
 * PAGE 6 — TEAM DIRECTORY
 * Team member management with search and filters
 */

import { useTheme } from '../contexts/ThemeContext';
import { TeamMembersPanel, SAMPLE_TEAM_MEMBERS } from '../components/team-tasks';
import { motion } from 'motion/react';

export function TeamPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`
      min-h-screen p-8
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
    `}>
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 p-8 rounded-2xl bg-gradient-secondary"
        >
          <h1 className="text-3xl font-semibold mb-2 text-white">
            Team Directory
          </h1>
          <p className="text-white/80">
            Your content creation team
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <TeamMembersPanel
            members={SAMPLE_TEAM_MEMBERS}
            darkMode={isDark}
          />
        </motion.div>
      </div>
    </div>
  );
}