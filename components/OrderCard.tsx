import Link from 'next/link';
import { formatDate } from '@/lib/utils/dateUtils';
import { clientTypeMap, OrderWithItems } from '@/types/types';

interface Props {
  data: OrderWithItems;
}

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
