'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { openCart } from '@/store/slices/cartSlice';
import { logout } from '@/store/slices/userSlice';
import { ShoppingBag, Search, Menu, X, User, UserCircle, LogOut, Settings } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { itemCount } = useAppSelector((state) => state.cart);
  const { currentUser, isAuthenticated } = useAppSelector((state) => state.user);

  const handleOpenCart = () => {
    dispatch(openCart());
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      {/* <div className="bg-gray-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-white">
              Free shipping for standard order over $100
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/help" className="text-white hover:text-gray-300">
                Help & FAQs
              </Link>
              <Link href="/account" className="text-white hover:text-gray-300">
                My Account
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-white">EN</span>
                <span className="text-gray-400">|</span>
                <span className="text-white">USD</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                COZA <span className="font-normal">STORE</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <Search className="h-5 w-5" />
              </button>

              {/* Cart */}
              <button
                onClick={handleOpenCart}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Account */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    <UserCircle className="h-5 w-5" />
                    <span className="hidden md:block text-sm font-medium">
                      {currentUser?.firstName || 'Account'}
                    </span>
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {currentUser?.firstName} {currentUser?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{currentUser?.email}</p>
                        </div>
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Profile Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="hidden md:block px-5 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-gray-900 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;