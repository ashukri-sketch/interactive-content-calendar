import { useState } from 'react';
import { Send, Paperclip, Smile, MoreVertical, User } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isCurrentUser?: boolean;
  hasAttachment?: boolean;
  attachmentName?: string;
}

interface TeamChatViewProps {
  darkMode: boolean;
  messages: Message[];
  onSendMessage: (content: string, attachment?: File) => void;
}

export function TeamChatView({ darkMode, messages, onSendMessage }: TeamChatViewProps) {
  const [messageText, setMessageText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSend = () => {
    if (messageText.trim() || selectedFile) {
      onSendMessage(messageText, selectedFile || undefined);
      setMessageText('');
      setSelectedFile(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col h-[700px]">
      {/* Chat Header */}
      <div className="
        flex items-center justify-between p-4 rounded-t-xl
        bg-white dark:bg-white/10
        border-b border-white-950/10 dark:border-white/20
      ">
        <div>
          <h3 className="text-white-950 dark:text-white">
            Team Chat
          </h3>
          <p className="text-sm text-white-950/60 dark:text-white/60">
            8 members online
          </p>
        </div>
        <button className="
          p-2 rounded-lg
          hover:bg-white-950/10 dark:hover:bg-white/10
          transition-colors
        ">
          <MoreVertical className="w-5 h-5 text-white-950 dark:text-white" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="
        flex-1 overflow-y-auto p-4 space-y-4
        bg-white dark:bg-white/5
      ">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} darkMode={darkMode} />
        ))}
      </div>

      {/* Input Area */}
      <div className="
        p-4 rounded-b-xl
        bg-white dark:bg-white/10
        border-t border-white-950/10 dark:border-white/20
      ">
        {/* File preview */}
        {selectedFile && (
          <div className="
            mb-3 p-3 rounded-lg flex items-center justify-between
            bg-calypso/10 border border-calypso/30
          ">
            <div className="flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-calypso" />
              <span className="text-sm text-white-950 dark:text-white">
                {selectedFile.name}
              </span>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-xs text-white-950/60 dark:text-white/60 hover:text-red-500"
            >
              Remove
            </button>
          </div>
        )}

        <div className="flex items-end gap-2">
          {/* Attachment button */}
          <label className="
            p-2.5 rounded-lg cursor-pointer
            bg-white-950/10 dark:bg-white/10
            hover:bg-white-950/20 dark:hover:bg-white/20
            transition-colors
          ">
            <Paperclip className="w-5 h-5 text-white-950 dark:text-white" />
            <input
              type="file"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>

          {/* Message input */}
          <div className="flex-1 relative">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="
                w-full px-4 py-2.5 pr-12 rounded-lg resize-none
                bg-white-950/10 dark:bg-white/10
                border border-white-950/20 dark:border-white/20
                text-white-950 dark:text-white
                placeholder-white-950/40 dark:placeholder-white/40
                focus:outline-none focus:ring-2 focus:ring-calypso
                transition-all
              "
            />
            <button className="
              absolute right-2 bottom-2 p-1.5 rounded-lg
              hover:bg-white-950/10 dark:hover:bg-white/10
              transition-colors
            ">
              <Smile className="w-5 h-5 text-white-950/60 dark:text-white/60" />
            </button>
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!messageText.trim() && !selectedFile}
            className="
              p-2.5 rounded-lg
              bg-calypso hover:bg-calypso/90 text-white
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all
            "
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({
  message,
  darkMode
}: {
  message: Message;
  darkMode: boolean;
}) {
  return (
    <div className={`flex gap-3 ${message.isCurrentUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className="
        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
        bg-gradient-to-br from-calypso to-calypso-600 text-white text-sm
      ">
        {message.sender.split(' ').map(n => n[0]).join('')}
      </div>

      {/* Message bubble */}
      <div className={`flex flex-col max-w-[60%] ${message.isCurrentUser ? 'items-end' : 'items-start'}`}>
        {/* Sender name & timestamp */}
        <div className="flex items-center gap-2 mb-1 px-1">
          {!message.isCurrentUser && (
            <span className="text-sm text-white-950 dark:text-white">
              {message.sender}
            </span>
          )}
          <span className="text-xs text-white-950/60 dark:text-white/60">
            {message.timestamp}
          </span>
        </div>

        {/* Message content */}
        <div className={`
          px-4 py-2.5 rounded-2xl
          ${message.isCurrentUser
            ? 'bg-calypso text-white rounded-br-sm'
            : darkMode
            ? 'bg-white/10 text-white rounded-bl-sm'
            : 'bg-white text-white-950 border border-white-950/10 rounded-bl-sm'
          }
        `}>
          <p className="text-sm whitespace-pre-wrap">
            {message.content}
          </p>

          {/* Attachment */}
          {message.hasAttachment && message.attachmentName && (
            <div className={`
              mt-2 p-2 rounded-lg flex items-center gap-2
              ${message.isCurrentUser
                ? 'bg-white/20'
                : darkMode
                ? 'bg-white/10'
                : 'bg-white-950/10'
              }
            `}>
              <Paperclip className="w-4 h-4" />
              <span className="text-xs">{message.attachmentName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
