import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export const createClient = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase URL or anon key not set in environment variables.'
    );
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};
