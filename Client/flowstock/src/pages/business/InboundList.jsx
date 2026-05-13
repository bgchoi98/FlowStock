import { Calendar, CheckCircle2, Clock, Plus, XCircle } from 'lucide-react';
import { DataTable, FilterBar, PageHeader, StatusBadge } from '../../components/DataTable';
import { inbounds } from '../../data/flowstockData';

const summary = [
  { label: '등록완료', value: 45, icon: Clock, tone: 'bg-blue-50 text-blue-700' },
  { label: '입고중', value: 12, icon: Clock, tone: 'bg-amber-50 text-amber-700' },
  { label: '입고확정', value: 124, icon: CheckCircle2, tone: 'bg-emerald-50 text-emerald-700' },
  { label: '입고취소', value: 8, icon: XCircle, tone: 'bg-rose-50 text-rose-700' },
];

const columns = [
  { key: 'no', label: '입고 번호', render: (row) => <span className="font-mono font-semibold text-cyan-700">{row.no}</span> },
  { key: 'status', label: '상태', render: (row) => <StatusBadge value={row.status} /> },
  { key: 'partner', label: '거래처', render: (row) => <span className="font-semibold text-slate-900">{row.partner}</span> },
  { key: 'date', label: '입고일자' },
  { key: 'items', label: '품목수', align: 'center', render: (row) => `${row.items}종` },
  { key: 'qty', label: '총 수량', align: 'right', render: (row) => `${row.qty.toLocaleString()} EA` },
  { key: 'user', label: '작성자' },
];

export default function InboundList() {
  return (
    <div className="space-y-5">
      <PageHeader title="입고 관리" description="입고 예정 등록, 실입고 처리, 입고 완료 시 재고 증가 흐름을 관리합니다." actionLabel="입고 예정 등록" icon={Plus} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-md ${item.tone}`}>
                <item.icon size={18} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">{item.label}</p>
                <p className="text-xl font-bold text-slate-900">{item.value}건</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FilterBar placeholder="입고번호 또는 거래처명 검색">
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600">
          <Calendar size={15} />
          2026-05-02 ~ 2026-05-09
        </button>
      </FilterBar>
      <DataTable columns={columns} rows={inbounds} />
    </div>
  );
}
