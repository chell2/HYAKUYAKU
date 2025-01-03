import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { Database } from '@/types/supabase';

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data: orders, error } = await supabase
    .from('orders')
    .select(
      '*, client:clients(*) , order_items(quantity, product:products(*, brewery:breweries(*)))'
    )
    .order('order_date', { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch deliveries' },
      { status: 500 }
    );
  }

  return NextResponse.json(orders);
}
