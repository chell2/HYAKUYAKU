import { redirect } from 'next/navigation';
import { createClient } from '@/lib/utils/supabase/server';
import OrderCard from '@/components/OrderCard';

export default async function OrderList() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  const getAllOrder = async () => {
    const { data: orderlist } = await supabase
      .from('orders')
      .select(
        '*, client:clients(*), order_items(created_at, id, order_id, product_id, quantity, product:products(*, brewery:breweries(*)))'
      )
      .order('order_date', { ascending: false });
    return orderlist;
  };
  const orderlist = await getAllOrder();

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
