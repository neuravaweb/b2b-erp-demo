'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isDemoAuthenticated, getDemoRole, setDemoRole, clearDemoAuth } from '@/lib/demoAuth';
import { getAllowedPanels } from '@/lib/panels';
import { useMobile } from '@/hooks/useMobile';

export default function PanelSelectionPage() {
  const router = useRouter();
  const isMobile = useMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isDemoAuthenticated()) {
      router.push('/login');
      return;
    }
    // Desktop: redirect to role's dashboard
    if (window.innerWidth >= 768) {
      const role = getDemoRole();
      const path = role === 'ACCOUNTANT' ? '/accountant' : role === 'WAREHOUSE' ? '/warehouse' : '/customer';
      router.replace(path);
    }
  }, [router]);

  const handleSelectPanel = (role: 'USER' | 'ACCOUNTANT' | 'WAREHOUSE', path: string) => {
    setDemoRole(role);
    router.push(path);
  };

  const handleLogout = () => {
    clearDemoAuth();
    router.push('/login');
  };

  if (!mounted || !isMobile || !isDemoAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const allowedPanels = getAllowedPanels();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">B2B ERP Portal</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 font-medium hover:text-red-700"
        >
          Logout
        </button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Select a panel
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-sm">
          Choose the panel you want to work in
        </p>
        <div className="w-full max-w-sm space-y-4">
          {allowedPanels.map((panel) => (
            <button
              key={panel.role}
              onClick={() => handleSelectPanel(panel.role, panel.path)}
              className="w-full flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md active:scale-[0.98] transition-all duration-200 text-left"
            >
              <span className="text-3xl">{panel.icon}</span>
              <div>
                <p className="font-semibold text-gray-900">{panel.label}</p>
                <p className="text-sm text-gray-500">Tap to open</p>
              </div>
              <span className="ml-auto text-gray-400">→</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
