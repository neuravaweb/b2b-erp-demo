'use client';

import { useRouter } from 'next/navigation';
import { getDemoRole, clearDemoAuth, setDemoRole, type DemoRole } from '@/lib/demoAuth';
import { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  role: 'USER' | 'ACCOUNTANT' | 'WAREHOUSE';
  showLogout?: boolean;
  logoutDisabled?: boolean;
}

export default function Header({ role, showLogout = true, logoutDisabled = false }: HeaderProps) {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<DemoRole | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentRole(getDemoRole());
  }, []);

  const handleLogout = () => {
    if (logoutDisabled) return;
    clearDemoAuth();
    router.push('/');
  };

  const handleRoleSwitch = async (newRole: DemoRole) => {
    try {
      const response = await fetch('/api/demo/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (response.ok) {
        setDemoRole(newRole);
        window.location.href = newRole === 'USER' ? '/customer' : newRole === 'ACCOUNTANT' ? '/accountant' : '/warehouse';
      }
    } catch {
      // Demo: role switch failed; no-op
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 fixed top-0 left-0 md:left-64 right-0 z-30">
        {/* Mobile: Menu button + panel title */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-sm font-medium">Menu</span>
          </button>
          <span className="text-sm text-gray-600 hidden sm:inline md:block">
            Logged in as: <span className="font-semibold text-gray-900">
              {role === 'USER' && 'Customer'}
              {role === 'ACCOUNTANT' && 'Accountant'}
              {role === 'WAREHOUSE' && 'Warehouse'}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {/* Role switch: desktop only (mobile uses Panels in drawer) */}
          <div className="hidden md:flex items-center gap-2">
            {role === 'USER' && (
              <button
                onClick={() => handleRoleSwitch('ACCOUNTANT')}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Switch to Accountant
              </button>
            )}
            {role === 'ACCOUNTANT' && (
              <>
                <button
                  onClick={() => handleRoleSwitch('USER')}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Switch to Customer
                </button>
                <button
                  onClick={() => handleRoleSwitch('WAREHOUSE')}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all duration-300"
                >
                  Switch to Warehouse
                </button>
              </>
            )}
            {role === 'WAREHOUSE' && (
              <button
                onClick={() => handleRoleSwitch('ACCOUNTANT')}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Switch to Accountant
              </button>
            )}
          </div>
          {showLogout && (
            <button
              onClick={handleLogout}
              disabled={logoutDisabled}
              className={`px-3 md:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                logoutDisabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
              title={logoutDisabled ? 'Demo mode – disabled' : 'Logout'}
            >
              {logoutDisabled ? 'Logout' : 'Logout'}
            </button>
          )}
        </div>
      </header>
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        role={role}
      />
    </>
  );
}
