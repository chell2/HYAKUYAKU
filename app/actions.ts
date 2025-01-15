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
  const token_hash = formData.get('token_hash') as string;
  const email = formData.get('email') as string;

  console.log('Received token_hash:', token_hash);
  console.log('Received email:', email);

  if (!token_hash || !email) {
    console.error('Missing token_hash or email in the request.');
    return encodedRedirect(
      'error',
      '/reset-password',
      'トークンまたはメールアドレスが不足しています。',
      token_hash,
      email
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      'error',
      '/reset-password',
      'パスワードが一致しません。',
      token_hash,
      email
    );
  }

  // **トークンを検証してセッションを取得する**
  const { data: verifyData, error: verifyError } =
    await supabase.auth.verifyOtp({
      type: 'recovery',
      token: token_hash,
      email: email,
    });

  if (verifyError) {
    console.error('Failed to verify token:', verifyError.message);
    return encodedRedirect(
      'error',
      '/reset-password',
      `トークンの検証に失敗しました: ${verifyError.message}`,
      token_hash,
      email
    );
  }

  console.log('Token verified successfully:', verifyData);

  // **セッションを設定する**
  const { data: sessionData, error: sessionError } =
    await supabase.auth.setSession({
      access_token: verifyData?.session?.access_token || '',
      refresh_token: verifyData?.session?.refresh_token || '',
    });

  if (sessionError) {
    console.error('Failed to set session:', sessionError.message);
    return encodedRedirect(
      'error',
      '/reset-password',
      `セッションの設定に失敗しました: ${sessionError.message}`,
      token_hash,
      email
    );
  }

  console.log('Session set successfully:', sessionData);

  // **パスワードを更新する**
  const { error: updateError } = await supabase.auth.updateUser({
    password: password,
  });

  if (updateError) {
    console.error('Failed to update password:', updateError.message);
    return encodedRedirect(
      'error',
      '/reset-password',
      `パスワードの更新に失敗しました: ${updateError.message}`,
      token_hash,
      email
    );
  }

  console.log('Password updated successfully.');

  // **成功時のリダイレクト**
  return encodedRedirect('success', '/login', 'パスワードを更新しました');
};

// export const signOutAction = async () => {
//   const supabase = await createClient();
//   await supabase.auth.signOut();
//   return redirect('/sign-in');
// };
