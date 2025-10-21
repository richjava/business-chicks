import React from 'react';
import { MembershipProps } from '@/lib/types';
import { PortableTextRenderer } from '@/lib/portable-text';
import Link from 'next/link';

export default function Membership({ content }: MembershipProps) {
  if (!content) return null;

  const title = content?.data?.title || 'Membership';
  const blurb = content?.data?.blurb || '';
  const text = content?.data?.text;

  return (
    <section className="section bg-surface">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 animate-fade-in">
              {title}
            </h2>
            {blurb && (
              <p className="text-xl text-text-secondary animate-slide-up">
                {blurb}
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 animate-slide-up">
            <div className="prose prose-lg max-w-none">
              {text && <PortableTextRenderer content={text} />}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary-light rounded-xl p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Ready to Join?
                </h3>
                <p className="text-text-secondary mb-4">
                  Come to 2 meetings to see if Business Chicks is right for you and your business.
                </p>
                <Link href="/contact" className="btn btn-primary hover-lift">
                  Get Started
                </Link>
              </div>

              <div className="bg-accent-light rounded-xl p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Supportive Environment
                </h3>
                <p className="text-text-secondary mb-4">
                  We focus on support and growth rather than hard networking. 
                  Multiple businesses in the same field are welcome.
                </p>
                <Link href="/our-meetings" className="btn btn-accent hover-lift">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}