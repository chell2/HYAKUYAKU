'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/utils/supabase/server';
import { Database } from '@/types/supabase';

type Brewery = Database['public']['Tables']['breweries']['Row'];

export async function updateBrewery(formData: Brewery) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('breweries')
    .update({
      name: formData.name,
      region: formData.region,
      description: formData.description,
      image_path: formData.image_path,
    })
    .eq('id', formData.id);

  if (error) {
    console.error('Error updating brewery:', error);
    return { error: error.message };
  }

  revalidatePath(`/brewery/${formData.id}`); // 指定したパスのキャッシュを再生成
  return { success: true };
}
