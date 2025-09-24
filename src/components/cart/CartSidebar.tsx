'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { closeCart, removeItem, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

const CartSidebar = () => {
  const dispatch = useAppDispatch();
  const { items, isOpen, total, itemCount } = useAppSelector((state) => state.cart);

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const handleRemoveItem = (id: string, size?: string, color?: string) => {
    dispatch(removeItem({ id, size, color }));
  };

  const handleUpdateQuantity = (id: string, quantity: number, size?: string, color?: string) => {
    dispatch(updateQuantity({ id, quantity, size, color }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={handleCloseCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Shopping Cart ({itemCount})
            </h2>
            <button
              onClick={handleCloseCart}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Add some items to get started
                </p>
                <Link
                  href="/products"
                  onClick={handleCloseCart}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image.startsWith('/') ? item.image : `/${item.image}`}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">N{item.price.toLocaleString()}</p>
                      {item.size && <p className="text-xs text-gray-400">Size: {item.size}</p>}
                      {item.color && <p className="text-xs text-gray-400">Color: {item.color}</p>}
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="mx-3 text-sm font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <button
                        onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200 mb-2"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <p className="text-sm font-medium text-gray-900">
                        N{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Clear Cart Button */}
                {items.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="w-full text-sm text-gray-500 hover:text-red-500 transition-colors duration-200 py-2"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-lg font-semibold text-gray-900">
                  N{total.toLocaleString()}
                </span>
              </div>
              
              <div className="space-y-3">
                <Link
                  href="/cart"
                  onClick={handleCloseCart}
                  className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg font-medium text-center block hover:bg-gray-200 transition-colors duration-200"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={handleCloseCart}
                  className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium text-center block hover:bg-gray-800 transition-colors duration-200"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;