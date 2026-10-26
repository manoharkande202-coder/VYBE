import React from 'react';
import { Sparkles, Bell, MessageSquare, Compass, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currentUser,
    notifications,
    conversations,
    setShowOnboardingModal,
    incomingRequests,
  } = useApp();

  const unreadNotifs = notifications.filter((n) => !n.read).length;
  const unreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080C]/85 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveView('landing')}
          className="flex items-center gap-2 group text-left transition-transform active:scale-95"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 via-purple-500 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-violet-600/30">
            <span className="font-bold text-sm tracking-tighter">VY</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-violet-300 transition-colors">
            VYBE
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeView === 'dashboard' ? 'text-violet-400 font-semibold' : ''
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('discover')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeView === 'discover' ? 'text-violet-400 font-semibold' : ''
            }`}
          >
            Discover People
          </button>
          <button
            onClick={() => setActiveView('connections')}
            className={`whitespace-nowrap transition-colors hover:text-white relative ${
              activeView === 'connections' ? 'text-violet-400 font-semibold' : ''
            }`}
          >
            Connections
            {incomingRequests.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 text-[10px] bg-violet-600 text-white rounded-full font-mono">
                {incomingRequests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveView('collaboration')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeView === 'collaboration' ? 'text-violet-400 font-semibold' : ''
            }`}
          >
            Collaboration Hub
          </button>
          <button
            onClick={() => setActiveView('mentorship')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeView === 'mentorship' ? 'text-violet-400 font-semibold' : ''
            }`}
          >
            Mentorship
          </button>
          <button
            onClick={() => setActiveView('communities')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeView === 'communities' ? 'text-violet-400 font-semibold' : ''
            }`}
          >
            Communities
          </button>
        </nav>

        {/* Zone 3: Primary Action & Quick Profile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          {activeView === 'landing' ? (
            <button
              onClick={() => setActiveView('dashboard')}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all shadow-md shadow-violet-600/25 whitespace-nowrap active:scale-95"
            >
              Enter Dashboard
            </button>
          ) : (
            <>
              {/* Notification bell */}
              <button
                onClick={() => setActiveView('notifications')}
                className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500" />
                )}
              </button>

              {/* Messages trigger */}
              <button
                onClick={() => setActiveView('messages')}
                className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                title="Messages"
                aria-label="Messages"
              >
                <MessageSquare className="w-5 h-5" />
                {unreadMessages > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500" />
                )}
              </button>

              {/* Retake/Edit Onboarding button */}
              <button
                onClick={() => setShowOnboardingModal(true)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-violet-300 bg-violet-950/40 border border-violet-800/40 rounded-xl hover:bg-violet-900/50 transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>Vibe Calibration</span>
              </button>

              {/* User Avatar */}
              <button
                onClick={() => setActiveView('profile')}
                className="flex items-center gap-2 pl-1 group"
                title="My Profile"
              >
                <Avatar
                  src={currentUser.avatar}
                  name={currentUser.name}
                  size="sm"
                  online={currentUser.online}
                />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
