import type { Database } from '@/types/supabase';

export type Client = Database['public']['Tables']['clients']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type Brewery = Database['public']['Tables']['breweries']['Row'];

export type ProductWithBrewery = Product & {
  brewery: Brewery | null;
};

export type OrderItem = Database['public']['Tables']['order_items']['Row'] & {
  product: ProductWithBrewery | null;
};

export type OrderWithItems = Database['public']['Tables']['orders']['Row'] & {
  client: Client | null;
  order_items: OrderItem[];
};

export const clientTypeMap: { [key: string]: string } = {
  hair_salon: '美容室',
  nail_salon: 'ネイルサロン',
  restaurant: '飲食店',
  liquor_store: '酒屋',
  realtor: '不動産会社',
};

export type ProductFormData = {
  name: string;
  description: string;
  abv: string | null;
  ibu: number | null;
  volume: number | null;
  style: string | null;
  fermentation: string | null;
  hops: string | null;
  malts: string | null;
  brewery_id: string;
};

export type BreweryFormData = {
  name: string;
  region: string;
  description: string;
};