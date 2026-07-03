import { Search } from "lucide-react";

export function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  return (
    <form
      action="/search"
      method="get"
      className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row">

      <div className="relative flex-1">
        <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />

        <input
          name="q"
          defaultValue={initialQuery}
          placeholder="Search snippets, languages, frameworks..."
          className="
            h-14 w-full rounded-2xl border border-zinc-300 bg-white pl-14 
            pr-5 text-base text-zinc-900 shadow-sm outline-none transition-all
            placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200"
        />
      </div>

      <button
        type="submit"
        className="
          inline-flex h-14 items-center justify-center gap-2 rounded-2xl
          bg-zinc-950 px-6 text-sm font-semibold text-white shadow-md
          transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-lg"
        >
        Search
        <span>→</span>
      </button>
    </form>
  );
}