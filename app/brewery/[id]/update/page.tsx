import { createClient } from '@/lib/utils/supabase/server';
import { redirect } from 'next/navigation';
import UpdateBreweryForm from './update-brewery-form';

const supabase = createClient();

const getProfile = async (userId: string | undefined) => {
  if (!userId) return null;
  const { data: profile, error } = await (await supabase)
    .from('profile')
    .select('is_admin')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return profile;
};

export default async function UpdateBreweryPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    data: { session },
  } = await (await supabase).auth.getSession();
  const user = session?.user;

  const profile = await getProfile(user?.id);
  const isAdmin = profile?.is_admin || false;

  if (!isAdmin) {
    redirect(`/brewery/${params.id}`);
  }

  const { data: brewery } = await (await supabase)
    .from('breweries')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!brewery) {
    redirect('/breweries');
  }

  return (
    <div className="grid gap-4 min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">ブルワリー情報の更新</h1>
          <UpdateBreweryForm brewery={brewery} />
        </div>
      </main>
    </div>
  );
}
