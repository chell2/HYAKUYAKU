import { redirect } from 'next/navigation';

import { createClient } from '@/lib/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="prose">
        <h1>Dashboard</h1>
        <p> Hello {data.user.email}</p>
      </div>
    </div>
  );
}
