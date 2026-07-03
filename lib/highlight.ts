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