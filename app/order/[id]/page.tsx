'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils/dateUtils';
import { DeliveryWithItems, ProductWithBrewery } from '@/types/types';

const OrderDetailPage = ({ params }: { params: { id: string } }) => {
  const [order, setOrder] = useState<DeliveryWithItems | null>(null);
  const [descriptions, setDescriptions] = useState<{
    [productId: string]: string;
  }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${params.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch order: ${response.status}`);
        }
        const data = await response.json();
        setOrder(data);
      } catch (err: unknown) {
        console.error('Error fetching order:', err);
        setError(err.message);
      }
    };
    if (params.id) {
      fetchOrder();
    }
  }, [params.id]);

  const generateDescription = async (product: ProductWithBrewery) => {
    if (descriptions[product.id]) return;
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product,
          clientType: order?.client?.type || 'unknown',
        }),
      });
      if (!res.ok) {
        throw new Error(`Failed to generate description: ${res.status}`);
      }
      const data = await res.json();
      setDescriptions((prev) => ({ ...prev, [product.id]: data.text }));
    } catch (err: unknown) {
      console.error('Error generating description:', err);
      setError(err.message);
    }
  };

  if (error) return <p className="text-red-500">エラー: {error}</p>;
  if (!order) return <p>読み込み中...</p>;

  return (
    <div className="grid gap-4 items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="prose">
        <main>
          <div className="justify-items-center">
            <div className="w-80">
              <img
                src={`/${order.client?.id || 'noimage'}.png`}
                alt={order.client?.name || 'No Name'}
              />
            </div>
            <h1>{order.client?.name || 'No Name'}</h1>
            <h3>注文日：{formatDate(order?.order_date ?? '')}</h3>
          </div>
          {order?.order_items.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {order.order_items.map((item, index) => (
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                  <div className="card bg-base-100 w-full shadow-xl">
                    <figure>
                      <img
                        src={`/${item.product?.id || 'placeholder'}.png`}
                        alt={item.product?.name || 'No Name'}
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.product?.name}</h2>
                      <p>
                        {item.quantity} x {item.product?.name} (
                        {item.product?.brewery?.name})
                      </p>
                      <div className="card-actions justify-end">
                        {!descriptions[item.product?.id || ''] && (
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              generateDescription(
                                item.product as ProductWithBrewery
                              )
                            }
                          >
                            説明文を生成
                          </button>
                        )}
                        {descriptions[item.product?.id || ''] && (
                          <p>{descriptions[item.product?.id || '']}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>注文がありません。</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrderDetailPage;
