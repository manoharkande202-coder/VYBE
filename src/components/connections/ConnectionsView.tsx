import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  UserPlus,
  Clock,
  Sparkles,
  MessageSquare,
  Trash2,
  X,
  Check,
  Compass,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { calculateVibeMatch } from '../../utils/matching';

export const ConnectionsView: React.FC = () => {
  const {
    connections,
    incomingRequests,
    sentRequests,
    profiles,
    currentUser,
    acceptConnectionRequest,
    declineConnectionRequest,
    cancelSentRequest,
    removeConnection,
    sendConnectionRequest,
    openProfileModal,
    setActiveConversationId,
    setActiveView,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'my_connections' | 'incoming' | 'sent' | 'suggested'>('my_connections');

  const myConnectedProfiles = profiles.filter((p) => connections.includes(p.id));
  const incomingProfiles = profiles.filter((p) => incomingRequests.includes(p.id));
  const sentProfiles = profiles.filter((p) => sentRequests.includes(p.id));

  // Suggested connections: profiles not connected and no pending requests
  const suggestedProfiles = profiles
    .filter(
      (p) =>
        p.id !== currentUser.id &&
        !connections.includes(p.id) &&
        !incomingRequests.includes(p.id) &&
        !sentRequests.includes(p.id)
    )
    .map((p) => ({
      profile: p,
      vibe: calculateVibeMatch(currentUser, p),
    }))
    .sort((a, b) => b.vibe.score - a.vibe.score);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Users className="w-6 h-6 text-violet-400" />
          <span>Your Tribe & Connections</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage your verified kindred peers, incoming requests, and discover potential allies.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#12121A] rounded-xl border border-white/[0.06] overflow-x-auto">
        <button
          onClick={() => setActiveTab('my_connections')}
          className={`flex-1 min-w-[130px] py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'my_connections'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>My Tribe ({myConnectedProfiles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('incoming')}
          className={`flex-1 min-w-[140px] py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 relative ${
            activeTab === 'incoming'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Inbound Requests</span>
          {incomingProfiles.length > 0 && (
            <span className="ml-1 px-1.5 py-0.2 bg-purple-900 text-purple-200 border border-purple-400/40 rounded-full text-[10px] font-mono">
              {incomingProfiles.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('sent')}
          className={`flex-1 min-w-[130px] py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'sent'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Sent ({sentProfiles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('suggested')}
          className={`flex-1 min-w-[130px] py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'suggested'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Suggested ({suggestedProfiles.length})</span>
        </button>
      </div>

      {/* Tab 1: My Connections */}
      {activeTab === 'my_connections' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {myConnectedProfiles.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#111119] border border-white/[0.06] space-y-3">
              <Users className="w-8 h-8 text-zinc-500 mx-auto" />
              <h3 className="text-sm font-bold text-white">No active connections yet</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Discover like-minded peers or check your suggested recommendations to build your tribe.
              </p>
              <button
                onClick={() => setActiveView('discover')}
                className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl"
              >
                Find People Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myConnectedProfiles.map((p) => {
                const vibe = calculateVibeMatch(currentUser, p);
                return (
                  <div
                    key={p.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#111119] border border-white/[0.07] hover:border-violet-500/30 transition-all flex items-center justify-between gap-4"
                  >
                    <div
                      onClick={() => openProfileModal(p.id)}
                      className="flex items-center gap-3 cursor-pointer overflow-hidden flex-1"
                    >
                      <Avatar src={p.avatar} name={p.name} size="lg" online={p.online} />
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white truncate">{p.name}</h3>
                          <span className="text-[11px] font-mono text-violet-400 tabular-nums">
                            {vibe.score}%
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 truncate">@{p.username}</p>
                        <p className="text-[11px] text-zinc-300 mt-1 truncate">{p.headline}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setActiveConversationId(`conv_${p.id}`);
                          setActiveView('messages');
                        }}
                        className="p-2 rounded-xl bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white transition-colors"
                        title="Direct Message"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => removeConnection(p.id)}
                        className="p-2 rounded-xl bg-white/[0.04] hover:bg-rose-950/40 text-zinc-400 hover:text-rose-300 transition-colors"
                        title="Remove Connection"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Incoming Requests */}
      {activeTab === 'incoming' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {incomingProfiles.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#111119] border border-white/[0.06] space-y-2">
              <UserCheck className="w-8 h-8 text-zinc-500 mx-auto" />
              <h3 className="text-sm font-bold text-white">All caught up!</h3>
              <p className="text-xs text-zinc-400">
                You do not have any pending inbound connection requests.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {incomingProfiles.map((p) => {
                const vibe = calculateVibeMatch(currentUser, p);
                return (
                  <div
                    key={p.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#111119] border border-violet-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div
                      onClick={() => openProfileModal(p.id)}
                      className="flex items-center gap-3.5 cursor-pointer flex-1"
                    >
                      <Avatar src={p.avatar} name={p.name} size="lg" online={p.online} />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{p.name}</h3>
                          <span className="text-xs text-zinc-400 font-mono">@{p.username}</span>
                          <span className="px-2 py-0.5 rounded-md bg-violet-950/70 border border-violet-700/40 text-[10px] font-mono text-violet-300 font-bold tabular-nums">
                            {vibe.score}% Vibe
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 mt-0.5">{p.headline}</p>
                        <p className="text-[11px] text-zinc-400 mt-1">✦ {vibe.highlightReason}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => acceptConnectionRequest(p.id)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl shadow-md shadow-violet-600/30 flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept Request</span>
                      </button>

                      <button
                        onClick={() => declineConnectionRequest(p.id)}
                        className="px-3.5 py-2 text-xs font-medium text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-xl border border-white/10"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Sent Requests */}
      {activeTab === 'sent' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {sentProfiles.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#111119] border border-white/[0.06] space-y-2">
              <Clock className="w-8 h-8 text-zinc-500 mx-auto" />
              <h3 className="text-sm font-bold text-white">No pending outgoing requests</h3>
              <p className="text-xs text-zinc-400">
                When you invite peers to connect, your pending invitations will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sentProfiles.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-[#111119] border border-white/[0.06] flex items-center justify-between gap-4"
                >
                  <div
                    onClick={() => openProfileModal(p.id)}
                    className="flex items-center gap-3 cursor-pointer overflow-hidden flex-1"
                  >
                    <Avatar src={p.avatar} name={p.name} size="md" online={p.online} />
                    <div className="truncate">
                      <h3 className="text-xs font-bold text-white truncate">{p.name}</h3>
                      <p className="text-[11px] text-zinc-400 truncate">@{p.username}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-zinc-400 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                      Awaiting response
                    </span>
                    <button
                      onClick={() => cancelSentRequest(p.id)}
                      className="text-xs text-zinc-400 hover:text-rose-400 px-2 py-1 transition-colors"
                    >
                      Cancel Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Suggested Connections */}
      {activeTab === 'suggested' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-150">
          {suggestedProfiles.map(({ profile, vibe }) => (
            <div
              key={profile.id}
              className="p-4 rounded-2xl bg-[#111119] border border-white/[0.06] hover:border-violet-500/30 transition-all flex items-center justify-between gap-4"
            >
              <div
                onClick={() => openProfileModal(profile.id)}
                className="flex items-center gap-3 cursor-pointer overflow-hidden flex-1"
              >
                <Avatar
                  src={profile.avatar}
                  name={profile.name}
                  size="lg"
                  online={profile.online}
                />
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white truncate">{profile.name}</h3>
                    <span className="text-xs font-mono text-violet-400 font-bold tabular-nums">
                      {vibe.score}%
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate">@{profile.username}</p>
                  <p className="text-[11px] text-zinc-300 mt-0.5 truncate">{profile.headline}</p>
                </div>
              </div>

              <button
                onClick={() => sendConnectionRequest(profile.id)}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Connect</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
