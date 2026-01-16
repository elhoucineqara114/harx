export interface Connection {
  id: string
  userId: string
  connectedUserId: string
  status: 'pending' | 'accepted' | 'rejected' | 'blocked'
  matchScore?: number
  createdAt: Date
  updatedAt: Date
}

export interface ConnectionRequest {
  id: string
  fromUserId: string
  toUserId: string
  message?: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: Date
}

export type CreateConnectionInput = Pick<Connection, 'userId' | 'connectedUserId'> & {
  message?: string
}

export type UpdateConnectionInput = {
  status: Connection['status']
}
