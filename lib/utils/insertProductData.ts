'use server';

import { createClient } from '@/lib/utils/supabase/server';

export async function insertProductData(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const abv = formData.get('abv')?.toString();
  const ibu = formData.get('ibu')?.toString();
  const volume = formData.get('volume')?.toString();
  const style = formData.get('style')?.toString();
  const fermentation = formData.get('fermentation')?.toString();
  const hops = formData.get('hops')?.toString();
  const malts = formData.get('malts')?.toString();
  const brewery_id = formData.get('brewery_id')?.toString();

  if (!name || !description) {
    throw new Error('Name and description are required.');
  }

  const { error } = await supabase.from('products').insert([
    {
      name: name || '',
      description: description || '',
      abv: abv || null,
      ibu: ibu ? parseInt(ibu) : null,
      volume: volume ? parseInt(volume) : null,
      style: style || null,
      fermentation: fermentation || null,
      hops: hops ? hops.split(',') : [],
      malts: malts ? malts.split(',') : [],
      brewery_id: brewery_id || null,
    },
  ]);

  if (error) {
    console.error('Error inserting data:', error);
    console.error('Error details:', error.details);
    throw new Error(`データの挿入に失敗しました: ${error.message}`);
  }

  console.log('Data inserted successfully!');
}
