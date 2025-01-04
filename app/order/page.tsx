'use client';

import { useEffect, useState } from 'react';
import OrderCard from '@/components/OrderCard';
import { OrderWithItems } from '@/types/types';

export default function OrderList() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (err: unknown) {
        console.error('Error fetching orders:', err);
        setError('注文情報の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p className="text-red-500">エラー: {error}</p>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="prose">
        <h1>Order List</h1>
      </div>
      <main className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <OrderCard key={order.id} data={order} />
        ))}
      </main>
    </div>
  );
}
