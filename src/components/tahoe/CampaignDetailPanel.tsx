import { useState } from 'react';
import { X, Calendar, User, Paperclip, Flag } from 'lucide-react';

interface CampaignDetailPanelProps {
  darkMode: boolean;
  onClose: () => void;
  data?: {
    campaignName: string;
    summary: string;
    assignedDate: string;
    editor: string;
    copywriter: string;
    priority: 'low' | 'medium' | 'high';
    platform: string;
    contentType: string;
    status: string;
  };
}

export function CampaignDetailPanel({ darkMode, onClose, data }: CampaignDetailPanelProps) {
  const [localData, setLocalData] = useState(data || {
    campaignName: 'Q4 Product Launch',
    summary: 'Launch announcement video showcasing new features with customer testimonials',
    assignedDate: '2025-11-20',
    editor: 'Alex Kim',
    copywriter: 'Emma Thompson',
    priority: 'high' as const,
    platform: 'instagram',
    contentType: 'reel',
    status: 'drafting'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${darkMode ? 'bg-black/60' : 'bg-black/40'} backdrop-blur-sm`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`
        relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-3xl p-8
        backdrop-blur-3xl border shadow-2xl
        ${darkMode
          ? 'bg-neutral-900/80 border-white/20 shadow-black/40'
          : 'bg-white/80 border-white/80 shadow-black/20'
        }
      `}>
        {/* Gradient overlay */}
        <div className={`
          absolute inset-0 rounded-3xl pointer-events-none
          ${darkMode
            ? 'bg-gradient-to-br from-white/5 to-transparent'
            : 'bg-gradient-to-br from-white/40 to-transparent'
          }
        `} />

        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h2 className={darkMode ? 'text-white' : 'text-neutral-900'}>
              Campaign Details
            </h2>
            <button
              onClick={onClose}
              className={`
                p-2 rounded-xl transition-all
                ${darkMode
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-black/5 hover:bg-black/10 text-neutral-700'
                }
              `}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Campaign Name */}
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
              Campaign Name
            </label>
            <input
              type="text"
              value={localData.campaignName}
              onChange={(e) => setLocalData({ ...localData, campaignName: e.target.value })}
              className={`
                w-full px-4 py-3 rounded-xl transition-all backdrop-blur-md border
                ${darkMode
                  ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/30'
                  : 'bg-white/60 border-white/80 text-neutral-900 placeholder-neutral-400 focus:bg-white/80 focus:border-neutral-300'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              `}
            />
          </div>

          {/* Post Summary */}
          <div>
            <label className={`block text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
              Post Topic / Description
            </label>
            <textarea
              value={localData.summary}
              onChange={(e) => setLocalData({ ...localData, summary: e.target.value })}
              rows={4}
              className={`
                w-full px-4 py-3 rounded-xl transition-all backdrop-blur-md border resize-none
                ${darkMode
                  ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/30'
                  : 'bg-white/60 border-white/80 text-neutral-900 placeholder-neutral-400 focus:bg-white/80 focus:border-neutral-300'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              `}
            />
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Assigned Date */}
            <div>
              <label className={`flex items-center gap-2 text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                <Calendar className="w-4 h-4" />
                Assigned Date
              </label>
              <input
                type="date"
                value={localData.assignedDate}
                onChange={(e) => setLocalData({ ...localData, assignedDate: e.target.value })}
                className={`
                  w-full px-4 py-3 rounded-xl transition-all backdrop-blur-md border
                  ${darkMode
                    ? 'bg-white/10 border-white/20 text-white focus:bg-white/15 focus:border-white/30'
                    : 'bg-white/60 border-white/80 text-neutral-900 focus:bg-white/80 focus:border-neutral-300'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                `}
              />
            </div>

            {/* Priority */}
            <div>
              <label className={`flex items-center gap-2 text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                <Flag className="w-4 h-4" />
                Priority
              </label>
              <select
                value={localData.priority}
                onChange={(e) => setLocalData({ ...localData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                className={`
                  w-full px-4 py-3 rounded-xl transition-all backdrop-blur-md border
                  ${darkMode
                    ? 'bg-white/10 border-white/20 text-white focus:bg-white/15 focus:border-white/30'
                    : 'bg-white/60 border-white/80 text-neutral-900 focus:bg-white/80 focus:border-neutral-300'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                `}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Editor & Copywriter */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`flex items-center gap-2 text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                <User className="w-4 h-4" />
                Editor (Visuals)
              </label>
              <input
                type="text"
                value={localData.editor}
                onChange={(e) => setLocalData({ ...localData, editor: e.target.value })}
                className={`
                  w-full px-4 py-3 rounded-xl transition-all backdrop-blur-md border
                  ${darkMode
                    ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/30'
                    : 'bg-white/60 border-white/80 text-neutral-900 placeholder-neutral-400 focus:bg-white/80 focus:border-neutral-300'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                `}
              />
            </div>

            <div>
              <label className={`flex items-center gap-2 text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
                <User className="w-4 h-4" />
                Copywriter
              </label>
              <input
                type="text"
                value={localData.copywriter}
                onChange={(e) => setLocalData({ ...localData, copywriter: e.target.value })}
                className={`
                  w-full px-4 py-3 rounded-xl transition-all backdrop-blur-md border
                  ${darkMode
                    ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/30'
                    : 'bg-white/60 border-white/80 text-neutral-900 placeholder-neutral-400 focus:bg-white/80 focus:border-neutral-300'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                `}
              />
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className={`flex items-center gap-2 text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-neutral-600'}`}>
              <Paperclip className="w-4 h-4" />
              Attachments
            </label>
            <div className={`
              p-6 rounded-xl border-2 border-dashed text-center transition-all cursor-pointer
              ${darkMode
                ? 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                : 'bg-white/40 border-neutral-300 hover:bg-white/60 hover:border-neutral-400'
              }
            `}>
              <Paperclip className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-white/40' : 'text-neutral-400'}`} />
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}>
                Click to upload files or drag and drop
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button className={`
              flex-1 px-6 py-3 rounded-xl transition-all shadow-lg
              ${darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }
            `}>
              Save Changes
            </button>
            <button
              onClick={onClose}
              className={`
                px-6 py-3 rounded-xl transition-all
                ${darkMode
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-black/5 hover:bg-black/10 text-neutral-700'
                }
              `}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
