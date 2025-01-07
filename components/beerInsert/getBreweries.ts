import type { Brewery } from '@/types/types';
import { createClient } from '@/lib/utils/supabase/server';

export const getBreweries = async (): Promise<Brewery[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('breweries').select('*');
  if (error) {
    throw error;
  }
  return data as Brewery[];
};
