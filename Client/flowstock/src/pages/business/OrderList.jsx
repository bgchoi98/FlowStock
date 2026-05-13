import { Calendar, Plus } from 'lucide-react';
import { DataTable, FilterBar, PageHeader, StatusBadge } from '../../components/DataTable';
import { currency, orders } from '../../data/flowstockData';

const columns = [
  { key: 'no', label: '주문 번호', render: (row) => <span className="font-mono font-semibold text-cyan-700">{row.no}</span> },
  { key: 'partner', label: '거래처', render: (row) => <span className="font-semibold text-slate-900">{row.partner}</span> },
  { key: 'status', label: '상태', render: (row) => <StatusBadge value={row.status} /> },
  { key: 'date', label: '주문일자' },
  { key: 'shipDate', label: '출고요청일' },
  { key: 'items', label: '품목수', align: 'center', render: (row) => `${row.items}종` },
  { key: 'qty', label: '주문수량', align: 'right', render: (row) => `${row.qty.toLocaleString()} EA` },
  { key: 'amount', label: '금액', align: 'right', render: (row) => <span className="font-semibold text-slate-900">{currency(row.amount)}</span> },
];

export default function OrderList() {
  return (
    <div className="space-y-5">
      <PageHeader title="주문 관리" description="주문 등록, 가용재고 확인, 재고 예약과 주문 상태 변경을 관리합니다." actionLabel="주문 등록" icon={Plus} />
      <FilterBar placeholder="주문번호 또는 거래처명 검색">
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600">
          <Calendar size={15} />
          전체 기간
        </button>
      </FilterBar>
      <DataTable columns={columns} rows={orders} />
    </div>
  );
}
