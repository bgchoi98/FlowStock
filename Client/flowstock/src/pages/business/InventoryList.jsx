import { ArrowRightLeft, Database, MapPin, Search, Warehouse } from 'lucide-react';
import { DataTable, PageHeader } from '../../components/DataTable';
import { inventories } from '../../data/flowstockData';

const columns = [
  { key: 'product', label: '상품', render: (row) => <span className="font-semibold text-slate-900">{row.product}</span> },
  {
    key: 'place',
    label: '창고 / 로케이션',
    render: (row) => (
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-600"><Warehouse size={13} />{row.warehouse}</div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-700"><MapPin size={13} />{row.location}</div>
      </div>
    ),
  },
  { key: 'onHand', label: '현재고', align: 'right', render: (row) => row.onHand.toLocaleString() },
  { key: 'allocated', label: '예약재고', align: 'right', render: (row) => <span className="font-semibold text-amber-600">{row.allocated.toLocaleString()}</span> },
  {
    key: 'available',
    label: '가용재고',
    align: 'right',
    render: (row) => {
      const available = row.onHand - row.allocated;
      return <span className={available < row.safety ? 'font-bold text-rose-600' : 'font-bold text-emerald-600'}>{available.toLocaleString()}</span>;
    },
  },
  { key: 'safety', label: '안전재고', align: 'right' },
  {
    key: 'note',
    label: '비고',
    align: 'center',
    render: (row) => (row.onHand - row.allocated < row.safety ? <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700">재입고 필요</span> : '-'),
  },
  { key: 'lastIn', label: '최근 입고/출고', render: (row) => <span className="text-xs text-slate-500">In {row.lastIn}<br />Out {row.lastOut}</span> },
];

export default function InventoryList() {
  const totalAvailable = inventories.reduce((sum, item) => sum + item.onHand - item.allocated, 0);
  const lowStockCount = inventories.filter((item) => item.onHand - item.allocated < item.safety).length;

  return (
    <div className="space-y-5">
      <PageHeader title="재고 현황 관리" description="현재고, 예약재고, 가용재고를 창고와 로케이션 기준으로 조회합니다." actionLabel="재고 조정" icon={Database} />

      <div className="grid grid-cols-1 gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-4">
        <select className="h-10 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm outline-none">
          <option>전체 창고</option>
          <option>서울 물류센터</option>
          <option>인천 허브센터</option>
        </select>
        <select className="h-10 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm outline-none">
          <option>전체 로케이션</option>
          <option>NORMAL</option>
          <option>PICKING</option>
          <option>HOLD</option>
        </select>
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600">
          <ArrowRightLeft size={15} />
          재고 이동
        </button>
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-900 px-3 text-sm font-semibold text-white">
          <Search size={15} />
          조건 검색
        </button>
      </div>

      <DataTable columns={columns} rows={inventories} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-cyan-700 bg-cyan-700 p-5 text-white shadow-sm">
          <p className="text-sm text-cyan-100">전체 가용재고</p>
          <p className="mt-1 text-2xl font-bold">{totalAvailable.toLocaleString()} EA</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">저재고 상품</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">{lowStockCount}건</p>
        </div>
      </div>
    </div>
  );
}
