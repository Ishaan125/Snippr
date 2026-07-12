import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-auth'

type RouteContext = {
  params: Promise<{ snippetId: string }>
}

export async function POST(_request: Request, context: RouteContext) {
  try {
    const { snippetId: snippetIdParam } = await context.params
    const snippetId = Number(snippetIdParam)

    if (!Number.isInteger(snippetId) || snippetId <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid snippet id.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: userResponse, error: userError } = await supabase.auth.getUser()

    if (userError || !userResponse.user) {
      return NextResponse.json({ success: false, error: 'You must be signed in to favorite snippets.' }, { status: 401 })
    }

    const userId = userResponse.user.id

    const { data: existingFavorite, error: lookupError } = await supabase
      .from('favorites').select('id').eq('user_id', userId)
      .eq('snippet_id', snippetId).maybeSingle()

    if (lookupError) {
      return NextResponse.json({ success: false, error: lookupError.message }, { status: 500 })
    }

    if (existingFavorite) {
      return NextResponse.json({ success: true, favorited: true, message: 'Snippet is already in your favorites.' })
    }

    const { error: insertError } = await supabase.from('favorites').insert({
      user_id: userId,
      snippet_id: snippetId,
    })

    if (insertError) {
      return NextResponse.json({ success: false, error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, favorited: true })
  } 
  catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}