import { GET as getSnippetsRoute } from "@/app/api/snippets/route";
import type { Snippet } from "@/types/snippet";

async function getSnippetRecords(): Promise<Snippet[]> {
  const response = await getSnippetsRoute();
  const payload = await response.json();
  const records = payload.data as Array<Record<string, unknown>>;

  return records.map((record) => ({
    id: Number(record.id ?? 0),
    slug: String(record.slug ?? ""),
    title: String(record.title ?? ""),
    description: String(record.description ?? ""),
    language: String(record.language ?? ""),
    code: String(record.code ?? ""),
    featured: Boolean(record.featured ?? false),
  }))
  .filter((snippet) => snippet.slug && snippet.title && snippet.code);
}

export async function getPopularSnippets() {
  const snippets = await getSnippetRecords();
  return snippets.filter((snippet) => snippet.featured);
}

export async function searchSnippets(query: string) {
  const snippets = await getSnippetRecords();
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return snippets;
  }

  return snippets.filter((snippet) => {
    const haystack = [snippet.title, snippet.description, snippet.language, snippet.code]
      .join(" ").toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export async function getSnippetBySlug(slug: string) {
  const snippets = await getSnippetRecords();
  return snippets.find((snippet) => snippet.slug === slug);
}
