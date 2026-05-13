import { Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';
import { statusMeta } from '../data/flowstockData';

export function StatusBadge({ value }) {
  const normalized = value === 'PICKING' ? 'PICKING' : value;
  const key = value === 'PICKING_TYPE' ? 'PICKING_TYPE' : normalized;
  const meta = statusMeta[key] || { label: value, className: 'bg-slate-100 text-slate-700 border-slate-200' };
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold', meta.className)}>
      {meta.label}
    </span>
  );
}

export function PageHeader({ title, description, actionLabel, icon: Icon }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {actionLabel && (
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800">
          {Icon && <Icon size={16} />}
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function FilterBar({ placeholder = '검색어를 입력하세요', children }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-slate-400 focus:bg-white"
          placeholder={placeholder}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {children}
        <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
          <SlidersHorizontal size={15} />
          조건
        </button>
      </div>
    </div>
  );
}

export function DataTable({ columns, rows }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={cn('px-5 py-3', column.align === 'right' && 'text-right', column.align === 'center' && 'text-center')}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={row.id || row.no || row.code || row.sku || index} className="hover:bg-slate-50">
                {columns.map((column) => (
                  <td key={column.key} className={cn('px-5 py-4 text-slate-700', column.align === 'right' && 'text-right', column.align === 'center' && 'text-center')}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
