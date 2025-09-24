'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Heart, X } from 'lucide-react';
import { Product } from '@/types';

interface FilterState {
  sortby: string;
  price: string;
  color: string;
  tags: string;
  search: string;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);
  
  const [filters, setFilters] = useState<FilterState>({
    sortby: 'default',
    price: 'all',
    color: 'all',
    tags: 'all',
    search: ''
  });

  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    const initialSearch = searchParams.get('search') || '';
    const initialCategory = searchParams.get('category') || '';
    
    if (initialSearch || initialCategory) {
      setFilters(prev => ({
        ...prev,
        search: initialSearch,
        // You can map category to tags if needed
        tags: initialCategory === 'women' ? 'fashion' : 
              initialCategory === 'men' ? 'streetstyle' : 'all'
      }));
    }
  }, [searchParams]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
          setFilteredProducts(data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Price filter
    if (filters.price !== 'all') {
      switch (filters.price) {
        case 'price1':
          filtered = filtered.filter(product => product.price >= 0 && product.price <= 2000);
          break;
        case 'price2':
          filtered = filtered.filter(product => product.price > 2000 && product.price <= 4000);
          break;
        case 'price3':
          filtered = filtered.filter(product => product.price > 4000);
          break;
      }
    }

    // Color filter (based on product name/description)
    if (filters.color !== 'all') {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(filters.color.toLowerCase()) ||
        product.description?.toLowerCase().includes(filters.color.toLowerCase())
      );
    }

    // Tags filter (based on product description/brand)
    if (filters.tags !== 'all') {
      filtered = filtered.filter(product =>
        product.description?.toLowerCase().includes(filters.tags.toLowerCase()) ||
        product.brand?.toLowerCase().includes(filters.tags.toLowerCase())
      );
    }

    // Sort products
    switch (filters.sortby) {
      case 'newness':
        filtered.sort((a, b) => new Date(b.dateCreated.$date).getTime() - new Date(a.dateCreated.$date).getTime());
        break;
      case 'lowhigh':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'highlow':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        // Default sorting (by featured, then by name)
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return a.name.localeCompare(b.name);
        });
    }

    setFilteredProducts(filtered);
  }, [products, filters]);

  // Search suggestions
  const handleSearchChange = useCallback(async (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
    
    if (value.length >= 2) {
      try {
        // Filter from existing products for autocomplete
        const suggestions = products.filter(product =>
          product.name?.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 5);
        setSearchSuggestions(suggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setShowSuggestions(false);
    }
  }, [products]);

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({
      sortby: 'default',
      price: 'all',
      color: 'all',
      tags: 'all',
      search: ''
    });
  };

  const addToWishlist = (productId: string) => {
    // Implement wishlist functionality
    console.log('Add to wishlist:', productId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="pb-10">
          <h1 className="text-4xl font-light text-gray-900 tracking-wide">
            Product Overview
          </h1>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-12">
          {/* Filter Button */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-none hover:bg-gray-100 transition-colors"
          >
            {showFilter ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
            <span>Filter</span>
          </button>

          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-none hover:bg-gray-100 transition-colors"
          >
            {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            <span>Search</span>
          </button>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Search Panel */}
        {showSearch && (
          <div className="mb-8 p-6 bg-white border border-gray-200">
            <div className="relative max-w-md">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search product, brand or category..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              
              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 border-t-0 max-h-60 overflow-y-auto z-10">
                  {searchSuggestions.map((product) => (
                    <Link
                      key={product._id.$oid}
                      href={`/products/${product._id.$oid}`}
                      className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      onClick={() => setShowSuggestions(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12">
                          <Image
                            src={product.image.startsWith('/') ? product.image : `/${product.image}`}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-600">N{product.price.toLocaleString()}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Filter Panel */}
        {showFilter && (
          <div className="mb-8 p-6 bg-white border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Sort By */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Sort By</h4>
                <div className="space-y-3">
                  {[
                    { value: 'default', label: 'Default' },
                    { value: 'newness', label: 'Newness' },
                    { value: 'lowhigh', label: 'Price: Low to High' },
                    { value: 'highlow', label: 'Price: High to Low' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="sortby"
                        value={option.value}
                        checked={filters.sortby === option.value}
                        onChange={(e) => handleFilterChange('sortby', e.target.value)}
                        className="text-gray-900 focus:ring-gray-500"
                      />
                      <span className="text-gray-700 hover:text-gray-900 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Price</h4>
                <div className="space-y-3">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'price1', label: 'N 0.00 - N 2,000.00' },
                    { value: 'price2', label: 'N 2,000.00 - N 4,000.00' },
                    { value: 'price3', label: 'N 4,000.00+' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value={option.value}
                        checked={filters.price === option.value}
                        onChange={(e) => handleFilterChange('price', e.target.value)}
                        className="text-gray-900 focus:ring-gray-500"
                      />
                      <span className="text-gray-700 hover:text-gray-900 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Color</h4>
                <div className="space-y-3">
                  {[
                    { value: 'all', label: 'All', color: null },
                    { value: 'black', label: 'Black', color: '#222' },
                    { value: 'blue', label: 'Blue', color: '#4272d7' },
                    { value: 'brown', label: 'Brown', color: 'hsl(0, 59%, 20%)' },
                    { value: 'white', label: 'White', color: '#ffffff' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        value={option.value}
                        checked={filters.color === option.value}
                        onChange={(e) => handleFilterChange('color', e.target.value)}
                        className="text-gray-900 focus:ring-gray-500"
                      />
                      {option.color && (
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: option.color }}
                        />
                      )}
                      <span className="text-gray-700 hover:text-gray-900 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'fashion', label: 'Fashion' },
                    { value: 'lifestyle', label: 'Lifestyle' },
                    { value: 'denim', label: 'Denim' },
                    { value: 'streetstyle', label: 'Streetstyle' }
                  ].map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="tags"
                        value={option.value}
                        checked={filters.tags === option.value}
                        onChange={(e) => handleFilterChange('tags', e.target.value)}
                        className="sr-only"
                      />
                      <span className={`inline-block px-4 py-2 border border-gray-300 text-sm transition-colors ${
                        filters.tags === option.value
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {filteredProducts.slice(0, displayCount).map((product) => (
            <div key={product._id.$oid} className="group bg-white">
              <div className="relative overflow-hidden aspect-square mb-4">
                <Image
                  src={product.image.startsWith('/') ? product.image : `/${product.image}`}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Quick View Button */}
                <Link
                  href={`/products/${product._id.$oid}`}
                  className="absolute inset-x-4 bottom-4 bg-white text-gray-900 py-3 px-6 text-center font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
                >
                  Quick View
                </Link>
              </div>

              <div className="flex justify-between items-start p-4">
                <div className="flex-1">
                  <Link
                    href={`/products/${product._id.$oid}`}
                    className="block font-medium text-gray-900 hover:text-gray-600 transition-colors mb-2"
                  >
                    {product.name}
                  </Link>
                  <p className="text-lg font-semibold text-gray-900">
                    N{product.price.toLocaleString()}
                  </p>
                </div>
                
                <button
                  onClick={() => addToWishlist(product._id.$oid)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors group/heart"
                >
                  <Heart className="h-5 w-5 text-gray-600 group-hover/heart:text-red-500 transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayCount < filteredProducts.length && (
          <div className="text-center">
            <button
              onClick={() => setDisplayCount(prev => prev + 12)}
              className="px-8 py-4 bg-gray-200 text-gray-900 font-medium hover:bg-gray-300 transition-colors"
            >
              Load More
            </button>
          </div>
        )}

        {/* No Products Found */}
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}