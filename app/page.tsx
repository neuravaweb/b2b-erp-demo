'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isDemoAuthenticated, getDemoRole } from '@/lib/demoAuth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isDemoAuthenticated()) {
      const role = getDemoRole();
      if (role === 'USER') {
        router.push('/customer');
      } else if (role === 'ACCOUNTANT') {
        router.push('/accountant');
      } else if (role === 'WAREHOUSE') {
        router.push('/warehouse');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
