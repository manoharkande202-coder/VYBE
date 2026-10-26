import React, { useState } from 'react';
import {
  Globe2,
  Users,
  MessageSquare,
  Sparkles,
  Check,
  Plus,
  Send,
  X,
  Code,
  Rocket,
  Palette,
  Camera,
  Gamepad2,
  GraduationCap,
  Layers,
  BrainCircuit,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Community } from '../../types';

export const CommunitiesView: React.FC = () => {
  const { communities, toggleCommunityJoin, showToast } = useApp();

  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [discussionInput, setDiscussionInput] = useState('');
  const [communityDiscussions, setCommunityDiscussions] = useState<Record<string, Array<{ id: string; author: string; text: string; time: string; likes: number }>>>({
    comm_dev_hub: [
      {
        id: 'disc_1',
        author: 'Marcus Vance',
        text: 'What are your thoughts on moving towards local-first SQLite architectures in 2026? Are the sync conflict protocols maturing enough?',
        time: '2h ago',
        likes: 18,
      },
      {
        id: 'disc_2',
        author: 'Kai Chen',
        text: 'We just open-sourced our WebGL sound synthesizer. Tested it on low-end mobile devices and getting steady 60fps.',
        time: '5h ago',
        likes: 24,
      },
    ],
    comm_ai_explorers: [
      {
        id: 'disc_3',
        author: 'Dr. Sophia Lin',
        text: 'Evaluating reasoning benchmarks on 7B parameter models vs frontier APIs. The latency delta on edge hardware is closing rapidly.',
        time: '1h ago',
        likes: 31,
      },
    ],
    comm_creative_minds: [
      {
        id: 'disc_4',
        author: 'Maya Patel',
        text: 'Experimenting with brutalist dark mode aesthetics that respect WCAG AA contrast without feeling muddy.',
        time: '3h ago',
        likes: 15,
      },
    ],
  });

  const getCommunityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-violet-400" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-purple-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-violet-400" />;
      case 'Layout':
        return <Palette className="w-5 h-5 text-pink-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-blue-400" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-amber-400" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Globe2 className="w-5 h-5 text-violet-400" />;
    }
  };

  const handlePostDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discussionInput.trim() || !selectedCommunity) return;

    const newPost = {
      id: `disc_${Date.now()}`,
      author: 'You (Alex Rivera)',
      text: discussionInput.trim(),
      time: 'Just now',
      likes: 1,
    };

    setCommunityDiscussions((prev) => ({
      ...prev,
      [selectedCommunity.id]: [newPost, ...(prev[selectedCommunity.id] || [])],
    }));

    setDiscussionInput('');
    showToast(`Shared to #${selectedCommunity.slug}`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Globe2 className="w-6 h-6 text-violet-400" />
          <span>Communities & Special Interest Tribes</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Join collaborative circles where engineers, founders, and designers exchange insights.
        </p>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {communities.map((comm) => (
          <div
            key={comm.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#111119] border border-white/[0.07] hover:border-violet-500/35 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover:bg-violet-950/40 group-hover:border-violet-700/40 transition-colors">
                  {getCommunityIcon(comm.iconName)}
                </div>

                <button
                  onClick={() => toggleCommunityJoin(comm.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    comm.isJoined
                      ? 'bg-white/[0.06] text-zinc-300 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-800/40 border border-white/10'
                      : 'bg-violet-600 hover:bg-violet-500 text-white shadow-sm shadow-violet-600/30'
                  }`}
                >
                  {comm.isJoined ? 'Joined ✓' : '+ Join Tribe'}
                </button>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors mb-1">
                {comm.name}
              </h3>
              <p className="text-xs text-zinc-400 font-mono mb-3">
                {comm.memberCount.toLocaleString()} active members · {comm.recentActivity}
              </p>

              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                {comm.description}
              </p>

              {/* Hot Discussion Highlight */}
              <div className="p-3 rounded-xl bg-[#141420] border border-white/[0.05] text-[11px] mb-4">
                <span className="text-[10px] font-semibold text-violet-400 uppercase tracking-wider block mb-1">
                  Active Thread
                </span>
                <p className="text-zinc-300 font-medium line-clamp-2">
                  "{comm.featuredTopic}"
                </p>
              </div>
            </div>

            {/* View Discussion Feed Action */}
            <div className="pt-3 border-t border-white/[0.06]">
              <button
                onClick={() => setSelectedCommunity(comm)}
                className="w-full py-2 px-3 text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
                <span>Open Community Discussions</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Community Discussion Drawer / Modal */}
      {selectedCommunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0F0F16] border border-white/10 rounded-2xl p-6 z-10 max-h-[85vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-base font-bold text-white">{selectedCommunity.name}</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  #{selectedCommunity.slug} · {selectedCommunity.memberCount.toLocaleString()} members
                </p>
              </div>
              <button
                onClick={() => setSelectedCommunity(null)}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Discussion Feed */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {(communityDiscussions[selectedCommunity.id] || []).length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-500">
                  No threads yet in this tribe. Start the first conversation below!
                </div>
              ) : (
                (communityDiscussions[selectedCommunity.id] || []).map((disc) => (
                  <div
                    key={disc.id}
                    className="p-3.5 rounded-xl bg-[#14141E] border border-white/[0.05] space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-violet-300">{disc.author}</span>
                      <span className="text-zinc-500 font-mono text-[11px]">{disc.time}</span>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed">{disc.text}</p>
                    <div className="pt-2 flex items-center gap-3 text-[11px] text-zinc-400">
                      <button className="hover:text-violet-400 transition-colors">
                        ▲ {disc.likes} resonance
                      </button>
                      <button className="hover:text-zinc-200 transition-colors">Reply</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handlePostDiscussion} className="pt-3 border-t border-white/[0.08] flex gap-2">
              <input
                type="text"
                value={discussionInput}
                onChange={(e) => setDiscussionInput(e.target.value)}
                placeholder={`Share a thought or question in #${selectedCommunity.slug}...`}
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#14141E] border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
