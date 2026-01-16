import { supabase } from '@/lib/db/supabase'
import type { Message, CreateMessageInput, Conversation } from '@/types/models'

export class MessageService {
  static async findById(id: string): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) throw error
    return data
  }

  static async findByConversation(
    userId: string,
    otherUserId: string
  ): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(
        `and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`
      )
      .order('created_at', { ascending: true })

    if (error) throw error
    return data || []
  }

  static async create(input: CreateMessageInput): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: input.senderId,
        recipient_id: input.recipientId,
        content: input.content,
        read: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async markAsRead(messageId: string): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', messageId)

    if (error) throw error
  }

  static async getConversations(userId: string): Promise<Conversation[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
      .order('created_at', { ascending: false })

    if (error) throw error

    const conversationMap = new Map<string, Conversation>()

    data?.forEach((message) => {
      const otherUserId =
        message.sender_id === userId ? message.recipient_id : message.sender_id

      if (!conversationMap.has(otherUserId)) {
        conversationMap.set(otherUserId, {
          id: crypto.randomUUID(),
          participants: [userId, otherUserId],
          lastMessage: message,
          unreadCount: message.recipient_id === userId && !message.read ? 1 : 0,
          createdAt: new Date(message.created_at),
          updatedAt: new Date(message.updated_at),
        })
      }
    })

    return Array.from(conversationMap.values())
  }
}
