import { supabase } from '@/lib/db/supabase'
import type { Connection, CreateConnectionInput, UpdateConnectionInput } from '@/types/models'

export class ConnectionService {
  static async findById(id: string): Promise<Connection | null> {
    const { data, error } = await supabase
      .from('connections')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) throw error
    return data
  }

  static async findByUserId(userId: string, status?: string): Promise<Connection[]> {
    let query = supabase
      .from('connections')
      .select('*')
      .or(`user_id.eq.${userId},connected_user_id.eq.${userId}`)

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  static async create(input: CreateConnectionInput): Promise<Connection> {
    const { data, error } = await supabase
      .from('connections')
      .insert({
        user_id: input.userId,
        connected_user_id: input.connectedUserId,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async update(id: string, input: UpdateConnectionInput): Promise<Connection> {
    const { data, error } = await supabase
      .from('connections')
      .update({
        status: input.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase.from('connections').delete().eq('id', id)

    if (error) throw error
  }
}
