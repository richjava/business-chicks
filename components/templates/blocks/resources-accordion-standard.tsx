import React, { useState } from 'react';
import { ResourcesAccordionProps, Resource } from '@/lib/types';
import Link from 'next/link';

export default function ResourcesAccordionStandard({ content }: ResourcesAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const resources = content?.collections?.resource || [];

  const toggleItem = (resourceId: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(resourceId)) {
        newSet.delete(resourceId);
      } else {
        newSet.add(resourceId);
      }
      return newSet;
    });
  };

  const isItemOpen = (resourceId: string) => openItems.has(resourceId);

  if (!content || resources.length === 0) return null;

  return (
    <section className="section bg-surface">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 animate-fade-in">
              Business Resources
            </h2>
            <p className="text-xl text-text-secondary animate-slide-up">
              Valuable resources and organizations to help grow your business
            </p>
          </div>

          <div className="space-y-4 animate-slide-up">
            {resources.map((resource: Resource) => {
              const isOpen = isItemOpen(resource._id);
              
              return (
                <div
                  key={resource._id}
                  className="bg-white rounded-xl shadow-md border border-tertiary overflow-hidden transition-all duration-200 hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleItem(resource._id)}
                    className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                    aria-expanded={isOpen}
                    aria-controls={`resource-content-${resource._id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary mb-1">
                          {resource.title || 'Resource'}
                        </h3>
                        {resource.description && (
                          <p className="text-sm text-text-secondary line-clamp-2">
                            {resource.description}
                          </p>
                        )}
                      </div>
                      <div className="ml-4 flex items-center space-x-2">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline" onClick={(e) => e.stopPropagation()}>
                          Visit
                        </a>
                        <div className={`transform transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}>
                          <svg className="w-5 h-5 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>

                  <div
                    id={`resource-content-${resource._id}`}
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-4 border-t border-tertiary">
                      <div className="pt-4">
                        {resource.description && (
                          <div className="prose prose-sm max-w-none">
                            <p className="text-text-secondary leading-relaxed mb-4">
                              {resource.description}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-text-tertiary">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>External Link</span>
                          </div>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm hover-lift">
                            Visit Resource
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                Have a Resource to Share?
              </h3>
              <p className="text-text-secondary mb-6">
                Know of a great business resource that would benefit our community? 
                We&apos;d love to hear about it!
              </p>
              <Link href="/contact" className="btn btn-primary btn-lg hover-lift">
                Suggest a Resource
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}