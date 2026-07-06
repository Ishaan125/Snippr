import Link from "next/link";
import { notFound } from "next/navigation";
import { getSnippetBySlug } from "@/lib/snippets";
import { highlightCode } from "@/lib/highlight";
import { getLanguageColor } from "@/lib/highlight";

export default async function SnippetDetailPage({params,}: {params: Promise<{ slug: string }>;}) {
  const { slug } = await params;
  const snippet = await getSnippetBySlug(slug);

  if (!snippet) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#111113] bg-gradient-to-b from-[#111113] to-[#0b0b0f]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white"
        >
          ← Back home
        </Link>

        <article className="rounded-[32px] border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${getLanguageColor(snippet.language)}`}>
                {snippet.language}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">
                {snippet.title}
              </h1>
            </div>

            {snippet.featured && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
                ★ Popular
              </span>
            )}
          </div>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            {snippet.description}
          </p>

          <div
            className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-[#0b0b0b] [&_pre]:m-0
              [&_pre]:bg-transparent!important [&_pre]:p-6 [&_pre]:text-[14px] [&_pre]:leading-7
            "
            dangerouslySetInnerHTML={{
              __html: await highlightCode(snippet.code, snippet.language),
            }}
          />
        </article>
      </div>
    </main>
  );
}