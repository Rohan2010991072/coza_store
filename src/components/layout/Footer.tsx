import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">CATEGORIES</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/products?category=women" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Women
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=men" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=shoes" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Shoes
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=watches" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Watches
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">HELP</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/track-order" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="text-gray-300 hover:text-white transition-colors duration-200">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get in Touch */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">GET IN TOUCH</h4>
              <div className="text-gray-300 text-sm leading-relaxed">
                <p>Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879</p>
                <div className="flex space-x-4 mt-6">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">NEWSLETTER</h4>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition-colors duration-200">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Icons & Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Payment Icons */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex space-x-3">
                <Image
                  src="/images/icons/icon-pay-01.png"
                  alt="PayPal"
                  width={38}
                  height={24}
                  className="object-contain"
                />
                <Image
                  src="/images/icons/icon-pay-02.png"
                  alt="Visa"
                  width={38}
                  height={24}
                  className="object-contain"
                />
                <Image
                  src="/images/icons/icon-pay-03.png"
                  alt="Mastercard"
                  width={38}
                  height={24}
                  className="object-contain"
                />
                <Image
                  src="/images/icons/icon-pay-04.png"
                  alt="American Express"
                  width={38}
                  height={24}
                  className="object-contain"
                />
                <Image
                  src="/images/icons/icon-pay-05.png"
                  alt="Discover"
                  width={38}
                  height={24}
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left">
              Copyright ©2025 All rights reserved | This template is made with ♥ by{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Colorlib
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;