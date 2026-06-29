export function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  return (
    <form action="/search" method="get" className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
      <input
        name="q"
        defaultValue={initialQuery}
        placeholder="Search snippets, languages, or tags"
        className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-0 transition focus:border-zinc-900"
      />
      <button
        type="submit"
        className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
      >
        Search
      </button>
    </form>
  );
}
