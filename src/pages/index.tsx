import Head from 'next/head'
import { useEffect, useState } from 'react'
import { loginWithGoogle, onAuthStateChange } from '@/supabase/client'

export default function Index() {
  const [user, setUser] = useState<any | null>(null)

  useEffect((): void => {
    onAuthStateChange(setUser)
  }, [])

  const handlerGoogleSignIn = () => {
    loginWithGoogle()
  }

  return (
    <>
      <Head>
        <title>X | AleSquare</title>
        <meta
          name='description'
          content='X | Financial, Assistant and Shop list'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='grid place-items-center h-[100vh]'>
        <div className='bg-white shadow-lg rounded-lg w-full h-full sm:w-[450px] sm:h-auto p-6'>
          <header className='mb-10 text-center font-light text-3xl'>
            <div className='gap-1'>AleSquare</div>
          </header>
          <main>
            <section className='mb-10'>
              <h4 className='mb-2 text-xl'>Welcome to AleSquare! 👋</h4>
              <p className='text-[15px] text-[#697a8d]'>
                Please sign-in to your account and start the adventure
              </p>
            </section>
            {user === null && (
              <div className='mb-3'>
                <button
                  onClick={handlerGoogleSignIn}
                  className='w-full rounded-md bg-[#5184ec] text-white p-3 pointer transition-opacity hover:opacity-90 ease-in duration-200'
                >
                  Sign in with Google
                </button>
              </div>
            )}
            {user && user.avatar && (
              <div className='mb-3'>
                <img src={user.avatar} referrerPolicy='no-referrer' />
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}
