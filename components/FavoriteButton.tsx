"use client"

import { useState } from 'react'

export function FavoriteButton({ snippetId }: { snippetId: number }) {
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleFavorite = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/favorites/${snippetId}`, {
        method: 'POST',
      })

      const payload = await response.json()

      if (!response.ok) {
        setMessage(payload.error || 'Unable to save favorite.')
        return
      }

      setMessage(payload.message || 'Saved to favorites.')
    } 
    catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save favorite.')
      console.error('Error favoriting snippet:', error)
    } 
    finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleFavorite}
        disabled={isSaving}
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-200 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? 'Saving...' : 'Add to favorites'}
      </button>

      {message && <span className="text-xs text-zinc-400">{message}</span>}
    </div>
  )
}