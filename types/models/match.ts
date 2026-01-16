export interface Match {
  id: string
  userId: string
  matchedUserId: string
  score: number
  algorithm: string
  factors: MatchFactor[]
  status: 'pending' | 'liked' | 'passed' | 'mutual'
  createdAt: Date
  expiresAt?: Date
}

export interface MatchFactor {
  name: string
  weight: number
  score: number
  description?: string
}

export interface MatchPreferences {
  userId: string
  ageRange?: [number, number]
  location?: string
  maxDistance?: number
  interests?: string[]
  dealBreakers?: string[]
}

export interface MatchResult {
  user: {
    id: string
    name: string
    bio?: string
    location?: string
    avatar?: string
    interests?: string[]
  }
  matchScore: number
  matchFactors: MatchFactor[]
}

export type CreateMatchInput = Pick<Match, 'userId' | 'matchedUserId' | 'score' | 'algorithm'>
