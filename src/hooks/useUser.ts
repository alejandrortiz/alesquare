import router from 'next/router'
import { useEffect, useState } from 'react'

import { onAuthStateChange } from '@/supabase/client'

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

export default function useUser() {
  const [user, setUser] = useState<any | null>(USER_STATES.NOT_KNOWN)

  useEffect((): void => {
    onAuthStateChange(setUser)
  }, [])

  useEffect((): void => {
    user === USER_STATES.NOT_LOGGED && router.push('/')
  }, [user])

  return user
}
