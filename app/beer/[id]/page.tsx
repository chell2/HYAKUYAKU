import {
  createServerComponentClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
import React from 'react';

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

const getBreweryData = async (
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

const BeerDetailPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const beer = await getDetailBeer(params.id, supabase);
  const formattedPrice = beer?.price
    ? new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
      }).format(beer.price)
    : null;
  const brewery =
    beer && beer.brewery_id
      ? await getBreweryData(beer.brewery_id, supabase)
      : null;
  return (
    <div className="grid gap-4 justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="w-full text-center mb-8 py-4">
          <div className="indicator">
            {beer?.status && (
              <span className="indicator-item badge badge-accent">
                {beer?.status}
              </span>
            )}
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-value text-primary px-10 py-4">
                  {beer?.name}
                </div>
                <div className="stat-title">
                  {formattedPrice && <p>{formattedPrice}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid justify-items-center">
          <img
            src={`/${beer?.id}.png`}
            alt=""
            className="aspect-square w-72 rounded-md object-cover"
          />
        </div>
        <article className="prose mt-8">
          <p>{beer?.description}</p>
          <div className="divider divider-start mt-12">【商品情報】</div>
          <ul className="list-none">
            <li>商品名： {beer?.name}</li>
            {beer?.price && <li>価格： {formattedPrice}</li>}
            <li>
              ブルワリー：{' '}
              <a href={`/brewery/${brewery?.id}`} className="link">
                {brewery?.name}
              </a>
            </li>
            <li>地域： {brewery?.region}</li>
            {beer?.fermentation !== null && beer?.fermentation !== '-' && (
              <li>
                発酵：
                {beer?.fermentation === 'top' && '上面発酵'}
                {beer?.fermentation === 'bottom' && '下面発酵'}
                {beer?.fermentation !== 'top' &&
                  beer?.fermentation !== 'bottom' &&
                  beer?.fermentation}
              </li>
            )}
            {beer?.abv !== null && beer?.abv !== '-' && (
              <li>ABV： {beer?.abv}%</li>
            )}
            {beer?.ibu !== null && <li>IBU： {beer?.ibu}</li>}
            {Array.isArray(beer?.hops) && beer?.hops.length > 0 && (
              <li>ホップ： {beer?.hops.join(', ')}</li>
            )}
            {Array.isArray(beer?.malts) && beer?.malts.length > 0 && (
              <li>モルト： {beer?.malts.join(', ')}</li>
            )}
            {Array.isArray(beer?.others) && beer?.others.length > 0 && (
              <li>その他： {beer?.others.join(', ')}</li>
            )}
            {beer?.volume !== null && (
              <li>
                内容量： {beer?.volume}ml {beer?.is_canned === true && '（缶）'}
                {beer?.is_canned === false && '（瓶）'}
              </li>
            )}
          </ul>
        </article>
      </main>
    </div>
  );
};

export default BeerDetailPage;
