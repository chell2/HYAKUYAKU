'use client';

import Card from '@/components/Card';
import BeerInsert from '@/components/BeerInsert';
import { ModalButton } from '@/components/ModalButton';
import { Product } from '@/types/types';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/utils/supabase/client';

const supabase = createClient();

export default function BeerListPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [beerlist, setBeerlist] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkSession();
  }, []);

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
        setError('商品情報の取得に失敗しました。');
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
        {isLoggedIn && (
          <ModalButton buttonTitle="商品を追加する">
            <BeerInsert />
          </ModalButton>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {beerlist.map((beer) => (
            <Card key={beer.id} data={beer} />
          ))}
        </div>
      </main>
    </div>
  );
}
