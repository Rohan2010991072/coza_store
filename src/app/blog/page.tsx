'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight, Calendar, User, MessageSquare } from 'lucide-react';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "8 Inspiring Ways to Wear Dresses in the Winter",
      excerpt: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget dictum tortor. Donec dictum vitae sapien eu varius",
      image: "/images/blog-04.jpg",
      date: "15",
      month: "Sep 2025",
      author: "Admin",
      categories: ["StreetStyle", "Fashion", "Couple"],
      comments: 8
    },
    {
      id: 2,
      title: "The Great Big List of Men's Gifts for the Holidays",
      excerpt: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget dictum tortor. Donec dictum vitae sapien eu varius",
      image: "/images/blog-05.jpg",
      date: "14",
      month: "Sep 2025",
      author: "Admin",
      categories: ["StreetStyle", "Fashion", "Couple"],
      comments: 8
    },
    {
      id: 3,
      title: "5 Winter-to-Spring Fashion Trends to Try Now",
      excerpt: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget dictum tortor. Donec dictum vitae sapien eu varius",
      image: "/images/blog-06.jpg",
      date: "13",
      month: "Sep 2025",
      author: "Admin",
      categories: ["StreetStyle", "Fashion", "Couple"],
      comments: 8
    }
  ];

  // Categories data
  const categories = [
    { name: "All", count: 38 },
    { name: "Women", count: 25 },
    { name: "Men", count: 12 },
    { name: "Bag", count: 8 },
    { name: "Shoes", count: 18 },
    { name: "Watches", count: 7 }
  ];

  // Archive data
  const archive = [
    { month: "Jul 2018", count: 9 },
    { month: "Jun 2018", count: 39 },
    { month: "May 2018", count: 29 },
    { month: "Apr 2018", count: 35 },
    { month: "Mar 2018", count: 40 },
    { month: "Feb 2018", count: 4 },
    { month: "Jan 2018", count: 62 }
  ];

  // Tags
  const tags = ["Fashion", "Lifestyle", "Denim", "Streetstyle", "Crafts"];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Blog</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Blog Posts - Left Column */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts</h2>
              <div className="space-y-12">
                {blogPosts.map((post) => (
                  <article key={post.id} className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    {/* Featured Image */}
                    <div className="relative w-full h-80 overflow-hidden">
                      <Link href={`/blog/${post.id}`}>
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          priority={post.id === 1}
                        />
                      </Link>
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      {/* Post Meta */}
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>By {post.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date} {post.month}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments} Comments</span>
                        </div>
                      </div>

                      {/* Post Title */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-600 transition-colors">
                        <Link href={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h2>

                      {/* Post Excerpt */}
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {post.excerpt}
                      </p>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.categories.map((category) => (
                          <span
                            key={category}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                          >
                            {category}
                          </span>
                        ))}
                      </div>

                      {/* Read More Button */}
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                      >
                        CONTINUE READING
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:col-span-1">
              <div className="space-y-12">
                {/* Search */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Categories</h3>
                  <ul className="space-y-3">
                    {categories.map((category) => (
                      <li key={category.name} className="flex justify-between items-center">
                        <Link
                          href={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {category.name}
                        </Link>
                        <span className="text-gray-400 text-sm">({category.count})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recent Posts */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Posts</h3>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="flex space-x-4">
                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors leading-tight">
                            <Link href={`/blog/${post.id}`}>
                              {post.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {post.date} {post.month}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Archive */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Archive</h3>
                  <ul className="space-y-2">
                    {archive.map((item) => (
                      <li key={item.month} className="flex justify-between">
                        <Link
                          href={`/blog/archive/${item.month.toLowerCase().replace(' ', '-')}`}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {item.month}
                        </Link>
                        <span className="text-gray-500">({item.count})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag.toLowerCase()}`}
                        className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;