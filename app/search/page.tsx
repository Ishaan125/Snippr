import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { SnippetCard } from "@/components/SnippetCard";
import { searchSnippets } from "@/lib/snippets";

export default async function SearchPage({searchParams,}: {searchParams: Promise<{ q?: string }>;}) {
  const { q = "" } = await searchParams;
  const results = await searchSnippets(q);

  results.sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <main className="min-h-screen bg-[#111113] bg-gradient-to-b from-[#111113] to-[#0b0b0f]">
      <section className="mx-auto max-w-7xl px-6 pt-3">
        <div className="overflow-hidden rounded-[36px] border border-zinc-200 bg-white shadow-xl">
          <header className="flex items-center justify-between px-10 py-5">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Search Results
            </p>

            <Link
              href="/"
              className="text-sm font-medium text-zinc-700 transition hover:text-black"
            >
              ← Back home
            </Link>
          </header>

          <div className="relative px-10 pb-16 pt-2">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold tracking-tight text-zinc-950">
                Find snippets that fit your project
              </h1>

              <p className="mt-4 text-lg leading-8 text-zinc-600">
                {results.length} result{results.length !== 1 ? "s" : ""}
                {q && (
                  <>
                    {" "}
                    for{" "}
                    <span className="font-semibold text-zinc-900">
                      "{q}"
                    </span>
                  </>
                )}
              </p>

              <div className="mt-8">
                <SearchBar initialQuery={q} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {results.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {results.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-16 text-center">
            <h2 className="text-2xl font-semibold text-white">
              No snippets found
            </h2>

            <p className="mt-4 text-zinc-400">
              We couldn't find anything matching{" "}
              <span className="font-medium text-white">
                "{q}"
              </span>
              .
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
            >
              Back home
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}