/**
 * PAGE 4 — CAMPAIGN DETAIL
 * Full campaign details with status block and attachments
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { StatusBlock, type StatusBlockData } from '../components/status-system/StatusBlock';
import { X, Paperclip, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function CampaignDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Sample data
  const campaignData: StatusBlockData = {
    campaignName: 'Product Launch Campaign',
    platform: 'instagram',
    contentType: 'reel-short',
    contentSummary: 'Exciting product reveal with behind-the-scenes footage and customer testimonials. Focus on key features and benefits with strong call-to-action.',
    assignedDate: '2025-11-15',
    editor: 'Alex Kim',
    copywriter: 'Emily Torres',
    workflowStatus: 'drafting'
  };

  const attachments = [
    'campaign-brief.pdf',
    'mood-board.jpg',
    'script-v2.docx'
  ];

  const comments = [
    { id: 1, user: 'Sarah Miller', text: 'Looks great! Just need to adjust the CTA timing.', time: '2 hours ago' },
    { id: 2, user: 'Alex Kim', text: 'Updated the transitions. Ready for review.', time: '4 hours ago' }
  ];

  return (
    <div className={`
      min-h-screen
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
    `}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={() => navigate(-1)}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 h-full w-[600px] z-50 glass-panel border-l shadow-2xl overflow-y-auto"
      >
        {/* Header */}
        <div className={`
          sticky top-0 z-10 backdrop-blur-3xl
          flex items-center justify-between p-6 border-b
          ${isDark ? 'border-white/20 bg-[rgba(5,6,9,0.9)]' : 'border-neutral-200 bg-[rgba(255,255,255,0.9)]'}
        `}>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Campaign Details
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className={`
              p-2 rounded-xl transition-all
              ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-neutral-100 text-neutral-700'}
            `}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Block */}
          <StatusBlock
            data={campaignData}
            darkMode={isDark}
            variant="expanded"
            editable={true}
          />

          {/* Attachments */}
          <div className={`
            p-6 rounded-2xl border
            ${isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-neutral-200'}
          `}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Attachments
            </h3>
            <div className="space-y-2">
              {attachments.map((file, i) => (
                <div
                  key={i}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl
                    ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-neutral-50'}
                    transition-all cursor-pointer
                  `}
                >
                  <Paperclip className={`w-4 h-4 ${isDark ? 'text-white/60' : 'text-neutral-600'}`} />
                  <span className={`text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>{file}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className={`
            p-6 rounded-2xl border
            ${isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-neutral-200'}
          `}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Comments
            </h3>
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-calypso to-calypso-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    {comment.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        {comment.user}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                        {comment.time}
                      </span>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-white/80' : 'text-neutral-700'}`}>
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}