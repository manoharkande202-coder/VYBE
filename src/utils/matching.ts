import { UserProfile, VibeMatchResult, CurrentUser } from '../types';

/**
 * Calculates a genuine vibe compatibility match between the current user and a candidate profile.
 * Weights:
 * - Shared Interests (35% weight)
 * - Shared Skills (25% weight)
 * - Shared Goals (25% weight)
 * - Communication style alignment (15% weight)
 *
 * Provides a dynamic breakdown and explanation.
 */
export function calculateVibeMatch(user: CurrentUser, target: UserProfile): VibeMatchResult {
  // If comparing with oneself
  if (user.id === target.id) {
    return {
      score: 100,
      sharedInterests: user.interests,
      sharedSkills: user.skills,
      sharedGoals: user.goals,
      communicationMatch: true,
      highlightReason: 'Your personal profile',
    };
  }

  // Calculate shared interests
  const userInterestsLower = user.interests.map((i) => i.toLowerCase().trim());
  const sharedInterests = target.interests.filter((interest) =>
    userInterestsLower.includes(interest.toLowerCase().trim())
  );

  // Calculate shared skills
  const userSkillsLower = user.skills.map((s) => s.toLowerCase().trim());
  const sharedSkills = target.skills.filter((skill) =>
    userSkillsLower.includes(skill.toLowerCase().trim())
  );

  // Calculate shared connection goals
  const sharedGoals = target.goals.filter((goal) => user.goals.includes(goal));

  // Communication style match
  const communicationMatch = user.communicationStyle === target.communicationStyle;

  // Normalization scores
  const maxInterests = Math.max(1, Math.min(6, Math.max(user.interests.length, target.interests.length)));
  const interestScore = Math.min(1, sharedInterests.length / (maxInterests * 0.6));

  const maxSkills = Math.max(1, Math.min(6, Math.max(user.skills.length, target.skills.length)));
  const skillScore = Math.min(1, sharedSkills.length / (maxSkills * 0.5));

  const maxGoals = Math.max(1, Math.min(4, Math.max(user.goals.length, target.goals.length)));
  const goalScore = Math.min(1, sharedGoals.length / (maxGoals * 0.5));

  const styleScore = communicationMatch ? 1 : 0.45;

  // Weighted calculation (35% + 25% + 25% + 15%)
  const rawScore = interestScore * 35 + skillScore * 25 + goalScore * 25 + styleScore * 15;

  // Base vibe resonance floor to simulate ambient network proximity (min 58, max 98)
  const finalScore = Math.round(Math.min(98, Math.max(58, rawScore)));

  // Generate intelligent reason highlight
  let highlightReason = '';
  if (sharedGoals.length > 0 && sharedInterests.length > 0) {
    highlightReason = `Both passionate about ${sharedInterests[0]} & seeking ${sharedGoals[0].toLowerCase()}`;
  } else if (sharedInterests.length >= 2) {
    highlightReason = `Mutual vibe in ${sharedInterests[0]} & ${sharedInterests[1]}`;
  } else if (sharedSkills.length >= 2) {
    highlightReason = `Complementary tech in ${sharedSkills[0]} & ${sharedSkills[1]}`;
  } else if (communicationMatch) {
    highlightReason = `Identical mindset: ${user.communicationStyle}`;
  } else {
    highlightReason = `Shared passion for innovative collaboration`;
  }

  return {
    score: finalScore,
    sharedInterests,
    sharedSkills,
    sharedGoals,
    communicationMatch,
    highlightReason,
  };
}
