import { createClient } from '@/lib/utils/supabase/client';
import React from 'react';
import UpdateDeleteButtons from '@/components/UpdateDeleteButtons';

const supabase = createClient();

const getDetailBrewery = async (id: string) => {
  const { data: brewery } = await (await supabase)
    .from('breweries')
    .select('*')
    .eq('id', id)
    .single();
  return brewery;
};

// const getProfile = async (userId: string | undefined) => {
//   if (!userId) return null;
//   const { data: profile, error } = await (await supabase)
//     .from('profile')
//     .select('is_admin')
//     .eq('id', userId)
//     .single();

//   if (error) {
//     console.error('Error fetching profile:', error);
//     return null;
//   }

//   return profile;
// };

const BreweryDetailPage = async ({ params }: { params: { id: string } }) => {
  // const {
  //   data: { session },
  // } = await (await supabase).auth.getSession();
  // const user = session?.user;
  // const profile = await getProfile(user?.id);
  // const isAdmin = profile?.is_admin || false;

  const brewery = await getDetailBrewery(params.id);

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
      <div className="mt-4 w-full flex justify-end">
        <UpdateDeleteButtons breweryId={params.id} />
      </div>
      {/* {isAdmin && (
        <div className="mt-4 w-full flex justify-end">
          <UpdateDeleteButtons breweryId={params.id} />
        </div>
      )} */}
    </div>
  );
};

export default BreweryDetailPage;
