'use client';

import BreweryCard from '@/components/BreweryCard';
import BreweryInsert from '@/components/BreweriyInsert';
import { ModalButton } from '@/components/ModalButton';
// import { closeModal } from '@/lib/utils/closeModal';
// import { openModal } from '@/lib/utils/openModal';
import { Brewery } from '@/types/types';
import { useEffect, useState } from 'react';

export default function BreweryList() {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const res = await fetch('/api/brewery');
        if (!res.ok) {
          throw new Error(`Failed to fetch breweries: ${res.status}`);
        }
        const data: Brewery[] = await res.json();
        setBreweries(data);
      } catch (err: unknown) {
        console.error('Error fetching breweries:', err);
        setError('ブルワリー情報の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
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
        <h1>Brewery List</h1>
      </div>
      <main>
        <ModalButton buttonTitle="ブルワリーを追加する">
          <BreweryInsert />
        </ModalButton>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {breweries?.map((brewery) => (
            <BreweryCard key={brewery.id} data={brewery} />
          ))}
        </div>
      </main>
    </div>
  );
}
