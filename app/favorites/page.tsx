import Link from 'next/link'
import { SnippetCard } from '@/components/SnippetCard'
import { getCurrentUser } from '@/lib/supabase-auth'
import { getSupabaseClient } from '@/lib/supabase'
import type { Snippet } from '@/types/snippet'

function mapSnippetRecord(record: Record<string, unknown>): Snippet {
    return {
        id: Number(record.id ?? 0),
        slug: String(record.slug ?? ''),
        title: String(record.title ?? ''),
        description: String(record.description ?? ''),
        language: String(record.language ?? ''),
        code: String(record.code ?? ''),
        featured: Boolean(record.featured ?? false),
    }
}

async function getFavoriteSnippets(userId: string): Promise<Snippet[]> {
    const supabase = getSupabaseClient()

    const { data: favoriteRows, error: favoritesError } = await supabase
        .from('favorites').select('id, snippet_id')
        .eq('user_id', userId).order('id', { ascending: false })

    if (favoritesError) {
        throw new Error(favoritesError.message)
    }

    const orderedSnippetIds = [...new Set(
        (favoriteRows ?? [])
            .map((row) => Number(row.snippet_id))
            .filter((snippetId) => Number.isInteger(snippetId) && snippetId > 0),
    )]

    if (!orderedSnippetIds.length) {
        return []
    }

    const { data: snippetRows, error: snippetsError } = await supabase
        .from('Snippets').select('*').in('id', orderedSnippetIds)

    if (snippetsError) {
        throw new Error(snippetsError.message)
    }

    const snippetsById = new Map(
        (snippetRows ?? []).map((record) => [Number(record.id ?? 0), mapSnippetRecord(record as Record<string, unknown>)]),
    )

    return orderedSnippetIds
        .map((snippetId) => snippetsById.get(snippetId))
        .filter((snippet): snippet is Snippet => Boolean(snippet))
}

export default async function FavoritesPage() {
    const user = await getCurrentUser()

    if (!user) {
        return (
            <main className="min-h-screen bg-[#111113] px-6 py-16 text-white">
                <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
                    <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">Favorites</p>
                    <h1 className="mt-4 text-3xl font-bold">You have to be signed in to view favorites.</h1>
                    <p className="mt-3 text-zinc-400">Sign in on the homepage to access your saved snippets.</p>
                    <Link
                        href="/"
                        className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
                    >
                        Go back home
                    </Link>
                </div>
            </main>
        )
    }

    let favoriteSnippets: Snippet[] = []

    try {
        favoriteSnippets = await getFavoriteSnippets(user.id)
    } 
    catch (error) {
        return (
            <main className="min-h-screen bg-[#111113] px-6 py-16 text-white">
                <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
                    <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">Favorites</p>
                    <h1 className="mt-4 text-3xl font-bold">We could not load your favorites.</h1>
                    <p className="mt-3 text-zinc-400">
                        {error instanceof Error ? error.message : 'Please try again in a moment.'}
                    </p>
                    <Link
                        href="/"
                        className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
                    >
                        Go back home
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#111113] px-6 py-16 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-900 p-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">Favorites</p>
                        <h1 className="mt-4 text-3xl font-bold">Your saved snippets</h1>
                        <p className="mt-3 max-w-2xl text-zinc-400">
                            Snippets you favorite are collected here so you can come back to them quickly.
                        </p>
                    </div>

                    <Link
                        href="/search"
                        className="inline-flex rounded-full border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800"
                    >
                        Browse more snippets →
                    </Link>
                </div>

                {favoriteSnippets.length > 0 ? (
                    <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {favoriteSnippets.map((snippet) => (
                            <SnippetCard key={snippet.id} snippet={snippet} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-10 rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/60 p-10 text-center">
                        <h2 className="text-2xl font-semibold text-white">No favorites yet</h2>
                        <p className="mt-3 text-zinc-400">
                            Tap Add to favorites on any snippet to save it here.
                        </p>
                        <Link
                            href="/search"
                            className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
                        >
                            Find snippets to save
                        </Link>
                    </div>
                )}
            </div>
        </main>
    )
}