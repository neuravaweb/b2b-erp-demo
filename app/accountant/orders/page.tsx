'use client';

import { useEffect, useState, useMemo } from 'react';
import { getDemoOrders, getDemoCustomers, type DemoCustomer } from '@/lib/demoApi';
import type { DemoOrder } from '@/demo-data/orders';

type StatusFilter = 'all' | 'shipped' | 'in_progress' | 'rejected';

export default function AccountantOrdersPage() {
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [paymentMethods, setPaymentMethods] = useState<Record<string, string>>({});

  useEffect(() => {
    const allOrders = getDemoOrders();
    setOrders(allOrders);
    // Initialize payment methods for each order
    const methods: Record<string, string> = {};
    allOrders.forEach((order) => {
      methods[order.id] = 'Bank Transfer';
    });
    setPaymentMethods(methods);
  }, []);

  const customers = getDemoCustomers();
  const allCustomers = [
    { id: '1', name: 'Demo Customer' },
    ...customers,
  ];

  const getOrderStatusLabel = (status: DemoOrder['status']): string => {
    const statusMap: Record<DemoOrder['status'], string> = {
      pending: 'In preparation',
      processing: 'In preparation',
      packing: 'In preparation',
      shipped: 'Shipped',
      delivered: 'Shipped',
      cancelled: 'Rejected',
    };
    return statusMap[status] || status;
  };

  const getOrderStatusBadge = (status: DemoOrder['status']) => {
    const statusClasses: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      packing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-green-100 text-green-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    const label = getOrderStatusLabel(status);
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {label}
      </span>
    );
  };

  const getItemStatusLabel = (orderStatus: DemoOrder['status']): string => {
    if (orderStatus === 'shipped' || orderStatus === 'delivered') {
      return 'Shipped';
    }
    return 'Waiting for preparation';
  };

  const getTrackingNumber = (orderId: string): string => {
    // Generate demo tracking numbers for shipped orders
    const trackingMap: Record<string, string> = {
      '4': 'TRK-2024-001234',
    };
    return trackingMap[orderId] || `TRK-2024-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
  };

  const getVariantCollection = (productCode: string): string => {
    // Demo variant/collection data
    const variants: Record<string, string> = {
      'FAB-COT-150': 'Spring Collection 2024',
      'FAB-LIN-140': 'Classic Line',
      'FAB-POL-160': 'Professional Series',
      'FAB-WOL-145': 'Premium Collection',
      'FAB-SIL-120': 'Luxury Edition',
    };
    return variants[productCode] || 'Standard';
  };

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Filter by customer
    if (selectedCustomer !== 'all') {
      filtered = filtered.filter((order) => order.customerId === selectedCustomer);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((order) => {
        if (statusFilter === 'shipped') {
          return order.status === 'shipped' || order.status === 'delivered';
        }
        if (statusFilter === 'in_progress') {
          return order.status === 'pending' || order.status === 'processing' || order.status === 'packing';
        }
        if (statusFilter === 'rejected') {
          return order.status === 'cancelled';
        }
        return true;
      });
    }

    return filtered;
  }, [orders, selectedCustomer, statusFilter]);

  const handlePaymentMethodChange = (orderId: string, method: string) => {
    setPaymentMethods((prev) => ({
      ...prev,
      [orderId]: method,
    }));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Orders</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Customer Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer
              </label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Customers</option>
                {allCustomers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter Buttons */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    statusFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('shipped')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    statusFilter === 'shipped'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Shipped
                </button>
                <button
                  onClick={() => setStatusFilter('in_progress')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    statusFilter === 'in_progress'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  In progress
                </button>
                <button
                  onClick={() => setStatusFilter('rejected')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    statusFilter === 'rejected'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Cards */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-gray-900">{order.orderNumber}</h2>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                        Manual order
                      </span>
                      {getOrderStatusBadge(order.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        In warehouse
                      </span>
                      <span>{order.customerName}</span>
                      <span>{new Date(order.date).toLocaleDateString('pl-PL')}</span>
                    </div>
                  </div>
                  <div className="md:w-48">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <select
                      value={paymentMethods[order.id] || 'Bank Transfer'}
                      onChange={(e) => handlePaymentMethodChange(order.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>Bank Transfer</option>
                      <option>Credit Card</option>
                      <option>Invoice</option>
                      <option>Cash on Delivery</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                {/* Ready for Shipment Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready for shipment</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          {/* Product Info */}
                          <div className="md:col-span-5">
                            <div className="font-semibold text-gray-900 mb-1">{item.productName}</div>
                            <div className="text-sm text-gray-600">
                              {getVariantCollection(item.productCode)} • {item.productCode}
                            </div>
                          </div>

                          {/* Quantity */}
                          <div className="md:col-span-2">
                            <div className="text-sm text-gray-600 mb-1">Quantity</div>
                            <div className="font-medium text-gray-900">
                              {item.quantity} {item.unit}
                            </div>
                          </div>

                          {/* Price Calculation */}
                          <div className="md:col-span-3">
                            <div className="text-sm text-gray-600 mb-1">Price</div>
                            <div className="font-medium text-gray-900">
                              {item.price.toFixed(2)} {order.currency} × {item.quantity} = {item.total.toFixed(2)} {order.currency}
                            </div>
                          </div>

                          {/* Status */}
                          <div className="md:col-span-2">
                            <div className="text-sm text-gray-600 mb-1">Status</div>
                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              order.status === 'shipped' || order.status === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {getItemStatusLabel(order.status)}
                            </span>
                          </div>
                        </div>

                        {/* Warehouse Info Box */}
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                          <strong>Warehouse:</strong> Product available in stock. Ready for immediate shipment.
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipment Info (for shipped orders) */}
                {(order.status === 'shipped' || order.status === 'delivered') && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-900 mb-2">Shipment Information</h4>
                        <div className="space-y-1 text-sm text-green-800">
                          <div>
                            <strong>Tracking Number:</strong> {getTrackingNumber(order.id)}
                          </div>
                          <div>
                            <strong>Shipment Status:</strong> {order.status === 'delivered' ? 'Delivered' : 'In Transit'}
                          </div>
                          {order.deliveryDate && (
                            <div>
                              <strong>Expected Delivery:</strong> {new Date(order.deliveryDate).toLocaleDateString('pl-PL')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Total */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">Order Total</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {order.total.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {order.currency}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
