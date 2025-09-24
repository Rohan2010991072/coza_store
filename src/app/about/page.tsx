'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/bg-01.jpg"
            alt="About Hero"
            fill
            className="object-cover opacity-70"
            priority
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold text-white mb-4">About</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">About</span>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
            {/* Left Content */}
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat enim, non 
                auctor massa ultrices non. Morbi sed odio massa. Quisque at vehicula tellus, sed tincidunt augue. 
                Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas 
                varius egestas diam, eu sodales metus scelerisque congue. Pellentesque habitant morbi tristique 
                senectus et netus et malesuada fames ac turpis egestas. Maecenas gravida justo eu arcu egestas 
                convallis. Nullam eu erat bibendum, tempus ipsum eget, dictum enim. Donec non neque ut enim 
                dapibus tincidunt vitae nec augue. Suspendisse potenti. Proin ut est diam. Donec condimentum 
                euismod tortor, eget facilisis diam faucibus et. Morbi a tempor elit.
              </p>
              
              
              <p className="text-gray-600 leading-relaxed">
                Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 
                716 6879
              </p>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-1">
              <div className="relative">
                {/* Photo with border effect */}
                <div className="relative rounded-lg overflow-hidden group border-2 border-gray-200 shadow-[0_0_0_3px_#f3f4f6]">
                  <div className="relative h-96">
                    <Image
                      src="/images/about-01.jpg"
                      alt="About Image 1"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                {/* Decorative stripe behind image */}
                <div className="absolute -top-4 -right-4 w-full h-full bg-gray-200 rounded-lg -z-10"></div>
                {/* Decorative line under image */}
                <div className="flex justify-center mt-4">
                  <div className="w-24 h-0.5 bg-gray-800"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Mission Section - Reversed Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Image - Order 2 on mobile, 1 on desktop */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="relative">
                {/* Photo with border effect */}
                <div className="relative rounded-lg overflow-hidden group border-2 border-gray-200 shadow-[0_0_0_3px_#f3f4f6]">
                  <div className="relative h-96">
                    <Image
                      src="/images/about-02.jpg"
                      alt="About Image 2"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                {/* Decorative stripe behind image */}
                <div className="absolute -top-4 -left-4 w-full h-full bg-gray-300 rounded-lg -z-10"></div>
                {/* Decorative line under image */}
                <div className="flex justify-center mt-4">
                  <div className="w-24 h-0.5 bg-gray-800"></div>
                </div>
              </div>
            </div>

            {/* Right Content - Order 1 on mobile, 2 on desktop */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum rhoncus dignissim risus, sed 
                consectetur erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac 
                turpis egestas. Nullam maximus mauris sit amet odio convallis, in pharetra magna gravida. 
                Praesent sed nunc fermentum mi molestie tempor. Morbi vitae viverra odio. Pellentesque ac velit 
                egestas, luctus arcu non, laoreet mauris. Sed in ipsum tempor, consequat odio in, porttitor ante. Ut 
                mauris ligula, volutpat in sodales in, porta non odio. Pellentesque tempor urna vitae mi vestibulum, 
                nec venenatis nulla lobortis. Proin at gravida ante. Mauris auctor purus at lacus maximus euismod. 
                Pellentesque vulputate massa ut nisl hendrerit, eget elementum libero iaculis.
              </p>

              {/* Quote Section */}
              <div className="border-l-4 border-gray-300 pl-6 py-4 mt-6 bg-gray-50 rounded-r-lg">
                <p className="text-gray-700 italic leading-relaxed mb-4">
                  Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn&apos;t really do it, they just saw something. It seemed obvious to them after a while.
                </p>
                <span className="text-gray-500 text-sm font-medium">
                  - Steve Jobs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
