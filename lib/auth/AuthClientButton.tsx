'use client';

import {
  createClientComponentClient,
  Session,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const AuthClientButton = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // redirectTo: `${location.origin}/auth/callback`,
        redirectTo: `${location.origin}/`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      {session ? (
        <button onClick={handleSignOut}>Logout</button>
      ) : (
        <button onClick={handleSignIn}>Sign in</button>
      )}
    </>
  );
};

export default AuthClientButton;
