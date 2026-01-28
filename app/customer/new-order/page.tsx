'use client';

import { useState, useMemo } from 'react';
import { getDemoProducts } from '@/lib/demoApi';
import type { DemoProduct } from '@/demo-data/products';

// Extended product interface with color and type
interface ExtendedProduct extends DemoProduct {
  color?: string;
  type?: string;
  discountThreshold?: number;
  discountPercent?: number;
}

// Demo product extensions (color and type data)
const getProductExtensions = (productId: string): { color: string; type: string; discountThreshold?: number; discountPercent?: number } => {
  const extensions: Record<string, { color: string; type: string; discountThreshold?: number; discountPercent?: number }> = {
    '1': { color: '1', type: 'Sheer', discountThreshold: 25, discountPercent: 15 },
    '2': { color: '2', type: 'Opaque' },
    '3': { color: '3', type: 'Semi-Sheer', discountThreshold: 30, discountPercent: 10 },
    '4': { color: '1', type: 'Heavy', discountThreshold: 20, discountPercent: 12 },
    '5': { color: '4', type: 'Luxury' },
  };
  return extensions[productId] || { color: '1', type: 'Standard' };
};

export default function NewOrderPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ExtendedProduct[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: ExtendedProduct; quantity: number }[]>([]);
  const [showOrderDemoMessage, setShowOrderDemoMessage] = useState(false);

  const allProducts = getDemoProducts();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    const queryLower = searchQuery.toLowerCase();
    
    // Filter products by name or category (as color proxy)
    const filtered = allProducts
      .filter((p) => 
        p.name.toLowerCase().includes(queryLower) ||
        p.category.toLowerCase().includes(queryLower) ||
        p.code.toLowerCase().includes(queryLower)
      )
      .map((p) => {
        const extensions = getProductExtensions(p.id);
        return {
          ...p,
          ...extensions,
        };
      });

    setSearchResults(filtered);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAddToCart = (product: ExtendedProduct) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev;
      }
      // Fixed demo quantity: 10 m
      return [...prev, { product, quantity: 10 }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    setShowOrderDemoMessage(true);
    setTimeout(() => {
      setShowOrderDemoMessage(false);
    }, 4000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">New order</h1>

      {showOrderDemoMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-medium text-green-800">
            Demo mode – order not actually placed
          </p>
        </div>
      )}

      {/* Product Search Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search product (name or color)
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter product name..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Add
          </button>
        </div>
      </div>

      {/* Selected Products (Inline Cart) */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Selected products</h2>
          {cartItems.length > 0 && (
            <span className="text-xs text-gray-500">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} selected
            </span>
          )}
        </div>

        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">No selected products.</p>
        ) : (
          <>
            <div className="divide-y divide-gray-200 mb-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="py-3 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {item.product.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      Color: {item.product.color || '1'}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-700">
                      <span className="font-medium">Quantity:</span>
                      <span>10 m</span>
                      <span className="text-gray-400">(fixed for demo)</span>
                    </div>
                    {item.product.leadTime === 10 && (
                      <div className="mt-1 text-xs text-yellow-700">
                        Requires accountant approval (10 days lead time)
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFromCart(item.product.id)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Total meters:{' '}
                <span className="font-semibold">{totalQuantity} m</span>
              </div>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  cartItems.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Place order
              </button>
            </div>
          </>
        )}
      </div>

      {/* Search Results Section */}
      {hasSearched && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search results:</h2>
          
          {searchResults.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No products found matching your search.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="divide-y divide-gray-200">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* 1. Product Name */}
                    <h3 className="font-bold text-gray-900 text-base mb-1">
                      {product.name}
                    </h3>

                    {/* 2–4. Basic Details */}
                    <div className="space-y-1 text-sm text-gray-700">
                      <div>
                        <span className="font-medium">Color:</span> {product.color || '1'}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {product.type || 'Standard'}
                      </div>
                      <div>
                        <span className="font-medium">Price per meter:</span>{' '}
                        {product.price.toFixed(2)} PLN / m
                      </div>
                    </div>

                    {/* 5. Optional Discount Info */}
                    {product.discountThreshold && product.discountPercent && (
                      <div className="mt-2 text-xs text-blue-800">
                        For orders from {product.discountThreshold} m, price reduced by {product.discountPercent}%
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Initial State Message */}
      {!hasSearched && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg">
            Use the search above to find products and add them to your order.
          </p>
        </div>
      )}
    </div>
  );
}
