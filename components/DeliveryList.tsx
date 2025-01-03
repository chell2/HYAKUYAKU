// 納品リストの表示

// 'use client';

// import { useEffect, useState } from 'react';
// import { ProductWithBrewery, DeliveryWithItems } from '@/types/types';

// const clientTypeMap: { [key: string]: string } = {
//   hair_salon: '美容室',
//   nail_salon: 'ネイルサロン',
//   restaurant: '飲食店',
//   liquor_store: '地域商店',
//   realtor: '不動産会社',
// };

// const DeliveryList = () => {
//   const [orders, setDeliveries] = useState<DeliveryWithItems[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [descriptions, setDescriptions] = useState<{
//     [productId: string]: string;
//   }>({});

//   useEffect(() => {
//     const fetchDeliveries = async () => {
//       try {
//         const response = await fetch('/api/deliveries');
//         if (!response.ok) {
//           throw new Error(`Failed to fetch deliveries: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setDeliveries(data);
//       } catch (e: any) {
//         setError(e.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDeliveries();
//   }, []);

//   const generateDescription = async (
//     product: ProductWithBrewery,
//     clientType: string
//   ) => {
//     if (descriptions[product.id]) {
//       return; // Already generated
//     }
//     try {
//       const response = await fetch('/api/generate-description', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ product, clientType }),
//       });
//       if (!response.ok) {
//         throw new Error(
//           `Failed to generate description: ${response.statusText}`
//         );
//       }
//       const data = await response.json();
//       setDescriptions((prev) => ({ ...prev, [product.id]: data.description }));
//     } catch (e: any) {
//       console.error(e);
//       // エラーハンドリング: エラーメッセージをユーザーに表示するなど
//     }
//   };

//   if (loading) {
//     return <p>Loading deliveries...</p>;
//   }

//   if (error) {
//     return <p>Error loading deliveries: {error}</p>;
//   }
//   return (
//     <div>
//       <h1>納品リスト</h1>
//       {orders.map((order) => (
//         <div key={order.id}>
//           <h2>
//             {order.client?.name} 様 (
//             {clientTypeMap[order.client?.type || 'unknown']}) -{' '}
//             {order.order_date
//               ? new Date(order.order_date).toLocaleDateString()
//               : ''}
//           </h2>
//           <ul>
//             {order.order_items.map((item) => (
//               <li key={item.id}>
//                 {item.product?.name} x {item.quantity}
//                 <button
//                   onClick={() =>
//                     generateDescription(
//                       item.product as ProductWithBrewery,
//                       order.client?.type || 'unknown'
//                     )
//                   }
//                 >
//                   説明文を表示
//                 </button>
//                 {descriptions[item.product?.id || ''] && (
//                   <p>{descriptions[item.product?.id || '']}</p>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DeliveryList;
