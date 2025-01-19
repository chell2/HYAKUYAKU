'use client';

import { Product, Brewery } from '@/types/types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/utils/supabase/client';
import UpdateBeerForm from './update-beer-form';
import Loading from '@/app/loading';

const supabase = createClient();

export default function UpdateBeerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [beer, setBeer] = useState<Product | null>(null);
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ユーザー情報と管理者権限を確認
  useEffect(() => {
    const checkUserAndPermissions = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const user = session?.user;

        if (!user) {
          router.push('/login');
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profile')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (profileError || !profile?.is_admin) {
          router.push(`/beer/${params.id}`);
          return;
        }

        setIsAdmin(true);
      } catch (err) {
        console.error('Error checking permissions:', err);
        setError('権限の確認に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    checkUserAndPermissions();
  }, [params.id, router]);

  // 商品情報とブルワリー情報を取得
  useEffect(() => {
    const fetchBeerAndBreweries = async () => {
      try {
        const { data: beerData, error: beerError } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single();

        if (beerError || !beerData) {
          router.push('/beer');
          return;
        }

        const { data: breweriesData, error: breweriesError } = await supabase
          .from('breweries')
          .select('*');

        if (breweriesError) {
          throw new Error('ブルワリー情報の取得に失敗しました。');
        }

        setBeer(beerData as Product);
        setBreweries(breweriesData as Brewery[]);
      } catch (err) {
        console.error('Error fetching beer or breweries:', err);
        setError('データの取得に失敗しました。');
      }
    };

    if (isAdmin) {
      fetchBeerAndBreweries();
    }
  }, [isAdmin, params.id, router]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!beer || breweries.length === 0) {
    return <p>データが見つかりませんでした。</p>;
  }

  return (
    <div className="grid gap-4 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">商品情報の更新</h1>
          <UpdateBeerForm beer={beer} breweries={breweries} />
        </div>
      </main>
    </div>
  );
}
