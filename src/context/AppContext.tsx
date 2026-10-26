import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  CurrentUser,
  CollaborationProject,
  MentorProfile,
  Community,
  Conversation,
  NotificationItem,
  UserSettings,
} from '../types';
import {
  INITIAL_CURRENT_USER,
  INITIAL_PROFILES,
  INITIAL_COLLABORATIONS,
  INITIAL_MENTORS,
  INITIAL_COMMUNITIES,
  INITIAL_CONVERSATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SETTINGS,
} from '../data/mockData';

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'discover'
  | 'connections'
  | 'collaboration'
  | 'mentorship'
  | 'communities'
  | 'messages'
  | 'notifications'
  | 'profile'
  | 'settings';

interface ToastData {
  id: string;
  type: 'success' | 'info' | 'error';
  text: string;
}

interface AppContextType {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  currentUser: CurrentUser;
  profiles: UserProfile[];
  connections: string[];
  incomingRequests: string[];
  sentRequests: string[];
  savedProfileIds: string[];
  communities: Community[];
  collaborationProjects: CollaborationProject[];
  mentors: MentorProfile[];
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  notifications: NotificationItem[];
  settings: UserSettings;
  toast: ToastData | null;
  selectedProfileId: string | null;
  showOnboardingModal: boolean;
  setShowOnboardingModal: (show: boolean) => void;
  showEditProfileModal: boolean;
  setShowEditProfileModal: (show: boolean) => void;

