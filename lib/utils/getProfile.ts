import { createClient } from '@/lib/utils/supabase/server';

const supabase = createClient();

export const getProfile = async (userId: string | undefined) => {
  if (!userId) return null;
  const { data: profile, error } = await (await supabase)
    .from('profile')
    .select('is_admin')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return profile;
};
