import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

interface Beer {
  abv: string | null;
  brewery_id: string | null;
  created_at: string;
  description: string | null;
  fermentation: string | null;
  hops: string[] | null;
  ibu: number | null;
  id: string;
  malts: string[] | null;
  name: string | null;
  style: string | null;
  volume: number | null;
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: beerlist, error } = await supabase
      .from('products')
      .select('*');
    if (error) {
      console.error('Error fetching beers:', error);
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    return NextResponse.json(beerlist as Beer[]);
  } catch (error: unknown) {
    console.error('Error fetching beers:', error);
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object') {
      if ('message' in error) {
        errorMessage = (error as { message: string }).message;
      } else if ('error' in error) {
        errorMessage = (error as { error: string }).error;
      } else if (Array.isArray(error) && error[0] && 'message' in error[0]) {
        errorMessage = (error as Array<{ message: string }>)[0].message;
      } else {
        errorMessage = JSON.stringify(error);
      }
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
