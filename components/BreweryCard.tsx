import Link from 'next/link';
import { Brewery } from '@/types/types';

interface Props {
  data: Brewery;
}

const BreweryCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="card bg-base-100 w-64 shadow-xl">
      <figure className="w-auto aspect-square">
        <img
          src={`/${data.id}.png`}
          alt={data.name || 'No Name'}
          onError={(
            e: React.SyntheticEvent<HTMLImageElement> & {
              currentTarget: HTMLImageElement;
            }
          ) => {
            console.error('Error loading image:', `/${data.id}.png`, e);
            e.currentTarget.src = '/noimage.png';
          }}
        />
      </figure>
      <div className="card-body prose">
        <h4 className="card-title">{data.name || 'No Name'}</h4>
        <p className="text-sm">{data.region || 'No Data'}</p>
        <div className="card-actions justify-end">
          <Link href={`/brewery/${data.id}`} key={data.id}>
            <button className="btn btn-primary">詳細を見る</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BreweryCard;
