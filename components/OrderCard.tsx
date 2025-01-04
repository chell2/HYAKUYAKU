import Link from 'next/link';
import { formatDate } from '@/lib/utils/dateUtils';

interface Client {
  id: string | null;
  name: string | null;
  type: string | null;
}

interface Product {
  name: string | null;
  brewery: {
    name: string | null;
  } | null;
  id: string;
}

interface OrderItem {
  quantity: number | null;
  product: Product | null;
}

interface Data {
  id: string;
  client: Client | null;
  order_date: string | null;
  order_items: OrderItem[];
}

interface Props {
  data: Data;
}

const clientTypeMap: { [key: string]: string } = {
  hair_salon: '美容室',
  nail_salon: 'ネイルサロン',
  restaurant: '飲食店',
  liquor_store: '酒屋',
  realtor: '不動産会社',
};

const OrderCard: React.FC<Props> = ({ data }: Props) => {
  const imgSrc = data.client?.id ? `/${data.client.id}.png` : '/noimage.png';

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure className="w-80">
        <img
          src={imgSrc}
          alt={data.client?.name || 'No Name'}
          onError={() => {
            console.error('Error loading image:', imgSrc);
          }}
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title">
          受注日時：{formatDate(data.order_date ?? '')}
        </h3>
        <div className=" prose">
          <h2>{data.client?.name || 'No Name'}</h2>
          <p>({clientTypeMap[data.client?.type || 'unknown']})</p>
          {data.order_items.length > 0 ? (
            <ul>
              {data.order_items.map((item, index) => (
                <li key={index}>
                  {item.quantity} x {item.product?.name} (
                  {item.product?.brewery?.name})
                </li>
              ))}
            </ul>
          ) : (
            <p>注文がありません。</p>
          )}
        </div>
        <div className="card-actions justify-end">
          <Link href={`/order/${data.id}`} className="btn btn-primary">
            詳細を見る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
