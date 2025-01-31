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
            <div className="stat-title">平均注文額</div>
            <div className="stat-value">¥{ordersData.averageOrderValue}</div>
            <div className="stat-desc">{ordersData.orderPeriod}</div>
          </div>
        </div>

        {/* 在庫関連 */}
        <div className="stats shadow w-full">
          <div className="stat">
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
                          ? 'badge-success'
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