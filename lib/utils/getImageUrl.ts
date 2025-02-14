const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export const getImageUrl = (
  imagePath: string | null,
  folder: string = 'products'
) => {
  // folderのデフォルト値はproducts、その他は引数で指定
  const basePath = `${supabaseUrl}/storage/v1/object/public/images/${folder}`;
  if (!imagePath) {
    return `${basePath}/placeholder.png`; // nullの場合
  }
  return `${basePath}/${imagePath}`;
};
