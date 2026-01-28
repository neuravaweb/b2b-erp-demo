'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isDemoAuthenticated } from '@/lib/demoAuth';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function WarehouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isDemoAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="WAREHOUSE" />
      <Header role="WAREHOUSE" showLogout={true} logoutDisabled={true} />
      <main className="ml-64 mt-16 p-6">
        {children}
      </main>
    </div>
  );
}
