'use server';

import { encodedRedirect } from '@/lib/utils/encodedRedirect';
import { createClient } from '@/lib/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// export const signUpAction = async (formData: FormData) => {
//   const email = formData.get('email')?.toString();
//   const password = formData.get('password')?.toString();
//   const supabase = await createClient();
//   const origin = (await headers()).get('origin');

//   if (!email || !password) {
//     return encodedRedirect(
//       'error',
//       '/sign-up',
//       'Email and password are required'
//     );
//   }

//   const { error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: `${origin}/auth/callback`,
//     },
//   });

//   if (error) {
//     console.error(error.code + ' ' + error.message);
//     return encodedRedirect('error', '/sign-up', error.message);
//   } else {
//     return encodedRedirect(
//       'success',
//       '/sign-up',
//       'Thanks for signing up! Please check your email for a verification link.'
//     );
//   }
// };

// export const signInAction = async (formData: FormData) => {
//   const email = formData.get('email') as string;
//   const password = formData.get('password') as string;
//   const supabase = await createClient();

//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return encodedRedirect('error', '/sign-in', error.message);
//   }

//   return redirect('/protected');
// };

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();

  if (!email) {
    return encodedRedirect(
      'error',
      '/forgot-password',
      'メールアドレスを入力してください'
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      'error',
      '/forgot-password',
      'メールを送信できませんでした'
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'パスワード再設定用のメールを送信しました'
  );
};

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


// export const signOutAction = async () => {
//   const supabase = await createClient();
//   await supabase.auth.signOut();
//   return redirect('/sign-in');
// };
