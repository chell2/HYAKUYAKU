import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Card from '@/components/Card';
import { Database } from '@/types/supabase';

const supabase = createServerComponentClient<Database>({ cookies });

const getAllBeer = async () => {
  try {
    const { data: beerlist, error } = await supabase
      .from('products')
      .select('*');
    if (error) {
      console.error('Error fetching beers:', error);
      throw new Error(`Error fetching beers: ${error.message}`);
    }
    return beerlist;
  } catch (error: unknown) {
    console.error('Error fetching beers:', error);
    let errorMessage = 'An unknown error occurred.';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object') {
      if ('message' in error) {
        errorMessage = (error as { message: string }).message;
      } else if ('error' in error) {
        errorMessage = (error as { error: string }).error;
      } else if (Array.isArray(error) && error[0] && 'message' in error[0]) {
        errorMessage = (error as Array<{ message: string }>)[0].message;
      } else {
        errorMessage = JSON.stringify(error);
      }
    }
    throw new Error(`Error fetching beers: ${errorMessage}`);
  }
};

export default async function BeerList() {
  const beerlist = await getAllBeer();

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
