'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Product } from '@/types';
import { Heart, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('Women');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayCount, setDisplayCount] = useState(8);

  const slides = [
    {
      image: '/images/slide-01.jpg',
      title: 'Women Collection 2025',
      subtitle: 'New arrivals'
    },
    {
      image: '/images/slide-02.jpg', 
      title: 'Men Collection 2025',
      subtitle: 'Spring Collection'
    },
    {
      image: '/images/slide-03.jpg',
      title: 'Accessories',
      subtitle: 'Now Trend'
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
          setFilteredProducts(data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    
    if (activeFilter !== 'Women' && activeFilter !== 'Men' && activeFilter !== 'Shoes' && activeFilter !== 'Watches') {
      // Show all if filter is not one of the main categories
    } else {
      // Filter by category - you'll need to implement proper category filtering based on your data structure
      // For now, showing all products
    }

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered.slice(0, displayCount));
  }, [products, activeFilter, searchTerm, displayCount]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Slider Section */}
      <section className="relative h-screen overflow-hidden group">
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden by default, visible on hover */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>
      </section>

      {/* Category Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Women Category */}
            <Link href="/products?category=women" className="group relative overflow-hidden rounded-lg">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/images/banner-01.jpg"
                  alt="Women Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-4xl font-bold mb-2">Women</h3>
                  <p className="text-lg opacity-90">Spring 2025</p>
                </div>
              </div>
            </Link>

            {/* Men Category */}
            <Link href="/products?category=men" className="group relative overflow-hidden rounded-lg">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/images/banner-02.jpg"
                  alt="Men Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-4xl font-bold mb-2">Men</h3>
                  <p className="text-lg opacity-90">Spring 2025</p>
                </div>
              </div>
            </Link>

            {/* Accessories Category */}
            <Link href="/products?category=accessories" className="group relative overflow-hidden rounded-lg">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/images/banner-03.jpg"
                  alt="Accessories Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-4xl font-bold mb-2">Accessories</h3>
                  <p className="text-lg opacity-90">Now Trend</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 tracking-wide">
              PRODUCT OVERVIEW
            </h2>
          </div>

          {/* Filter Tabs and Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex space-x-8 mb-4 md:mb-0">
              {['Women', 'Men', 'Shoes', 'Watches'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-lg font-medium transition-colors duration-200 ${
                    activeFilter === filter
                      ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {filteredProducts.map((product) => (
              <div key={product._id.$oid} className="group relative">
                <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
                  <Image
                    src={`/${product.image}`}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Heart Icon */}
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 hover:text-gray-600 transition-colors">
                    <Link href={`/products/${product._id.$oid}`}>
                      {product.name}
                    </Link>
                  </h3>
                  
                  <p className="text-lg font-semibold text-gray-900">
                    N{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center">
            <button 
              onClick={() => setDisplayCount(prev => prev + 8)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-full font-medium transition-colors duration-200"
            >
              LOAD MORE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
