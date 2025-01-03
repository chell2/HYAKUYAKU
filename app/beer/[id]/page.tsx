import {
  createServerComponentClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
import React from 'react';
import Image from 'next/image';

const getDetailBeer = async (
  id: string,
  supabase: SupabaseClient<Database>
) => {
  const { data: beer } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  return beer;
};

const BeerDetailPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const beer = await getDetailBeer(params.id, supabase);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="prose">
        <h1>{beer?.name}</h1>
      </div>
      <main>
        <Image
          src={`/${beer?.id ?? 'placeholder'}.png`}
          alt={beer?.name || 'No Name'}
          width={300}
          height={100}
        />
        <p>{beer?.style}</p>
        <p>
          ABV: {beer?.abv} / IBU: {beer?.ibu}
        </p>
        <p>{beer?.description}</p>
      </main>
    </div>
  );
};

export default BeerDetailPage;
