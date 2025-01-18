'use client';

import { Brewery } from '@/types/types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/utils/supabase/client';
import UpdateBreweryForm from './update-brewery-form';
import Loading from '@/app/loading';

const supabase = createClient();

export default function UpdateBreweryPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [brewery, setBrewery] = useState<Brewery | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ユーザー情報とブルワリー情報の取得
  useEffect(() => {
    const fetchData = async () => {
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
          router.push(`/brewery/${params.id}`);
          return;
        }

        setIsAdmin(true);

        const { data: breweryData, error: breweryError } = await supabase
          .from('breweries')
          .select('*')
          .eq('id', params.id)
          .single();

        if (breweryError || !breweryData) {
          router.push('/breweries');
          return;
        }

        setBrewery(breweryData as Brewery);
      } catch (err) {
        console.error('Error:', err);
        setError('データの取得中にエラーが発生しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  useEffect(() => {
    if (isAdmin) {
      console.log(
        `管理者がブルワリー ${params.id} の編集ページにアクセスしました。`
      );
    }
  }, [isAdmin, params.id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid gap-4 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">ブルワリー情報の更新</h1>
          {brewery && <UpdateBreweryForm brewery={brewery} />}
        </div>
      </main>
    </div>
  );
}
