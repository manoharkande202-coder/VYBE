import React from 'react';
import {
  Compass,
  Users,
  Briefcase,
  GraduationCap,
  Globe2,
  MessageSquare,
  Bell,
  User,
  Settings,
  Sparkles,
  LayoutDashboard,
  Shield,
  Layers,
} from 'lucide-react';
import { useApp, AppView } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';

export const Sidebar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currentUser,
    incomingRequests,
    conversations,
    notifications,
    setShowOnboardingModal,
    setShowEditProfileModal,
  } = useApp();

  const unreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const navItems: { view: AppView; label: string; icon: React.ReactNode; badge?: number }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { view: 'discover', label: 'Discover People', icon: <Compass className="w-4 h-4" /> },
    {
      view: 'connections',
      label: 'Connections',
      icon: <Users className="w-4 h-4" />,
      badge: incomingRequests.length > 0 ? incomingRequests.length : undefined,
    },
    { view: 'collaboration', label: 'Collaboration Hub', icon: <Briefcase className="w-4 h-4" /> },
    { view: 'mentorship', label: 'Mentorship', icon: <GraduationCap className="w-4 h-4" /> },
    { view: 'communities', label: 'Communities', icon: <Globe2 className="w-4 h-4" /> },
    {
      view: 'messages',
      label: 'Messages',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: unreadMessages > 0 ? unreadMessages : undefined,
    },
    {
      view: 'notifications',
      label: 'Notifications',
      icon: <Bell className="w-4 h-4" />,
      badge: unreadNotifs > 0 ? unreadNotifs : undefined,
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#0A0A10] border-r border-white/[0.07] min-h-[calc(100vh-4rem)] p-4 justify-between">
      <div className="space-y-6">
        {/* Brand Tagline Banner */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-950/40 via-purple-900/10 to-transparent border border-violet-800/20">
          <div className="flex items-center gap-2 text-violet-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VYBE Network</span>
          </div>
          <p className="text-xs text-zinc-300 mt-1 font-medium">Your Vibe. Your Tribe.</p>
        </div>

        {/* Primary Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setActiveView(item.view)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-violet-600/15 text-white border border-violet-500/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      isActive ? 'text-violet-400' : 'text-zinc-400 group-hover:text-zinc-200'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs font-mono font-medium rounded-full bg-violet-600 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Secondary Links */}
        <div className="pt-3 border-t border-white/[0.06] space-y-1">
          <button
            onClick={() => setActiveView('landing')}
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
              activeView === 'landing'
                ? 'bg-white/[0.08] text-white'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <Layers className="w-4 h-4 text-zinc-400" />
            <span>Explore Landing Page</span>
          </button>
          <button
            onClick={() => setActiveView('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
              activeView === 'settings'
                ? 'bg-white/[0.08] text-white'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <Settings className="w-4 h-4 text-zinc-400" />
            <span>Privacy & Safety</span>
          </button>
        </div>
      </div>

      {/* User Quick Info Box */}
      <div className="pt-4 border-t border-white/[0.06]">
        <div className="p-3 rounded-2xl bg-[#12121B] border border-white/[0.06] flex items-center justify-between gap-3">
          <button
            onClick={() => setActiveView('profile')}
            className="flex items-center gap-2.5 overflow-hidden text-left group"
          >
            <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
            <div className="truncate">
              <p className="text-xs font-semibold text-zinc-200 group-hover:text-violet-300 truncate transition-colors">
                {currentUser.name}
              </p>
              <p className="text-[11px] text-zinc-400 truncate">@{currentUser.username}</p>
            </div>
          </button>

          <button
            onClick={() => setShowEditProfileModal(true)}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors shrink-0"
            title="Edit Profile"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
