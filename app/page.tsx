import { redirect } from 'next/navigation';

import { createClient } from '@/lib/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  // 仮のサンプルデータ (Supabase から取得するように変更する)
  const salesData = {
    totalRevenue: 256800,
    revenueChange: 15, // 前月比増加率 (%)
    revenuePeriod: '2024年2月',
    bestSellingProduct: 'GREEN GERATO / UCHU',
    bestSellingProductRevenue: 56000,
  };

  const ordersData = {
    totalOrders: 68,
    pendingOrders: 5,
    newOrders: 12,
    canceled: 2,
    orderChange: -5, //減少率
    orderPeriod: '2024年2月',
    averageOrderValue: 3776, // 平均注文額
  };

  const customerData = {
    totalCustomers: 48,
    newCustomers: 8,
    activeCustomers: 25,
    customerChange: 5,
    customerPeriod: '2024年2月',
  };

  const productData = {
    lowStock: 3,
    outOfStock: 1,
    period: '2024年2月',
  };

  const recentOrders = [
    {
      id: '1',
      date: '2024-03-03',
      customer: 'hair salon Leaf',
      amount: 42800,
      status: '処理中',
    },
    {
      id: '2',
      date: '2024-03-02',
      customer: '福岡商店',
      amount: 64000,
      status: '完了',
    },
    {
      id: '3',
      date: '2024-03-01',
      customer: 'hair salon Leaf',
      amount: 32000,
      status: '完了',
    },
    {
      id: '4',
      date: '2024-02-28',
      customer: 'FLOWER Nail',
      amount: 25600,
      status: '完了',
    },
    {
      id: '5',
      date: '2024-02-28',
      customer: '小料理さくら',
      amount: 56000,
      status: '完了',
    },
  ];

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="prose text-center max-w-full">
        <h1>Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {/* 売上関連 */}
        <div className="stats shadow w-full">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">総売上</div>
            <div className="stat-value">¥{salesData.totalRevenue}</div>
            <div
              className={`stat-desc ${
                salesData.revenueChange > 0 ? 'text-success' : 'text-error'
              }`}
            >
              {salesData.revenueChange > 0 ? '↑' : '↓'}
              {salesData.revenueChange}% ({salesData.revenuePeriod})
            </div>
            <div className="stat-desc">
              売上トップ: {salesData.bestSellingProduct} (¥
              {salesData.bestSellingProductRevenue})
            </div>
          </div>
        </div>

        {/* 注文関連 */}
        <div className="stats shadow w-full">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <div className="stat-title">注文数</div>
            <div className="stat-value">{ordersData.totalOrders}</div>
            <div className="stat-desc">
              新規: {ordersData.newOrders} / 未処理: {ordersData.pendingOrders}{' '}
              / キャンセル:{ordersData.canceled}
            </div>
            <div
              className={`stat-desc ${
                ordersData.orderChange > 0 ? 'text-success' : 'text-error'
              }`}
            >
              {ordersData.orderChange > 0 ? '↑' : '↓'}
              {ordersData.orderChange}% ({ordersData.orderPeriod})
            </div>
          </div>
        </div>

        {/* 顧客関連 */}
        <div className="stats shadow w-full">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <div className="stat-title">顧客数</div>
            <div className="stat-value">{customerData.totalCustomers}</div>
            <div className="stat-desc">
              新規: {customerData.newCustomers} / アクティブ:
              {customerData.activeCustomers}
            </div>
            <div
              className={`stat-desc ${
                customerData.customerChange > 0 ? 'text-success' : 'text-error'
              }`}
            >
              {customerData.customerChange > 0 ? '↑' : '↓'}
              {customerData.customerChange}% ({customerData.customerPeriod})
            </div>
          </div>
        </div>

        {/* 平均注文額 */}
        <div className="stats shadow w-full">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>
            </div>
            <div className="stat-title">平均注文額</div>
            <div className="stat-value">¥{ordersData.averageOrderValue}</div>
            <div className="stat-desc">{ordersData.orderPeriod}</div>
          </div>
        </div>

        {/* 在庫関連 */}
        <div className="stats shadow w-full">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <div className="stat-title">在庫状況</div>
            <div className="stat-value">
              <span className="text-base">在庫僅少:</span>{' '}
              <span className="font-bold">{productData.lowStock}</span>
              <span className="text-base ml-3">在庫切れ:</span>{' '}
              <span className="font-bold">{productData.outOfStock}</span>
            </div>
            <div className="stat-desc">{productData.period}</div>
          </div>
        </div>
      </div>

      {/* 最近の注文 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">最近の注文</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>注文日時</th>
                <th>顧客名</th>
                <th>金額</th>
                <th>ステータス</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.customer}</td>
                  <td>¥{order.amount}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === '処理中'
                          ? 'badge-warning'
                          : order.status === '完了'
                          ? 'badge-primary'
                          : 'badge-error'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}