import { createClient } from '@/lib/utils/supabase/server';
import { getProfile } from '@/lib/utils/getProfile';
import { redirect } from 'next/navigation';
import UpdateBeerForm from './update-beer-form';
import { getBreweries } from './actions';

const supabase = createClient();

export default async function UpdateBeerPage({
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
    redirect(`/beer/${params.id}`);
  }

  const { data: beer } = await (await supabase)
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!beer) {
    redirect('/beer');
  }

  const breweries = await getBreweries();

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
