import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Compass,
  Heart,
  Cpu,
  Target,
  MessageCircle,
  Users,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CommunicationStyle, ConnectionGoal } from '../../types';

const INTEREST_OPTIONS = [
  'Artificial Intelligence',
  'Design Systems',
  'Indie SaaS',
  'Creative Tech',
  'Spatial Audio',
  'Open Source',
  'Generative Art',
  'Climate Tech',
  'Philosophy & Ethics',
  'Decentralized Protocols',
  'Robotics',
  'Cybersecurity',
  'Typography',
  'BioTech',
];

const HOBBY_OPTIONS = [
  'Specialty coffee',
  'Synth jamming',
  'Trail running',
  'Chess & Strategy',
  'Sci-fi literature',
  'Mechanical keyboards',
  'Analog photography',
  'Bouldering',
  'Vinyl collecting',
  'Game jams',
  'Ceramics',
  'Podcasting',
];

const SKILL_OPTIONS = [
  'React / Next.js',
  'TypeScript',
  'UI/UX Design Systems',
  'Python / PyTorch',
  'Node.js & Go',
  'Product Strategy',
  'Three.js & WebGL',
  'Growth & Marketing',
  'Distributed Databases',
  'Mobile Development',
  'Smart Contracts',
  'Motion Graphics',
];

const COMMUNICATION_STYLES: { style: CommunicationStyle; desc: string }[] = [
  {
    style: 'Deep async thinker',
    desc: 'Prefers thoughtful written docs, asynchronous pull requests, and scheduled deep focus blocks.',
  },
  {
    style: 'Fast brainstormer',
    desc: 'Thrives on high-tempo whiteboarding, voice huddles, and rapid iterative conceptualization.',
  },
  {
    style: 'Casual coffee chat',
    desc: 'Loves informal 1-on-1 chats to explore curiosities, serendipity, and organic connections.',
  },
  {
    style: 'Structured sprints',
    desc: 'Enjoys weekly agendas, defined deliverables, clear milestones, and measurable outcomes.',
  },
  {
    style: 'Weekend builder',
    desc: 'Hacks on creative passions after hours, side projects, and weekend exploratory prototypes.',
  },
];

const GOAL_OPTIONS: { goal: ConnectionGoal; desc: string }[] = [
  {
    goal: 'Project collaboration',
    desc: 'Teaming up to build apps, open source tools, or creative experiments.',
  },
  {
    goal: 'Startup partnerships',
    desc: 'Finding a technical/design co-founder or early founding team member.',
  },
  {
    goal: 'Mentorship',
    desc: 'Learning from experienced veterans or coaching the next generation.',
  },
  {
    goal: 'Friendship',
    desc: 'Connecting with kindred spirits who share identical passions and vibes.',
  },
  {
    goal: 'Professional networking',
    desc: 'Expanding peer circles with high-calibre creators, engineers, and founders.',
  },
  {
    goal: 'Learning new skills',
    desc: 'Pair programming, study groups, and cross-domain knowledge swapping.',
  },
];