  // Actions
  sendConnectionRequest: (targetId: string) => void;
  acceptConnectionRequest: (targetId: string) => void;
  declineConnectionRequest: (targetId: string) => void;
  cancelSentRequest: (targetId: string) => void;
  removeConnection: (targetId: string) => void;
  toggleSaveProfile: (targetId: string) => void;
  toggleCommunityJoin: (communityId: string) => void;
  applyToCollaboration: (projectId: string, note?: string) => void;
  createCollaboration: (project: Omit<CollaborationProject, 'id' | 'creatorId' | 'creatorName' | 'creatorAvatar' | 'creatorRole' | 'createdAt' | 'applied'>) => void;
  requestMentorship: (mentorId: string, topic: string, note?: string) => void;
  sendMessage: (receiverId: string, text: string) => void;
  updateCurrentUser: (updates: Partial<CurrentUser>) => void;
  completeOnboarding: (onboardingData: Partial<CurrentUser>) => void;
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
  reportUser: (userId: string, reason: string) => void;
  resetDemoData: () => void;
  deleteProfile: () => void;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  openProfileModal: (profileId: string) => void;
  closeProfileModal: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to load persisted state from LocalStorage, with fallback to initial mock data
  const [activeView, setActiveView] = useState<AppView>(() => {
    return (localStorage.getItem('vybe_active_view') as AppView) || 'dashboard';
  });

  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    const saved = localStorage.getItem('vybe_current_user');
    return saved ? JSON.parse(saved) : INITIAL_CURRENT_USER;
  });

  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('vybe_profiles');
    return saved ? JSON.parse(saved) : INITIAL_PROFILES;
  });

  const [connections, setConnections] = useState<string[]>(() => {
    const saved = localStorage.getItem('vybe_connections');
    return saved ? JSON.parse(saved) : ['usr_marcus', 'usr_kai'];
  });

  const [incomingRequests, setIncomingRequests] = useState<string[]>(() => {
    const saved = localStorage.getItem('vybe_incoming_requests');
    return saved ? JSON.parse(saved) : ['usr_priya'];
  });

  const [sentRequests, setSentRequests] = useState<string[]>(() => {
    const saved = localStorage.getItem('vybe_sent_requests');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedProfileIds, setSavedProfileIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('vybe_saved_profiles');
    return saved ? JSON.parse(saved) : ['usr_elena'];
  });

  const [communities, setCommunities] = useState<Community[]>(() => {
    const saved = localStorage.getItem('vybe_communities');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITIES;
  });

  const [collaborationProjects, setCollaborationProjects] = useState<CollaborationProject[]>(() => {
    const saved = localStorage.getItem('vybe_collab_projects');
    return saved ? JSON.parse(saved) : INITIAL_COLLABORATIONS;
  });

  const [mentors, setMentors] = useState<MentorProfile[]>(INITIAL_MENTORS);

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('vybe_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv_elena');

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('vybe_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('vybe_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [toast, setToast] = useState<ToastData | null>(null);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState<boolean>(false);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('vybe_active_view', activeView);
  }, [activeView]);

  useEffect(() => {
    localStorage.setItem('vybe_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('vybe_connections', JSON.stringify(connections));
  }, [connections]);

  useEffect(() => {
    localStorage.setItem('vybe_incoming_requests', JSON.stringify(incomingRequests));
  }, [incomingRequests]);

  useEffect(() => {
    localStorage.setItem('vybe_sent_requests', JSON.stringify(sentRequests));
  }, [sentRequests]);

  useEffect(() => {
    localStorage.setItem('vybe_saved_profiles', JSON.stringify(savedProfileIds));
  }, [savedProfileIds]);

  useEffect(() => {
    localStorage.setItem('vybe_communities', JSON.stringify(communities));
  }, [communities]);

  useEffect(() => {
    localStorage.setItem('vybe_collab_projects', JSON.stringify(collaborationProjects));
  }, [collaborationProjects]);

  useEffect(() => {
    localStorage.setItem('vybe_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('vybe_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('vybe_settings', JSON.stringify(settings));
  }, [settings]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ id: Date.now().toString(), type, text });
    setTimeout(() => {
      setToast((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  };

  const openProfileModal = (profileId: string) => {
    setSelectedProfileId(profileId);
  };

  const closeProfileModal = () => {
    setSelectedProfileId(null);
  };

  const sendConnectionRequest = (targetId: string) => {
    const targetUser = profiles.find((p) => p.id === targetId);
    if (!sentRequests.includes(targetId)) {
      setSentRequests((prev) => [...prev, targetId]);
      showToast(`Connection request sent to ${targetUser?.name || 'user'}`);
    }
  };

  const acceptConnectionRequest = (targetId: string) => {
    const targetUser = profiles.find((p) => p.id === targetId);
    setIncomingRequests((prev) => prev.filter((id) => id !== targetId));
    setConnections((prev) => (prev.includes(targetId) ? prev : [...prev, targetId]));
    showToast(`You and ${targetUser?.name || 'user'} are now connected!`);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      type: 'connection_accepted',
      title: 'Connected',
      content: `You connected with ${targetUser?.name || 'user'}.`,
      timestamp: 'Just now',
      read: false,
      relatedUserId: targetId,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const declineConnectionRequest = (targetId: string) => {
    const targetUser = profiles.find((p) => p.id === targetId);
    setIncomingRequests((prev) => prev.filter((id) => id !== targetId));
    showToast(`Declined request from ${targetUser?.name || 'user'}`, 'info');
  };

  const cancelSentRequest = (targetId: string) => {
    setSentRequests((prev) => prev.filter((id) => id !== targetId));
    showToast('Connection request cancelled', 'info');
  };

  const removeConnection = (targetId: string) => {
    const targetUser = profiles.find((p) => p.id === targetId);
    setConnections((prev) => prev.filter((id) => id !== targetId));
    showToast(`Removed ${targetUser?.name || 'user'} from your connections`, 'info');
  };

  const toggleSaveProfile = (targetId: string) => {
    setSavedProfileIds((prev) => {
      const exists = prev.includes(targetId);
      if (exists) {
        showToast('Profile removed from bookmarks', 'info');
        return prev.filter((id) => id !== targetId);
      } else {
        showToast('Profile saved to bookmarks', 'success');
        return [...prev, targetId];
      }
    });
  };

  const toggleCommunityJoin = (communityId: string) => {
    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id === communityId) {
          const newStatus = !c.isJoined;
          showToast(newStatus ? `Joined ${c.name}` : `Left ${c.name}`, newStatus ? 'success' : 'info');
          return {
            ...c,
            isJoined: newStatus,
            memberCount: newStatus ? c.memberCount + 1 : Math.max(0, c.memberCount - 1),
          };
        }
        return c;
      })
    );
  };

  const applyToCollaboration = (projectId: string, note?: string) => {
    setCollaborationProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          showToast(`Application submitted to collaborate on ${p.title}`);
          return { ...p, applied: true };
        }
        return p;
      })
    );
  };

  const createCollaboration = (
    projectData: Omit<CollaborationProject, 'id' | 'creatorId' | 'creatorName' | 'creatorAvatar' | 'creatorRole' | 'createdAt' | 'applied'>
  ) => {
    const newProj: CollaborationProject = {
      ...projectData,
      id: `collab_${Date.now()}`,
      creatorId: currentUser.id,
      creatorName: currentUser.name,
      creatorAvatar: currentUser.avatar,
      creatorRole: currentUser.headline,
      createdAt: 'Just now',
      applied: false,
    };
    setCollaborationProjects((prev) => [newProj, ...prev]);
    showToast('Your collaboration opportunity has been published!');
  };

  const requestMentorship = (mentorId: string, topic: string, note?: string) => {
    const mentor = mentors.find((m) => m.id === mentorId);
    showToast(`Mentorship request sent to ${mentor?.name} for "${topic}"`);
  };

  const sendMessage = (receiverId: string, text: string) => {
    if (!text.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      text: text.trim(),
      timestamp: 'Just now',
      isRead: true,
    };

    setConversations((prev) => {
      const existingConv = prev.find((c) => c.participantId === receiverId);
      if (existingConv) {
        return prev.map((c) =>
          c.participantId === receiverId
            ? {
                ...c,
                lastMessage: newMsg,
                messages: [...c.messages, newMsg],
              }
            : c
        );
      } else {
        const newConv: Conversation = {
          id: `conv_${receiverId}`,
          participantId: receiverId,
          unreadCount: 0,
          lastMessage: newMsg,
          messages: [newMsg],
        };
        return [newConv, ...prev];
      }
    });

    // Simulated reply trigger if enabled in settings
    if (settings.allowSimulatedResponses) {
      setTimeout(() => {
        const targetUser = profiles.find((p) => p.id === receiverId);
        const replyMsg = {
          id: `msg_reply_${Date.now()}`,
          senderId: receiverId,
          receiverId: currentUser.id,
          text: `Thanks for reaching out, ${currentUser.name.split(' ')[0]}! This is a simulated demo response. Your vibe and project ideas sound super interesting. Let's sync!`,
          timestamp: 'Just now',
          isRead: false,
        };

        setConversations((prev) =>
          prev.map((c) =>
            c.participantId === receiverId
              ? {
                  ...c,
                  lastMessage: replyMsg,
                  messages: [...c.messages, replyMsg],
                  unreadCount: c.unreadCount + 1,
                }
              : c
          )
        );

        showToast(`New message from ${targetUser?.name || 'peer'}`, 'info');
      }, 1500);
    }
  };

  const updateCurrentUser = (updates: Partial<CurrentUser>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile updated successfully');
  };

  const completeOnboarding = (onboardingData: Partial<CurrentUser>) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...onboardingData,
      onboardingCompleted: true,
    }));
    setShowOnboardingModal(false);
    setActiveView('discover');
    showToast('Welcome to VYBE! Your vibe profile is ready.');
  };

  const blockUser = (userId: string) => {
    const userToBlock = profiles.find((p) => p.id === userId);
    setSettings((prev) => ({
      ...prev,
      blockedUserIds: [...prev.blockedUserIds, userId],
    }));
    // Also remove from connections or requests
    setConnections((prev) => prev.filter((id) => id !== userId));
    setIncomingRequests((prev) => prev.filter((id) => id !== userId));
    setSentRequests((prev) => prev.filter((id) => id !== userId));
    closeProfileModal();
    showToast(`Blocked ${userToBlock?.name || 'user'}. They won't appear in your discovery feed.`, 'info');
  };

  const unblockUser = (userId: string) => {
    setSettings((prev) => ({
      ...prev,
      blockedUserIds: prev.blockedUserIds.filter((id) => id !== userId),
    }));
    showToast('User unblocked', 'info');
  };

  const reportUser = (userId: string, reason: string) => {
    showToast(`Report received for review (${reason}). Thank you for keeping VYBE safe.`, 'info');
  };

  const resetDemoData = () => {
    localStorage.clear();
    setCurrentUser(INITIAL_CURRENT_USER);
    setProfiles(INITIAL_PROFILES);
    setConnections(['usr_marcus', 'usr_kai']);
    setIncomingRequests(['usr_priya']);
    setSentRequests([]);
    setSavedProfileIds(['usr_elena']);
    setCommunities(INITIAL_COMMUNITIES);
    setCollaborationProjects(INITIAL_COLLABORATIONS);
    setConversations(INITIAL_CONVERSATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSettings(INITIAL_SETTINGS);
    setActiveView('dashboard');
    showToast('Demo data reset to initial state', 'info');
  };

  const deleteProfile = () => {
    localStorage.clear();
    setCurrentUser({
      ...INITIAL_CURRENT_USER,
      name: 'Anonymous User',
      username: 'anonymous',
      bio: '',
      onboardingCompleted: false,
      interests: [],
      skills: [],
    });
    setActiveView('landing');
    showToast('Profile deleted. You can re-onboard anytime.', 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        currentUser,
        profiles,
        connections,
        incomingRequests,
        sentRequests,
        savedProfileIds,
        communities,
        collaborationProjects,
        mentors,
        conversations,
        activeConversationId,
        setActiveConversationId,
        notifications,
        settings,
        toast,
        selectedProfileId,
        showOnboardingModal,
        setShowOnboardingModal,
        showEditProfileModal,
        setShowEditProfileModal,

        sendConnectionRequest,
        acceptConnectionRequest,
        declineConnectionRequest,
        cancelSentRequest,
        removeConnection,
        toggleSaveProfile,
        toggleCommunityJoin,
        applyToCollaboration,
        createCollaboration,
        requestMentorship,
        sendMessage,
        updateCurrentUser,
        completeOnboarding,
        blockUser,
        unblockUser,
        reportUser,
        resetDemoData,
        deleteProfile,
        showToast,
        openProfileModal,
        closeProfileModal,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
