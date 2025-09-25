'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  titleAnimation: string;
  subtitleAnimation: string;
  buttonAnimation: string;
  titleDelay: number;
  subtitleDelay: number;
  buttonDelay: number;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: '/images/slide-01.jpg',
    title: 'Women Collection 2025',
    subtitle: 'NEW SEASON',
    titleAnimation: 'animate-fadeInDown',
    subtitleAnimation: 'animate-fadeInUp',
    buttonAnimation: 'animate-zoomIn',
    titleDelay: 0,
    subtitleDelay: 800,
    buttonDelay: 1600
  },
  {
    id: 2,
    image: '/images/slide-02.jpg',
    title: 'Men New-Season',
    subtitle: 'Jackets & Coats',
    titleAnimation: 'animate-rollIn',
    subtitleAnimation: 'animate-lightSpeedIn',
    buttonAnimation: 'animate-slideInUp',
    titleDelay: 0,
    subtitleDelay: 800,
    buttonDelay: 1600
  },
  {
    id: 3,
    image: '/images/slide-03.jpg',
    title: 'Men Collection 2025',
    subtitle: 'New arrivals',
    titleAnimation: 'animate-rotateInDownLeft',
    subtitleAnimation: 'animate-rotateInUpRight',
    buttonAnimation: 'animate-rotateIn',
    titleDelay: 0,
    subtitleDelay: 800,
    buttonDelay: 1600
  }
];

export function AnimatedSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Force re-render of animations when slide changes
  const resetAnimations = useCallback(() => {
    setAnimationKey(prev => prev + 1);
  }, []);

  useEffect(() => {
    resetAnimations();
  }, [currentSlide, resetAnimations]);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Increased to 6 seconds to allow animations to complete

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = useCallback(() => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlay(true), 5000);
  }, []);

  const prevSlide = useCallback(() => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlay(true), 5000);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setIsAutoPlay(false);
    setCurrentSlide(index);
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlay(true), 5000);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden group">
      {/* Background Images */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover scale-105 transition-transform duration-[10000ms] ease-out"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center h-full text-center text-white max-w-4xl mx-auto">
            
            {/* Title */}
            <div 
              key={`title-${animationKey}`}
              className={`mb-4 ${currentSlideData.titleAnimation}`}
              style={{ 
                animationDelay: `${currentSlideData.titleDelay}ms`, 
                animationDuration: '1000ms',
                animationFillMode: 'both'
              }}
            >
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light tracking-widest uppercase opacity-90">
                {currentSlideData.title}
              </span>
            </div>

            {/* Subtitle */}
            <div 
              key={`subtitle-${animationKey}`}
              className={`mb-8 sm:mb-10 lg:mb-12 ${currentSlideData.subtitleAnimation}`}
              style={{ 
                animationDelay: `${currentSlideData.subtitleDelay}ms`, 
                animationDuration: '1000ms',
                animationFillMode: 'both'
              }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                {currentSlideData.subtitle}
              </h2>
            </div>

            {/* Shop Now Button */}
            <div 
              key={`button-${animationKey}`}
              className={`${currentSlideData.buttonAnimation}`}
              style={{ 
                animationDelay: `${currentSlideData.buttonDelay}ms`, 
                animationDuration: '1000ms',
                animationFillMode: 'both'
              }}
            >
              <Link 
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 bg-white text-black font-semibold text-base sm:text-lg tracking-wide uppercase hover:bg-gray-100 transition-all duration-300 border border-white hover:border-gray-300 hover:shadow-lg transform hover:scale-105"
              >
                Shop Now
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/30 p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/30 p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 border border-white/30 ${
              index === currentSlide 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/40 hover:bg-white/70 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-10">
        <div 
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{
            width: isAutoPlay ? `${((currentSlide + 1) / slides.length) * 100}%` : '0%'
          }}
        />
      </div>
    </section>
  );
}