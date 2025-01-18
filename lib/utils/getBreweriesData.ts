import type { Brewery } from '@/types/types';
import { createClient } from '@/lib/utils/supabase/server';

export const getBreweriesData = async (): Promise<Brewery[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('breweries')
    .select('*')
    .is('deleted_at', null);
  if (error) {
    throw error;
  }
  return data as Brewery[];
};
