'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getMenuItemsForRole } from '@/lib/menuItems';

interface SidebarProps {
  role: 'USER' | 'ACCOUNTANT' | 'WAREHOUSE';
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const menuItems = getMenuItemsForRole(role);

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex-col border-r border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">B2B ERP Portal</h1>
        <p className="text-sm text-gray-400 mt-1">
          {role === 'USER' && 'Customer Panel'}
          {role === 'ACCOUNTANT' && 'Accountant Panel'}
          {role === 'WAREHOUSE' && 'Warehouse Panel'}
        </p>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
