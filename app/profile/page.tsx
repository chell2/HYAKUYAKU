import AccountForm from './account-form';
import { createClient } from '@/lib/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return redirect('/login');
  }

  return <AccountForm user={user} />;
}
