import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  UserPlus,
  UserCheck,
  Bookmark,
  MessageSquare,
  SlidersHorizontal,
  X,
  Compass,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { calculateVibeMatch } from '../../utils/matching';
import { CareerField, ConnectionGoal, CommunicationStyle } from '../../types';

export const DiscoverView: React.FC = () => {
  const {
    profiles,
    currentUser,
    connections,
    sentRequests,
    incomingRequests,
    sendConnectionRequest,
    acceptConnectionRequest,
    cancelSentRequest,
    toggleSaveProfile,
    savedProfileIds,
    openProfileModal,
    setActiveConversationId,
    setActiveView,
    settings,
  } = useApp();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState<string>('All');
  const [selectedGoal, setSelectedGoal] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'vibe' | 'name' | 'shared_skills'>('vibe');
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  // Filter out blocked users and self
  const eligibleProfiles = useMemo(() => {
    return profiles.filter(
      (p) => p.id !== currentUser.id && !settings.blockedUserIds.includes(p.id)
    );
  }, [profiles, currentUser.id, settings.blockedUserIds]);

  // Compute matches and filter/sort
  const filteredProfiles = useMemo(() => {
    return eligibleProfiles
      .map((p) => {
        const vibe = calculateVibeMatch(currentUser, p);
        return {
          profile: p,
          vibe,
        };
      })
      .filter(({ profile }) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = profile.name.toLowerCase().includes(q);
          const matchUser = profile.username.toLowerCase().includes(q);
          const matchBio = profile.bio.toLowerCase().includes(q);
          const matchSkills = profile.skills.some((s) => s.toLowerCase().includes(q));
          const matchInterests = profile.interests.some((i) => i.toLowerCase().includes(q));
          if (!matchName && !matchUser && !matchBio && !matchSkills && !matchInterests) {
            return false;
          }
        }

        // Career Field filter
        if (selectedField !== 'All' && profile.careerField !== selectedField) {
          return false;
        }

        // Connection Goal filter
        if (selectedGoal !== 'All' && !profile.goals.includes(selectedGoal as ConnectionGoal)) {
          return false;
        }

        // Communication style filter
        if (
          selectedStyle !== 'All' &&
          profile.communicationStyle !== selectedStyle
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'vibe') {
          return b.vibe.score - a.vibe.score;
        }
        if (sortBy === 'shared_skills') {
          return b.vibe.sharedSkills.length - a.vibe.sharedSkills.length;
        }
        return a.profile.name.localeCompare(b.profile.name);
      });
  }, [eligibleProfiles, currentUser, searchQuery, selectedField, selectedGoal, selectedStyle, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedField('All');
    setSelectedGoal('All');
    setSelectedStyle('All');
    setSortBy('vibe');
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedField !== 'All' || selectedGoal !== 'All' || selectedStyle !== 'All';

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-violet-400" />
            <span>Discover Kindred Minds</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            People algorithmically matched to your interests, skills, and goals.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#14141E] border border-white/10 text-xs text-zinc-300"
          >
            <SlidersHorizontal className="w-4 h-4 text-violet-400" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-[#14141E] border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500 font-medium"
            >
              <option value="vibe">Highest Vibe Match</option>
              <option value="shared_skills">Most Shared Skills</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, skill (e.g. Next.js, Python), interest, or keywords..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#111119] border border-white/10 text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-3 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Chips Bar (Desktop & Tablet) */}
      <div className="hidden md:flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#111119] border border-white/[0.06]">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-zinc-500 font-semibold uppercase text-[10px] tracking-wider mr-1">
            Domain:
          </span>
          {['All', 'Engineering', 'Design', 'Entrepreneurship', 'Product', 'Research', 'Student'].map(
            (field) => (
              <button
                key={field}
                onClick={() => setSelectedField(field)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  selectedField === field
                    ? 'bg-violet-600 text-white font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {field}
              </button>
            )
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-rose-400 hover:text-rose-300 font-medium px-2 py-1"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Secondary Filter Dropdowns (Desktop & Mobile Drawer) */}
      <div
        className={`${
          showFiltersDrawer ? 'block' : 'hidden md:grid'
        } grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 rounded-xl bg-[#0F0F16] border border-white/[0.06] animate-in fade-in duration-150`}
      >
        <div>
          <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
            Connection Goal
          </label>
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#151520] border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500"
          >
            <option value="All">All Connection Intentions</option>
            <option value="Project collaboration">Project collaboration</option>
            <option value="Startup partnerships">Startup partnerships</option>
            <option value="Mentorship">Mentorship</option>
            <option value="Friendship">Friendship</option>
            <option value="Professional networking">Professional networking</option>
            <option value="Learning new skills">Learning new skills</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
            Communication Style
          </label>
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#151520] border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500"
          >
            <option value="All">All Communication Mindsets</option>
            <option value="Deep async thinker">Deep async thinker</option>
            <option value="Fast brainstormer">Fast brainstormer</option>
            <option value="Casual coffee chat">Casual coffee chat</option>
            <option value="Structured sprints">Structured sprints</option>
            <option value="Weekend builder">Weekend builder</option>
          </select>
        </div>

        <div className="flex items-end">
          <div className="w-full p-2 rounded-xl bg-violet-950/30 border border-violet-800/30 text-[11px] text-violet-300">
            Showing <span className="font-mono font-bold text-white tabular-nums">{filteredProfiles.length}</span> curated matches
          </div>
        </div>
      </div>

      {/* Discovery Profile Grid */}
      {filteredProfiles.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#111119] border border-white/[0.06] space-y-3">
          <Sparkles className="w-8 h-8 text-violet-400 mx-auto" />
          <h3 className="text-base font-bold text-white">No Profiles Matched Your Criteria</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Try adjusting your search terms or relaxing your career domain and communication style filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProfiles.map(({ profile, vibe }) => {
            const isConnected = connections.includes(profile.id);
            const isPendingSent = sentRequests.includes(profile.id);
            const isIncoming = incomingRequests.includes(profile.id);
            const isSaved = savedProfileIds.includes(profile.id);

            return (
              <div
                key={profile.id}
                className="p-5 rounded-2xl bg-[#111119] border border-white/[0.07] hover:border-violet-500/35 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Glow backdrop on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-2xl pointer-events-none group-hover:bg-violet-600/15 transition-all" />

                <div>
                  {/* Top card row: Avatar, Info, Vibe Match % */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div
                      onClick={() => openProfileModal(profile.id)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Avatar
                        src={profile.avatar}
                        name={profile.name}
                        size="lg"
                        online={profile.online}
                      />
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                          {profile.name}
                        </h3>
                        <p className="text-xs text-zinc-400 font-mono">@{profile.username}</p>
                        <p className="text-[11px] text-violet-400 font-medium mt-0.5">
                          {profile.careerField}
                        </p>
                      </div>
                    </div>

                    {/* Vibe score badge */}
                    <div className="flex flex-col items-end shrink-0">
                      <div className="px-2.5 py-1 rounded-xl bg-violet-950/70 border border-violet-700/40 text-xs font-bold text-violet-300 font-mono tabular-nums flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3 text-violet-400" />
                        <span>{vibe.score}%</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 mt-0.5 font-medium">Vibe Match</span>
                    </div>
                  </div>

                  {/* Headline & Bio */}
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-3">
                    {profile.headline}
                  </p>

                  {/* Vibe Match Highlight Reason */}
                  <div className="p-2 rounded-lg bg-violet-950/30 border border-violet-800/30 text-[11px] text-violet-200/90 leading-snug mb-3">
                    ✦ {vibe.highlightReason}
                  </div>

                  {/* Skills tags */}
                  <div className="space-y-1 mb-3">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Skills
                    </span>
                    <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                      {profile.skills.slice(0, 4).map((s, idx) => {
                        const isShared = currentUser.skills
                          .map((x) => x.toLowerCase())
                          .includes(s.toLowerCase());
                        return (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded-md ${
                              isShared
                                ? 'bg-indigo-950/70 text-indigo-300 border border-indigo-800/40 font-semibold'
                                : 'bg-white/[0.04] text-zinc-300'
                            }`}
                          >
                            {s}
                          </span>
                        );
                      })}
                      {profile.skills.length > 4 && (
                        <span className="px-1.5 py-0.5 text-zinc-400 text-[10px]">
                          +{profile.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Interests tags */}
                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Interests
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px]">
                      {profile.interests.slice(0, 3).map((item, idx) => {
                        const isShared = currentUser.interests
                          .map((x) => x.toLowerCase())
                          .includes(item.toLowerCase());
                        return (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded-md ${
                              isShared
                                ? 'bg-violet-950/70 text-violet-300 border border-violet-800/40'
                                : 'bg-white/[0.04] text-zinc-300'
                            }`}
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {isConnected ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-emerald-400 font-medium">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Connected</span>
                      </span>
                    ) : isIncoming ? (
                      <button
                        onClick={() => acceptConnectionRequest(profile.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-sm transition-all"
                      >
                        Accept
                      </button>
                    ) : isPendingSent ? (
                      <button
                        onClick={() => cancelSentRequest(profile.id)}
                        className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-zinc-400 font-medium transition-colors"
                      >
                        Pending...
                      </button>
                    ) : (
                      <button
                        onClick={() => sendConnectionRequest(profile.id)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-sm shadow-violet-600/30 transition-all active:scale-95"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setActiveConversationId(`conv_${profile.id}`);
                        setActiveView('messages');
                      }}
                      className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-colors"
                      title="Send message"
                    >
                      <MessageSquare className="w-4 h-4 text-violet-400" />
                    </button>

                    <button
                      onClick={() => toggleSaveProfile(profile.id)}
                      className={`p-1.5 rounded-xl border transition-colors ${
                        isSaved
                          ? 'bg-violet-600/20 border-violet-500/40 text-violet-300'
                          : 'bg-white/[0.04] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                      title={isSaved ? 'Remove bookmark' : 'Bookmark profile'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-violet-400' : ''}`} />
                    </button>
                  </div>

                  <button
                    onClick={() => openProfileModal(profile.id)}
                    className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
