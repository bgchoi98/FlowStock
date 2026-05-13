import { AlertTriangle, ArrowDownCircle, ArrowUpCircle, Box, Clock, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DataTable, StatusBadge } from '../components/DataTable';
import { currency, dailyVolume, inventoryHistories, inventories, orders } from '../data/flowstockData';

const inventoryDistribution = [
  { name: '가용재고', value: 1239, color: '#0891b2' },
  { name: '예약재고', value: 523, color: '#f59e0b' },
  { name: '저재고', value: 2, color: '#e11d48' },
];

const cards = [
  { label: '등록 상품', value: '1,280', icon: Package, tone: 'bg-cyan-50 text-cyan-700' },
  { label: '오늘 입고', value: '349 EA', icon: ArrowDownCircle, tone: 'bg-emerald-50 text-emerald-700' },
  { label: '오늘 주문', value: '45건', icon: ShoppingCart, tone: 'bg-indigo-50 text-indigo-700' },
  { label: '오늘 출고', value: '430 EA', icon: ArrowUpCircle, tone: 'bg-orange-50 text-orange-700' },
  { label: '저재고', value: '2건', icon: AlertTriangle, tone: 'bg-rose-50 text-rose-700' },
];

const historyColumns = [
  { key: 'type', label: '구분', render: (row) => <StatusBadge value={row.type} /> },
  { key: 'product', label: '상품', render: (row) => <span className="font-semibold text-slate-900">{row.product}</span> },
  { key: 'change', label: '변경수량', align: 'right', render: (row) => <span className={row.change > 0 ? 'font-bold text-emerald-600' : 'font-bold text-rose-600'}>{row.change > 0 ? `+${row.change}` : row.change}</span> },
  { key: 'ref', label: '참조번호' },
  { key: 'at', label: '처리일시' },
];

export default function Dashboard() {
  const inventoryValue = inventories.reduce((sum, item) => sum + item.onHand * 120000, 0);
  const orderAmount = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">FlowStock 대시보드</h2>
          <p className="mt-1 text-sm text-slate-500">입고, 재고 예약, 출고, 재고 이력을 한 화면에서 확인합니다.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm md:flex">
          <div className="rounded-md border border-slate-200 bg-white px-4 py-2">
            <span className="text-slate-500">주문금액 </span>
            <strong className="text-slate-900">{currency(orderAmount)}</strong>
          </div>
          <div className="rounded-md border border-slate-200 bg-white px-4 py-2">
            <span className="text-slate-500">재고평가 </span>
            <strong className="text-slate-900">{currency(inventoryValue)}</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <div key={card.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-md ${card.tone}`}>
              <card.icon size={20} />
            </div>
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-bold text-slate-900">
              <TrendingUp size={18} className="text-cyan-600" />
              최근 7일 입출고 추이
            </h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyVolume}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="inbound" name="입고" stroke="#0891b2" fill="#cffafe" strokeWidth={2} />
                <Area type="monotone" dataKey="outbound" name="출고" stroke="#f97316" fill="#ffedd5" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-5 flex items-center gap-2 font-bold text-slate-900">
            <Box size={18} className="text-cyan-600" />
            재고 구성
          </h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={inventoryDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={58} outerRadius={82} paddingAngle={4}>
                  {inventoryDistribution.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {inventoryDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <strong>{item.value.toLocaleString()} EA</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="xl:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <Clock size={18} className="text-cyan-600" />
            <h3 className="font-bold text-slate-900">최근 재고 이력</h3>
          </div>
          <DataTable columns={historyColumns} rows={inventoryHistories.slice(0, 4)} />
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 font-bold text-slate-900">MVP 업무 흐름</h3>
          {['기준정보 등록', '입고 완료 및 재고 증가', '주문 등록 및 재고 예약', '출고 완료 및 재고 차감', '재고 이력 저장'].map((item, index) => (
            <div key={item} className="flex gap-3 pb-4 last:pb-0">
              <div className="flex flex-col items-center">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-600 text-xs font-bold text-white">{index + 1}</span>
                {index < 4 && <span className="h-full w-px bg-slate-200" />}
              </div>
              <p className="pt-1 text-sm font-medium text-slate-700">{item}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
