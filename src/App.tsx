import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Toast } from './components/common/Toast';
import { ProfileModal } from './components/common/ProfileModal';
import { EditProfileModal } from './components/common/EditProfileModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';

// Views
import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { DiscoverView } from './components/discover/DiscoverView';
import { ConnectionsView } from './components/connections/ConnectionsView';
import { CollaborationView } from './components/collaboration/CollaborationView';
import { MentorshipView } from './components/mentorship/MentorshipView';
import { CommunitiesView } from './components/communities/CommunitiesView';
import { MessagesView } from './components/messages/MessagesView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { UserProfileView } from './components/profile/UserProfileView';
import { SettingsView } from './components/settings/SettingsView';

const MainAppContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen bg-[#08080C] text-zinc-100 flex flex-col selection:bg-violet-600 selection:text-white">
      {/* Top Bar Contract Header */}
      <Navbar />

      {/* Main Content Area */}
      {activeView === 'landing' ? (
        <main className="flex-1">
          <LandingPage />
        </main>
      ) : (
        <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
          {/* Desktop Navigation Sidebar */}
          <Sidebar />

          {/* Core Page Content Viewport */}
          <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto">
            {activeView === 'dashboard' && <DashboardView />}
            {activeView === 'discover' && <DiscoverView />}
            {activeView === 'connections' && <ConnectionsView />}
            {activeView === 'collaboration' && <CollaborationView />}
            {activeView === 'mentorship' && <MentorshipView />}
            {activeView === 'communities' && <CommunitiesView />}
            {activeView === 'messages' && <MessagesView />}
            {activeView === 'notifications' && <NotificationsView />}
            {activeView === 'profile' && <UserProfileView />}
            {activeView === 'settings' && <SettingsView />}
          </main>
        </div>
      )}

      {/* Mobile Bottom Tab Navigation */}
      <MobileNav />

      {/* Global Modals & Notifications */}
      <ProfileModal />
      <EditProfileModal />
      <OnboardingModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
