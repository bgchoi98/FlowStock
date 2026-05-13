import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="상품명, 입고번호, 주문번호 검색"
          className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
        />
      </div>

      <div className="flex items-center gap-3">
        <button type="button" className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100" aria-label="알림">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
        </button>
        <div className="h-8 w-px bg-slate-200" />
        <button type="button" className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-50 text-cyan-700">
            <User size={16} />
          </span>
          <span className="hidden text-sm font-semibold text-slate-700 sm:block">관리자</span>
        </button>
      </div>
    </header>
  );
}
