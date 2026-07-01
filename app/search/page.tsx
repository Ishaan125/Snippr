import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { SnippetCard } from "@/components/SnippetCard";
import { searchSnippets } from "@/lib/snippets";

export default async function SearchPage({searchParams,}: {searchParams: Promise<{ q?: string }>;}) {
  const { q = "" } = await searchParams;
  const results = await searchSnippets(q);
  results.sort((a, b) => {
    const aFeatured = a.featured ? 1 : 0;
    const bFeatured = b.featured ? 1 : 0;
    return bFeatured - aFeatured;
  });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-12">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Search results
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            Find snippets that fit your project
          </h1>
        </div>
        <SearchBar initialQuery={q} />
      </div>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {results.length > 0 ? (
          results.map((snippet) => <SnippetCard key={snippet.id} snippet={snippet} />)
        ) : (
          <div className="md:col-span-2 xl:col-span-3 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center text-zinc-600">
            No snippets matched “{q}”. Try a broader search.
          </div>
        )}
      </section>

      <Link href="/" className="text-sm font-medium text-zinc-700 underline underline-offset-4">
        Back home
      </Link>
    </main>
  );
}
