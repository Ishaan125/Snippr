import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { SnippetCard } from "@/components/SnippetCard";
import { getPopularSnippets } from "@/lib/snippets";

export default function Home() {
  const popularSnippets = getPopularSnippets();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <section className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Snippr
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            Discover the snippets that power your next build.
          </h1>
          <p className="text-lg leading-8 text-zinc-600">
            Explore popular code examples, search by language or tag, and jump into the snippets that matter most.
          </p>
        </div>

        <SearchBar />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Popular now
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
              Trending snippets
            </h2>
          </div>
          <Link href="/search" className="text-sm font-medium text-zinc-700 underline underline-offset-4">
            Browse all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {popularSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      </section>
    </main>
  );
}
