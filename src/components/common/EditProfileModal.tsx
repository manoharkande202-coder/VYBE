import React, { useState } from 'react';
import { X, Check, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareerField, CommunicationStyle, ConnectionGoal } from '../../types';

export const EditProfileModal: React.FC = () => {
  const {
    showEditProfileModal,
    setShowEditProfileModal,
    currentUser,
    updateCurrentUser,
  } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [headline, setHeadline] = useState(currentUser.headline);
  const [bio, setBio] = useState(currentUser.bio);
  const [location, setLocation] = useState(currentUser.location);
  const [careerField, setCareerField] = useState<CareerField>(currentUser.careerField);
  const [seekingRole, setSeekingRole] = useState(currentUser.seekingRole || '');
  const [communicationStyle, setCommunicationStyle] = useState<CommunicationStyle>(
    currentUser.communicationStyle
  );

  const [interests, setInterests] = useState<string[]>([...currentUser.interests]);
  const [newInterest, setNewInterest] = useState('');

  const [skills, setSkills] = useState<string[]>([...currentUser.skills]);
  const [newSkill, setNewSkill] = useState('');

  const [hobbies, setHobbies] = useState<string[]>([...currentUser.hobbies]);
  const [newHobby, setNewHobby] = useState('');

  const [goals, setGoals] = useState<ConnectionGoal[]>([...currentUser.goals]);

  if (!showEditProfileModal) return null;

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (item: string) => {
    setInterests(interests.filter((i) => i !== item));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (item: string) => {
    setSkills(skills.filter((s) => s !== item));
  };

  const handleAddHobby = () => {
    if (newHobby.trim() && !hobbies.includes(newHobby.trim())) {
      setHobbies([...hobbies, newHobby.trim()]);
      setNewHobby('');
    }
  };

  const handleRemoveHobby = (item: string) => {
    setHobbies(hobbies.filter((h) => h !== item));
  };

  const toggleGoal = (goal: ConnectionGoal) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter((g) => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      headline,
      bio,
      location,
      careerField,
      seekingRole,
      communicationStyle,
      interests,
      skills,
      hobbies,
      goals,
    });
    setShowEditProfileModal(false);
  };

  const availableGoals: ConnectionGoal[] = [
    'Friendship',
    'Professional networking',
    'Project collaboration',
    'Mentorship',
    'Startup partnerships',
    'Learning new skills',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => setShowEditProfileModal(false)}
      />

      <div className="relative w-full max-w-2xl bg-[#0F0F16] border border-white/10 rounded-2xl shadow-2xl p-6 z-10 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
          <h2 className="text-lg font-bold text-white tracking-tight">Edit Your VYBE Profile</h2>
          <button
            onClick={() => setShowEditProfileModal(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141E] border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Career Domain
              </label>
              <select
                value={careerField}
                onChange={(e) => setCareerField(e.target.value as CareerField)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141E] border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
                <option value="Product">Product</option>
                <option value="Research">Research</option>
                <option value="Student">Student</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Headline
            </label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141E] border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
              placeholder="e.g. Full-Stack Developer & Creative Technologist"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Bio & Vibe
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141E] border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 resize-none"
              placeholder="What are you building, thinking about, or looking for?"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                General Location / Timezone
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141E] border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                placeholder="e.g. San Francisco, CA (PST)"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Currently Seeking
              </label>
              <input
                type="text"
                value={seekingRole}
                onChange={(e) => setSeekingRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141E] border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                placeholder="e.g. Technical Co-founder / Design Partner"
              />
            </div>
          </div>

          {/* Communication Style */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Communication & Work Mindset
            </label>
            <select
              value={communicationStyle}
              onChange={(e) => setCommunicationStyle(e.target.value as CommunicationStyle)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141E] border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
            >
              <option value="Deep async thinker">Deep async thinker</option>
              <option value="Fast brainstormer">Fast brainstormer</option>
              <option value="Casual coffee chat">Casual coffee chat</option>
              <option value="Structured sprints">Structured sprints</option>
              <option value="Weekend builder">Weekend builder</option>
            </select>
          </div>

          {/* Connection Goals */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Connection Goals (Select all that apply)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableGoals.map((goal) => {
                const isSelected = goals.includes(goal);
                return (
                  <button
                    type="button"
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`px-3 py-2 text-xs rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-violet-950/60 border-violet-500 text-violet-200'
                        : 'bg-[#14141E] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {goal}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interests Manager */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Interests & Passions
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                placeholder="Add an interest..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-[#14141E] border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-medium"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {interests.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-950/40 text-violet-300 border border-violet-800/40 text-xs"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(item)}
                    className="hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Skills Manager */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Skills & Expertise
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                placeholder="Add a skill (e.g. Next.js, Figma, Go)..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-[#14141E] border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500 font-mono"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-medium"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {skills.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-950/40 text-indigo-300 border border-indigo-800/40 text-xs"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(item)}
                    className="hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowEditProfileModal(false)}
              className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl shadow-md shadow-violet-600/30"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
