'use client'

import { useActionState } from 'react'
import { signIn } from '@/app/auth/actions'

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signIn, null)

  return (
    <div className="w-full max-w-sm p-4 border rounded-lg shadow-sm bg-white">
      <form action={formAction} className="flex flex-col gap-3">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Sign in or create an account to favorite snippets and access your dashboard.
        </label>
        
        <div className="flex gap-2">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            disabled={isPending}
            className="flex-1 border p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isPending ? 'Sending...' : 'Send Link'}
          </button>
        </div>

        {state?.error && (
          <p className="text-red-500 text-xs mt-1">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-green-600 text-xs mt-1">{state.success}</p>
        )}
      </form>
    </div>
  )
}
