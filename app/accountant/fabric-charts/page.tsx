'use client';

import { useEffect, useState } from 'react';
import { getDemoProducts } from '@/lib/demoApi';
import type { DemoProduct } from '@/demo-data/products';
import { Table } from '@/components/Tables';

export default function FabricChartsPage() {
  const [products, setProducts] = useState<DemoProduct[]>([]);

  useEffect(() => {
    const allProducts = getDemoProducts();
    setProducts(allProducts.filter((p) => p.status !== 'defective'));
  }, []);

  const columns = [
    { key: 'code', label: 'Product Code' },
    { key: 'name', label: 'Product Name' },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Stock', render: (p: DemoProduct) => `${p.stock} ${p.unit}` },
    { key: 'price', label: 'Price', render: (p: DemoProduct) => `${p.price.toFixed(2)} PLN/${p.unit}` },
    { key: 'status', label: 'Status', render: (p: DemoProduct) => {
      const statusClasses: Record<string, string> = {
        in_stock: 'bg-green-100 text-green-800',
        low_stock: 'bg-yellow-100 text-yellow-800',
        out_of_stock: 'bg-red-100 text-red-800',
      };
      const statusLabels: Record<string, string> = {
        in_stock: 'In Stock',
        low_stock: 'Low Stock',
        out_of_stock: 'Out of Stock',
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[p.status] || 'bg-gray-100 text-gray-800'}`}>
          {statusLabels[p.status] || p.status}
        </span>
      );
    }},
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Fabric Charts (Demo Customer Only)</h1>
      <Table columns={columns} data={products} emptyMessage="No products available" />
    </div>
  );
}
