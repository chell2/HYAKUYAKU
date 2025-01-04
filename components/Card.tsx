import Link from 'next/link';
import { Product } from '@/types/types';

interface Props {
  data: Product;
}

const Card: React.FC<Props> = ({ data }) => {
  return (
    <div className="card bg-base-100 w-64 shadow-xl">
      <figure className="w-auto">
        <img
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
        />
      </figure>
      <div className="card-body prose">
        <h4 className="card-title">{data.name || 'No Name'}</h4>
        <p className="text-sm">
          {data.description || 'No description available'}
        </p>
        <div className="card-actions justify-end">
          <Link href={`/beer/${data.id}`} key={data.id}>
            <button className="btn btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
