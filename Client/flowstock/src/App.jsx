import { Route, Routes } from 'react-router-dom';
import { Plus, ShieldCheck } from 'lucide-react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/master/ProductList';
import InboundList from './pages/business/InboundList';
import InventoryList from './pages/business/InventoryList';
import OrderList from './pages/business/OrderList';
import OperationStats from './pages/admin/OperationStats';
import { DataTable, FilterBar, PageHeader, StatusBadge } from './components/DataTable';
import { inventoryHistories, locations, partners, shipments, users, warehouses } from './data/flowstockData';

function ResourcePage({ title, description, actionLabel, searchPlaceholder, columns, rows }) {
  return (
    <div className="space-y-5">
      <PageHeader title={title} description={description} actionLabel={actionLabel} icon={Plus} />
      <FilterBar placeholder={searchPlaceholder}>
        <select className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none">
          <option>전체 상태</option>
          <option>사용중</option>
          <option>보류</option>
          <option>중지</option>
        </select>
      </FilterBar>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}

const partnerColumns = [
  { key: 'code', label: '거래처 코드', render: (row) => <span className="font-mono font-semibold text-cyan-700">{row.code}</span> },
  { key: 'name', label: '거래처명', render: (row) => <span className="font-semibold text-slate-900">{row.name}</span> },
  { key: 'type', label: '유형', render: (row) => <StatusBadge value={row.type} /> },
  { key: 'businessNo', label: '사업자번호' },
  { key: 'contact', label: '담당자' },
  { key: 'phone', label: '연락처' },
  { key: 'status', label: '상태', align: 'center', render: (row) => <StatusBadge value={row.status} /> },
];

const warehouseColumns = [
  { key: 'code', label: '창고 코드', render: (row) => <span className="font-mono font-semibold text-cyan-700">{row.code}</span> },
  { key: 'name', label: '창고명', render: (row) => <span className="font-semibold text-slate-900">{row.name}</span> },
  { key: 'address', label: '주소' },
  { key: 'locations', label: '로케이션', align: 'right', render: (row) => `${row.locations}개` },
  { key: 'status', label: '상태', align: 'center', render: (row) => <StatusBadge value={row.status} /> },
];

const locationColumns = [
  { key: 'code', label: '로케이션 코드', render: (row) => <span className="font-mono font-semibold text-cyan-700">{row.code}</span> },
  { key: 'name', label: '로케이션명', render: (row) => <span className="font-semibold text-slate-900">{row.name}</span> },
  { key: 'warehouse', label: '창고' },
  { key: 'type', label: '유형', render: (row) => <StatusBadge value={row.type === 'PICKING' ? 'PICKING_TYPE' : row.type} /> },
  { key: 'status', label: '상태', align: 'center', render: (row) => <StatusBadge value={row.status} /> },
];

const shipmentColumns = [
  { key: 'no', label: '출고 번호', render: (row) => <span className="font-mono font-semibold text-cyan-700">{row.no}</span> },
  { key: 'orderNo', label: '주문 번호' },
  { key: 'status', label: '상태', render: (row) => <StatusBadge value={row.status} /> },
  { key: 'items', label: '품목수', align: 'center', render: (row) => `${row.items}종` },
  { key: 'qty', label: '출고수량', align: 'right', render: (row) => `${row.qty.toLocaleString()} EA` },
  { key: 'shippedAt', label: '출고일시' },
  { key: 'user', label: '담당자' },
];

const historyColumns = [
  { key: 'id', label: '이력 ID', render: (row) => <span className="font-mono font-semibold text-cyan-700">{row.id}</span> },
  { key: 'type', label: '구분', render: (row) => <StatusBadge value={row.type} /> },
  { key: 'product', label: '상품', render: (row) => <span className="font-semibold text-slate-900">{row.product}</span> },
  { key: 'before', label: '변경 전', align: 'right' },
  { key: 'change', label: '변경수량', align: 'right', render: (row) => <span className={row.change > 0 ? 'font-semibold text-emerald-600' : 'font-semibold text-rose-600'}>{row.change > 0 ? `+${row.change}` : row.change}</span> },
  { key: 'after', label: '변경 후', align: 'right' },
  { key: 'ref', label: '참조번호' },
  { key: 'at', label: '처리일시' },
];

const userColumns = [
  { key: 'loginId', label: '로그인 ID', render: (row) => <span className="font-mono font-semibold text-cyan-700">{row.loginId}</span> },
  { key: 'name', label: '이름', render: (row) => <span className="font-semibold text-slate-900">{row.name}</span> },
  { key: 'role', label: '권한', render: (row) => <StatusBadge value={row.role} /> },
  { key: 'status', label: '상태', render: (row) => <StatusBadge value={row.status} /> },
  { key: 'createdAt', label: '생성일' },
];

function LowStockPage() {
  const lowStockRows = [
    { product: 'iPhone 15 Pro', warehouse: '서울 물류센터', location: 'B-02-05', available: 4, safety: 30, shortage: 26 },
    { product: 'Magic Mouse', warehouse: '부산 출고센터', location: 'D-01-04', available: 15, safety: 25, shortage: 10 },
  ];
  const columns = [
    { key: 'product', label: '상품', render: (row) => <span className="font-semibold text-slate-900">{row.product}</span> },
    { key: 'warehouse', label: '창고' },
    { key: 'location', label: '로케이션' },
    { key: 'available', label: '가용재고', align: 'right', render: (row) => <span className="font-bold text-rose-600">{row.available}</span> },
    { key: 'safety', label: '안전재고', align: 'right' },
    { key: 'shortage', label: '부족수량', align: 'right', render: (row) => `${row.shortage} EA` },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="저재고 상품 조회" description="가용재고가 안전재고보다 낮은 상품을 우선순위로 확인합니다." actionLabel="보충 요청 생성" icon={ShieldCheck} />
      <FilterBar placeholder="상품명, 창고, 로케이션 검색" />
      <DataTable columns={columns} rows={lowStockRows} />
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col lg:ml-[260px]">
        <Header />
        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/master/products" element={<ProductList />} />
            <Route path="/master/partners" element={<ResourcePage title="거래처 관리" description="공급사와 고객사의 기본 정보, 상태, 담당 연락처를 관리합니다." actionLabel="거래처 등록" searchPlaceholder="거래처명, 코드, 담당자 검색" columns={partnerColumns} rows={partners} />} />
            <Route path="/master/warehouses" element={<ResourcePage title="창고 관리" description="물류센터별 주소, 운영 상태, 로케이션 수를 관리합니다." actionLabel="창고 등록" searchPlaceholder="창고명, 코드, 주소 검색" columns={warehouseColumns} rows={warehouses} />} />
            <Route path="/master/locations" element={<ResourcePage title="로케이션 관리" description="창고 내부의 일반, 피킹, 보류, 반품 로케이션을 관리합니다." actionLabel="로케이션 등록" searchPlaceholder="로케이션 코드, 창고 검색" columns={locationColumns} rows={locations} />} />
            <Route path="/inbound" element={<InboundList />} />
            <Route path="/inventory" element={<InventoryList />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/shipment" element={<ResourcePage title="출고 관리" description="주문 기준 출고 생성, 피킹, 출고 완료 상태를 관리합니다." actionLabel="출고 생성" searchPlaceholder="출고번호, 주문번호 검색" columns={shipmentColumns} rows={shipments} />} />
            <Route path="/admin/low-stock" element={<LowStockPage />} />
            <Route path="/admin/history" element={<ResourcePage title="입출고 이력" description="입고, 예약, 출고, 조정으로 발생한 재고 변경 이력을 추적합니다." searchPlaceholder="상품명, 참조번호, 이력 ID 검색" columns={historyColumns} rows={inventoryHistories} />} />
            <Route path="/admin/stats" element={<OperationStats />} />
            <Route path="/users" element={<ResourcePage title="사용자 관리" description="ADMIN, MANAGER, OPERATOR 권한과 계정 상태를 관리합니다." actionLabel="사용자 등록" searchPlaceholder="사용자명, 로그인 ID 검색" columns={userColumns} rows={users} />} />
          </Routes>
        </main>
        <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-xs text-slate-400">FlowStock WMS UI Prototype</footer>
      </div>
    </div>
  );
}
