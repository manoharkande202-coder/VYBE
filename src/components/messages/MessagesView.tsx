import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  ArrowLeft,
  Sparkles,
  Info,
  Check,
  CheckCheck,
  Smile,
  Paperclip,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { calculateVibeMatch } from '../../utils/matching';

export const MessagesView: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    currentUser,
    profiles,
    openProfileModal,
  } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active conversation
  const activeConversation = conversations.find((c) => c.id === activeConversationId) || conversations[0];
  const participant = activeConversation
    ? profiles.find((p) => p.id === activeConversation.participantId)
    : null;

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !participant) return;

    sendMessage(participant.id, messageInput.trim());
    setMessageInput('');
  };

  const selectConversation = (convId: string) => {
    setActiveConversationId(convId);
    setMobileThreadOpen(true);
  };

  const vibe = participant ? calculateVibeMatch(currentUser, participant) : null;

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col pb-4">
      {/* Header Info */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-violet-400" />
            <span>Kindred Messenger</span>
          </h1>
          <p className="text-[11px] text-zinc-400">
            High-bandwidth conversations with your verified connections.
          </p>
        </div>

        {/* Demo Disclaimer */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-800/30 text-[11px] text-violet-300">
          <Info className="w-3.5 h-3.5 text-violet-400" />
          <span>Demo mode: messages persist in LocalStorage</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 min-h-0 bg-[#0F0F16] border border-white/[0.08] rounded-2xl overflow-hidden flex relative">
        {/* Left: Conversation List */}
        <div
          className={`${
            mobileThreadOpen ? 'hidden md:flex' : 'flex'
          } w-full md:w-80 shrink-0 border-r border-white/[0.08] flex-col bg-[#0D0D14]`}
        >
          {/* Conversation List Header */}
          <div className="p-3.5 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Conversations ({conversations.length})
            </span>
          </div>

          {/* Conversation List Scrollable */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-500">
                No conversations yet. Visit Discover to say hi!
              </div>
            ) : (
              conversations.map((conv) => {
                const otherUser = profiles.find((p) => p.id === conv.participantId);
                const isSelected = activeConversation?.id === conv.id;

                if (!otherUser) return null;

                return (
                  <button
                    key={conv.id}
                    onClick={() => selectConversation(conv.id)}
                    className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors ${
                      isSelected
                        ? 'bg-violet-600/15 border-l-2 border-violet-500'
                        : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <Avatar
                      src={otherUser.avatar}
                      name={otherUser.name}
                      size="md"
                      online={otherUser.online}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-white truncate">
                          {otherUser.name}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {conv.lastMessage?.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate leading-snug">
                        {conv.lastMessage?.text || 'Started a conversation'}
                      </p>
                    </div>

                    {conv.unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-violet-600 text-white font-mono text-[10px]">
                        {conv.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Active Chat Window */}
        <div
          className={`${
            mobileThreadOpen ? 'flex' : 'hidden md:flex'
          } flex-1 flex-col bg-[#111119] min-w-0`}
        >
          {participant ? (
            <>
              {/* Chat Window Top Bar */}
              <div className="p-3.5 px-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0E0E16]">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => setMobileThreadOpen(false)}
                    className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div
                    onClick={() => openProfileModal(participant.id)}
                    className="flex items-center gap-3 cursor-pointer overflow-hidden"
                  >
                    <Avatar
                      src={participant.avatar}
                      name={participant.name}
                      size="sm"
                      online={participant.online}
                    />
                    <div className="truncate">
                      <h3 className="text-xs font-bold text-white truncate hover:text-violet-300 transition-colors">
                        {participant.name}
                      </h3>
                      <p className="text-[10px] text-zinc-400 truncate">
                        @{participant.username} · {participant.headline}
                      </p>
                    </div>
                  </div>
                </div>

                {vibe && (
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-violet-950/60 border border-violet-800/40 text-[11px] font-mono text-violet-300">
                    <Sparkles className="w-3 h-3 text-violet-400" />
                    <span>{vibe.score}% Vibe</span>
                  </div>
                )}
              </div>

              {/* Chat Message Scrollable Viewport */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
                {/* Peer intro banner */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center max-w-md mx-auto my-3 space-y-1">
                  <p className="text-xs text-zinc-300 font-medium">
                    This is the beginning of your conversation with {participant.name}.
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    {vibe?.highlightReason}
                  </p>
                </div>

                {activeConversation.messages.map((msg) => {
                  const isMe = msg.senderId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isMe
                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-br-xs shadow-md shadow-violet-900/20'
                            : 'bg-[#181824] text-zinc-100 rounded-bl-xs border border-white/[0.06]'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Bar */}
              <form
                onSubmit={handleSend}
                className="p-3 bg-[#0E0E16] border-t border-white/[0.08] flex items-center gap-2"
              >
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Message ${participant.name.split(' ')[0]}...`}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#14141E] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-violet-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white transition-all shadow-md shadow-violet-600/30 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-zinc-500">
              Select a conversation to start chatting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
