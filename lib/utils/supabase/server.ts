import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
import error from 'next/error';

export async function createClient() {
  try {
    const cookieStore = await cookies();

    return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              console.error('Failed to set cookies:', error);
            }
          },
        },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to create browser client:', error.message);
      throw new Error(
        'Unable to initialize Supabase browser client: ' + error.message
      );
    }
    console.error('Unexpected error:', error);
    throw new Error('Unable to initialize Supabase browser client');
  }
}
