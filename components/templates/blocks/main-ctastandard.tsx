import React from 'react';
import { MainCTAProps } from '@/lib/types';
import Link from 'next/link';

export default function MainCTA({ content }: MainCTAProps) {
  if (!content) return null;

  const title = content?.data?.title || 'Business networking with a difference';
  const blurb = content?.data?.blurb || '';

  return (
    <section className="section bg-primary">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border-2 border-accent p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 animate-fade-in">
              {title}
            </h2>
            
            {blurb && (
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 animate-slide-up">
                {blurb}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/join" className="btn btn-primary btn-lg hover-lift">
                Join Business Chicks
              </Link>
              <Link href="/our-meetings" className="btn btn-accent btn-lg hover-lift">
                Learn About Our Meetings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}