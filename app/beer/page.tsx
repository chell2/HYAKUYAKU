import Card from '@/components/Card';

interface Beer {
  abv: string | null;
  brewery_id: string | null;
  created_at: string;
  description: string | null;
  fermentation: string | null;
  hops: string[] | null;
  ibu: number | null;
  id: string;
  malts: string[] | null;
  name: string | null;
  style: string | null;
  volume: number | null;
}

export default async function BeerList() {
  const res = await fetch('/api/beers');
  if (!res.ok) {
    console.error('Error fetching beers:', res.status);
    return <p>エラーが発生しました。</p>;
  }
  const beerlist = (await res.json()) as Beer[];

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
