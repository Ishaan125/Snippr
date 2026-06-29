import type { Snippet } from "@/types/snippet";

export const snippets: Snippet[] = [
  {
    id: 1,
    slug: "fetch-data-in-nextjs",
    title: "Fetch data in Next.js",
    description: "A simple async server component pattern for loading data.",
    language: "TypeScript",
    tags: ["nextjs", "fetch", "server"],
    featured: true,
    code: `async function Page() {
  const res = await fetch("https://api.example.com/items");
  const data = await res.json();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}`,
  },
  {
    id: 2,
    slug: "tailwind-utility-classes",
    title: "Tailwind utility classes",
    description: "Reusable Tailwind classes for a polished card layout.",
    language: "HTML",
    tags: ["tailwind", "ui", "layout"],
    featured: true,
    code: ` <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
  <h2 className="text-lg font-semibold">Card</h2>
</article>`,
  },
  {
    id: 3,
    slug: "react-useeffect-pattern",
    title: "React useEffect pattern",
    description: "A lightweight pattern for fetching data once on mount.",
    language: "JavaScript",
    tags: ["react", "hooks", "effect"],
    featured: true,
    code: `useEffect(() => {
  let isMounted = true;
  fetchData().then((data) => {
    if (isMounted) setState(data);
  });
  return () => {
    isMounted = false;
  };
}, []);`,
  },
  {
    id: 4,
    slug: "css-grid-layout",
    title: "CSS Grid layout",
    description: "A responsive two-column layout built with CSS Grid.",
    language: "CSS",
    tags: ["css", "grid", "responsive"],
    featured: false,
    code: `.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}`,
  },
  {
    id: 5,
    slug: "python-list-comprehension",
    title: "Python list comprehension",
    description: "Shorten loops with a readable comprehension expression.",
    language: "Python",
    tags: ["python", "syntax", "lists"],
    featured: false,
    code: `squares = [n * n for n in range(10)]`,
  },
];
