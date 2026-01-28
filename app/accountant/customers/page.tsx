'use client';

import { useEffect, useState } from 'react';
import { getDemoCustomers } from '@/lib/demoApi';
import type { DemoCustomer } from '@/lib/demoApi';
import { Table } from '@/components/Tables';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<DemoCustomer[]>([]);

  useEffect(() => {
    const allCustomers = getDemoCustomers();
    setCustomers(allCustomers);
  }, []);

  const columns = [
    { key: 'name', label: 'Company Name' },
    { key: 'vatNumber', label: 'VAT Number' },
    { key: 'city', label: 'City' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status', render: (c: DemoCustomer) => {
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          c.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
        </span>
      );
    }},
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Customers</h1>
      <Table columns={columns} data={customers} emptyMessage="No customers found" />
    </div>
  );
}
