import { Database } from '@/types_db'
import { createClient } from '@supabase/supabase-js'

let supabase: any

if (!supabase) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  supabase = createClient<Database>(url, anonKey)
}

export type User = {
  name: string
  email: string
  avatar: string
}

export function loginWithGoogle(): void {
  supabase.onAuthStateChange.signInWithOAuth({ provider: 'google' })
}

export function onAuthStateChange(callback: any): void {
  return supabase.auth.onAuthStateChange((event: string, session: any) => {
    if (event === 'SIGNED_OUT' || !session) {
      callback(null)
    }

    if (
      event === 'SIGNED_IN' ||
      event === 'USER_UPDATED' ||
      (event === 'INITIAL_SESSION' && !!session)
    ) {
      callback(mapUserFromSupabaseAuthToUser(session.user))
    }
  })
}

function mapUserFromSupabaseAuthToUser(user: any): User | null {
  const { user_metadata } = user
  const { full_name, avatar_url, email } = user_metadata || {}

  if (!email) {
    return null
  }

  return {
    name: full_name,
    email,
    avatar: avatar_url
  }
}
