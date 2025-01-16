'use server';

import { encodedRedirect } from '@/lib/utils/encodedRedirect';
import { createClient } from '@/lib/utils/supabase/server';

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    return encodedRedirect(
      'error',
      '/reset-password',
      '新しいパスワードを2回入力してください'
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      'error',
      '/reset-password',
      '入力内容が一致しません. ご確認ください'
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return encodedRedirect(
      'error',
      '/reset-password',
      'パスワードの再設定に失敗しました'
    );
  }

  return encodedRedirect('success', '/', 'パスワードを再設定しました');
};
