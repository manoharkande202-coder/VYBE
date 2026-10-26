import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Users,
  Compass,
  Briefcase,
  GraduationCap,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe2,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HERO_AMBIENT_IMAGE } from '../../data/mockData';
import { Avatar } from '../common/Avatar';
import { calculateVibeMatch } from '../../utils/matching';

export const LandingPage: React.FC = () => {
  const { setActiveView, profiles, currentUser, openProfileModal, communities, setShowOnboardingModal } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featuredProfiles = profiles.slice(0, 4);

  const faqs = [
    {
      q: 'How does the VYBE match algorithm calculate compatibility?',
      a: 'Unlike superficial follower platforms, VYBE computes genuine compatibility based on four weighted dimensions: deep interests & intellectual passions (35%), complementary technical skills (25%), shared connection goals (25%), and communication & work cadence alignment (15%). No random numbers.',
    },
    {
      q: 'Is VYBE designed for friends, professional work, or co-founders?',
      a: 'All of the above! During onboarding, you define your primary connection intentions—whether that is finding a design co-founder for an early-stage startup, meeting fellow developers for weekend open-source hacking, seeking a senior mentor, or just finding friends who love the same niche music and books.',
    },
    {
      q: 'How is user privacy and data security protected?',
      a: 'VYBE enforces strict privacy standards. We never reveal precise geolocation (only general city/timezone) or private contact information publicly. You maintain granular control over who can view your profile, and our Safety Shield allows instant reporting and blocking.',
    },
    {
      q: 'Can I change my interests and vibe preferences over time?',
      a: 'Yes, your vibe calibration is completely dynamic! You can recalibrate your interests, skills, and goals at any time from your profile or the Calibration modal, and your Discovery feed updates immediately.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#08080C] text-zinc-100">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-white/[0.06]">
        {/* Ambient Hero Image with Measured Scrim */}
        <div className="absolute inset-0 z-0 opacity-35 mix-blend-screen pointer-events-none">
          <img
            src={HERO_AMBIENT_IMAGE}
            alt="Futuristic orbital network visualization"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080C]/40 via-[#08080C]/80 to-[#08080C] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tagline kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-700/40 text-violet-300 text-xs font-semibold mb-6 shadow-lg shadow-violet-900/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Your Vibe. Your Tribe.</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] text-balance">
            Find People Who{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Think Like You.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Meet your next collaborator, mentor, friend, or creative partner. Discover people who
            match your interests, ambitions, and vibe.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveView('discover')}
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Discover Your People</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveView('communities')}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-zinc-200 bg-[#14141E] border border-white/10 hover:border-violet-500/40 rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-white/[0.04]"
            >
              <Globe2 className="w-4 h-4 text-violet-400" />
              <span>Explore Communities</span>
            </button>

            <button
              onClick={() => setShowOnboardingModal(true)}
              className="w-full sm:w-auto px-5 py-3.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Calibrate Your Vibe →
            </button>
          </div>

          {/* Hero Trust Markers */}
          <div className="mt-14 pt-8 border-t border-white/[0.07] grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-3">
              <p className="text-2xl font-bold font-mono text-white tabular-nums">94%</p>
              <p className="text-xs text-zinc-400 mt-1">Average resonance accuracy</p>
            </div>
            <div className="p-3">
              <p className="text-2xl font-bold font-mono text-white tabular-nums">18,500+</p>
              <p className="text-xs text-zinc-400 mt-1">Active builders & creators</p>
            </div>
            <div className="p-3">
              <p className="text-2xl font-bold font-mono text-white tabular-nums">450+</p>
              <p className="text-xs text-zinc-400 mt-1">Shipped collaborative projects</p>
            </div>
            <div className="p-3">
              <p className="text-2xl font-bold font-mono text-white tabular-nums">Zero</p>
              <p className="text-xs text-zinc-400 mt-1">Vanity metrics or ad clutter</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Profiles */}
      <section className="py-16 md:py-24 border-b border-white/[0.06] bg-[#0A0A10]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
                Kindred Spirits
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Featured Profiles In Your Frequency
              </h2>
            </div>
            <button
              onClick={() => setActiveView('discover')}
              className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>View all profiles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProfiles.map((p) => {
              const vibe = calculateVibeMatch(currentUser, p);
              return (
                <div
                  key={p.id}
                  onClick={() => openProfileModal(p.id)}
                  className="p-5 rounded-2xl bg-[#12121A] border border-white/[0.06] hover:border-violet-500/40 hover:bg-[#151522] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <Avatar src={p.avatar} name={p.name} size="lg" online={p.online} />
                      <div className="px-2.5 py-1 rounded-xl bg-violet-950/70 border border-violet-700/40 text-[11px] font-semibold text-violet-300 font-mono tabular-nums">
                        {vibe.score}% Vibe
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mb-2 truncate">@{p.username}</p>
                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-4">
                      {p.bio}
                    </p>
                  </div>

                  <div>
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                      <span className="text-violet-400 font-medium truncate max-w-[120px]">
                        {p.careerField}
                      </span>
                      <span className="group-hover:translate-x-0.5 transition-transform text-white">
                        Profile →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="py-16 md:py-24 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
              Architecture of Alignment
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              How VYBE Works
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Three deliberate steps from random digital noise to deep intellectual resonance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#101018] border border-white/[0.07] relative">
              <div className="w-10 h-10 rounded-xl bg-violet-950/70 border border-violet-700/40 flex items-center justify-center text-violet-400 font-bold mb-4 font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">Calibrate Your Vibe</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Select your core intellectual passions, engineering or creative skills, lifestyle
                hobbies, and preferred collaboration style.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#101018] border border-white/[0.07] relative">
              <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-700/40 flex items-center justify-center text-purple-400 font-bold mb-4 font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">Discover Resonant Minds</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Our multidimensional match algorithm computes compatibility percentages and
                identifies specific intersections of curiosity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#101018] border border-white/[0.07] relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/70 border border-indigo-700/40 flex items-center justify-center text-indigo-400 font-bold mb-4 font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">Build & Collaborate</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Join curated communities, apply to open collaboration sprints, book mentor advisory,
                and turn ideas into shipped realities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Interests & Communities */}
      <section className="py-16 md:py-24 border-b border-white/[0.06] bg-[#0A0A10]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
                Shared Spheres
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Explore Popular Interests & Tribes
              </h2>
              <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
                Whether you are exploring distributed systems, spatial audio shaders, venture
                strategy, or analog medium format photography, there is a dedicated tribe waiting
                for your perspective.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  'Artificial Intelligence',
                  'Design Systems',
                  'Indie SaaS',
                  'Spatial Audio',
                  'Philosophy',
                  'Web3 Protocols',
                  'Generative Art',
                  'Climate Tech',
                  'Analog Photography',
                  'Three.js & WebGL',
                  'Specialty Coffee',
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveView('discover')}
                    className="px-3 py-1.5 rounded-xl bg-[#14141E] border border-white/10 hover:border-violet-500/40 text-xs font-medium text-zinc-300 hover:text-white transition-all"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setActiveView('communities')}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-md shadow-violet-600/30 flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Browse All Communities</span>
                </button>
              </div>
            </div>

            {/* Featured Community Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {communities.slice(0, 4).map((comm) => (
                <div
                  key={comm.id}
                  onClick={() => setActiveView('communities')}
                  className="p-4 rounded-xl bg-[#12121A] border border-white/[0.06] hover:border-violet-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white group-hover:text-violet-300 transition-colors">
                      {comm.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {comm.memberCount.toLocaleString()} members
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {comm.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Authentic Testimonials */}
      <section className="py-16 md:py-24 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
              Real Connections
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Kindred Minds Who Found Their Tribe
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#12121A] border border-white/[0.06] flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                "I was tired of generic LinkedIn connection spam. On VYBE, I matched with a design
                systems engineer who also brewed V60 pour-over coffee. We ended up co-authoring an
                open source token engine in 6 weeks."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <Avatar
                  src="/src/assets/images/avatar_marcus_engineer_1793004530753.jpg"
                  name="Marcus Vance"
                  size="sm"
                />
                <div>
                  <p className="text-xs font-bold text-white">Marcus Vance</p>
                  <p className="text-[11px] text-zinc-400">Distributed Systems Engineer</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#12121A] border border-white/[0.06] flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                "The Vibe match breakdown is shockingly accurate. Instead of cold pitching, my
                first conversation with our founding engineer started with our mutual love for
                spatial audio shaders. Best networking experience of my career."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <Avatar
                  src="/src/assets/images/avatar_priya_founder_1793004530919.jpg"
                  name="Priya Sharma"
                  size="sm"
                />
                <div>
                  <p className="text-xs font-bold text-white">Priya Sharma</p>
                  <p className="text-[11px] text-zinc-400">Founder @ SynthOS</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#12121A] border border-white/[0.06] flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                "As an async thinker, traditional networking events drain my energy. VYBE let me
                filter strictly for thoughtful async peers and find mentorship from people who
                respect uninterrupted focus."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <Avatar
                  src="/src/assets/images/avatar_elena_designer_1793004529923.jpg"
                  name="Elena Rostova"
                  size="sm"
                />
                <div>
                  <p className="text-xs font-bold text-white">Elena Rostova</p>
                  <p className="text-[11px] text-zinc-400">Design Technologist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-16 md:py-24 border-b border-white/[0.06] bg-[#0A0A10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
              Clarity
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#12121A] border border-white/[0.06] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm font-semibold text-white">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-violet-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-zinc-300 leading-relaxed border-t border-white/[0.04] pt-3 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Bottom Call-To-Action */}
      <section className="py-20 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-violet-950/50 via-[#12121B] to-[#141420] border border-violet-500/30 vybe-glow">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Ready to meet the people who resonate on your frequency?
            </h2>
            <p className="mt-3 text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Step beyond random social feeds. Calibrate your vibe in 60 seconds and tap into a
              meaningful network of creators.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setActiveView('discover')}
                className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl shadow-lg shadow-violet-600/30 hover:opacity-95 transition-all"
              >
                Launch Discover Mode
              </button>
              <button
                onClick={() => setShowOnboardingModal(true)}
                className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-zinc-300 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-xl transition-colors"
              >
                Calibrate Preferences
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="py-8 border-t border-white/[0.06] text-center text-xs text-zinc-500">
        <p>© 2026 VYBE Network · Your Vibe. Your Tribe. · Designed for meaningful connection</p>
      </footer>
    </div>
  );
};
