import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { SnippetCard } from "@/components/SnippetCard";
import { CreateSnippet } from "@/components/Create";
import { getPopularSnippets } from "@/lib/snippets";
import { Sparkles } from "lucide-react";

export default async function Home() {
  const popularSnippets = await getPopularSnippets();

  return (
    <main className="min-h-screen bg-[#111113] bg-gradient-to-b from-[#111113] to-[#0b0b0f]">
      <section className="mx-auto max-w-7xl px-6 pt-3">
        <div className="overflow-hidden rounded-[36px] border border-zinc-200 bg-white shadow-xl">
          <header className="flex items-center justify-between px-10 py-5">
            <Link
              href="/"
              className="text-lg font-bold tracking-[0.35em] text-zinc-900"
            >
              SNIPPR
            </Link>

            <Link
              href="/search"
              className="text-sm font-medium text-zinc-700 transition hover:text-black"
            >
              Browse all snippets →
            </Link>
          </header>

          <div className="relative px-10 pb-20 pt-2">
            <div className="absolute right-0 top-0 h-full w-80 opacity-40">
              <div className="h-full w-full bg-[radial-gradient(#c4b5fd_1px,transparent_1px)] [background-size:18px_18px]" />
            </div>

            <div className="relative max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-semibold text-violet-800">
                <Sparkles className="h-3.5 w-3.5 text-violet-600" />
                <span className="text-violet-800">Find. Learn. Build.</span>
              </span>

              <h1 className="mt-8 text-6xl font-bold leading-tight tracking-tight text-zinc-950">
                Discover the snippets that power your next build.
              </h1>

              <p className="mt-6 max-w-2xl text-xl leading-9 text-zinc-600">
                Browse verified code snippets, search by language or keyword, and find the right solution faster.
              </p>

              <div className="mt-10">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <h2 className="text-4xl font-bold text-white">
                Popular snippets
              </h2>
            </div>
          </div>

          <Link
            href="/search"
            className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            Browse all snippets →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {popularSnippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
            />
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-2xl">
                ✨
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Have a useful snippet?
                </h3>
                <p className="mt-1 text-zinc-400">
                  Share it with the community and help others ship faster.
                </p>
              </div>
            </div>

            <CreateSnippet />
          </div>
        </div>

      </section>
    </main>
  );
}