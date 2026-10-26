export type ConnectionGoal =
  | 'Friendship'
  | 'Professional networking'
  | 'Project collaboration'
  | 'Mentorship'
  | 'Startup partnerships'
  | 'Learning new skills';

export type CommunicationStyle =
  | 'Deep async thinker'
  | 'Fast brainstormer'
  | 'Casual coffee chat'
  | 'Structured sprints'
  | 'Weekend builder';

export type CareerField =
  | 'Engineering'
  | 'Design'
  | 'Entrepreneurship'
  | 'Product'
  | 'Research'
  | 'Student';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Seeking Contributors' | 'Shipped';
  link?: string;
  tags: string[];
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  headline: string;
  bio: string;
  careerField: CareerField;
  location: string;
  interests: string[];
  skills: string[];
  hobbies: string[];
  goals: ConnectionGoal[];
  communicationStyle: CommunicationStyle;
  projects: ProjectItem[];
  communities: string[];
  seekingRole?: string;
  online?: boolean;
  isCurrentUser?: boolean;
}

export interface CurrentUser extends UserProfile {
  onboardingCompleted: boolean;
  email?: string;
  joinedDate: string;
}

export interface VibeMatchResult {
  score: number; // 0 - 100
  sharedInterests: string[];
  sharedSkills: string[];
  sharedGoals: ConnectionGoal[];
  communicationMatch: boolean;
  highlightReason: string;
}

export interface CollaborationProject {
  id: string;
  title: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorRole: string;
  category: 'Coding' | 'Startup' | 'Web Design' | 'Design Systems' | 'Open Source' | 'Creative Tech';
  description: string;
  requiredSkills: string[];
  teamSize: string;
  timeline: string;
  lookingFor: string;
  applied?: boolean;
  createdAt: string;
}

export interface MentorProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  companyOrProject: string;
  domain: 'Technology' | 'Business' | 'Design' | 'Marketing' | 'Career development' | 'Entrepreneurship';
  experienceYears: number;
  mentorshipTopics: string[];
  bio: string;
  availability: string;
  languages: string[];
  isDemo: boolean;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  memberCount: number;
  iconName: string;
  featuredTopic: string;
  isJoined?: boolean;
  recentActivity: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  lastMessage: Message;
  unreadCount: number;
  messages: Message[];
}

export interface NotificationItem {
  id: string;
  type: 'connection_request' | 'connection_accepted' | 'collab_applied' | 'message' | 'community_invite';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  relatedUserId?: string;
  actionUrl?: string;
}

export interface UserSettings {
  profileVisibility: 'public' | 'verified_only' | 'connections_only';
  emailDigest: boolean;
  notifyOnRequests: boolean;
  notifyOnCollab: boolean;
  allowSimulatedResponses: boolean;
  blockedUserIds: string[];
}
