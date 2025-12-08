/**
 * PAGE 5 — TASKS (Kanban Board)
 * Drag-and-drop task management
 */

import { useTheme } from '../contexts/ThemeContext';
import { TaskBoard, SAMPLE_TASKS } from '../components/team-tasks';
import { motion } from 'motion/react';

export function TasksPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`
      min-h-screen p-8
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
    `}>
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 p-8 rounded-2xl bg-gradient-primary"
        >
          <h1 className="text-3xl font-semibold mb-2 text-white">
            Tasks
          </h1>
          <p className="text-white/80">
            Manage your content workflow
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <TaskBoard
            tasks={SAMPLE_TASKS}
            darkMode={isDark}
            variant="full"
          />
        </motion.div>
      </div>
    </div>
  );
}