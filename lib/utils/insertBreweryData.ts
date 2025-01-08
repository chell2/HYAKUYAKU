'use server';

import { createClient } from '@/lib/utils/supabase/server';

export async function insertBreweryData(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const region = formData.get('region')?.toString();

  if (!name || !description || !region) {
    throw new Error('Name and description are required.');
  }

  const { error } = await supabase.from('breweries').insert([
    {
      name: name || '',
      description: description || '',
      region: region || '',
    },
  ]);

  if (error) {
    console.error('Error inserting data:', error);
    console.error('Error details:', error.details);
    throw new Error(`データの挿入に失敗しました: ${error.message}`);
  }

  console.log('Data inserted successfully!');
}
