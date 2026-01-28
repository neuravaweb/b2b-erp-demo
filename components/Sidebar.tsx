'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDemoRole } from '@/lib/demoAuth';
import { useState, useEffect } from 'react';

interface SidebarProps {
  role: 'USER' | 'ACCOUNTANT' | 'WAREHOUSE';
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [currentRole, setCurrentRole] = useState<string | null>(null);

  useEffect(() => {
    setCurrentRole(getDemoRole());
  }, []);

  const customerMenuItems = [
    { href: '/customer', label: 'Dashboard', icon: '📊' },
    { href: '/customer/new-order', label: 'New Order', icon: '➕' },
    { href: '/customer/orders', label: 'List of Orders', icon: '📋' },
    { href: '/customer/fabric-charts', label: 'Fabric Charts', icon: '📈' },
    { href: '/customer/announcements', label: 'Announcements', icon: '📢' },
    { href: '/customer/messages', label: 'Messages', icon: '✉️' },
    { href: '/customer/my-data', label: 'My Data', icon: '👤' },
    { href: '/customer/change-password', label: 'Change Password', icon: '🔒' },
  ];

  const accountantMenuItems = [
    { href: '/accountant', label: 'Dashboard', icon: '📊' },
    { href: '/accountant/orders', label: 'All Orders', icon: '📋' },
    { href: '/accountant/products', label: 'Products and States', icon: '📦' },
    { href: '/accountant/add-order', label: 'Add an Order', icon: '➕' },
    { href: '/accountant/fabric-charts', label: 'Fabric Charts', icon: '📈' },
    { href: '/accountant/messages', label: 'Messages', icon: '✉️' },
    { href: '/accountant/announcements', label: 'Announcements', icon: '📢' },
    { href: '/accountant/new-customer', label: 'New Customer', icon: '👤' },
    { href: '/accountant/new-customers-fair', label: 'New Customers from the fair', icon: '🎪' },
    { href: '/accountant/customers', label: 'Customers', icon: '🏢' },
    { href: '/accountant/password-reset', label: 'Password Reset', icon: '🔒' },
  ];

  const warehouseMenuItems = [
    { href: '/warehouse', label: 'Warehouse Alerts', icon: '⚠️' },
    { href: '/warehouse/packing', label: 'Packing Orders', icon: '📦' },
    { href: '/warehouse/delivery-10days', label: 'Orders – Delivery up to 10 Days', icon: '🚚' },
    { href: '/warehouse/defective', label: 'Defective for Verification', icon: '🔍' },
    { href: '/warehouse/products', label: 'Products and stock levels', icon: '📊' },
  ];

  const menuItems = role === 'USER' 
    ? customerMenuItems 
    : role === 'ACCOUNTANT' 
    ? accountantMenuItems 
    : warehouseMenuItems;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800">
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
