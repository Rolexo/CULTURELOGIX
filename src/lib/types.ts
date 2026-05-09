export type UserRole = 'seeker' | 'employer' | 'admin';
export type SubscriptionPlan = 'free' | 'pro' | 'employer';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  postedAt: string;
  description: string;
  requirements: string[];
  premium: boolean;
  applyUrl?: string;
  source?: 'local' | 'remotive' | 'arbeitnow';
}

export interface PaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    status: 'success' | 'failed' | 'abandoned';
    reference: string;
    amount: number;
    currency: string;
    metadata: Record<string, string>;
  };
}

export interface CVData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export interface SubscriptionState {
  isPremium: boolean;
  plan: SubscriptionPlan;
  expiresAt: number | null;
  reference: string | null;
  email: string | null;
}
