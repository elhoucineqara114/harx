export interface User {
  id: string
  email: string
  name: string
  bio?: string
  location?: string
  avatar?: string
  interests?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile extends User {
  connections: number
  matchScore?: number
}

export interface UserPreferences {
  userId: string
  emailNotifications: boolean
  pushNotifications: boolean
  matchingEnabled: boolean
  privacyLevel: 'public' | 'private' | 'friends'
}

export type CreateUserInput = Pick<User, 'email' | 'name'> & {
  password: string
}

export type UpdateUserInput = Partial<Pick<User, 'name' | 'bio' | 'location' | 'interests' | 'avatar'>>
