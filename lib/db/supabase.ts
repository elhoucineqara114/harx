import { createClient } from '@supabase/supabase-js'
import { config } from '@/lib/config'

export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey
)

export const supabaseAdmin = config.supabase.serviceRoleKey
  ? createClient(config.supabase.url, config.supabase.serviceRoleKey)
  : supabase
