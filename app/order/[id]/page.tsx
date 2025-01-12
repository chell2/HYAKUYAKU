'use client';

import { formatDate } from '@/lib/utils/dateUtils';
import {
  clientTypeMap,
  OrderWithItems,
  ProductWithBrewery,
} from '@/types/types';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const OrderDetailPage = ({ params }: { params: { id: string } }) => {
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [descriptions, setDescriptions] = useState<{
    [productId: string]: string;
  }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/order/${params.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch order: ${response.status}`);
        }
        const data = await response.json();
        setOrder(data);
      } catch (err: unknown) {
        console.error('Error fetching order:', err);
        let errorMessage = 'An unknown error occurred.';
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        } else {
          errorMessage = JSON.stringify(err);
        }
        setError(errorMessage);
      }
    };
    if (params.id) {
      fetchOrder();
    }
  }, [params.id]);

  const generateDescription = async (product: ProductWithBrewery) => {
    if (descriptions[product.id]) return;
    try {
      const clientType = order?.client?.type;
      const clientTypeName = clientType ? clientTypeMap[clientType] : 'その他';
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product,
          clientType: clientTypeName,
        }),
      });
      if (!res.ok) {
        throw new Error(`Failed to generate description: ${res.status}`);
      }
      const data = await res.json();
      setDescriptions((prev) => ({ ...prev, [product.id]: data.text }));
    } catch (err: unknown) {
      console.error('Error generating description:', err);
      let errorMessage = 'An unknown error occurred.';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else {
        errorMessage = JSON.stringify(err);
      }
      setError(errorMessage);
    }
  };

  if (error) return <p className="text-red-500">エラー: {error}</p>;
  if (!order) return <p>読み込み中...</p>;

  return (
    <div className="grid gap-4 items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="w-full text-center mb-8 py-4">
          <div className="stats shadow">
            <div className="stat">
              <div className="w-32 rounded">
                <img
                  src={`/${order.client?.id || 'noimage'}.png`}
                  alt={order.client?.name || 'No Name'}
                />
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-primary"></div>
              <div className="stat-title"></div>
              <div className="stat-value text-primary">
                {order.client?.name || 'No Name'}
              </div>
              <div className="stat-desc">
                注文日：{formatDate(order?.order_date ?? '')}
              </div>
            </div>
          </div>
        </div>
        {order?.order_items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {order.order_items.map((item, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <figure className="w-auto">
                  <img
                    src={`/${item.product?.id || 'placeholder'}.png`}
                    alt={item.product?.name || 'No Name'}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.product?.name}</h2>
                  {/* <p>
                    {item.quantity} x {item.product?.name} (
                    {item.product?.brewery?.name})
                  </p> */}
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
                      <ReactMarkdown>
                        {descriptions[item.product?.id || '']}
                      </ReactMarkdown>
                    )}
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
  );
};

export default OrderDetailPage;
