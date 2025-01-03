'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Data {
  id: string | number;
  name: string | null;
  description: string | null;
  image?: string | null;
}

interface Props {
  data: Data;
}

const Card: React.FC<Props> = ({ data }) => {
  const pathname = usePathname();
  const [imgSrc, setImgSrc] = useState<string>(`/placeholder.png`);
  useEffect(() => {
    if (data.id) {
      setImgSrc(`/${data.id}.png`);
    }
  }, [data.id]);

  const getLinkHref = () => {
    if (pathname.includes('/brewery')) {
      return `/brewery/${data.id}`;
    } else if (pathname.includes('/beer')) {
      return `/beer/${data.id}`;
    }
    return `/${data.id}`;
  };

  return (
    <div className="card bg-base-100 w-64 shadow-xl">
      <figure className="w-auto">
        <img
          src={imgSrc}
          alt={data.name || 'No Name'}
          onError={() => setImgSrc('/placeholder.png')}
        />
      </figure>
      <div className="card-body prose">
        <h4 className="card-title">{data.name || 'No Name'}</h4>
        <p className="text-sm">
          {data.description || 'No description available'}
        </p>
        <div className="card-actions justify-end">
          <Link href={getLinkHref()} key={data.id}>
            <button className="btn btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
