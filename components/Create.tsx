"use client";

import { useRef, useState } from "react";

export function CreateSnippet() {
  const [status, setStatus] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    setStatus(result.success ? "Snippet created successfully. Your snippet will be reviewed before being published." : result.error || "Something went wrong.");
    if (result.success) {
      form.reset();
      formRef.current?.reset();
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <input
        name="title"
        placeholder="Title"
        required
        className="w-full rounded border text-zinc-900 border-zinc-300 bg-white px-4 py-2 text-sm shadow-sm outline-none ring-0 transition focus:border-zinc-900"
      />
      <textarea
        name="description"
        placeholder="Description"
        required
        rows={4}
        className="w-full rounded border text-zinc-900 border-zinc-300 bg-white px-4 py-2 text-sm shadow-sm outline-none ring-0 transition focus:border-zinc-900"
      />
      <textarea
        name="code"
        placeholder="Code"
        required
        rows={6}
        className="w-full rounded border text-zinc-900 border-zinc-300 bg-white px-4 py-2 font-mono text-sm shadow-sm outline-none ring-0 transition focus:border-zinc-900"
      />
      <input
        name="language"
        placeholder="Language"
        required
        className="w-full rounded border text-zinc-900 border-zinc-300 bg-white px-4 py-2 text-sm shadow-sm outline-none ring-0 transition focus:border-zinc-900"
      />
      <button
        type="submit"
        className="rounded bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
      >
        Create Snippet
      </button>
      {status ? <p className="text-sm text-zinc-600">{status}</p> : null}
    </form>
  );
}