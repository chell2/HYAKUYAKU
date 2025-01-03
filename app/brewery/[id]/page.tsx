import {
  createServerComponentClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
import React from 'react';
import Image from 'next/image';

const getDetailBrewery = async (
  id: string,
  supabase: SupabaseClient<Database>
) => {
  const { data: brewery } = await supabase
    .from('breweries')
    .select('*')
    .eq('id', id)
    .single();
  return brewery;
};

const BreweryDetailPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const brewery = await getDetailBrewery(params.id, supabase);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="prose">
        <h1>{brewery?.name}</h1>
      </div>
      <main>
        <Image
          src="/noimage.png"
          alt={brewery?.name || 'No Name'}
          width={300}
          height={100}
        />
        <p>{brewery?.description}</p>
      </main>
    </div>
  );
};

export default BreweryDetailPage;
