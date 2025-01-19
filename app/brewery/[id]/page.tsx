'use client';

import Image from 'next/image';
import { Brewery } from '@/types/types';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/utils/supabase/client';
import UpdateDeleteButtons from '@/components/UpdateDeleteButtons';
import Loading from '@/app/loading';

const supabase = createClient();

export default function BreweryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [brewery, setBrewery] = useState<Brewery | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // 管理者権限を確認
          const { data: profile, error: profileError } = await supabase
            .from('profile')
            .select('is_admin')
            .eq('id', user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
          } else {
            setIsAdmin(!!profile?.is_admin);
          }
        }
      } catch (err) {
        console.error('Error checking user:', err);
        setError('ユーザー情報の確認に失敗しました。');
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    const fetchBreweryData = async () => {
      try {
        const { data, error } = await supabase
          .from('breweries')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) {
          throw new Error(`Failed to fetch products: ${error.message}`);
        }
        setBrewery(data as Brewery);
      } catch (err: unknown) {
        console.error('Error fetching breweries:', err);
        setError('ブルワリー情報の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchBreweryData();
  }, [params.id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>エラーが発生しました: {error}</p>;
  }

  return (
    <div className="grid gap-4 justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="w-full text-center mb-8 py-4">
          <div className="stats shadow">
            <div className="stat">
              <Image
                src={`/${brewery?.id}.png`}
                alt={brewery?.name || 'No Name'}
                width={160}
                height={160}
                style={{ borderRadius: '10px' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/noimage.png';
                }}
              />
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
      {isAdmin && (
        <div className="mt-4 w-full flex justify-end">
          <UpdateDeleteButtons breweryId={params.id} />
        </div>
      )}
    </div>
  );
}
