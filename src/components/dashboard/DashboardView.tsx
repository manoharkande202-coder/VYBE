import React from 'react';
import {
  Sparkles,
  Users,
  Briefcase,
  Compass,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  Layers,
  Globe2,
  MessageSquare,
  UserPlus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { calculateVibeMatch } from '../../utils/matching';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    profiles,
    connections,
    savedProfileIds,
    communities,
    collaborationProjects,
    setActiveView,
    openProfileModal,
    setShowOnboardingModal,
    setShowEditProfileModal,
    sendConnectionRequest,
    sentRequests,
    incomingRequests,
    acceptConnectionRequest,
    toggleCommunityJoin,
    toggleSaveProfile,
  } = useApp();

  // Calculate profile completion score
  let completionPoints = 0;
  if (currentUser.bio) completionPoints += 20;
  if (currentUser.interests.length >= 3) completionPoints += 20;
  if (currentUser.skills.length >= 3) completionPoints += 20;
  if (currentUser.projects.length >= 1) completionPoints += 20;
  if (currentUser.seekingRole) completionPoints += 20;

  // Filter top vibe matches (excluding self and already connected)
  const candidateProfiles = profiles
    .filter((p) => p.id !== currentUser.id && !connections.includes(p.id))
    .map((p) => ({
      profile: p,
      vibe: calculateVibeMatch(currentUser, p),
    }))
    .sort((a, b) => b.vibe.score - a.vibe.score);

  const topRecommendations = candidateProfiles.slice(0, 3);

  // Saved profiles
  const savedProfiles = profiles.filter((p) => savedProfileIds.includes(p.id));

  // Quick collaboration picks
  const recentCollabs = collaborationProjects.slice(0, 2);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-950/60 via-[#13131F] to-[#101018] border border-violet-500/25 p-6 sm:p-8">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-900/40 border border-violet-700/30 text-violet-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Resonance Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Your vibe is calibrated to <span className="text-violet-300 font-medium">{currentUser.interests.slice(0, 3).join(', ')}</span>. 
              Discovering peers with shared ambitions.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setActiveView('discover')}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl shadow-md shadow-violet-600/30 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Discover Feed</span>
            </button>
            <button
              onClick={() => setShowOnboardingModal(true)}
              className="px-3.5 py-2.5 text-xs font-medium text-zinc-300 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-xl transition-colors"
            >
              Recalibrate Vibe
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics & Profile Completion Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-white/[0.06]">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span>Active Connections</span>
            <Users className="w-4 h-4 text-violet-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white tabular-nums">
            {connections.length}
          </p>
          <p className="text-[11px] text-zinc-500 mt-1">Verified kindred peers</p>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-white/[0.06]">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span>Pending Requests</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white tabular-nums">
            {incomingRequests.length}
          </p>
          <button
            onClick={() => setActiveView('connections')}
            className="text-[11px] text-violet-400 hover:text-violet-300 mt-1 transition-colors block text-left"
          >
            Review inbound requests →
          </button>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-white/[0.06]">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span>Joined Tribes</span>
            <Globe2 className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-white tabular-nums">
            {communities.filter((c) => c.isJoined).length}
          </p>
          <button
            onClick={() => setActiveView('communities')}
            className="text-[11px] text-violet-400 hover:text-violet-300 mt-1 transition-colors block text-left"
          >
            Browse communities →
          </button>
        </div>

        {/* Metric 4: Profile Completion Meter */}
        <div className="p-4 rounded-xl bg-[#12121A] border border-white/[0.06] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-zinc-400">Profile Resonance</span>
              <span className="font-mono text-violet-400 font-bold tabular-nums">
                {completionPoints}%
              </span>
            </div>
            <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-gradient-to-r from-violet-600 to-purple-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPoints}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setShowEditProfileModal(true)}
            className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors text-left mt-2"
          >
            {completionPoints < 100 ? '+ Polish profile & skills' : '✓ Fully calibrated'}
          </button>
        </div>
      </div>

      {/* 3. Main Grid: Recommended Connections + Sidebar Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: High Resonance Recommendations */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <h2 className="text-base font-bold text-white tracking-tight">
                Recommended For Your Frequency
              </h2>
            </div>
            <button
              onClick={() => setActiveView('discover')}
              className="text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-colors"
            >
              <span>See all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {topRecommendations.map(({ profile, vibe }) => {
              const isPending = sentRequests.includes(profile.id);
              const isIncoming = incomingRequests.includes(profile.id);

              return (
                <div
                  key={profile.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#111119] border border-white/[0.07] hover:border-violet-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div
                    onClick={() => openProfileModal(profile.id)}
                    className="flex items-start sm:items-center gap-3.5 cursor-pointer flex-1"
                  >
                    <Avatar
                      src={profile.avatar}
                      name={profile.name}
                      size="lg"
                      online={profile.online}
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                          {profile.name}
                        </h3>
                        <span className="text-xs text-zinc-400 font-mono">
                          @{profile.username}
                        </span>
                        <div className="px-2 py-0.5 rounded-md bg-violet-950/70 border border-violet-800/40 text-[11px] font-mono font-semibold text-violet-300 tabular-nums">
                          {vibe.score}% Match
                        </div>
                      </div>

                      <p className="text-xs text-zinc-300 line-clamp-1 mt-0.5 font-medium">
                        {profile.headline}
                      </p>

                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                        ✦ {vibe.highlightReason}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.05]">
                    {isIncoming ? (
                      <button
                        onClick={() => acceptConnectionRequest(profile.id)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all"
                      >
                        Accept
                      </button>
                    ) : isPending ? (
                      <span className="px-3 py-1.5 text-xs text-zinc-400 bg-white/[0.04] rounded-xl border border-white/10 font-medium">
                        Pending
                      </span>
                    ) : (
                      <button
                        onClick={() => sendConnectionRequest(profile.id)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-sm shadow-violet-600/30 flex items-center gap-1.5"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </button>
                    )}

                    <button
                      onClick={() => openProfileModal(profile.id)}
                      className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-xl transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Collaboration Opportunities Spotlight */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-violet-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Collaboration Opportunities
                </h3>
              </div>
              <button
                onClick={() => setActiveView('collaboration')}
                className="text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-colors"
              >
                <span>Browse Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {recentCollabs.map((collab) => (
                <div
                  key={collab.id}
                  onClick={() => setActiveView('collaboration')}
                  className="p-4 rounded-xl bg-[#12121A] border border-white/[0.06] hover:border-violet-500/30 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-violet-400 font-medium mb-1.5">
                      <span>{collab.category}</span>
                      <span className="text-zinc-400">{collab.timeline}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                      {collab.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                      {collab.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400 font-mono">{collab.teamSize}</span>
                    <span className="text-violet-300 font-semibold group-hover:translate-x-0.5 transition-transform">
                      {collab.applied ? 'Applied ✓' : 'Apply →'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Saved Profiles & Suggested Tribes */}
        <div className="space-y-6">
          {/* Saved Profiles / Bookmarks */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#111119] border border-white/[0.07]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-violet-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Bookmarked Profiles ({savedProfiles.length})
                </h3>
              </div>
              <button
                onClick={() => setActiveView('discover')}
                className="text-[11px] text-violet-400 hover:text-violet-300"
              >
                Discover
              </button>
            </div>

            {savedProfiles.length === 0 ? (
              <p className="text-xs text-zinc-500 py-3 text-center">
                No saved profiles yet. Click the bookmark icon on any profile to save it for later.
              </p>
            ) : (
              <div className="space-y-2.5">
                {savedProfiles.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => openProfileModal(p.id)}
                    className="flex items-center justify-between gap-3 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <Avatar src={p.avatar} name={p.name} size="xs" online={p.online} />
                      <div className="truncate">
                        <p className="text-xs font-semibold text-zinc-200 group-hover:text-violet-300 truncate transition-colors">
                          {p.name}
                        </p>
                        <p className="text-[10px] text-zinc-400 truncate">{p.careerField}</p>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-400 group-hover:text-white">→</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Suggested Communities */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#111119] border border-white/[0.07]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-violet-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Suggested Communities
                </h3>
              </div>
              <button
                onClick={() => setActiveView('communities')}
                className="text-[11px] text-violet-400 hover:text-violet-300"
              >
                All
              </button>
            </div>

            <div className="space-y-3">
              {communities.slice(0, 3).map((comm) => (
                <div
                  key={comm.id}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between gap-3"
                >
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-zinc-200 truncate">{comm.name}</p>
                    <p className="text-[10px] text-zinc-400 font-mono">
                      {comm.memberCount.toLocaleString()} members
                    </p>
                  </div>
                  <button
                    onClick={() => toggleCommunityJoin(comm.id)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                      comm.isJoined
                        ? 'bg-white/[0.06] text-zinc-300 hover:bg-rose-950/40 hover:text-rose-300'
                        : 'bg-violet-600/30 text-violet-300 hover:bg-violet-600 hover:text-white'
                    }`}
                  >
                    {comm.isJoined ? 'Joined' : 'Join'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
