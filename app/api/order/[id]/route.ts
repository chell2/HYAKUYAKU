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

  const { data: order, error } = await supabase
    .from('orders')
    .select(
      '*, client:clients(*), order_items(quantity, product:products(*, brewery:breweries(*)))'
    )
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json(order);
}
