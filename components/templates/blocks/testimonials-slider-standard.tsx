import React, { useState, useEffect } from 'react';
import { TestimonialsSliderProps, Testimonial } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

export default function TestimonialsSliderStandard({ content }: TestimonialsSliderProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = content?.collections?.testimonial || [];

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  if (!content || testimonials.length === 0) return null;

  const currentTestimonialData = testimonials[currentTestimonial] as Testimonial;

  return (
    <section className="section bg-gradient-to-br from-primary-light to-accent-light">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 animate-fade-in">
              What Our Members Say
            </h2>
            <p className="text-xl text-text-secondary animate-slide-up">
              Hear from the amazing women who are part of our Business Chicks community
            </p>
          </div>

          <div className="relative">
            {/* Main Testimonial Display */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-slide-up">
              <div className="text-center">
                {/* Quote Icon */}
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>

                {/* Testimonial Quote */}
                <blockquote className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-4xl mx-auto">
                  &quot;{currentTestimonialData.quote || 'Business Chicks has been an incredible support system for my business journey.'}&quot;
                </blockquote>

                {/* Testimonial Author */}
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center overflow-hidden">
                    {currentTestimonialData.image?.url ? (
                      <Image
                        src={currentTestimonialData.image.url}
                        alt={currentTestimonialData.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {currentTestimonialData.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-text-primary">
                      {currentTestimonialData.name}
                    </h3>
                    <p className="text-text-secondary">
                      {currentTestimonialData.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            {testimonials.length > 1 && (
              <>
                {/* Previous Button */}
                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text-primary rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text-primary rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Next testimonial"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Testimonial Indicators */}
                <div className="flex justify-center space-x-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentTestimonial
                          ? 'bg-primary scale-125'
                          : 'bg-text-tertiary hover:bg-text-secondary'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-lg text-text-secondary mb-6">
              Ready to join our supportive community?
            </p>
            <Link href="/join" className="btn btn-primary btn-lg hover-lift">
              Become a Member
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}