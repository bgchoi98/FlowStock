import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ArrowDownToLine,
  BarChart3,
  Box,
  ChevronDown,
  ChevronRight,
  History,
  LayoutDashboard,
  MapPin,
  Menu,
  Package,
  ShieldCheck,
  ShoppingCart,
  Settings,
  Truck,
  Users,
  Warehouse,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../lib/utils';

const menuItems = [
  { title: '대시보드', icon: LayoutDashboard, path: '/' },
  {
    title: '기준정보 관리',
    icon: Settings,
    children: [
      { title: '상품 관리', path: '/master/products', icon: Package },
      { title: '거래처 관리', path: '/master/partners', icon: Users },
      { title: '창고 관리', path: '/master/warehouses', icon: Warehouse },
      { title: '로케이션 관리', path: '/master/locations', icon: MapPin },
    ],
  },
  { title: '입고 관리', icon: ArrowDownToLine, path: '/inbound' },
  { title: '재고 관리', icon: Box, path: '/inventory' },
  { title: '주문 관리', icon: ShoppingCart, path: '/order' },
  { title: '출고 관리', icon: Truck, path: '/shipment' },
  {
    title: '관리자 조회',
    icon: ShieldCheck,
    children: [
      { title: '저재고 상품', path: '/admin/low-stock' },
      { title: '입출고 이력', path: '/admin/history', icon: History },
      { title: '운영 통계', path: '/admin/stats', icon: BarChart3 },
    ],
  },
  { title: '사용자 관리', icon: Users, path: '/users' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState(['기준정보 관리', '관리자 조회']);

  const toggleExpand = (title) => {
    setExpandedMenus((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="fixed left-4 top-4 z-50 rounded-md bg-white p-2 shadow-md lg:hidden"
        aria-label="메뉴 열기"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 260 : 0, opacity: isOpen ? 1 : 0 }}
        className={cn('fixed inset-y-0 left-0 z-40 flex flex-col overflow-hidden bg-slate-950 text-slate-300', !isOpen && 'hidden lg:flex lg:w-0')}
      >
        <div className="flex items-center gap-3 border-b border-slate-800 p-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-cyan-500 text-slate-950">
            <Warehouse size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">FlowStock</h1>
            <p className="text-xs text-slate-500">WMS Operation</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.title)}
                    className={cn('flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-900', expandedMenus.includes(item.title) && 'text-white')}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon size={18} />
                      {item.title}
                    </span>
                    {expandedMenus.includes(item.title) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  <AnimatePresence>
                    {expandedMenus.includes(item.title) && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="ml-4 space-y-1 overflow-hidden border-l border-slate-800">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              cn('ml-3 flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors', isActive ? 'bg-cyan-500/10 font-semibold text-cyan-300' : 'text-slate-400 hover:bg-slate-900 hover:text-white')
                            }
                          >
                            {child.icon && <child.icon size={15} />}
                            {child.title}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn('flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors', isActive ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:bg-slate-900 hover:text-white')}
                >
                  <item.icon size={18} />
                  {item.title}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 rounded-md bg-slate-900 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-700 text-xs font-bold text-white">AD</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">관리자</p>
              <p className="truncate text-xs text-slate-500">admin@flowstock.io</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
