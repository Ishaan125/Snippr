import Link from "next/link";
import { notFound } from "next/navigation";
import { getSnippetBySlug } from "@/lib/snippets";

export default async function SnippetDetailPage({params,}: {params: Promise<{ slug: string }>;}) {
  const { slug } = await params;
  const snippet = await getSnippetBySlug(slug);

  if (!snippet) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-12">
      <Link href="/" className="text-sm font-medium text-zinc-700 underline underline-offset-4">
        ← Back home
      </Link>
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
            {snippet.language}
          </p>
          {snippet.featured ? (
            <span className="ml-auto rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
              Popular
            </span>
          ) : null}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">
          {snippet.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">{snippet.description}</p>

        <pre className="mt-6 overflow-x-auto rounded-2xl bg-zinc-950 p-6 text-sm text-zinc-100">
          <code>{snippet.code}</code>
        </pre>
      </section>
    </main>
  );
}
