// Common Types for Harx Monolith

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'rep' | 'company' | 'user';
  createdAt: Date;
  updatedAt: Date;
  profile?: UserProfile;
}

export interface UserProfile {
  avatar?: string;
  bio?: string;
  phone?: string;
  company?: string;
  position?: string;
}

export interface Company {
  _id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  description?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rep {
  _id: string;
  userId: string;
  skills: string[];
  experience: number;
  availability: 'available' | 'busy' | 'unavailable';
  rating: number;
  completedGigs: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Gig {
  _id: string;
  title: string;
  description: string;
  companyId: string;
  requirements: string[];
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  duration: string;
  status: 'draft' | 'active' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Match {
  _id: string;
  repId: string;
  gigId: string;
  score: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Training {
  _id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeBaseArticle {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  views: number;
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardCall {
  _id: string;
  userId: string;
  type: 'inbound' | 'outbound';
  duration: number;
  outcome: string;
  notes?: string;
  recordingUrl?: string;
  createdAt: Date;
}

export interface Integration {
  _id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  config: Record<string, any>;
  lastSync?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
