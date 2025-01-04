'use client';

import Card from '@/components/Card';
import { Product } from '@/types/types';

export default async function BeerList() {
  const res = await fetch('/api/beer');
  if (!res.ok) {
    console.error('Error fetching beers:', res.status);
    return <p>エラーが発生しました。</p>;
  }
  const beerlist: Product[] = await res.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="prose">
        <h1>Beer List</h1>
      </div>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {beerlist?.map((beer) => (
          <Card key={beer.id} data={beer} />
        ))}
      </main>
    </div>
  );
}
