'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search, User } from 'lucide-react';
import { useParams } from 'next/navigation';

const BlogDetailPage = () => {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  // Mock blog posts data
  const blogPosts = {
    1: {
      id: 1,
      title: "8 Inspiring Ways to Wear Dresses in the Winter",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet est vel orci luctus sollicitudin. Duis eleifend vestibulum justo, varius semper lacus condimentum dictum. Donec pulvinar a magna ut molestada. In posuere felis diam, vel sodales metus accumsan in. Duis viverra dui eu pharetra pellentesque. Donec a eros leo. Quisque sed ligula vitae lorem efficitur faucibus. Praesent sit amet imperdiet ante. Nulla id tellus auctor, dictum libero a, malesuada nisl. Nulla in porta nibh, id vestibulum ipsum. Praesent dapibus tempus erat quis dapibus.

Praesent vel mi bibendum, finibus leo ac, condimentum arcu. Pellentesque sem ex, tristique sit amet suscipit in, mattis imperdiet enim. Integer tempus justo nec velit fringilla, eget eleifend neque blandit. Sed tempor magna sed congue auctor. Mauris eu turpis eget tortor ultrices elementum. Phasellus vel placerat orci, a venenatis justo. Phasellus faucibus venenatis nisl vitae vestibulum. Praesent id nibh arcu. Vivamus sagittis accumsan felis, quis vulputate`,
      image: "/images/blog-04.jpg",
      date: "22",
      month: "Sep 2025",
      author: "Admin",
      categories: ["StreetStyle", "Fashion", "Couple"],
      comments: 8,
      tags: ["Streetstyle", "Crafts"]
    },
    2: {
      id: 2,
      title: "The Great Big List of Men's Gifts for the Holidays",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet est vel orci luctus sollicitudin. Duis eleifend vestibulum justo, varius semper lacus condimentum dictum. Donec pulvinar a magna ut molestada. In posuere felis diam, vel sodales metus accumsan in. Duis viverra dui eu pharetra pellentesque. Donec a eros leo. Quisque sed ligula vitae lorem efficitur faucibus. Praesent sit amet imperdiet ante. Nulla id tellus auctor, dictum libero a, malesuada nisl. Nulla in porta nibh, id vestibulum ipsum. Praesent dapibus tempus erat quis dapibus.

Praesent vel mi bibendum, finibus leo ac, condimentum arcu. Pellentesque sem ex, tristique sit amet suscipit in, mattis imperdiet enim. Integer tempus justo nec velit fringilla, eget eleifend neque blandit. Sed tempor magna sed congue auctor. Mauris eu turpis eget tortor ultrices elementum. Phasellus vel placerat orci, a venenatis justo. Phasellus faucibus venenatis nisl vitae vestibulum. Praesent id nibh arcu. Vivamus sagittis accumsan felis, quis vulputate`,
      image: "/images/blog-05.jpg",
      date: "18",
      month: "Sep 2025",
      author: "Admin",
      categories: ["StreetStyle", "Fashion", "Couple"],
      comments: 8,
      tags: ["Streetstyle", "Crafts"]
    },
    3: {
      id: 3,
      title: "5 Winter-to-Spring Fashion Trends to Try Now",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet est vel orci luctus sollicitudin. Duis eleifend vestibulum justo, varius semper lacus condimentum dictum. Donec pulvinar a magna ut molestada. In posuere felis diam, vel sodales metus accumsan in. Duis viverra dui eu pharetra pellentesque. Donec a eros leo. Quisque sed ligula vitae lorem efficitur faucibus. Praesent sit amet imperdiet ante. Nulla id tellus auctor, dictum libero a, malesuada nisl. Nulla in porta nibh, id vestibulum ipsum. Praesent dapibus tempus erat quis dapibus.

Praesent vel mi bibendum, finibus leo ac, condimentum arcu. Pellentesque sem ex, tristique sit amet suscipit in, mattis imperdiet enim. Integer tempus justo nec velit fringilla, eget eleifend neque blandit. Sed tempor magna sed congue auctor. Mauris eu turpis eget tortor ultrices elementum. Phasellus vel placerat orci, a venenatis justo. Phasellus faucibus venenatis nisl vitae vestibulum. Praesent id nibh arcu. Vivamus sagittis accumsan felis, quis vulputate`,
      image: "/images/blog-06.jpg",
      date: "16",
      month: "Sep 2025",
      author: "Admin",
      categories: ["StreetStyle", "Fashion", "Couple"],
      comments: 8,
      tags: ["Streetstyle", "Crafts"]
    }
  };

  const currentPost = blogPosts[Number(params.id) as keyof typeof blogPosts];

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

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ comment, name, email, website });
    // Reset form
    setComment('');
    setName('');
    setEmail('');
    setWebsite('');
  };

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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
            <Link href="/blog" className="text-gray-500 hover:text-gray-700">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{currentPost.title}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2">
              {/* Blog Post Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {currentPost.title}
                </h1>
                
                <div className="flex items-center space-x-6 text-gray-600 mb-8">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>By {currentPost.author}</span>
                  </div>
                  <span>{currentPost.date} {currentPost.month}</span>
                  <span>{currentPost.comments} Comments</span>
                </div>

                <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={currentPost.image}
                    alt={currentPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Blog Content */}
              <div className="prose prose-lg max-w-none mb-12">
                {currentPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="mb-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {currentPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="border-t border-gray-200 pt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Leave a Comment</h2>
                
                <form onSubmit={handleCommentSubmit} className="space-y-6">
                  {/* Comment Textarea */}
                  <div>
                    <textarea
                      placeholder="Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <input
                      type="url"
                      placeholder="Website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                    >
                      POST COMMENT
                    </button>
                  </div>
                </form>
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
                      <li key={category.name}>
                        <Link
                          href={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recent Posts */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Posts</h3>
                  <div className="space-y-4">
                    {Object.values(blogPosts).map((post) => (
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

export default BlogDetailPage;