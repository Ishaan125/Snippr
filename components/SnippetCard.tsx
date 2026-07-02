import Link from "next/link";
import type { Snippet } from "@/types/snippet";

export function SnippetCard({ snippet }: { snippet: Snippet }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {snippet.language}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-zinc-900">{snippet.title}</h3>
        </div>
        {snippet.featured ? (
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 ">
            Popular
          </span>
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-600">{snippet.description}</p>

      <pre className="mt-4 overflow-x-auto rounded-xl bg-zinc-950 p-4 text-sm text-zinc-100">
        <code>{snippet.code}</code>
      </pre>

      <Link
        href={`/snippets/${snippet.slug}`}
        className="mt-6 inline-flex text-sm font-medium text-zinc-950 underline underline-offset-4"
      >
        View snippet
      </Link>
    </article>
  );
}
