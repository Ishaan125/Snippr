import { codeToHtml } from "shiki";

export async function highlightCode(code: string, language: string) {
  try {
    return await codeToHtml(code, {
      lang: language.toLowerCase(),
      theme: "github-dark",
    });
  } 
  catch {
    // Fallback if the language isn't supported
    return await codeToHtml(code, {
      lang: "text",
      theme: "github-dark",
    });
  }
}

export function getLanguageColor(language: string) {
  switch (language.toLowerCase()) {
    case "aws cli":
      return "text-orange-400";

    case "bash":
      return "text-zinc-300";

    case "c":
      return "text-cyan-400";

    case "c#":
      return "text-purple-400";

    case "c++":
      return "text-sky-400";

    case "css":
      return "text-blue-400";

    case "docker":
      return "text-sky-400";

    case "git":
      return "text-orange-500";

    case "go":
      return "text-cyan-400";

    case "graphql":
      return "text-pink-400";

    case "html":
      return "text-orange-400";

    case "java":
      return "text-red-400";

    case "javascript":
      return "text-yellow-300";

    case "kotlin":
      return "text-fuchsia-400";

    case "markdown":
      return "text-slate-300";

    case "mongodb":
      return "text-green-400";

    case "next.js":
      return "text-white";

    case "node.js":
      return "text-lime-400";

    case "php":
      return "text-indigo-400";

    case "python":
      return "text-green-400";

    case "react":
      return "text-cyan-300";

    case "redis":
      return "text-red-400";

    case "regex":
      return "text-violet-400";

    case "ruby":
      return "text-red-500";

    case "rust":
      return "text-amber-400";

    case "sql":
      return "text-emerald-400";

    case "swift":
      return "text-orange-300";

    case "terraform":
      return "text-violet-400";

    case "typescript":
      return "text-blue-400";

    case "vim":
      return "text-green-500";

    case "vue":
      return "text-emerald-400";

    case "yaml":
      return "text-pink-400";

    default:
      return "text-zinc-300";
  }
}