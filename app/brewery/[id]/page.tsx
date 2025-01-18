import {
  createServerComponentClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
import React from 'react';

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
    <div className="grid gap-4 justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="w-full text-center mb-8 py-4">
          <div className="stats shadow">
            <div className="stat">
              <div className="w-32 rounded">
                <img
                  src={`/${brewery?.id}.png`}
                  alt={brewery?.name || 'No Name'}
                />
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-primary"></div>
              <div className="stat-title"></div>
              <div className="stat-value text-primary">{brewery?.name}</div>
              <div className="stat-desc">地域：{brewery?.region}</div>
            </div>
          </div>
        </div>
        <div className="prose">
          <p>{brewery?.description}</p>
        </div>
      </main>
    </div>
  );
};

export default BreweryDetailPage;
