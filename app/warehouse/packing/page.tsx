'use client';

import { useEffect, useState } from 'react';
import { getDemoOrders } from '@/lib/demoApi';
import type { DemoOrder } from '@/demo-data/orders';
import { Table } from '@/components/Tables';

const STORAGE_KEY = 'warehouse-packing-packed';

export default function PackingOrdersPage() {
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [packedIds, setPackedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const allOrders = getDemoOrders();
    const packingOrders = allOrders.filter(
      (o) => !o.leadTimeWarning && (o.status === 'processing' || o.status === 'packing')
    );
    setOrders(packingOrders);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ids = JSON.parse(raw) as string[];
        setPackedIds(new Set(ids));
      }
    } catch {
      // ignore
    }
  }, []);

  const markPacked = (orderId: string) => {
    setPackedIds((prev) => {
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

  const visibleOrders = orders.filter((o) => !packedIds.has(o.id));

  const columns = [
    { key: 'orderNumber', label: 'Order Number' },
    { key: 'customerName', label: 'Customer' },
    { key: 'date', label: 'Order Date' },
    { key: 'items', label: 'Items', render: (o: DemoOrder) => `${o.items.length} item(s)` },
    { key: 'total', label: 'Total', render: (o: DemoOrder) => `${o.total.toLocaleString('pl-PL')} ${o.currency}` },
    {
      key: 'actions',
      label: 'Actions',
      className: 'text-right',
      render: (o: DemoOrder) => {
        const isPacked = packedIds.has(o.id);
        return (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!isPacked) markPacked(o.id);
              }}
              disabled={isPacked}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isPacked
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isPacked ? 'Packed ✓' : 'Packed'}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Packing Orders</h1>
      <Table columns={columns} data={visibleOrders} emptyMessage="No orders ready for packing" />
    </div>
  );
}
