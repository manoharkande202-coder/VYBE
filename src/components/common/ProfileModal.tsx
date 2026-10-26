import React, { useState } from 'react';
import {
  X,
  MessageSquare,
  UserPlus,
  UserCheck,
  Bookmark,
  Share2,
  ShieldAlert,
  Flag,
  Sparkles,
  ExternalLink,
  Layers,
  MapPin,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateVibeMatch } from '../../utils/matching';
import { Avatar } from './Avatar';

export const ProfileModal: React.FC = () => {
  const {
    selectedProfileId,
    closeProfileModal,
    profiles,
    currentUser,
    connections,
    sentRequests,
    incomingRequests,
    sendConnectionRequest,
    acceptConnectionRequest,
    cancelSentRequest,
    removeConnection,
    toggleSaveProfile,
    savedProfileIds,
    setActiveView,
    setActiveConversationId,
    blockUser,
    reportUser,
    communities,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'vibe'>('overview');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('Inappropriate behavior');

  if (!selectedProfileId) return null;

  const profile =
    selectedProfileId === currentUser.id
      ? currentUser
      : profiles.find((p) => p.id === selectedProfileId);

  if (!profile) return null;

  const isSelf = profile.id === currentUser.id;
  const isConnected = connections.includes(profile.id);
  const isPendingSent = sentRequests.includes(profile.id);
  const isIncoming = incomingRequests.includes(profile.id);
  const isSaved = savedProfileIds.includes(profile.id);

  // Vibe match calculation
  const vibe = calculateVibeMatch(currentUser, profile);

  const handleMessage = () => {
    closeProfileModal();
    setActiveConversationId(`conv_${profile.id}`);
    setActiveView('messages');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Profile link copied: vybe.network/@${profile.username}`, 'info');
  };

  const submitReport = () => {
    reportUser(profile.id, reportReason);
    setShowReportModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closeProfileModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0F0F16] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Banner with subtle glowing gradient */}
        <div className="h-32 bg-gradient-to-r from-violet-950 via-purple-900/60 to-indigo-950 relative border-b border-white/[0.08]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Close button */}
          <button
            onClick={closeProfileModal}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 text-zinc-300 hover:text-white hover:bg-black/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Vibe Badge */}
          {!isSelf && (
            <div className="absolute bottom-3 right-4 px-3 py-1 rounded-xl bg-[#0F0F16]/90 border border-violet-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-semibold text-violet-200">
                <span className="font-mono tabular-nums">{vibe.score}%</span> Vibe Match
              </span>
            </div>
          )}
        </div>

        {/* Profile Header Details */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-4">
            <div className="flex items-end gap-3.5">
              <div className="p-1 rounded-2xl bg-[#0F0F16] ring-2 ring-violet-500/30">
                <Avatar
                  src={profile.avatar}
                  name={profile.name}
                  size="xl"
                  online={profile.online}
                />
              </div>
              <div className="mb-1">
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  {profile.name}
                </h2>
                <p className="text-xs font-mono text-violet-400">@{profile.username}</p>
              </div>
            </div>

            {/* Main Action Buttons */}
            {!isSelf && (
              <div className="flex items-center gap-2 flex-wrap">
                {isConnected ? (
                  <button
                    onClick={() => removeConnection(profile.id)}
                    className="px-3.5 py-2 text-xs font-medium text-zinc-300 bg-white/[0.06] hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-800/40 border border-white/10 rounded-xl transition-colors flex items-center gap-1.5"
                    title="Click to disconnect"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>Connected</span>
                  </button>
                ) : isIncoming ? (
                  <button
                    onClick={() => acceptConnectionRequest(profile.id)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl transition-all shadow-md shadow-violet-600/30 flex items-center gap-1.5"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Accept Request</span>
                  </button>
                ) : isPendingSent ? (
                  <button
                    onClick={() => cancelSentRequest(profile.id)}
                    className="px-3.5 py-2 text-xs font-medium text-zinc-400 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Clock className="w-4 h-4 text-zinc-400" />
                    <span>Requested</span>
                  </button>
                ) : (
                  <button
                    onClick={() => sendConnectionRequest(profile.id)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl transition-all shadow-md shadow-violet-600/30 flex items-center gap-1.5"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Connect</span>
                  </button>
                )}

                <button
                  onClick={handleMessage}
                  className="px-3.5 py-2 text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-violet-400" />
                  <span>Message</span>
                </button>

                <button
                  onClick={() => toggleSaveProfile(profile.id)}
                  className={`p-2 rounded-xl border transition-colors ${
                    isSaved
                      ? 'bg-violet-600/20 border-violet-500/40 text-violet-300'
                      : 'bg-white/[0.04] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                  title={isSaved ? 'Saved to bookmarks' : 'Save profile'}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-violet-400' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                  title="Share profile"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Headline & Location */}
          <div className="mb-5 space-y-1">
            <p className="text-sm font-medium text-zinc-200">{profile.headline}</p>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {profile.location}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-violet-400 font-medium">{profile.careerField}</span>
              {profile.seekingRole && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400/90 font-medium truncate max-w-xs">
                    Seeking: {profile.seekingRole}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#151520] rounded-xl border border-white/[0.06] mb-5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Overview & About
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'projects'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Projects ({profile.projects.length})
            </button>
            {!isSelf && (
              <button
                onClick={() => setActiveTab('vibe')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'vibe'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Vibe Compatibility
              </button>
            )}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-in fade-in duration-100">
              {/* Bio */}
              <div>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  About
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal bg-[#13131D] p-3.5 rounded-xl border border-white/[0.05]">
                  {profile.bio || 'No bio provided yet.'}
                </p>
              </div>

              {/* Interests & Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Interests */}
                <div className="bg-[#13131D] p-3.5 rounded-xl border border-white/[0.05]">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
                    Interests & Passions
                  </h4>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {profile.interests.map((interest, idx) => {
                      const isShared = currentUser.interests
                        .map((i) => i.toLowerCase())
                        .includes(interest.toLowerCase());
                      return (
                        <span
                          key={idx}
                          className={`px-2.5 py-1 rounded-lg border font-medium ${
                            isShared
                              ? 'bg-violet-950/60 text-violet-300 border-violet-700/50'
                              : 'bg-white/[0.04] text-zinc-300 border-white/[0.06]'
                          }`}
                        >
                          {interest} {isShared && '✦'}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-[#13131D] p-3.5 rounded-xl border border-white/[0.05]">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
                    Core Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                    {profile.skills.map((skill, idx) => {
                      const isShared = currentUser.skills
                        .map((s) => s.toLowerCase())
                        .includes(skill.toLowerCase());
                      return (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded-md border ${
                            isShared
                              ? 'bg-indigo-950/60 text-indigo-300 border-indigo-700/50'
                              : 'bg-white/[0.03] text-zinc-300 border-white/[0.06]'
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Hobbies & Goals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#13131D] p-3.5 rounded-xl border border-white/[0.05]">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Mindset & Hobbies
                  </h4>
                  <div className="space-y-1.5 text-zinc-300">
                    <p>
                      <span className="text-zinc-500 font-medium">Style: </span>
                      {profile.communicationStyle}
                    </p>
                    <p>
                      <span className="text-zinc-500 font-medium">Hobbies: </span>
                      {profile.hobbies.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="bg-[#13131D] p-3.5 rounded-xl border border-white/[0.05]">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Networking Intentions
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.goals.map((goal, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.06] text-xs"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Communities */}
              <div>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Communities
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {profile.communities.map((commId) => {
                    const comm = communities.find((c) => c.id === commId);
                    return (
                      <div
                        key={commId}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#13131D] border border-white/[0.06] text-zinc-300"
                      >
                        <Layers className="w-3.5 h-3.5 text-violet-400" />
                        <span>{comm?.name || commId}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Projects */}
          {activeTab === 'projects' && (
            <div className="space-y-3 animate-in fade-in duration-100">
              {profile.projects.length === 0 ? (
                <div className="p-8 text-center bg-[#13131D] rounded-xl border border-white/[0.05]">
                  <p className="text-sm text-zinc-400">No projects highlighted yet.</p>
                </div>
              ) : (
                profile.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-[#13131D] border border-white/[0.06] hover:border-violet-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h4 className="text-sm font-semibold text-white">{proj.title}</h4>
                      <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/30">
                        {proj.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                      {proj.description}
                    </p>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.05]">
                      <div className="flex flex-wrap gap-1 font-mono text-[11px] text-zinc-400">
                        {proj.tags.map((t, idx) => (
                          <span key={idx} className="bg-white/[0.04] px-1.5 py-0.5 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-violet-400 hover:text-violet-300 transition-colors"
                        >
                          <span>Repository</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Vibe Compatibility */}
          {activeTab === 'vibe' && !isSelf && (
            <div className="space-y-4 animate-in fade-in duration-100">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-950/40 via-[#14141E] to-[#12121A] border border-violet-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                    <span className="text-sm font-semibold text-white">Vibe Resonance Analysis</span>
                  </div>
                  <span className="text-2xl font-bold font-mono text-violet-400 tabular-nums">
                    {vibe.score}%
                  </span>
                </div>
                <p className="text-xs text-violet-200/90 leading-relaxed">
                  {vibe.highlightReason}
                </p>
              </div>

              {/* Breakdown Matrix */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#13131D] border border-white/[0.05]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-zinc-300">Shared Passions & Interests</span>
                    <span className="font-mono text-violet-400">
                      {vibe.sharedInterests.length} Mutual
                    </span>
                  </div>
                  {vibe.sharedInterests.length > 0 ? (
                    <div className="flex flex-wrap gap-1 text-xs">
                      {vibe.sharedInterests.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-violet-950/70 text-violet-300 border border-violet-800/40"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-500">Different core interest spheres.</p>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-[#13131D] border border-white/[0.05]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-zinc-300">Complementary Skills</span>
                    <span className="font-mono text-violet-400">
                      {vibe.sharedSkills.length} Shared
                    </span>
                  </div>
                  {vibe.sharedSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1 font-mono text-xs">
                      {vibe.sharedSkills.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-indigo-950/70 text-indigo-300 border border-indigo-800/40"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-500">Cross-domain skill complementarity.</p>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-[#13131D] border border-white/[0.05]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-zinc-300">Communication & Work Cadence</span>
                    <span
                      className={`text-xs font-medium ${
                        vibe.communicationMatch ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {vibe.communicationMatch ? 'Aligned Mindset' : 'Complementary Flow'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    You: <span className="text-zinc-200">{currentUser.communicationStyle}</span> ·{' '}
                    {profile.name.split(' ')[0]}:{' '}
                    <span className="text-zinc-200">{profile.communicationStyle}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Safety & Moderation Footer */}
          {!isSelf && (
            <div className="pt-5 mt-5 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500">
              <span className="text-[11px]">
                VYBE Safety Shield · Contact information never shared publicly
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowReportModal(true)}
                  className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Report</span>
                </button>
                <button
                  onClick={() => blockUser(profile.id)}
                  className="flex items-center gap-1 hover:text-rose-400 transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Block</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Safety Report Modal Sub-dialog */}
      {showReportModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#14141E] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Report User</h3>
            <p className="text-xs text-zinc-400">
              Help keep the VYBE community authentic and safe. Select a reason:
            </p>
            <div className="space-y-2 text-xs">
              {['Spam or commercial promotion', 'Harassment or offensive behavior', 'Impersonation or fake persona', 'Inappropriate content'].map(
                (reason) => (
                  <label
                    key={reason}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-pointer hover:bg-white/[0.06]"
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason}
                      checked={reportReason === reason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="accent-violet-600"
                    />
                    <span className="text-zinc-200">{reason}</span>
                  </label>
                )
              )}
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={submitReport}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
