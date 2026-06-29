import { snippets } from "@/data/snippets";

export function getPopularSnippets() {
  return snippets.filter((snippet) => snippet.featured);
}

export function searchSnippets(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return snippets;
  }

  return snippets.filter((snippet) => {
    const haystack = [
      snippet.title,
      snippet.description,
      snippet.language,
      ...snippet.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function getSnippetBySlug(slug: string) {
  return snippets.find((snippet) => snippet.slug === slug);
}
