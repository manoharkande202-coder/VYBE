import React from 'react';
import {
  User,
  Edit3,
  Sparkles,
  MapPin,
  ExternalLink,
  Layers,
  Shield,
  Clock,
  Briefcase,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';

export const UserProfileView: React.FC = () => {
  const { currentUser, setShowEditProfileModal, setShowOnboardingModal, communities } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Profile Card Banner */}
      <div className="relative rounded-2xl bg-[#111119] border border-white/[0.08] overflow-hidden shadow-xl">
        {/* Banner with violet mesh */}
        <div className="h-36 bg-gradient-to-r from-violet-950 via-purple-900/60 to-indigo-950 relative border-b border-white/[0.08]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* User Info Header */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 mb-4">
            <div className="flex items-end gap-3.5">
              <div className="p-1 rounded-2xl bg-[#111119] ring-2 ring-violet-500/30">
                <Avatar
                  src={currentUser.avatar}
                  name={currentUser.name}
                  size="2xl"
                  online={currentUser.online}
                />
              </div>
              <div className="mb-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  {currentUser.name}
                </h1>
                <p className="text-xs font-mono text-violet-400">@{currentUser.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowEditProfileModal(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl shadow-md shadow-violet-600/30 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => setShowOnboardingModal(true)}
                className="px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>Recalibrate Vibe</span>
              </button>
            </div>
          </div>

          {/* Headline & Meta */}
          <div className="space-y-1.5 mb-6">
            <p className="text-sm font-semibold text-zinc-200">{currentUser.headline}</p>
            <div className="flex items-center gap-3 text-xs text-zinc-400 flex-wrap">
              <span className="flex items-center gap-1 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {currentUser.location}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-violet-400 font-medium">{currentUser.careerField}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-zinc-400">{currentUser.joinedDate}</span>
              {currentUser.seekingRole && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-medium">
                    Seeking: {currentUser.seekingRole}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* About Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              About
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-[#14141E] p-4 rounded-xl border border-white/[0.05]">
              {currentUser.bio || 'Add a bio to let like-minded peers discover your story.'}
            </p>
          </div>

          {/* Interests & Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#14141E] p-4 rounded-xl border border-white/[0.05]">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
                Interests & Passions
              </h3>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {currentUser.interests.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-violet-950/50 text-violet-300 border border-violet-800/40"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#14141E] p-4 rounded-xl border border-white/[0.05]">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
                Core Skills
              </h3>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {currentUser.skills.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-indigo-950/50 text-indigo-300 border border-indigo-800/40"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mindset & Networking Intentions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-xs">
            <div className="bg-[#14141E] p-4 rounded-xl border border-white/[0.05]">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Mindset & Lifestyle
              </h3>
              <div className="space-y-1.5 text-zinc-300">
                <p>
                  <span className="text-zinc-500 font-medium">Style: </span>
                  {currentUser.communicationStyle}
                </p>
                <p>
                  <span className="text-zinc-500 font-medium">Hobbies: </span>
                  {currentUser.hobbies.join(', ')}
                </p>
              </div>
            </div>

            <div className="bg-[#14141E] p-4 rounded-xl border border-white/[0.05]">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Connection Goals
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.goals.map((goal, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Current Projects */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Projects & Contributions
            </h3>
            <div className="space-y-3">
              {currentUser.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-[#14141E] border border-white/[0.06] flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h4 className="text-xs font-bold text-white">{proj.title}</h4>
                    <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/30">
                      {proj.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.04]">
                    <div className="flex flex-wrap gap-1 font-mono text-[10px] text-zinc-400">
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
                        className="flex items-center gap-1 text-violet-400 hover:text-violet-300 text-[11px]"
                      >
                        <span>Repo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Communities */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              My Communities
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {currentUser.communities.map((commId) => {
                const comm = communities.find((c) => c.id === commId);
                return (
                  <div
                    key={commId}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#14141E] border border-white/[0.06] text-zinc-300"
                  >
                    <Layers className="w-3.5 h-3.5 text-violet-400" />
                    <span>{comm?.name || commId}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
