import Link from "next/link";
import type { Snippet } from "@/types/snippet";
import { highlightCode } from "@/lib/highlight";
import { getLanguageColor } from "@/lib/highlight";
import { CopyButton } from "@/components/CopyButton";
import { FavoriteButton } from "@/components/FavoriteButton";

export async function SnippetCard({ snippet }: { snippet: Snippet }) {
  return (
    <article
      className="group flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 
      shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl">
      
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${getLanguageColor(snippet.language)}`}>
            {snippet.language}
          </span>

          <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
            {snippet.title}
          </h3>
        </div>

        {snippet.featured && (
          <span className="whitespace-nowrap rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            ★ Popular
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-400">
        {snippet.description}
      </p>

      <div
        className="
          mt-5 overflow-hidden rounded-2xl border border-zinc-800 bg-[#0b0b0b] [&_pre]:m-0
          [&_pre]:bg-transparent!important [&_pre]:p-5 [&_pre]:text-[13px] [&_pre]:leading-6"
        dangerouslySetInnerHTML={{
          __html: await highlightCode(snippet.code, snippet.language),
        }}
      />
      <div className="mt-6 flex items-center justify-between gap-3">
        <Link
          href={`/snippets/${snippet.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium
            text-zinc-200 transition-colors group-hover:text-white"
          >
          View snippet
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
        <FavoriteButton snippetId={snippet.id} />
        <CopyButton text={snippet.code} />
      </div>
    </article>
  );
}