'use client';

import Image from 'next/image';
import { Product, Brewery } from '@/types/types';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/utils/supabase/client';
import UpdateDeleteButtons from '@/components/BeerUpdateDeleteButtons';
import Loading from '@/app/loading';

const supabase = createClient();

export default function BeerDetailPage({ params }: { params: { id: string } }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [beer, setBeer] = useState<Product | null>(null);
  const [breweryData, setBreweryData] = useState<Brewery | null>(null);
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
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .is('deleted_at', null)
          .eq('id', params.id)
          .single();

        if (error) {
          throw new Error(`Failed to fetch products: ${error.message}`);
        }

        setBeer(data as Product);
      } catch (err: unknown) {
        console.error('Error fetching products:', err);
        setError('商品情報の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params.id]);
  useEffect(() => {
    if (beer?.brewery_id) {
      const fetchBreweryData = async () => {
        try {
          const { data: brewery, error } = await supabase
            .from('breweries')
            .select('*')
            .eq('id', beer.brewery_id || '')
            .single();

          if (error) {
            throw new Error(`Failed to fetch brewery: ${error.message}`);
          }

          setBreweryData(brewery as Brewery);
        } catch (err: unknown) {
          console.error('Error fetching brewery:', err);
          setError('ブルワリー情報の取得に失敗しました。');
        }
      };

      fetchBreweryData();
    }
  }, [beer?.brewery_id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>エラーが発生しました: {error}</p>;
  }

  const formattedPrice = beer?.price
    ? new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
      }).format(beer.price)
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
          <Image
            src={`/${beer?.id}.png`}
            alt={`${beer?.name}` || 'No Name'}
            width={250}
            height={250}
            style={{ borderRadius: '10px' }}
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
              <a href={`/brewery/${breweryData?.id}`} className="link">
                {breweryData?.name}
              </a>
            </li>
            <li>地域： {breweryData?.region}</li>
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
            {beer?.style && <li>スタイル： {beer?.style}</li>}
            {beer?.abv !== null && beer?.abv !== '-' && (
              <li>ABV： {beer?.abv}%</li>
            )}
            {beer?.ibu !== null && <li>IBU： {beer?.ibu}</li>}
            {beer?.hops !== null &&
              Array.isArray(beer?.hops) &&
              beer?.hops.length > 0 && (
                <li>ホップ： {beer?.hops.join(', ')}</li>
              )}
            {beer?.malts !== null &&
              Array.isArray(beer?.malts) &&
              beer?.malts.length > 0 && (
                <li>モルト： {beer?.malts.join(', ')}</li>
              )}
            {beer?.others !== null &&
              Array.isArray(beer?.others) &&
              beer?.others.length > 0 && (
                <li>その他： {beer?.others.join(', ')}</li>
              )}
            {beer?.volume !== null && (
              <li>
                内容量： {beer?.volume}ml{' '}
                {beer?.is_bottled === false && '（缶）'}
                {beer?.is_bottled === true && '（瓶）'}
              </li>
            )}
          </ul>
        </article>
      </main>
      {isLoggedIn && (
        <div className="mt-4 w-full flex justify-end">
          <UpdateDeleteButtons beerId={params.id} />
        </div>
      )}
      {/* {isAdmin && (
        <div className="mt-4 w-full flex justify-end">
          <UpdateDeleteButtons beerId={params.id} />
        </div>
      )} */}
    </div>
  );
}
