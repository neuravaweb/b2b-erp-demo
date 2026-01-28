'use client';

import { useState, useMemo } from 'react';
import { getDemoProducts, getDemoCustomers } from '@/lib/demoApi';
import type { DemoCustomer } from '@/lib/demoApi';

// Extended customer interface with additional fields
interface ExtendedCustomer extends DemoCustomer {
  shippingAddress?: string;
  phoneNumber?: string;
  paymentMethod?: string;
  discount?: number;
  currency?: string;
}

// Extended customer data with additional fields
const getExtendedCustomers = (): ExtendedCustomer[] => {
  const customers = getDemoCustomers();
  return [
    {
      id: '1',
      name: 'Demo Customer',
      vatNumber: 'PL1111111111',
      city: 'Warsaw',
      email: 'demo@customer.pl',
      status: 'active',
      shippingAddress: 'ul. Example 123, 00-000 Warsaw, Poland',
      phoneNumber: '+48 123 456 789',
      paymentMethod: 'Bank Transfer',
      discount: 5,
      currency: 'PLN',
    },
    ...customers.map((c) => ({
      ...c,
      shippingAddress: `ul. Main Street, ${c.city}, Poland`,
      phoneNumber: '+48 500 000 000',
      paymentMethod: 'Bank Transfer',
      discount: 0,
      currency: 'PLN',
    })),
  ];
};

export default function AddOrderPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const allCustomers = useMemo(() => getExtendedCustomers(), []);
  const products = getDemoProducts();

  // Filter customers based on search
  const filteredCustomers = useMemo(() => {
    if (!customerSearch.trim()) {
      return allCustomers;
    }
    const searchLower = customerSearch.toLowerCase();
    return allCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchLower) ||
        customer.vatNumber.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower)
    );
  }, [customerSearch, allCustomers]);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) {
      return [];
    }
    const searchLower = productSearch.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.code.toLowerCase().includes(searchLower)
    );
  }, [productSearch, products]);

  const selectedCustomer = useMemo(() => {
    return allCustomers.find((c) => c.id === selectedCustomerId);
  }, [selectedCustomerId, allCustomers]);

  const handleAddProduct = () => {
    if (productSearch.trim()) {
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
      setProductSearch('');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Add Order</h1>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-green-800 font-medium">Product added to cart</span>
          </div>
        </div>
      )}

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mb-8">
        {/* LEFT COLUMN - Client Selection (65%) */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Select customer</h2>
            </div>
            <div className="p-6">
              {/* Search Input */}
              <div className="mb-4">
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder="Search customer (name or code)..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Scrollable Customer List */}
              <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
                {filteredCustomers.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No customers found
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredCustomers.map((customer) => (
                      <button
                        key={customer.id}
                        onClick={() => setSelectedCustomerId(customer.id)}
                        className={`w-full text-left p-4 hover:bg-gray-50 transition-colors duration-200 ${
                          selectedCustomerId === customer.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                        }`}
                      >
                        <div className="font-semibold text-gray-900 mb-1">{customer.name}</div>
                        <div className="text-sm text-gray-600">
                          <div>VAT: {customer.vatNumber}</div>
                          <div>{customer.email}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Customer Info */}
              {selectedCustomer && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-sm text-gray-600">Selected customer: </span>
                  <span className="text-sm font-semibold text-gray-900">{selectedCustomer.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Customer Details (35%) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Customer details</h2>
            </div>
            <div className="p-6">
              {selectedCustomer ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">VAT</label>
                    <input
                      type="text"
                      value={selectedCustomer.vatNumber}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company name</label>
                    <input
                      type="text"
                      value={selectedCustomer.name}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact email</label>
                    <input
                      type="email"
                      value={selectedCustomer.email}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shipping address</label>
                    <input
                      type="text"
                      value={selectedCustomer.shippingAddress || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                    <input
                      type="text"
                      value={selectedCustomer.phoneNumber || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment method</label>
                    <input
                      type="text"
                      value={selectedCustomer.paymentMethod || 'Bank Transfer'}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                    <input
                      type="text"
                      value={selectedCustomer.discount !== undefined ? `${selectedCustomer.discount}%` : '0%'}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <input
                      type="text"
                      value={selectedCustomer.currency || 'PLN'}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Select a customer to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION - Add Products */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add products</h2>
        </div>
        <div className="p-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search product..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && productSearch.trim()) {
                    handleAddProduct();
                  }
                }}
              />
              {/* Product Suggestions */}
              {productSearch.trim() && filteredProducts.length > 0 && (
                <div className="mt-2 border border-gray-200 rounded-lg bg-white shadow-lg max-h-48 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer"
                      onClick={() => {
                        setProductSearch(`${product.name} (${product.code})`);
                        handleAddProduct();
                      }}
                    >
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.code}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleAddProduct}
              disabled={!productSearch.trim()}
              className={`px-6 py-2 font-medium rounded-lg transition-all duration-300 ${
                productSearch.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
