'use client';
import { createClient } from '@/lib/utils/supabase/client';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const [hasError, setHasError] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const supabase = createClient();

  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルトの送信動作を防止
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    if (!email) {
      setHasError(true);
      return;
    }

    try {
      const res = await supabase.auth.resetPasswordForEmail(email!, {
        redirectTo: `${location.origin}/update-password`,
      });
      if (res.error) {
        throw res.error;
      }
      setIsSent(true);
    } catch (error) {
      console.error(error);
      setHasError(true);
      return;
    }
    setIsSent(true);
  };

  return (
    <form
      onSubmit={resetPassword}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
        padding: '32px',
      }}
    >
      <div>パスワード変更</div>
      <input type="email" placeholder="email" name="email" />
      <button type="submit">パスワード変更</button>
      {hasError && <div>エラーが発生しました。</div>}
      {isSent && <div>メールを送信しました。</div>}
    </form>
  );
}
