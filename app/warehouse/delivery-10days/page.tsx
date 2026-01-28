'use client';

import { useEffect, useState } from 'react';
import { getDemoOrders } from '@/lib/demoApi';
import type { DemoOrder } from '@/demo-data/orders';
import { Table } from '@/components/Tables';

const STORAGE_KEY = 'warehouse-delivery-10days-ready';

export default function Delivery10DaysPage() {
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [readyForPackingIds, setReadyForPackingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const allOrders = getDemoOrders();
    const deliveryOrders = allOrders.filter((o) => o.leadTimeWarning);
    setOrders(deliveryOrders);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ids = JSON.parse(raw) as string[];
        setReadyForPackingIds(new Set(ids));
      }
    } catch {
      // ignore
    }
  }, []);

  const markReadyForPacking = (orderId: string) => {
    setReadyForPackingIds((prev) => {
      const next = new Set(prev);
      next.add(orderId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const getWorkflowStatus = (order: DemoOrder) => {
    return readyForPackingIds.has(order.id) ? 'Ready for packing' : 'Waiting for preparation';
  };

  const getStatusBadge = (order: DemoOrder) => {
    const status = getWorkflowStatus(order);
    const isReady = status === 'Ready for packing';
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          isReady ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
        }`}
      >
        {status}
      </span>
    );
  };

  const columns = [
    { key: 'orderNumber', label: 'Order Number' },
    { key: 'customerName', label: 'Customer' },
    { key: 'date', label: 'Order Date' },
    { key: 'deliveryDate', label: 'Expected Delivery', render: (o: DemoOrder) => o.deliveryDate || 'N/A' },
    { key: 'workflowStatus', label: 'Status', render: (o: DemoOrder) => getStatusBadge(o) },
    { key: 'items', label: 'Items', render: (o: DemoOrder) => `${o.items.length} item(s)` },
    { key: 'total', label: 'Total', render: (o: DemoOrder) => `${o.total.toLocaleString('pl-PL')} ${o.currency}` },
    {
      key: 'actions',
      label: 'Actions',
      render: (o: DemoOrder) => {
        const isReady = readyForPackingIds.has(o.id);
        return (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!isReady) markReadyForPacking(o.id);
            }}
            disabled={isReady}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isReady
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Ready to pack
          </button>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders – Delivery up to 10 Days</h1>
      <Table columns={columns} data={orders} emptyMessage="No orders with 10-day delivery" />
    </div>
  );
}
