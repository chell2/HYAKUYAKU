import { createRouteHandlerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password, token } = await request.json();
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookieStore });

    const { error } = await supabase.auth.updateUser({ password }, { token });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    await supabase.auth.signOut();
    return NextResponse.redirect(new URL('/login', request.url), {
      status: 302,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
  }
}
