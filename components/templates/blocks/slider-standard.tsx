import React, { useState, useEffect } from 'react';
import { HomeLandingProps } from '@/lib/types';
import Link from 'next/link';

export default function SliderStandard({ content }: HomeLandingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = content?.collections?.keywordSlide || [];
  const heading = content?.data?.heading || 'Welcome to Business Chicks';

  // removed unused backgroundImages

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  if (!content) return null;

  return (
    <section 
      className="relative min-h-screen bg-background"
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        paddingTop: '6rem'
      }}
    >
      <div className="container">
        {/* Two Column Layout for Entire Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Header and CTA */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
                {heading}
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                A supportive community of women in business who meet monthly to exchange ideas, 
                discuss business issues and build lasting friendships.
              </p>
            </div>

            {/* CTA */}
            <div>
              <Link href="/join" className="btn btn-primary btn-lg">
                Join Our Community
              </Link>
            </div>
          </div>

          {/* Right Column - Slider */}
          {slides.length > 0 && (
            <div className="space-y-6">
              {/* Slider Container */}
              <div className="bg-white border-2 border-primary overflow-hidden">
                {/* Image */}
                <div className="relative h-80 lg:h-96">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gray-200"
                    style={{
                      backgroundImage: `url(${slides[currentSlide].image?.url})`
                    }}
                  />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="text-text-primary">
                    {/* Rotated Keyword */}
                    <h2 
                      className="text-handwritten font-bold text-accent mb-4"
                      style={{
                        fontSize: '3rem',
                        transform: 'rotate(-8deg)',
                        display: 'inline-block',
                        lineHeight: '0.9'
                      }}
                    >
                      {slides[currentSlide]?.keyword}
                    </h2>
                    
                    {/* Phrase positioned below */}
                    {slides[currentSlide]?.phrase && (
                      <p 
                        className="font-medium text-text-secondary"
                        style={{
                          fontSize: '1.5rem',
                          marginTop: '0',
                          fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                        }}
                      >
                        {slides[currentSlide].phrase}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              {slides.length > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  {/* Previous Button */}
                  <button
                    onClick={prevSlide}
                    className="bg-white border-2 border-primary text-text-primary p-3 hover:bg-accent hover:text-white transition-colors duration-200"
                    aria-label="Previous slide"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Slide Indicators */}
                  <div className="flex space-x-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 transition-all duration-200 border-2 ${
                          index === currentSlide
                            ? 'bg-accent border-accent'
                            : 'bg-white border-primary hover:bg-accent hover:border-accent'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={nextSlide}
                    className="bg-white border-2 border-primary text-text-primary p-3 hover:bg-accent hover:text-white transition-colors duration-200"
                    aria-label="Next slide"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}