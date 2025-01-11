import { redirect } from 'next/navigation';
import { createClient } from '@/lib/utils/supabase/server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import OrderCard from '@/components/OrderCard';
import { Database } from '@/types/supabase';

const supabase = createServerComponentClient<Database>({ cookies });

const getAllOrder = async () => {
  const { data: orderlist } = await supabase
    .from('orders')
    .select(
      '*, client:clients(*), order_items(quantity, product:products(*, brewery:breweries(*)))'
    )
    .order('order_date', { ascending: false });
  return orderlist;
};

export default async function OrderList() {
  const orderlist = await getAllOrder();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="prose">
        <h1>Order List</h1>
      </div>
      <main className="grid grid-cols-1 gap-6">
        {orderlist?.map((order) => (
          <OrderCard key={order.id} data={order} />
        ))}
      </main>
    </div>
  );
}
