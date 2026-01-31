'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getMenuItemsForRole } from '@/lib/menuItems';
import type { DemoRole } from '@/lib/demoAuth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  role: DemoRole;
}

export default function MobileMenu({ isOpen, onClose, role }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = getMenuItemsForRole(role);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleBackToPanels = () => {
    onClose();
    router.push('/panels');
  };

  const handleLinkClick = () => {
    onClose();
  };

  const panelLabel =
    role === 'USER'
      ? 'Customer Panel'
      : role === 'ACCOUNTANT'
        ? 'Accountant Panel'
        : 'Warehouse Panel';

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Slide-in drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] max-w-[85vw] bg-gray-900 text-white flex flex-col z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">B2B ERP Portal</h2>
            <p className="text-sm text-gray-400 mt-0.5">{panelLabel}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 -m-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
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
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleBackToPanels}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
          >
            <span className="text-lg">◀</span>
            <span className="text-sm font-medium">Panels</span>
            <span className="text-xs text-gray-500 ml-auto">Switch panel</span>
          </button>
        </div>
      </aside>
    </>
  );
}
