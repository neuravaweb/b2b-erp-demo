'use client';

import { useEffect, useState } from 'react';
import { getDemoWarehouseAlerts } from '@/lib/demoApi';
import type { DemoWarehouseAlert } from '@/lib/demoApi';
import { Table } from '@/components/Tables';

export default function WarehouseAlertsPage() {
  const [alerts, setAlerts] = useState<DemoWarehouseAlert[]>([]);

  useEffect(() => {
    const allAlerts = getDemoWarehouseAlerts();
    setAlerts(allAlerts);
  }, []);

  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      low: 'bg-gray-100 text-gray-800',
      normal: 'bg-blue-100 text-blue-800',
      high: 'bg-yellow-100 text-yellow-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityClasses[priority as keyof typeof priorityClasses] || 'bg-gray-100 text-gray-800'}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeClasses = {
      low_stock: 'bg-yellow-100 text-yellow-800',
      out_of_stock: 'bg-red-100 text-red-800',
      defective: 'bg-gray-100 text-gray-800',
      expiring: 'bg-orange-100 text-orange-800',
    };
    const typeLabels = {
      low_stock: 'Low Stock',
      out_of_stock: 'Out of Stock',
      defective: 'Defective',
      expiring: 'Expiring',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeClasses[type as keyof typeof typeClasses] || 'bg-gray-100 text-gray-800'}`}>
        {typeLabels[type as keyof typeof typeLabels] || type}
      </span>
    );
  };

  const columns = [
    { key: 'type', label: 'Type', render: (a: DemoWarehouseAlert) => getTypeBadge(a.type) },
    { key: 'productCode', label: 'Product Code' },
    { key: 'productName', label: 'Product Name' },
    { key: 'message', label: 'Message' },
    { key: 'priority', label: 'Priority', render: (a: DemoWarehouseAlert) => getPriorityBadge(a.priority) },
    { key: 'date', label: 'Date' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Warehouse Alerts</h1>
      <Table columns={columns} data={alerts} emptyMessage="No alerts" />
    </div>
  );
}
