import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = String(body?.title || "").trim();
    const description = String(body?.description || "").trim();
    const code = String(body?.code || "").trim();
    const language = String(body?.language || "").trim();
    const featured = Boolean(body?.featured);
    const verified = Boolean(body?.verified);
    const hashtags = Array.isArray(body?.hashtags)
      ? body.hashtags.filter((tag: unknown) => typeof tag === "string")
      : [];

    if (!title || !description || !code || !language) {
      return NextResponse.json(
        { success: false, error: "Title, description, code, and language are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    const tableName = process.env.SNIPPETS_TABLE || process.env.NEXT_PUBLIC_SNIPPETS_TABLE || "Snippets";
    const slug = `${slugify(title)}-${Date.now().toString(36)}`;

    const { error } = await supabase.from(tableName).insert({
      slug,
      title,
      description,
      code,
      language,
      featured,
      verified,
      hashtags,
    });

    if (error) {
      const message = error.message.includes("Could not find the table")
        ? `Supabase table "${tableName}" was not found. Create it in Supabase or set the SNIPPETS_TABLE environment variable to the correct table name.`
        : error.message;

      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error", hint: (error as any).hint ?? null },
      { status: 500 }
    );
  }
}
