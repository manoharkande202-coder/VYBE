import React, { useState } from 'react';
import {
  LayoutDashboard,
  Compass,
  Users,
  MessageSquare,
  Menu,
  X,
  Briefcase,
  GraduationCap,
  Globe2,
  Bell,
  User,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useApp, AppView } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const {
    activeView,
    setActiveView,
    incomingRequests,
    conversations,
    notifications,
    setShowOnboardingModal,
  } = useApp();

  const [menuOpen, setMenuOpen] = useState(false);

  const unreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const navigateTo = (view: AppView) => {
    setActiveView(view);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer / Slide-up Menu when 'More' is pressed */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative z-10 bg-[#12121A] border-t border-white/10 rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="w-10 h-1.5 bg-zinc-700 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-base font-semibold text-white">More Destinations</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 py-4">
              <button
                onClick={() => navigateTo('collaboration')}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] text-left hover:bg-violet-600/10 hover:border-violet-500/30 border border-transparent transition-all"
              >
                <Briefcase className="w-5 h-5 text-violet-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Collaboration</p>
                  <p className="text-[10px] text-zinc-400">Find project partners</p>
                </div>
              </button>

              <button
                onClick={() => navigateTo('mentorship')}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] text-left hover:bg-violet-600/10 hover:border-violet-500/30 border border-transparent transition-all"
              >
                <GraduationCap className="w-5 h-5 text-violet-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Mentorship</p>
                  <p className="text-[10px] text-zinc-400">Learn from experts</p>
                </div>
              </button>

              <button
                onClick={() => navigateTo('communities')}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] text-left hover:bg-violet-600/10 hover:border-violet-500/30 border border-transparent transition-all"
              >
                <Globe2 className="w-5 h-5 text-violet-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Communities</p>
                  <p className="text-[10px] text-zinc-400">Join your tribes</p>
                </div>
              </button>

              <button
                onClick={() => navigateTo('notifications')}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] text-left hover:bg-violet-600/10 hover:border-violet-500/30 border border-transparent transition-all relative"
              >
                <Bell className="w-5 h-5 text-violet-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Notifications</p>
                  <p className="text-[10px] text-zinc-400">
                    {unreadNotifs > 0 ? `${unreadNotifs} new` : 'All clear'}
                  </p>
                </div>
              </button>

              <button
                onClick={() => navigateTo('profile')}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] text-left hover:bg-violet-600/10 hover:border-violet-500/30 border border-transparent transition-all"
              >
                <User className="w-5 h-5 text-violet-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">My Profile</p>
                  <p className="text-[10px] text-zinc-400">View & customize</p>
                </div>
              </button>

              <button
                onClick={() => navigateTo('settings')}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] text-left hover:bg-violet-600/10 hover:border-violet-500/30 border border-transparent transition-all"
              >
                <Settings className="w-5 h-5 text-violet-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Settings</p>
                  <p className="text-[10px] text-zinc-400">Privacy & safety</p>
                </div>
              </button>
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowOnboardingModal(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-violet-600 text-white font-medium text-xs hover:bg-violet-500 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Recalibrate Vibe & Preferences</span>
              </button>
              <button
                onClick={() => navigateTo('landing')}
                className="w-full py-2.5 text-center text-xs text-zinc-400 hover:text-white"
              >
                Return to Landing Overview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Tab Bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A10]/95 backdrop-blur-md border-t border-white/[0.08]"
        aria-label="Mobile Navigation"
      >
        <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-2">
          {/* Dashboard */}
          <button
            onClick={() => setActiveView('dashboard')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors ${
              activeView === 'dashboard' ? 'text-violet-400 font-semibold' : 'text-zinc-400'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-1">Home</span>
          </button>

          {/* Discover */}
          <button
            onClick={() => setActiveView('discover')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors ${
              activeView === 'discover' ? 'text-violet-400 font-semibold' : 'text-zinc-400'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-1">Discover</span>
          </button>

          {/* Connections */}
          <button
            onClick={() => setActiveView('connections')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors relative ${
              activeView === 'connections' ? 'text-violet-400 font-semibold' : 'text-zinc-400'
            }`}
          >
            <div className="relative">
              <Users className="w-5 h-5" />
              {incomingRequests.length > 0 && (
                <span className="absolute -top-1 -right-2 w-2.5 h-2.5 rounded-full bg-violet-500 ring-2 ring-[#0A0A10]" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1">Tribe</span>
          </button>

          {/* Messages */}
          <button
            onClick={() => setActiveView('messages')}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors relative ${
              activeView === 'messages' ? 'text-violet-400 font-semibold' : 'text-zinc-400'
            }`}
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-2 w-2.5 h-2.5 rounded-full bg-violet-500 ring-2 ring-[#0A0A10]" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1">Chat</span>
          </button>

          {/* More Drawer */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors ${
              menuOpen ? 'text-violet-400' : 'text-zinc-400'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-1">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};
