'use client';

import Card from '@/components/Card';
import { Products } from '@/types/types';
import { useState, useEffect } from 'react';

export default function BeerList() {
  const [beerlist, setBeerlist] = useState<Products[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/beer');
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`);
        }
        const data: Products[] = await res.json();
        setBeerlist(data);
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching products:', error);
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
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {beerlist.map((beer) => (
          <Card key={beer.id} data={beer} />
        ))}
      </main>
    </div>
  );
}
