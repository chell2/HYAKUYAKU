'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/utils/supabase/server';
import { Database } from '@/types/supabase';

type Beer = Database['public']['Tables']['products']['Row'];

export async function updateBeer(formData: Beer) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('products')
    .update({
      name: formData.name,
      style: formData.style,
      description: formData.description,
    })
    .eq('id', formData.id);

  if (error) {
    console.error('Error updating beer:', error);
    return { error: error.message };
  }

  revalidatePath(`/beer/${formData.id}`);
  return { success: true };
}
