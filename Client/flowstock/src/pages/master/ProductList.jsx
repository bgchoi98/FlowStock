import { Download, Plus } from 'lucide-react';
import { DataTable, FilterBar, PageHeader, StatusBadge } from '../../components/DataTable';
import { products } from '../../data/flowstockData';

const columns = [
  { key: 'sku', label: 'SKU', render: (row) => <span className="font-mono font-semibold text-cyan-700">{row.sku}</span> },
  { key: 'name', label: '상품명', render: (row) => <span className="font-semibold text-slate-900">{row.name}</span> },
  { key: 'type', label: '유형' },
  { key: 'unit', label: '단위', align: 'center' },
  { key: 'safetyStock', label: '안전재고', align: 'right', render: (row) => `${row.safetyStock} EA` },
  { key: 'status', label: '상태', align: 'center', render: (row) => <StatusBadge value={row.status} /> },
  { key: 'createdAt', label: '등록일' },
];

export default function ProductList() {
  return (
    <div className="space-y-5">
      <PageHeader title="상품 관리" description="상품 코드, 유형, 단위, 안전재고와 사용 상태를 관리합니다." actionLabel="상품 등록" icon={Plus} />
      <FilterBar placeholder="상품명 또는 SKU 검색">
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
          <Download size={15} />
          엑셀 다운로드
        </button>
      </FilterBar>
      <DataTable columns={columns} rows={products} />
    </div>
  );
}
