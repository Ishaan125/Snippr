import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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

    if (!title || !description || !code || !language) {
      return NextResponse.json(
        { success: false, error: "Title, description, code, and language are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    const slug = `${slugify(title)}-${Date.now().toString(36)}`;
    const { error } = await supabase.from("Snippets").insert({slug,title,description,code,language,featured,verified});

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } 
  catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error", hint: (error as any).hint ?? null },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("Snippets").select("*").order("id", { ascending: false }).eq("verified", true).limit(100);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, data: data ?? [] });
  }
  catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error", hint: (error as any).hint ?? null },
      { status: 500 }
    );
  }
}