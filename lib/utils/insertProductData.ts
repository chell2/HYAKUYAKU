'use server';

import { createClient } from '@/lib/utils/supabase/server';

export async function insertProductData(formData: FormData) {
  const supabase = await createClient();

  const abv = formData.get('abv')?.toString();
  const brewery_id = formData.get('brewery_id')?.toString();
  const description = formData.get('description')?.toString();
  const fermentation = formData.get('fermentation')?.toString();
  const hops = formData.get('hops')?.toString();
  const ibu = formData.get('ibu')?.toString();
  const is_bottled = formData.get('is_bottled') ? true : false;
  const malts = formData.get('malts')?.toString();
  const name = formData.get('name')?.toString();
  const others = formData.get('others')?.toString();
  const price = formData.get('price')?.toString();
  const status = formData.get('status')?.toString();
  const stock = formData.get('stock')?.toString();
  const style = formData.get('style')?.toString();
  const volume = formData.get('volume')?.toString();
  const yeast = formData.get('yeast')?.toString();

  if (!name || !description) {
    throw new Error('Name and description are required.');
  }

  const { error } = await supabase.from('products').insert([
    {
      abv: abv || null,
      brewery_id: brewery_id,
      description: description || '',
      fermentation: fermentation || null,
      hops: hops ? hops.split(/、|,/).map((hop) => hop.trim()) : [],
      ibu: ibu ? parseInt(ibu) : null,
      is_bottled: is_bottled,
      malts: malts ? malts.split(/、|,/).map((malt) => malt.trim()) : [],
      name: name || '',
      others: others ? others.split(/、|,/).map((others) => others.trim()) : [],
      price: price ? parseInt(price) : null,
      status: status || '',
      stock: stock ? parseInt(stock) : null,
      style: style || null,
      volume: volume ? parseInt(volume) : null,
      yeast: yeast ? yeast.split(/、|,/).map((yeast) => yeast.trim()) : [],
    },
  ]);

  if (error) {
    console.error('Error inserting data:', error);
    console.error('Error details:', error.details);
    throw new Error(`データの挿入に失敗しました: ${error.message}`);
  }

  console.log('Data inserted successfully!');
}
