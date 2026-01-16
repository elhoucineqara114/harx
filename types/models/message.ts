export interface Message {
  id: string
  senderId: string
  recipientId: string
  content: string
  read: boolean
  attachments?: MessageAttachment[]
  createdAt: Date
  updatedAt: Date
}

export interface MessageAttachment {
  id: string
  url: string
  type: string
  size: number
  name: string
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage?: Message
  unreadCount: number
  createdAt: Date
  updatedAt: Date
}

export type CreateMessageInput = Pick<Message, 'senderId' | 'recipientId' | 'content'> & {
  attachments?: File[]
}

export type MessageThread = {
  conversationId: string
  messages: Message[]
  participant: {
    id: string
    name: string
    avatar?: string
  }
}
