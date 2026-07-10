import Link from 'next/link'
import { getCurrentUser } from '@/lib/supabase-auth'

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

    return (
        <main className="min-h-screen bg-[#111113] px-6 py-16 text-white">
            <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
                <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">Favorites</p>
                <h1 className="mt-4 text-3xl font-bold">Your favorites</h1>
                <p className="mt-3 text-zinc-400">This is where your saved snippets will appear.</p>
            </div>
        </main>
    )
}