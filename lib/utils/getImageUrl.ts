const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const basePath = `${supabaseUrl}/storage/v1/object/public/images/products`;

export const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) {
    return `${basePath}/placeholder.png`; // nullの場合はデフォルト画像
  }
  return `${basePath}/${imagePath}`;
};
