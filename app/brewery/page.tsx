import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Card from '@/components/Card';
import { Database } from '@/types/supabase';

const supabase = createServerComponentClient<Database>({ cookies });

const getAllBrewery = async () => {
  const { data: brewerylist } = await supabase.from('breweries').select('*');
  return brewerylist;
};

export default async function BeerList() {
  const brewerylist = await getAllBrewery();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="prose">
        <h1>Brewery List</h1>
      </div>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brewerylist?.map((brewery) => (
          <Card key={brewery.id} data={brewery} />
        ))}
      </main>
    </div>
  );
}
