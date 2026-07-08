"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { copyToClipboard } from "@/lib/snippets";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const success = await copyToClipboard(text);
    if (!success) return;

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button" onClick={handleCopy}
      className="inline-flex items-center gap-2 text-sm font-medium text-zinc-200 transition-colors group-hover:text-white cursor-pointer"
      aria-label="Copy snippet code" title={copied ? "Copied" : "Copy"}
    >
      <Copy className="h-4 w-4" />
      <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}