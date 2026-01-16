import { supabase } from '@/lib/db/supabase'
import type { Match, MatchResult, MatchFactor } from '@/types/models'
import { config } from '@/lib/config'

export class MatchingService {
  static calculateCosineSimilarity(vectorA: number[], vectorB: number[]): number {
    const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0)
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0))
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0))

    return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0
  }

  static async findCandidates(userId: string, limit: number = 10): Promise<MatchResult[]> {
    const { data: currentUser } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (!currentUser) return []

    const { data: candidates } = await supabase
      .from('users')
      .select('*')
      .neq('id', userId)
      .limit(limit)

    if (!candidates) return []

    return candidates.map((candidate) => {
      const matchScore = this.calculateMatchScore(currentUser, candidate)
      const matchFactors = this.calculateMatchFactors(currentUser, candidate)

      return {
        user: {
          id: candidate.id,
          name: candidate.name,
          bio: candidate.bio,
          location: candidate.location,
          avatar: candidate.avatar,
          interests: candidate.interests || [],
        },
        matchScore,
        matchFactors,
      }
    })
  }

  static calculateMatchScore(userA: any, userB: any): number {
    const factors = this.calculateMatchFactors(userA, userB)
    return factors.reduce((sum, factor) => sum + factor.weight * factor.score, 0)
  }

  static calculateMatchFactors(userA: any, userB: any): MatchFactor[] {
    const factors: MatchFactor[] = []

    const interestsA = userA.interests || []
    const interestsB = userB.interests || []
    const commonInterests = interestsA.filter((i: string) => interestsB.includes(i))
    const interestScore =
      interestsA.length && interestsB.length
        ? commonInterests.length / Math.max(interestsA.length, interestsB.length)
        : 0

    factors.push({
      name: 'interests',
      weight: 0.4,
      score: interestScore,
      description: `${commonInterests.length} common interests`,
    })

    const locationScore = userA.location === userB.location ? 1 : 0.5
    factors.push({
      name: 'location',
      weight: 0.3,
      score: locationScore,
    })

    factors.push({
      name: 'activity',
      weight: 0.3,
      score: Math.random(),
    })

    return factors
  }

  static async createMatch(userId: string, matchedUserId: string, score: number): Promise<Match> {
    const { data, error } = await supabase
      .from('matches')
      .insert({
        user_id: userId,
        matched_user_id: matchedUserId,
        score,
        algorithm: config.matching.algorithmType,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }
}
