import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Calendar,
  Languages,
  Clock,
  CheckCircle2,
  X,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { MentorProfile } from '../../types';

export const MentorshipView: React.FC = () => {
  const { mentors, requestMentorship, openProfileModal } = useApp();

  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedMentorForBooking, setSelectedMentorForBooking] = useState<MentorProfile | null>(null);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [bookingNote, setBookingNote] = useState('');

  const domains = [
    'All',
    'Technology',
    'Entrepreneurship',
    'Design',
    'Business',
    'Career development',
  ];

  const filteredMentors = mentors.filter((m) => {
    if (selectedDomain !== 'All' && m.domain !== selectedDomain) return false;
    return true;
  });

  const handleOpenBooking = (mentor: MentorProfile) => {
    setSelectedMentorForBooking(mentor);
    setSelectedTopic(mentor.mentorshipTopics[0] || '');
  };

  const handleConfirmBooking = () => {
    if (selectedMentorForBooking && selectedTopic) {
      requestMentorship(selectedMentorForBooking.id, selectedTopic, bookingNote);
      setSelectedMentorForBooking(null);
      setBookingNote('');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-violet-400" />
          <span>Mentorship & Advisory</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Accelerate your trajectory with guidance from seasoned architects, founders, and creative directors.
        </p>
      </div>

      {/* Demo Disclaimer Alert Banner */}
      <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-800/30 flex items-start gap-3">
        <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
        <p className="text-xs text-violet-200/90 leading-relaxed">
          <strong className="text-white">Fictional Demo Environment:</strong> Mentorship profiles
          below are realistic fictional demo examples to illustrate VYBE’s advisory matching. Requests
          simulate real session bookings without calendar billing.
        </p>
      </div>

      {/* Domain Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {domains.map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedDomain === dom
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-[#12121A] text-zinc-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            {dom}
          </button>
        ))}
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#111119] border border-white/[0.07] hover:border-violet-500/35 transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3.5">
                  <Avatar src={mentor.avatar} name={mentor.name} size="lg" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                        {mentor.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-white/[0.05] text-[10px] text-zinc-400 border border-white/[0.08]">
                        Demo Mentor
                      </span>
                    </div>
                    <p className="text-xs text-violet-400 font-medium">{mentor.title}</p>
                    <p className="text-[11px] text-zinc-400">{mentor.companyOrProject}</p>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-xl bg-violet-950/60 border border-violet-800/40 text-[11px] font-semibold text-violet-300 font-mono">
                  {mentor.experienceYears}y exp
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                {mentor.bio}
              </p>

              {/* Mentorship Focus Topics */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Advisory Focus Areas
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {mentor.mentorshipTopics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#141420] text-zinc-300 border border-white/[0.06]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability & Languages */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400 mb-4">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-violet-400" />
                  <span className="truncate max-w-[200px]">{mentor.availability}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{mentor.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleOpenBooking(mentor)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-md shadow-violet-600/25 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Request Advisory Session</span>
            </button>
          </div>
        ))}
      </div>

      {/* Book Mentorship Modal */}
      {selectedMentorForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0F0F16] border border-white/10 rounded-2xl p-6 z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold text-white">
                Request Advisory with {selectedMentorForBooking.name}
              </h3>
              <button
                onClick={() => setSelectedMentorForBooking(null)}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Select the specific topic you would like to discuss during your 1-on-1 session:
            </p>

            <div className="space-y-2 text-xs">
              {selectedMentorForBooking.mentorshipTopics.map((topic) => (
                <label
                  key={topic}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedTopic === topic
                      ? 'bg-violet-950/60 border-violet-500 text-violet-200'
                      : 'bg-[#14141E] border-white/10 text-zinc-300 hover:border-white/20'
                  }`}
                >
                  <span>{topic}</span>
                  <input
                    type="radio"
                    name="mentorTopic"
                    value={topic}
                    checked={selectedTopic === topic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="accent-violet-600"
                  />
                </label>
              ))}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                Context / Specific Questions
              </label>
              <textarea
                rows={3}
                value={bookingNote}
                onChange={(e) => setBookingNote(e.target.value)}
                placeholder="Give a brief summary of what you're working on and your main roadblock..."
                className="w-full p-3 rounded-xl bg-[#14141E] border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.08]">
              <button
                onClick={() => setSelectedMentorForBooking(null)}
                className="px-3.5 py-2 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
