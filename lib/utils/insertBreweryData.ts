'use server';

import { createClient } from '@/lib/utils/supabase/server';

export async function insertBreweryData(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get('name')?.toString() ?? '';
  const description = formData.get('description')?.toString() ?? '';
  const region = formData.get('region')?.toString() ?? '';
  const image_path = formData.get('image_path')?.toString() ?? null;

  if (!name || !region) {
    throw new Error('名前と地域を入力してください');
  }

  const { error } = await supabase.from('breweries').insert([
    {
      name,
      description,
      region,
      image_path: image_path || null,
    },
  ]);

  if (error) {
    console.error('Error inserting data:', error);
    console.error('Error details:', error.details);
    throw new Error(`データの挿入に失敗しました: ${error.message}`);
  }

  console.log('Data inserted successfully!');
}
