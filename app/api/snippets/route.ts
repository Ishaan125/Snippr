import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = String(body?.title || "").trim();
    const description = String(body?.description || "").trim();
    const code = String(body?.code || "").trim();
    const hashtags = Array.isArray(body?.hashtags)
      ? body.hashtags.filter((tag: unknown) => typeof tag === "string")
      : [];

    if (!title || !description || !code) {
      return NextResponse.json(
        { success: false, error: "Title, description, and code are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();

    const { error } = await supabase.from("snippets").insert({
      title,
      description,
      code,
      hashtags,
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
