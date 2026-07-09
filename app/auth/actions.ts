'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-auth'

export async function signIn(prevState: any, formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Please enter a valid email address.' }
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: 'http://localhost:3000/auth/confirm?next=/favorites' },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: 'Check your inbox for a secure login link!' }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}