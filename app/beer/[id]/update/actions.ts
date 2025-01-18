'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/utils/supabase/server';
import { Database } from '@/types/supabase';
import { getBreweriesData } from '@/lib/utils/getBreweriesData';

type Beer = Database['public']['Tables']['products']['Row'];

export async function updateBeer(formData: Partial<Beer>, id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('products')
    .update({
      ...formData,
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating beer:', error);
    return { error: error.message };
  }

  revalidatePath(`/beer/${id}`);
  return { success: true };
}

export async function getBreweries() {
  return getBreweriesData();
}