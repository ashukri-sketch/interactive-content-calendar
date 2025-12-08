/**
 * TAHOE CALENDAR COMPONENTS - Campaign Detail Panel
 * Side sheet/modal for viewing and editing full campaign details
 */

import { X, Flag, Paperclip, Upload } from 'lucide-react';
import { StatusBlock, StatusBlockData } from '../status-system/StatusBlock';

interface CampaignDetailPanelProps {
  data: StatusBlockData & {
    priority: 'low' | 'medium' | 'high';
    attachments?: string[];
  };
  darkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
  onChange?: (data: any) => void;
}

export function CampaignDetailPanel({
  data,
  darkMode,
  isOpen,
  onClose,
  onChange
}: CampaignDetailPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[500px] z-50
          backdrop-blur-3xl border-l shadow-2xl
          animate-in slide-in-from-right duration-300
          ${darkMode
            ? 'bg-neutral-900/90 border-white/20'
            : 'bg-white/90 border-neutral-200'
          }
        `}
      >
        {/* Gradient overlay */}
        <div className={`
          absolute inset-0 pointer-events-none
          ${darkMode
            ? 'bg-gradient-to-br from-white/5 to-transparent'
            : 'bg-gradient-to-br from-white/40 to-transparent'
          }
        `} />

        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className={`
            flex items-center justify-between p-6 border-b
            ${darkMode ? 'border-white/20' : 'border-neutral-200'}
          `}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              Campaign Details
            </h2>
            <button
              onClick={onClose}
              className={`
                p-2 rounded-xl transition-all
                ${darkMode
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-neutral-100 text-neutral-700'
                }
              `}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Status Block - Expanded variant */}
            <StatusBlock
              data={data}
              onChange={onChange}
              darkMode={darkMode}
              variant="expanded"
              editable={true}
            />

            {/* Priority Tag */}
            <div>
              <label className={`
                text-xs font-medium mb-2 block
                ${darkMode ? 'text-white/60' : 'text-neutral-600'}
              `}>
                Priority
              </label>
              <PriorityTag priority={data.priority} darkMode={darkMode} />
            </div>

            {/* Attachments Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={`
                  text-xs font-medium
                  ${darkMode ? 'text-white/60' : 'text-neutral-600'}
                `}>
                  Attachments
                </label>
                <button className={`
                  flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium
                  transition-all
                  ${darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }
                `}>
                  <Upload className="w-3.5 h-3.5" />
                  Upload
                </button>
              </div>

              <div className={`
                p-4 rounded-xl border-2 border-dashed
                ${darkMode
                  ? 'border-white/20 bg-white/5'
                  : 'border-neutral-300 bg-neutral-50'
                }
              `}>
                {data.attachments && data.attachments.length > 0 ? (
                  <div className="space-y-2">
                    {data.attachments.map((file, i) => (
                      <AttachmentItem key={i} filename={file} darkMode={darkMode} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Paperclip className={`
                      w-8 h-8 mx-auto mb-2
                      ${darkMode ? 'text-white/40' : 'text-neutral-400'}
                    `} />
                    <p className={`
                      text-sm
                      ${darkMode ? 'text-white/60' : 'text-neutral-600'}
                    `}>
                      No attachments yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className={`
            p-6 border-t
            ${darkMode ? 'border-white/20' : 'border-neutral-200'}
          `}>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className={`
                  flex-1 px-4 py-2.5 rounded-xl font-medium transition-all
                  ${darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }
                `}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2.5 rounded-xl font-medium bg-calypso hover:bg-calypso/90 text-white transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PriorityTag({
  priority,
  darkMode
}: {
  priority: 'low' | 'medium' | 'high';
  darkMode: boolean;
}) {
  const config = {
    low: {
      label: 'Low Priority',
      color: 'bg-green-500',
      lightBg: 'bg-green-100',
      lightText: 'text-green-700',
      lightBorder: 'border-green-300'
    },
    medium: {
      label: 'Medium Priority',
      color: 'bg-yellow-500',
      lightBg: 'bg-yellow-100',
      lightText: 'text-yellow-700',
      lightBorder: 'border-yellow-300'
    },
    high: {
      label: 'High Priority',
      color: 'bg-red-500',
      lightBg: 'bg-red-100',
      lightText: 'text-red-700',
      lightBorder: 'border-red-300'
    }
  };

  const { label, color, lightBg, lightText, lightBorder } = config[priority];

  return (
    <div className={`
      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
      ${darkMode
        ? `${color} text-white`
        : `${lightBg} ${lightText} border ${lightBorder}`
      }
    `}>
      <Flag className="w-3.5 h-3.5" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

function AttachmentItem({ filename, darkMode }: { filename: string; darkMode: boolean }) {
  return (
    <div className={`
      flex items-center gap-2 p-2 rounded-lg
      ${darkMode
        ? 'bg-white/10 hover:bg-white/20'
        : 'bg-white hover:bg-neutral-50'
      }
      transition-colors
    `}>
      <Paperclip className={`w-4 h-4 ${darkMode ? 'text-white/60' : 'text-neutral-600'}`} />
      <span className={`text-sm flex-1 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
        {filename}
      </span>
    </div>
  );
}
