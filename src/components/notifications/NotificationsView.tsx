import React from 'react';
import {
  Bell,
  CheckCheck,
  UserPlus,
  MessageSquare,
  Briefcase,
  Globe2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useApp, AppView } from '../../context/AppContext';

export const NotificationsView: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setActiveView,
    openProfileModal,
  } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'connection_request':
      case 'connection_accepted':
        return <UserPlus className="w-4 h-4 text-violet-400" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-purple-400" />;
      case 'collab_applied':
        return <Briefcase className="w-4 h-4 text-indigo-400" />;
      case 'community_invite':
        return <Globe2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <Bell className="w-4 h-4 text-violet-400" />;
    }
  };

  const handleNotificationClick = (notif: (typeof notifications)[0]) => {
    markNotificationRead(notif.id);
    if (notif.actionUrl) {
      setActiveView(notif.actionUrl as AppView);
    } else if (notif.relatedUserId) {
      openProfileModal(notif.relatedUserId);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-violet-400" />
            <span>Activity & Notifications</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Realtime updates about requests, collaboration inquiries, and messages.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-colors flex items-center gap-1.5"
        >
          <CheckCheck className="w-3.5 h-3.5 text-violet-400" />
          <span>Mark all as read</span>
        </button>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#111119] border border-white/[0.06] space-y-2">
            <Bell className="w-8 h-8 text-zinc-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">No notifications yet</h3>
            <p className="text-xs text-zinc-400">
              When peers interact with your projects or profile, alerts will show here.
            </p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 group ${
                notif.read
                  ? 'bg-[#111119] border-white/[0.05] opacity-75 hover:opacity-100 hover:border-white/10'
                  : 'bg-[#141422] border-violet-500/30 shadow-md shadow-purple-950/20'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2.5 rounded-xl border shrink-0 ${
                    notif.read
                      ? 'bg-white/[0.03] border-white/[0.06]'
                      : 'bg-violet-950/60 border-violet-700/40'
                  }`}
                >
                  {getIcon(notif.type)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors">
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-violet-500 ring-2 ring-[#141422]" />
                    )}
                  </div>
                  <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">{notif.content}</p>
                  <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                    {notif.timestamp}
                  </span>
                </div>
              </div>

              <div className="text-xs text-zinc-400 group-hover:text-white shrink-0 mt-1">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
