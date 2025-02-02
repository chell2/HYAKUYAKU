import Link from 'next/link';
import { Product } from '@/types/types';

interface Props {
  data: Product;
}

const Card: React.FC<Props> = ({ data }) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const bucketName = 'images';
  const getImageUrl = (imagePath: string | null) => {
    return imagePath
      ? `${supabaseUrl}/storage/v1/object/public/${bucketName}/${imagePath}`
      : `${supabaseUrl}/storage/v1/object/public/${bucketName}/products/placeholder.png`;
  };
  console.log(getImageUrl(data.image_path));

  return (
    <div className="card bg-base-100 w-64 shadow-xl">
      <figure className="w-auto aspect-square">
        {data.image_path && (
          <img
            src={getImageUrl(data.image_path)}
            alt={data.name || 'No Name'}
          />
        )}
        {/* <img
          src={`/${data.id}.png`}
          alt={data.name || 'No Name'}
          onError={(
            e: React.SyntheticEvent<HTMLImageElement> & {
              currentTarget: HTMLImageElement;
            }
          ) => {
            console.error('Error loading image:', `/${data.id}.png`, e);
            e.currentTarget.src = '/placeholder.png';
          }}
        /> */}
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
