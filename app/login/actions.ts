'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/utils/supabase/server';
import { encodedRedirect } from '@/lib/utils/encodedRedirect';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error.message);
    return encodedRedirect('error', '/login', 'ログインに失敗しました');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error(error.message);
    return encodedRedirect('error', '/login', 'ログインに失敗しました');
  }

  revalidatePath('/', 'layout');
  redirect('/confirm');
}
