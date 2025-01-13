'use client';
import { createClient } from '@/lib/utils/supabase/client';
import { redirect, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function UpdatePasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get('token_hash');
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('パスワードが一致しません。');
      return;
    }

    if (!token) {
      setError('無効なトークンです。');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser(
        { password: newPassword },
        { token: token }
      );
      if (error) {
        throw error;
      }
      setMessage('パスワードが更新されました。');
      await supabase.auth.signOut();
      redirect('/login');
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('予期しないエラーが発生しました。');
        }
      }
  };

  return (
    <form
      onSubmit={handleSubmit} // onSubmit ハンドラを使用
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
        padding: '32px',
      }}
    >
      <div>パスワード変更</div>
      <input
        type="password"
        name="newPassword"
        placeholder="新しいパスワード"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="新しいパスワード（確認用）"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit">変更する</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {message && <div style={{ color: 'green' }}>{message}</div>}
    </form>
  );
}
