import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { id } = params;

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return NextResponse.json({ error: 'Invalid UUID format' }, { status: 400 });
  }

  try {
    const { data: breweries, error } = await supabase
      .from('breweries')
      .select('*')
      .is('deleted_at', null)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching breweries:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(breweries);
  } catch (error) {
    console.error('Error fetching breweries:', error);
    return NextResponse.json(
      { error: 'An unknown error occurred.' },
      { status: 500 }
    );
  }
}
