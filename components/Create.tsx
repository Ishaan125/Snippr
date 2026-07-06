"use client";

import { useRef, useState } from "react";

export function CreateSnippet() {
  const [status, setStatus] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      title: String(formData.get("title") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      code: String(formData.get("code") || "").trim(),
      language: String(formData.get("language") || "").trim(),
      featured: false,
      verified: false,
    };

    const response = await fetch("/api/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    setStatus(
      result.success
        ? "Snippet submitted! It will be reviewed before being published."
        : result.error || "Something went wrong."
    );

    if (result.success) {
      form.reset();
      formRef.current?.reset();
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6 rounded-[32px] border border-zinc-800 bg-zinc-900/80 p-8 shadow-xl"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Title
          </label>

          <input
            name="title"
            required
            placeholder="Binary Search Tree"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Language
          </label>

          <input
            name="language"
            required
            placeholder="JavaScript"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Description
        </label>

        <textarea
          name="description"
          required
          rows={4}
          placeholder="Explain what this snippet does..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Code
        </label>

        <textarea
          name="code"
          required
          rows={12}
          spellCheck={false}
          placeholder="// Paste your code here..."
          className="w-full rounded-xl border border-zinc-700 bg-[#0b0b0b] px-4 py-4 font-mono text-[13px] leading-6 text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-500"
        >
          Submit Snippet
        </button>

        {status && (
          <p
            className={`text-sm ml-4 ${
              status.startsWith("Snippet")
                ? "text-emerald-400"
                : "text-red-400"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </form>
  );
}