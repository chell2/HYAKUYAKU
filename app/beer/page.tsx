'use client';

import Card from '@/components/Card';
import BeerInsert from '@/components/BeerInsert';
import { openModal } from '@/lib/utils/openModal';
import { closeModal } from '@/lib/utils/closeModal';
import { Product } from '@/types/types';
import { useState, useEffect } from 'react';

export default function BeerList() {
  const [beerlist, setBeerlist] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/beer');
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`);
        }
        const data: Product[] = await res.json();
        setBeerlist(data);
      } catch (err: unknown) {
        console.error('Error fetching products:', err);
        setError('注文情報の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p>エラーが発生しました: {error}</p>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="prose">
        <h1>Beer List</h1>
      </div>
      <main>
        <div className="flex justify-end pb-10">
          <button className="btn" onClick={openModal}>
            商品を追加する
          </button>
        </div>
        <dialog id="my_modal" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <button
              className="btn btn-md btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <p className="grid justify-items-center py-4">
              <BeerInsert />
            </p>
          </div>
        </dialog>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {beerlist.map((beer) => (
            <Card key={beer.id} data={beer} />
          ))}
        </div>
      </main>
    </div>
  );
}
