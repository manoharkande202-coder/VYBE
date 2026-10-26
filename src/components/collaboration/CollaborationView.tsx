import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  Filter,
  X,
  Code,
  Rocket,
  Palette,
  Terminal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { CollaborationProject } from '../../types';

export const CollaborationView: React.FC = () => {
  const {
    collaborationProjects,
    applyToCollaboration,
    createCollaboration,
    openProfileModal,
    currentUser,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState<CollaborationProject | null>(null);
  const [applyNote, setApplyNote] = useState('');

  // New Collaboration Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CollaborationProject['category']>('Coding');
  const [newDescription, setNewDescription] = useState('');
  const [newRequiredSkills, setNewRequiredSkills] = useState('');
  const [newTeamSize, setNewTeamSize] = useState('1 / 3 builders');
  const [newTimeline, setNewTimeline] = useState('4-6 weeks');
  const [newLookingFor, setNewLookingFor] = useState('');

  const categories = [
    'All',
    'Coding',
    'Startup',
    'Open Source',
    'Design Systems',
    'Creative Tech',
    'Web Design',
  ];

  const filteredProjects = collaborationProjects.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    createCollaboration({
      title: newTitle.trim(),
      category: newCategory,
      description: newDescription.trim(),
      requiredSkills: newRequiredSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      teamSize: newTeamSize,
      timeline: newTimeline,
      lookingFor: newLookingFor || 'Collaborators & builders',
    });

    // Reset and close
    setNewTitle('');
    setNewDescription('');
    setNewRequiredSkills('');
    setShowCreateModal(false);
  };

  const handleApplySubmit = () => {
    if (showApplyModal) {
      applyToCollaboration(showApplyModal.id, applyNote);
      setShowApplyModal(null);
      setApplyNote('');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Post CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-violet-400" />
            <span>Collaboration Hub</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Build coding tools, open source experiments, startup MVPs, and creative tech with resonant peers.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl shadow-md shadow-violet-600/30 flex items-center gap-1.5 self-start sm:self-auto active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post Collaboration Idea</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-[#12121A] text-zinc-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredProjects.map((project) => {
          const isCreator = project.creatorId === currentUser.id;

          return (
            <div
              key={project.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#111119] border border-white/[0.07] hover:border-violet-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Creator Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    onClick={() => openProfileModal(project.creatorId)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <Avatar
                      src={project.creatorAvatar}
                      name={project.creatorName}
                      size="md"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors">
                        {project.creatorName}
                      </h4>
                      <p className="text-[11px] text-zinc-400">{project.creatorRole}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-violet-950/60 border border-violet-800/40 text-[11px] font-medium text-violet-300 font-mono">
                    {project.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-white tracking-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Looking For Spotlight */}
                <div className="p-3 rounded-xl bg-[#151522] border border-white/[0.05] mb-4 text-xs">
                  <p className="text-zinc-400 font-medium">
                    <span className="text-violet-400 font-semibold">Seeking: </span>
                    {project.lookingFor}
                  </p>
                </div>

                {/* Required Skills */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Required Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {project.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Meta & Apply Action */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4 text-zinc-400 text-[11px]">
                  <span className="flex items-center gap-1 font-mono">
                    <Users className="w-3.5 h-3.5 text-zinc-400" />
                    {project.teamSize}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    {project.timeline}
                  </span>
                </div>

                <div>
                  {isCreator ? (
                    <span className="text-xs text-violet-400 font-medium px-2 py-1 bg-violet-950/40 rounded-lg">
                      Your Project
                    </span>
                  ) : project.applied ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-800/40">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Application Sent</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setShowApplyModal(project)}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-sm active:scale-95"
                    >
                      Apply to Collaborate
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Post New Collaboration Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0F0F16] border border-white/10 rounded-2xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Post Collaboration Opportunity
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold uppercase tracking-wider mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Distributed Knowledge Graph for Indie Hackers"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141E] border border-white/10 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-semibold uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-white/10 text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="Coding">Coding</option>
                    <option value="Startup">Startup</option>
                    <option value="Open Source">Open Source</option>
                    <option value="Design Systems">Design Systems</option>
                    <option value="Creative Tech">Creative Tech</option>
                    <option value="Web Design">Web Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold uppercase tracking-wider mb-1">
                    Timeline
                  </label>
                  <input
                    type="text"
                    value={newTimeline}
                    onChange={(e) => setNewTimeline(e.target.value)}
                    placeholder="e.g. 4-6 weeks sprint"
                    className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-white/10 text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold uppercase tracking-wider mb-1">
                  Project Description & Vision
                </label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="What is the concept? What problem does it solve and what are you building?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141E] border border-white/10 text-white focus:outline-none focus:border-violet-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold uppercase tracking-wider mb-1">
                  Required Skills (Comma separated)
                </label>
                <input
                  type="text"
                  value={newRequiredSkills}
                  onChange={(e) => setNewRequiredSkills(e.target.value)}
                  placeholder="e.g. React, Next.js, WebGL, Shaders, Go"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141E] border border-white/10 text-white focus:outline-none focus:border-violet-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold uppercase tracking-wider mb-1">
                  Who Are You Looking For?
                </label>
                <input
                  type="text"
                  value={newLookingFor}
                  onChange={(e) => setNewLookingFor(e.target.value)}
                  placeholder="e.g. Frontend developer with creative audio experience"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141E] border border-white/10 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl"
                >
                  Publish Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Apply Note Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0F0F16] border border-white/10 rounded-2xl p-6 z-10 space-y-4">
            <h3 className="text-base font-bold text-white">
              Apply to: {showApplyModal.title}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Introduce yourself to {showApplyModal.creatorName} and mention why your skills match
              this collaboration.
            </p>

            <textarea
              rows={4}
              value={applyNote}
              onChange={(e) => setApplyNote(e.target.value)}
              placeholder="Hi! I saw your project and have experience with this stack. I'd love to contribute..."
              className="w-full p-3 rounded-xl bg-[#14141E] border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500 resize-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.08]">
              <button
                onClick={() => setShowApplyModal(null)}
                className="px-3.5 py-2 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleApplySubmit}
                className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl"
              >
                Send Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
