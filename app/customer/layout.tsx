'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isDemoAuthenticated, getDemoRole } from '@/lib/demoAuth';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function CustomerLayout({
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
    } else {
      const role = getDemoRole();
      if (role !== 'USER') {
        // Allow role switching, but default to customer if USER
      }
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
      <Sidebar role="USER" />
      <Header role="USER" showLogout={true} logoutDisabled={false} />
      <main className="ml-0 md:ml-64 mt-16 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
