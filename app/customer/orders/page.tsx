'use client';

import { useEffect, useState } from 'react';
import { getDemoOrders } from '@/lib/demoApi';
import type { DemoOrder } from '@/demo-data/orders';
import { Table } from '@/components/Tables';

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<DemoOrder[]>([]);

  useEffect(() => {
    const allOrders = getDemoOrders();
    const customerOrders = allOrders.filter((o) => o.customerId === '1');
    setOrders(customerOrders);
  }, []);

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      packing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const columns = [
    { key: 'orderNumber', label: 'Order Number' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: (o: DemoOrder) => getStatusBadge(o.status) },
    { key: 'items', label: 'Items', render: (o: DemoOrder) => `${o.items.length} item(s)` },
    { key: 'total', label: 'Total', render: (o: DemoOrder) => `${o.total.toLocaleString('pl-PL')} ${o.currency}` },
    { key: 'deliveryDate', label: 'Delivery Date', render: (o: DemoOrder) => o.deliveryDate || 'N/A' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">List of Orders</h1>
      <Table columns={columns} data={orders} emptyMessage="No orders found" />
    </div>
  );
}
