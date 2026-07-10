'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase-auth'

type SignInState = {
  error?: string
  success?: string
} | null

export async function signIn(prevState: SignInState, formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const requestHeaders = await headers()
  const origin = requestHeaders.get('origin') ?? 'http://localhost:3000'

  if (!email) {
    return { error: 'Please enter a valid email address.' }
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${origin}/auth/confirm?next=/favorites` },
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