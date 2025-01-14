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
    return encodedRedirect('error', '/forgot-password', 'Email is required');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      'error',
      '/forgot-password',
      'Could not reset password'
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const access_token = formData.get('access_token') as string;

  if (!password || !confirmPassword) {
    return { type: 'error', message: '全ての項目を入力してください。' };
  }

  if (password !== confirmPassword) {
    encodedRedirect('error', '/reset-password', 'パスワードが一致しません。');
  }

  const { error: sessionError } = await supabase.auth.setSession({
    access_token,
    refresh_token: '',
  });

  if (sessionError) {
    encodedRedirect(
      'error',
      '/reset-password',
      'セッションの設定に失敗しました。'
    );
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: password,
  });

  if (updateError) {
    encodedRedirect(
      'error',
      '/reset-password',
      'パスワードの更新に失敗しました: ${updateError.message}'
    );
  }

  encodedRedirect('success', '/reset-password', 'パスワードを更新しました');
};

// export const signOutAction = async () => {
//   const supabase = await createClient();
//   await supabase.auth.signOut();
//   return redirect('/sign-in');
// };
