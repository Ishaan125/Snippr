"use client"

import { useState } from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'

export function FavoriteButton({ snippetId, initialFavorited = false }: { snippetId: number; initialFavorited?: boolean }) {
  const [isSaving, setIsSaving] = useState(false)
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [message, setMessage] = useState<string | null>(null)

  const handleFavorite = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/favorites/${snippetId}`, {
        method: isFavorited ? 'DELETE' : 'POST',
        credentials: 'same-origin',
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        console.error('Favorite error payload:', payload)
        setMessage((payload && (payload.error || payload.message)) || 'Unable to save favorite.')
        return
      }

      setIsFavorited(!isFavorited)
      setMessage((payload && (payload.message || 'Saved to favorites.')) || 'Saved to favorites.')
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
        className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-zinc-200 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? 'Saving...' : isFavorited ? <Bookmark className="h-4 w-4 fill-current" /> : <Bookmark className="h-4 w-4" />}
        {isSaving ? 'Saving...' : isFavorited ? 'Remove favorite' : 'Add to favorites'}
      </button>

      {message && <span className="text-xs text-zinc-400">{message}</span>}
    </div>
  )
}