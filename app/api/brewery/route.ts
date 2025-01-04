import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const { data: breweries, error } = await supabase
      .from('breweries')
      .select('*');

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
