'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const supabase = createClientComponentClient();

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.refresh();
    } catch (error) {
      console.error('ログアウトエラー:', error);
      // 必要に応じてエラー処理を追加
    }
  };

  return <button onClick={handleSignOut}>Log out</button>;
}
