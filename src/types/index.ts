// ─── Profile ──────────────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  name: string;
  title: string;
  email: string;
  summary: string;
  linkedinUrl?: string;
  avatarInitials: string;
  createdAt: string;
  updatedAt: string;
}

// ─── References ───────────────────────────────────────────────────────────────

export type ReferenceStatus = 'pending' | 'received' | 'expired';

export type ReferenceRelationship =
  | 'manager'
  | 'peer'
  | 'direct-report'
  | 'client'
  | 'mentor'
  | 'other';

export interface ReferenceRatings {
  technical: number;
  communication: number;
  leadership: number;
  teamwork: number;
  overall: number;
}

export type VerificationStatus = 'verified' | 'unverified' | 'flagged';

export interface VerificationDetails {
  workEmailConfirmed: boolean;
  orgGraphMatch: boolean;
  ipVerified: boolean;
}

export interface Reference {
  id: string;
  token: string;
  requesterProfileId: string;
  refereeName: string;
  refereeEmail: string;
  refereeTitle: string;
  refereeCompany: string;
  relationship: ReferenceRelationship;
  contextNote: string;
  isTransferable: boolean;
  status: ReferenceStatus;
  requestedAt: string;
  submittedAt?: string;
  expiresAt: string;
  recommendation?: string;
  ratings?: ReferenceRatings;
  strengths?: string[];
  wouldHireAgain?: boolean;
  /** Anti-Fraud Infrastructure: referee identity verification */
  verificationStatus?: VerificationStatus;
  verificationDetails?: VerificationDetails;
  /** Predictive Intelligence: composite performance predictor (0–100) */
  performancePredictorScore?: number;
}

// ─── Achievements ─────────────────────────────────────────────────────────────

export type AchievementCategory =
  | 'technical'
  | 'leadership'
  | 'delivery'
  | 'collaboration'
  | 'growth'
  | 'award'
  | 'other';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  impact: string;
  category: AchievementCategory;
  date: string;
  company: string;
  role: string;
  tags: string[];
  linkedCareerEntryId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Career Timeline ──────────────────────────────────────────────────────────

export type EmploymentType =
  | 'full-time'
  | 'contract'
  | 'part-time'
  | 'internship'
  | 'freelance';

export interface CareerEntry {
  id: string;
  company: string;
  role: string;
  employmentType: EmploymentType;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  location: string;
  description: string;
  skills: string[];
  isPromotion: boolean;
  previousEntryId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Activity Feed ────────────────────────────────────────────────────────────

export type ActivityType =
  | 'reference_requested'
  | 'reference_received'
  | 'achievement_added'
  | 'career_entry_added'
  | 'profile_updated';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  entityId: string;
  createdAt: string;
}

// ─── Recruiter / Candidate Reviews ───────────────────────────────────────────

export type ReviewStage =
  | 'screening'
  | 'shortlisted'
  | 'reference_check'
  | 'offer'
  | 'rejected';

export interface CandidateReferenceSnapshot {
  id: string;
  refereeName: string;
  refereeTitle: string;
  refereeCompany: string;
  relationship: ReferenceRelationship;
  verificationStatus?: VerificationStatus;
  verificationDetails?: VerificationDetails;
  performancePredictorScore?: number;
  isTransferable: boolean;
  status: ReferenceStatus;
  recommendation?: string;
  ratings?: ReferenceRatings;
  strengths?: string[];
  wouldHireAgain?: boolean;
  submittedAt?: string;
}

export interface CandidateReview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  candidateCurrentTitle: string;
  appliedRole: string;
  reqNumber: string;
  stage: ReviewStage;
  references: CandidateReferenceSnapshot[];
  submittedAt: string;
  notes?: string;
}

// ─── App State ────────────────────────────────────────────────────────────────

export interface AppState {
  profile: Profile;
  references: Reference[];
  achievements: Achievement[];
  career: CareerEntry[];
  activity: ActivityItem[];
  candidateReviews?: CandidateReview[];
  version: number;
}
