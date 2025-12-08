/**
 * PAGE 8 — CHAT / MESSAGES
 * Team messaging interface
 */

import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  isOwn: boolean;
}

export function ChatPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [newMessage, setNewMessage] = useState('');

  const channels = [
    { id: 1, name: 'General', unread: 3 },
    { id: 2, name: 'Product Launch', unread: 0 },
    { id: 3, name: 'Content Ideas', unread: 1 }
  ];

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: 'Sarah Miller', text: 'Hey team! Just finished the new campaign brief.', time: '10:30 AM', isOwn: false },
    { id: 2, user: 'You', text: 'Great! I\'ll review it this afternoon.', time: '10:32 AM', isOwn: true },
    { id: 3, user: 'Alex Kim', text: 'Can someone check the Instagram post scheduled for Friday?', time: '11:15 AM', isOwn: false },
    { id: 4, user: 'Emily Torres', text: 'I\'ll take a look!', time: '11:17 AM', isOwn: false }
  ]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: messages.length + 1,
      user: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className={`
      min-h-screen p-8
      ${isDark ? 'bg-[#050609]' : 'bg-[#f7f7f7]'}
    `}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-6 p-8 rounded-2xl bg-gradient-secondary">
          <h1 className="text-3xl font-semibold mb-2 text-white">
            Team Chat
          </h1>
          <p className="text-white/80">
            Collaborate with your team in real-time
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-6 h-[calc(100vh-280px)]">
          {/* Channel List */}
          <div className="col-span-1 p-6 rounded-2xl glass-panel">
            <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Channels
            </h2>
            <div className="space-y-2">
              {channels.map(channel => (
                <motion.button
                  key={channel.id}
                  whileHover={{ x: 4 }}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl flex items-center justify-between
                    ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-neutral-100 text-neutral-900'}
                    ${channel.id === 1 ? (isDark ? 'bg-white/10' : 'bg-neutral-100') : ''}
                  `}
                >
                  <span className="font-medium">#{channel.name}</span>
                  {channel.unread > 0 && (
                    <span className="notification-badge">{channel.unread}</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`
            col-span-3 rounded-2xl backdrop-blur-xl border flex flex-col
            ${isDark ? 'bg-[rgba(15,18,24,0.9)] border-white/10' : 'bg-[rgba(255,255,255,0.9)] border-neutral-200'}
          `}>
            {/* Chat Header */}
            <div className={`
              px-6 py-4 border-b flex items-center justify-between
              ${isDark ? 'border-white/10' : 'border-neutral-200'}
            `}>
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                #General
              </h2>
              <button className={`p-2 rounded-xl ${isDark ? 'hover:bg-white/10' : 'hover:bg-neutral-100'}`}>
                <MoreVertical className={`w-5 h-5 ${isDark ? 'text-white' : 'text-neutral-700'}`} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}
                >
                  {!message.isOwn && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-calypso to-calypso-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                      {message.user.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div className={`flex-1 max-w-[70%] ${message.isOwn ? 'flex flex-col items-end' : ''}`}>
                    {!message.isOwn && (
                      <span className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        {message.user}
                      </span>
                    )}
                    <div className={`
                      px-4 py-3 rounded-2xl
                      ${message.isOwn
                        ? 'bg-gradient-to-r from-calypso to-calypso-600 text-white'
                        : isDark
                        ? 'bg-white/10 text-white'
                        : 'bg-neutral-100 text-neutral-900'
                      }
                    `}>
                      {message.text}
                    </div>
                    <span className={`text-xs mt-1 ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                      {message.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className={`
              p-4 border-t
              ${isDark ? 'border-white/10' : 'border-neutral-200'}
            `}>
              <div className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                ${isDark ? 'bg-white/10 border border-white/20' : 'bg-white border border-neutral-300'}
              `}>
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-neutral-100'}`}>
                  <Paperclip className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-neutral-600'}`} />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className={`
                    flex-1 bg-transparent outline-none
                    ${isDark ? 'text-white placeholder-white/40' : 'text-neutral-900 placeholder-neutral-400'}
                  `}
                />
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-neutral-100'}`}>
                  <Smile className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-neutral-600'}`} />
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="p-2 rounded-lg bg-gradient-to-r from-calypso to-calypso-600 text-white"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}