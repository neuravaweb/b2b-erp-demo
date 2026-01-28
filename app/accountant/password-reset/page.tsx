'use client';

import { useEffect, useState } from 'react';
import { getDemoPasswordReset } from '@/lib/demoApi';
import type { DemoPasswordReset } from '@/lib/demoApi';
import { Table } from '@/components/Tables';

export default function PasswordResetPage() {
  const [passwordReset, setPasswordReset] = useState<DemoPasswordReset | null>(null);

  useEffect(() => {
    const reset = getDemoPasswordReset();
    setPasswordReset(reset);
  }, []);

  const columns = [
    { key: 'customerName', label: 'Customer Name' },
    { key: 'email', label: 'Email' },
    { key: 'date', label: 'Request Date' },
    { key: 'status', label: 'Status', render: (r: DemoPasswordReset) => {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
        </span>
      );
    }},
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Password Reset Requests</h1>
      {passwordReset ? (
        <Table columns={columns} data={[passwordReset]} emptyMessage="No password reset requests" />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-500">No password reset requests</p>
        </div>
      )}
    </div>
  );
}