export const OnboardingModal: React.FC = () => {
  const { showOnboardingModal, setShowOnboardingModal, completeOnboarding, currentUser } = useApp();

  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Selections
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    currentUser.interests.length > 0 ? currentUser.interests : ['Artificial Intelligence', 'Design Systems']
  );
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(
    currentUser.hobbies.length > 0 ? currentUser.hobbies : ['Specialty coffee', 'Synth jamming']
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    currentUser.skills.length > 0 ? currentUser.skills : ['React / Next.js', 'TypeScript']
  );
  const [selectedStyle, setSelectedStyle] = useState<CommunicationStyle>(
    currentUser.communicationStyle || 'Deep async thinker'
  );
  const [selectedGoals, setSelectedGoals] = useState<ConnectionGoal[]>(
    currentUser.goals.length > 0 ? currentUser.goals : ['Project collaboration', 'Startup partnerships']
  );
  const [headline, setHeadline] = useState(currentUser.headline || '');
  const [seekingRole, setSeekingRole] = useState(currentUser.seekingRole || '');

  if (!showOnboardingModal) return null;

  const toggleInterest = (item: string) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleHobby = (item: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(item) ? prev.filter((h) => h !== item) : [...prev, item]
    );
  };

  const toggleSkill = (item: string) => {
    setSelectedSkills((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  const toggleGoal = (item: ConnectionGoal) => {
    setSelectedGoals((prev) =>
      prev.includes(item) ? prev.filter((g) => g !== item) : [...prev, item]
    );
  };

  const handleFinish = () => {
    completeOnboarding({
      interests: selectedInterests,
      hobbies: selectedHobbies,
      skills: selectedSkills,
      communicationStyle: selectedStyle,
      goals: selectedGoals,
      headline: headline || currentUser.headline,
      seekingRole: seekingRole || currentUser.seekingRole,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={() => setShowOnboardingModal(false)}
      />

      <div className="relative w-full max-w-xl bg-[#0E0E15] border border-violet-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden">
        {/* Glow corner */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                Vibe Calibration · Step {step} of {totalSteps}
              </span>
              <p className="text-xs text-zinc-400">Calibrating your personal resonance engine</p>
            </div>
          </div>
          <button
            onClick={() => setShowOnboardingModal(false)}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.06]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-white/[0.06] h-1.5 rounded-full my-5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-violet-600 to-purple-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Content by Step */}
        <div className="min-h-[290px] py-1">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  What sparks your intellectual curiosity?
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Pick at least 2 interests to unlock matching in relevant community channels.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {INTEREST_OPTIONS.map((item) => {
                  const isSelected = selectedInterests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                        isSelected
                          ? 'bg-violet-600/25 border-violet-500 text-white shadow-sm shadow-violet-600/30'
                          : 'bg-[#151520] border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                      }`}
                    >
                      {item} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  What do you nerd out on outside of work?
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Meaningful connections are built on shared passions, taste, and lifestyle.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {HOBBY_OPTIONS.map((item) => {
                  const isSelected = selectedHobbies.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleHobby(item)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                        isSelected
                          ? 'bg-purple-600/25 border-purple-500 text-white shadow-sm'
                          : 'bg-[#151520] border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                      }`}
                    >
                      {item} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  What domains & skills do you bring to the table?
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  This pairs you with collaborators whose expertise complements yours.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
                {SKILL_OPTIONS.map((item) => {
                  const isSelected = selectedSkills.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleSkill(item)}
                      className={`px-3 py-2 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-indigo-600/25 border-indigo-500 text-indigo-200'
                          : 'bg-[#151520] border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                      }`}
                    >
                      {item} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  What is your primary networking purpose?
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  VYBE prioritizes intentional relationships over random follower counts.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {GOAL_OPTIONS.map(({ goal, desc }) => {
                  const isSelected = selectedGoals.includes(goal);
                  return (
                    <button
                      type="button"
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-violet-950/60 border-violet-500 shadow-sm'
                          : 'bg-[#151520] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-semibold ${
                            isSelected ? 'text-violet-300' : 'text-zinc-200'
                          }`}
                        >
                          {goal}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-violet-400" />}
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-tight">{desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  How do you prefer to collaborate & communicate?
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Ensures zero friction when connecting on ambitious ideas.
                </p>
              </div>
              <div className="space-y-2 pt-2">
                {COMMUNICATION_STYLES.map(({ style, desc }) => {
                  const isSelected = selectedStyle === style;
                  return (
                    <button
                      type="button"
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`w-full p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-violet-950/60 border-violet-500 shadow-sm'
                          : 'bg-[#151520] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold ${
                            isSelected ? 'text-violet-300' : 'text-zinc-200'
                          }`}
                        >
                          {style}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-violet-400" />}
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Final Polish: Headline & Seeking Role
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Craft the one-liner that peers will see when they discover your profile card.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Full-Stack Developer & Creative Technologist"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151520] border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    What or who are you seeking?
                  </label>
                  <input
                    type="text"
                    value={seekingRole}
                    onChange={(e) => setSeekingRole(e.target.value)}
                    placeholder="e.g. Technical Co-founder / Design Partner"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#151520] border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-800/30 text-xs text-violet-200 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <p>
                    Your calibrated vibe will dynamically calculate authentic resonance percentages
                    across thousands of peers in the VYBE network.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl shadow-md shadow-violet-600/30 transition-all active:scale-95"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:opacity-95 rounded-xl shadow-lg shadow-violet-600/40 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Your Vibe</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
