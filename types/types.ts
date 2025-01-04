import type { Database } from '@/types/supabase';

export type ProductWithBrewery =
  Database['public']['Tables']['products']['Row'] & {
    brewery: Database['public']['Tables']['breweries']['Row'] | null;
  };

export type OrderWithItems = Database['public']['Tables']['orders']['Row'] & {
  client: Database['public']['Tables']['clients']['Row'] | null;
  order_items: (Database['public']['Tables']['order_items']['Row'] & {
    product: ProductWithBrewery | null;
  })[];
};

export type Product = Database['public']['Tables']['products']['Row'];