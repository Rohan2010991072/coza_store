'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeItem, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { items, total, itemCount, shipping, tax, grandTotal } = useAppSelector((state) => state.cart);

  const handleUpdateQuantity = (id: string, quantity: number, size?: string, color?: string) => {
    dispatch(updateQuantity({ id, quantity, size, color }));
  };

  const handleRemoveItem = (id: string, size?: string, color?: string) => {
    dispatch(removeItem({ id, size, color }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
            <div className="bg-white rounded-lg shadow p-12">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Add some products to get started</p>
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-gray-600">{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                  <button
                    onClick={handleClearCart}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-4 pb-6 border-b border-gray-200 last:border-b-0">
                      <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                        {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                        {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                        <p className="text-lg font-semibold text-gray-900 mt-2">${item.price}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-lg font-medium text-gray-900 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-50"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900 mb-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/checkout"
                  className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium text-center block hover:bg-gray-800 transition-colors duration-200"
                >
                  Proceed to Checkout
                </Link>
                
                <Link
                  href="/"
                  className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg font-medium text-center block hover:bg-gray-200 transition-colors duration-200"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;