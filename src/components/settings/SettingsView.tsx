import React, { useState } from 'react';
import {
  Shield,
  Eye,
  Bell,
  Lock,
  UserX,
  RotateCcw,
  Trash2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const {
    settings,
    currentUser,
    profiles,
    unblockUser,
    resetDemoData,
    deleteProfile,
    showToast,
  } = useApp();

  const [visibility, setVisibility] = useState(settings.profileVisibility);
  const [emailDigest, setEmailDigest] = useState(settings.emailDigest);
  const [notifyOnRequests, setNotifyOnRequests] = useState(settings.notifyOnRequests);
  const [notifyOnCollab, setNotifyOnCollab] = useState(settings.notifyOnCollab);
  const [allowSimulated, setAllowSimulated] = useState(settings.allowSimulatedResponses);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const blockedUsers = profiles.filter((p) => settings.blockedUserIds.includes(p.id));

  const handleSaveSettings = () => {
    localStorage.setItem(
      'vybe_settings',
      JSON.stringify({
        ...settings,
        profileVisibility: visibility,
        emailDigest,
        notifyOnRequests,
        notifyOnCollab,
        allowSimulatedResponses: allowSimulated,
      })
    );
    showToast('Privacy & notification preferences saved');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Shield className="w-6 h-6 text-violet-400" />
          <span>Privacy & Safety Control Center</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage how your vibe profile is surfaced, control notifications, and oversee moderation.
        </p>
      </div>

      {/* Safety Guarantee Callout */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-950/40 to-indigo-950/30 border border-violet-800/30 flex items-start gap-3 text-xs text-violet-200">
        <Lock className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Zero Surveillance & Private Geolocation:</strong> VYBE
          never exposes exact addresses, phone numbers, or private emails publicly. Only city/timezone
          and professional links you explicitly publish are visible to peers.
        </p>
      </div>

      {/* 1. Profile Visibility */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#111119] border border-white/[0.07] space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
          <Eye className="w-4 h-4 text-violet-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Discovery & Visibility
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-[#14141E] border border-white/10 cursor-pointer hover:bg-white/[0.04]">
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={visibility === 'public'}
              onChange={() => setVisibility('public')}
              className="mt-0.5 accent-violet-600"
            />
            <div>
              <p className="font-semibold text-white">Public Discovery (Recommended)</p>
              <p className="text-zinc-400 mt-0.5">
                Surfaced in discover feeds for builders who share similar interests and skills.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-[#14141E] border border-white/10 cursor-pointer hover:bg-white/[0.04]">
            <input
              type="radio"
              name="visibility"
              value="verified_only"
              checked={visibility === 'verified_only'}
              onChange={() => setVisibility('verified_only')}
              className="mt-0.5 accent-violet-600"
            />
            <div>
              <p className="font-semibold text-white">Calibrated Members Only</p>
              <p className="text-zinc-400 mt-0.5">
                Only users who have completed their onboarding vibe calibration can discover you.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-[#14141E] border border-white/10 cursor-pointer hover:bg-white/[0.04]">
            <input
              type="radio"
              name="visibility"
              value="connections_only"
              checked={visibility === 'connections_only'}
              onChange={() => setVisibility('connections_only')}
              className="mt-0.5 accent-violet-600"
            />
            <div>
              <p className="font-semibold text-white">Direct Connections Only (Private Mode)</p>
              <p className="text-zinc-400 mt-0.5">
                Hidden from discovery algorithms; only accessible to people you directly invite.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* 2. Notification Preferences */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#111119] border border-white/[0.07] space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
          <Bell className="w-4 h-4 text-violet-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Notifications & Demo Simulators
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl bg-[#14141E] border border-white/10 cursor-pointer">
            <div>
              <p className="font-semibold text-white">Connection Requests & Matches</p>
              <p className="text-zinc-400">Receive alerts when resonant peers ask to connect.</p>
            </div>
            <input
              type="checkbox"
              checked={notifyOnRequests}
              onChange={(e) => setNotifyOnRequests(e.target.checked)}
              className="w-4 h-4 accent-violet-600"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#14141E] border border-white/10 cursor-pointer">
            <div>
              <p className="font-semibold text-white">Collaboration Application Updates</p>
              <p className="text-zinc-400">Get notified when someone applies to your open projects.</p>
            </div>
            <input
              type="checkbox"
              checked={notifyOnCollab}
              onChange={(e) => setNotifyOnCollab(e.target.checked)}
              className="w-4 h-4 accent-violet-600"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#14141E] border border-white/10 cursor-pointer">
            <div>
              <p className="font-semibold text-white">Simulated Demo Peer Responses</p>
              <p className="text-zinc-400">
                Trigger mock replies from Elena/Marcus when messaging in this demo prototype.
              </p>
            </div>
            <input
              type="checkbox"
              checked={allowSimulated}
              onChange={(e) => setAllowSimulated(e.target.checked)}
              className="w-4 h-4 accent-violet-600"
            />
          </label>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-sm"
        >
          Save Preferences
        </button>
      </div>

      {/* 3. Blocked Users Manager */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#111119] border border-white/[0.07] space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
          <UserX className="w-4 h-4 text-violet-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Blocked Users ({blockedUsers.length})
          </h2>
        </div>

        {blockedUsers.length === 0 ? (
          <p className="text-xs text-zinc-500">
            No users currently blocked. You can block any profile from their profile card or modal.
          </p>
        ) : (
          <div className="space-y-2">
            {blockedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#14141E] border border-white/10"
              >
                <div>
                  <p className="text-xs font-semibold text-white">{user.name}</p>
                  <p className="text-[11px] text-zinc-400">@{user.username}</p>
                </div>
                <button
                  onClick={() => unblockUser(user.id)}
                  className="px-3 py-1 text-xs text-violet-400 hover:text-white bg-violet-950/40 border border-violet-800/40 rounded-lg transition-colors"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Danger Zone: Reset & Delete */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#141114] border border-rose-900/30 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-rose-900/30 text-rose-400">
          <AlertTriangle className="w-4 h-4" />
          <h2 className="text-sm font-bold uppercase tracking-wider">Data Management & Reset</h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <p className="font-semibold text-white">Reset Prototype Demo State</p>
            <p className="text-zinc-400">
              Clear your LocalStorage and restore initial fictional profiles, messages, and communities.
            </p>
          </div>
          <button
            onClick={resetDemoData}
            className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        <div className="pt-3 border-t border-rose-900/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <p className="font-semibold text-rose-300">Delete VYBE Profile</p>
            <p className="text-zinc-400">
              Erase your calibrated profile and return to the onboarding flow.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-rose-600/80 hover:bg-rose-600 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Profile</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#12121A] border border-rose-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Delete Profile?</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              This will remove your custom calibration, interests, and messages stored in this
              browser session. You can re-onboard at any time.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3.5 py-2 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  deleteProfile();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
