'use client';

import { useEffect, useState, useMemo } from 'react';
import { getDemoProducts } from '@/lib/demoApi';
import type { DemoProduct } from '@/demo-data/products';
import { Table } from '@/components/Tables';
import { FormModal, Modal } from '@/components/Modals';

interface FabricRoll {
  id: string;
  rollNumber: number;
  batchCode: string;
  length: number;
  receptionDate: string;
}

// Demo rolls per product for Set purchase price modal (e.g. Roll #21012026-01 – 120 m)
function getDemoRollsForProduct(productId: string): { id: string; batchCode: string; length: number }[] {
  const base = `21012026-${String(Number(productId)).padStart(2, '0')}`;
  return [
    { id: `roll-${productId}-1`, batchCode: `${base}1`, length: 120 },
    { id: `roll-${productId}-2`, batchCode: `${base}2`, length: 95 },
    { id: `roll-${productId}-3`, batchCode: `${base}3`, length: 88 },
  ];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<DemoProduct[]>([]);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isPurchasePriceModalOpen, setIsPurchasePriceModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DemoProduct | null>(null);
  const [rolls, setRolls] = useState<FabricRoll[]>([]);
  const [demoNotification, setDemoNotification] = useState<'price' | 'purchase' | 'addProduct' | 'stock' | null>(null);

  // Update price modal
  const [newSellingPrice, setNewSellingPrice] = useState('');
  const [newSellingPriceEur, setNewSellingPriceEur] = useState('');
  const PLN_TO_EUR = 4.3; // demo rate

  // Add product modal
  const [addFactoryCode, setAddFactoryCode] = useState('');
  const [addProductName, setAddProductName] = useState('');
  const [addColor, setAddColor] = useState('');
  const [addProductType, setAddProductType] = useState('');
  const [addPriceEur, setAddPriceEur] = useState('');
  const [addPricePln, setAddPricePln] = useState('');
  const [addInitialStock, setAddInitialStock] = useState('');

  // Set purchase price modal
  const [purchaseProductId, setPurchaseProductId] = useState('');
  const [purchaseRollId, setPurchaseRollId] = useState('');
  const [purchasePricePerMeter, setPurchasePricePerMeter] = useState('');

  useEffect(() => {
    const allProducts = getDemoProducts();
    setProducts(allProducts);
  }, []);

  useEffect(() => {
    if (demoNotification) {
      const t = setTimeout(() => setDemoNotification(null), 4000);
      return () => clearTimeout(t);
    }
  }, [demoNotification]);

  const handleEditStock = (product: DemoProduct) => {
    setSelectedProduct(product);
    setRolls([
      { id: '1', rollNumber: 1, batchCode: '21012026001', length: 125.5, receptionDate: '2026-01-21' },
      { id: '2', rollNumber: 2, batchCode: '21012026002', length: 98.3, receptionDate: '2026-01-21' },
    ]);
    setIsStockModalOpen(true);
  };

  const handleUpdatePrice = (product: DemoProduct) => {
    setSelectedProduct(product);
    setNewSellingPrice(String(product.price));
    setNewSellingPriceEur((product.price / PLN_TO_EUR).toFixed(2));
    setIsPriceModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setAddFactoryCode('');
    setAddProductName('');
    setAddColor('');
    setAddProductType('');
    setAddPriceEur('');
    setAddPricePln('');
    setAddInitialStock('');
    setIsAddModalOpen(true);
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoNotification('addProduct');
    setIsAddModalOpen(false);
  };

  const handleAddRoll = () => {
    const newRollNumber = rolls.length + 1;
    setRolls([
      ...rolls,
      {
        id: Date.now().toString(),
        rollNumber: newRollNumber,
        batchCode: `21012026${String(newRollNumber).padStart(3, '0')}`,
        length: 0,
        receptionDate: '',
      },
    ]);
  };

  const handleSaveStock = () => {
    setDemoNotification('stock');
    setIsStockModalOpen(false);
  };

  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoNotification('price');
    setIsPriceModalOpen(false);
  };

  const handleOpenSetPurchasePrice = () => {
    setPurchaseProductId('');
    setPurchaseRollId('');
    setPurchasePricePerMeter('');
    setIsPurchasePriceModalOpen(true);
  };

  const purchaseRolls = useMemo(
    () => (purchaseProductId ? getDemoRollsForProduct(purchaseProductId) : []),
    [purchaseProductId]
  );

  const handleSavePurchasePrice = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoNotification('purchase');
    setIsPurchasePriceModalOpen(false);
  };

  const totalLength = rolls.reduce((sum, roll) => sum + (roll.length || 0), 0);


  const columns = [
    { key: 'code', label: 'Product Code' },
    { key: 'name', label: 'Product Name' },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Stock', render: (p: DemoProduct) => `${p.stock} ${p.unit}` },
    { key: 'price', label: 'Price', render: (p: DemoProduct) => `${p.price.toFixed(2)} PLN/${p.unit}` },
    {
      key: 'status',
      label: 'Status',
      render: (p: DemoProduct) => {
        const statusClasses: Record<string, string> = {
          in_stock: 'bg-green-100 text-green-800',
          low_stock: 'bg-yellow-100 text-yellow-800',
          out_of_stock: 'bg-red-100 text-red-800',
          defective: 'bg-gray-100 text-gray-800',
        };
        const statusLabels: Record<string, string> = {
          in_stock: 'In Stock',
          low_stock: 'Low Stock',
          out_of_stock: 'Out of Stock',
          defective: 'Defective',
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[p.status] || 'bg-gray-100 text-gray-800'}`}
          >
            {statusLabels[p.status] || p.status}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (p: DemoProduct) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditStock(p)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Edit stock
          </button>
          <button
            onClick={() => handleUpdatePrice(p)}
            className="px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-300"
          >
            Update price
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {demoNotification === 'price' && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm font-medium text-yellow-800">Demo mode – price not actually updated</p>
        </div>
      )}
      {demoNotification === 'purchase' && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm font-medium text-yellow-800">Demo mode – purchase price not actually saved</p>
        </div>
      )}
      {demoNotification === 'addProduct' && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm font-medium text-yellow-800">Demo mode – product not actually added</p>
        </div>
      )}
      {demoNotification === 'stock' && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm font-medium text-yellow-800">Demo mode – stock changes are disabled</p>
        </div>
      )}

      <div className="flex items-start justify-between gap-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products and Stock Levels</h1>
        <div className="flex gap-4 shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 min-w-[200px]">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Purchase price</h2>
            <button
              onClick={handleOpenSetPurchasePrice}
              className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Set purchase price
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300 self-end"
          >
            Add Product
          </button>
        </div>
      </div>

      <Table columns={columns} data={products} emptyMessage="No products available" />

      {/* Manage Stock modal (existing) */}
      <Modal
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        title={`Manage Stock: ${selectedProduct?.code || ''}`}
        size="xl"
      >
        <div className="space-y-6">
          <p className="text-sm text-gray-600">
            Enter the length of each roll (in meters). For new rolls, the reception date is required.
          </p>
          <div className="space-y-4">
            {rolls.map((roll) => (
              <div key={roll.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Roll {roll.rollNumber}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Batch Code</label>
                    <input
                      type="text"
                      value={roll.batchCode}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={roll.length || ''}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reception Date</label>
                    <input
                      type="date"
                      value={roll.receptionDate}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddRoll}
            className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all duration-300"
          >
            + Add another roll
          </button>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Total Length:</span>
              <span className="text-lg font-semibold text-gray-900">{totalLength.toFixed(1)} m</span>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsStockModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveStock}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Save stock
            </button>
          </div>
        </div>
      </Modal>

      {/* Update product price modal */}
      <Modal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        title="Update product price"
        size="md"
      >
        <form onSubmit={handleSavePrice} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product name</label>
            <input
              type="text"
              value={selectedProduct?.name ?? ''}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current selling price (PLN / m)</label>
              <input
                type="text"
                value={selectedProduct ? `${selectedProduct.price.toFixed(2)} PLN / ${selectedProduct.unit}` : ''}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current selling price (EUR / m)</label>
              <input
                type="text"
                value={selectedProduct ? `${(selectedProduct.price / PLN_TO_EUR).toFixed(2)} EUR / ${selectedProduct.unit}` : ''}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New selling price (PLN / m)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={newSellingPrice}
                onChange={(e) => setNewSellingPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New selling price (EUR / m)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={newSellingPriceEur}
                onChange={(e) => setNewSellingPriceEur(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsPriceModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Save price
            </button>
          </div>
        </form>
      </Modal>

      {/* Set purchase price modal */}
      <Modal
        isOpen={isPurchasePriceModalOpen}
        onClose={() => setIsPurchasePriceModalOpen(false)}
        title="Set purchase price"
        size="md"
      >
        <form onSubmit={handleSavePurchasePrice} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">1) Select product</label>
            <select
              value={purchaseProductId}
              onChange={(e) => {
                setPurchaseProductId(e.target.value);
                setPurchaseRollId('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.code})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">2) Select roll</label>
            <select
              value={purchaseRollId}
              onChange={(e) => setPurchaseRollId(e.target.value)}
              disabled={!purchaseProductId}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="">Select roll</option>
              {purchaseRolls.map((r) => (
                <option key={r.id} value={r.id}>
                  Roll #{r.batchCode} – {r.length} m
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">3) Purchase price per meter</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.01"
                min="0"
                value={purchasePricePerMeter}
                onChange={(e) => setPurchasePricePerMeter(e.target.value)}
                placeholder="0.00"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-sm text-gray-600 shrink-0">PLN / m</span>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsPurchasePriceModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Save purchase price
            </button>
          </div>
        </form>
      </Modal>

      <FormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
        onSubmit={handleAddProductSubmit}
        submitLabel="Add product"
        submitDisabled={false}
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Factory code</label>
            <input
              type="text"
              value={addFactoryCode}
              onChange={(e) => setAddFactoryCode(e.target.value)}
              placeholder="e.g. FAB-001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product name</label>
            <input
              type="text"
              value={addProductName}
              onChange={(e) => setAddProductName(e.target.value)}
              placeholder="e.g. Premium Cotton 150cm"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <input
              type="text"
              value={addColor}
              onChange={(e) => setAddColor(e.target.value)}
              placeholder="e.g. White, Black"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product type</label>
            <select
              value={addProductType}
              onChange={(e) => setAddProductType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select product type</option>
              <option value="Tulle">Tulle</option>
              <option value="Sheer">Sheer</option>
              <option value="Blackout">Blackout</option>
              <option value="Velvet">Velvet</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Selling price (EUR / m)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={addPriceEur}
              onChange={(e) => setAddPriceEur(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Selling price (PLN / m)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={addPricePln}
              onChange={(e) => setAddPricePln(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial stock (meters) <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={addInitialStock}
              onChange={(e) => setAddInitialStock(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
