import { ArrowDownToLine, ArrowUpToLine, BarChart3, Package, ShoppingCart } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DataTable, PageHeader } from '../../components/DataTable';
import { currency, dailyVolume, orders } from '../../data/flowstockData';

const categoryData = [
  { name: '전자제품', value: 55, color: '#0891b2' },
  { name: '액세서리', value: 25, color: '#6366f1' },
  { name: '소모품', value: 12, color: '#f59e0b' },
  { name: '기타', value: 8, color: '#94a3b8' },
];

const topProducts = [
  { name: 'MacBook Pro 14 M3', sales: 124, revenue: 245000000, score: 92 },
  { name: 'iPhone 15 Pro', sales: 98, revenue: 180000000, score: 86 },
  { name: 'iPad Pro 11', sales: 75, revenue: 95000000, score: 78 },
  { name: 'AirPods Pro 2', sales: 240, revenue: 72000000, score: 71 },
];

const columns = [
  { key: 'name', label: '상품명', render: (row) => <span className="font-semibold text-slate-900">{row.name}</span> },
  { key: 'sales', label: '판매수량', align: 'right', render: (row) => `${row.sales.toLocaleString()} EA` },
  { key: 'revenue', label: '매출', align: 'right', render: (row) => <span className="font-semibold text-cyan-700">{currency(row.revenue)}</span> },
  {
    key: 'score',
    label: '성과지표',
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-cyan-600" style={{ width: `${row.score}%` }} />
        </div>
        <span className="text-xs font-semibold text-slate-500">{row.score}</span>
      </div>
    ),
  },
];

export default function OperationStats() {
  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
  const stats = [
    { label: '이번달 주문금액', value: currency(totalAmount), icon: ShoppingCart, tone: 'bg-indigo-50 text-indigo-700' },
    { label: '입고 수량', value: '2,104 EA', icon: ArrowDownToLine, tone: 'bg-emerald-50 text-emerald-700' },
    { label: '출고 수량', value: '3,039 EA', icon: ArrowUpToLine, tone: 'bg-orange-50 text-orange-700' },
    { label: '주문 건수', value: `${totalOrders}건`, icon: Package, tone: 'bg-cyan-50 text-cyan-700' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="운영 통계" description="일별 입고, 주문, 출고 집계와 상품별 성과를 조회합니다." actionLabel="보고서 추출" icon={BarChart3} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-md ${stat.tone}`}>
              <stat.icon size={20} />
            </div>
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-1 text-xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h3 className="mb-5 font-bold text-slate-900">일별 입출고 물동량</h3>
          <div className="h-[330px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyVolume}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Bar dataKey="inbound" name="입고" fill="#0891b2" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outbound" name="출고" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-5 font-bold text-slate-900">카테고리별 재고 점유율</h3>
          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" innerRadius={56} outerRadius={82} paddingAngle={4}>
                  {categoryData.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <DataTable columns={columns} rows={topProducts} />
    </div>
  );
}
