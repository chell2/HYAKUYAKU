import Link from 'next/link';
import { Product } from '@/types/types';

interface Props {
  data: Product;
}

const Card: React.FC<Props> = ({ data }) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const basePath = `${supabaseUrl}/storage/v1/object/public/images/products`;

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) {
      return `${basePath}/placeholder.png`; // 画像がない場合はデフォルト画像
    }
    return `${basePath}/${imagePath}`;
  };

  return (
    <div className="card bg-base-100 w-64 shadow-xl">
      <figure className="w-auto aspect-square">
        <img src={getImageUrl(data.image_path)} alt={data.name || 'No Name'} />
      </figure>
      <div className="card-body">
        {data?.status !== null && (
          <div className="badge badge-accent text-xs">{data?.status}</div>
        )}
        {data?.status === null && <div className="mt-3"></div>}
        <p className="card-title">{data.name || 'No Name'}</p>
        <p>
          {data?.style !== null && <span>{data?.style} / </span>}
          {data?.abv !== null && <span>{data?.abv}%</span>}
        </p>
        <div className="card-actions justify-end">
          <Link href={`/beer/${data.id}`} key={data.id}>
            <button className="btn btn-primary">詳細を見る</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
