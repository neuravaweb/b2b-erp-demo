'use client';

import { useEffect, useState } from 'react';
import { getDemoProducts } from '@/lib/demoApi';
import type { DemoProduct } from '@/demo-data/products';
import { Table } from '@/components/Tables';

export default function DefectivePage() {
  const [products, setProducts] = useState<DemoProduct[]>([]);

  useEffect(() => {
    const allProducts = getDemoProducts();
    // Show exactly 3 defective products
    const defectiveProducts = allProducts.filter((p) => p.status === 'defective').slice(0, 3);
    setProducts(defectiveProducts);
  }, []);

  const columns = [
    { key: 'code', label: 'Product Code' },
    { key: 'name', label: 'Product Name' },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Quantity', render: (p: DemoProduct) => `${p.stock} ${p.unit}` },
    { key: 'status', label: 'Status', render: (p: DemoProduct) => {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Defective
        </span>
      );
    }},
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Defective for Verification</h1>
      <Table columns={columns} data={products} emptyMessage="No defective products" />
    </div>
  );
}
