export type NotificationType =
  | 'connection_request'
  | 'connection_accepted'
  | 'new_message'
  | 'new_match'
  | 'profile_view'
  | 'system'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  actionUrl?: string
  metadata?: Record<string, any>
  createdAt: Date
}

export type CreateNotificationInput = Pick<Notification, 'userId' | 'type' | 'title' | 'message'> & {
  actionUrl?: string
  metadata?: Record<string, any>
}
