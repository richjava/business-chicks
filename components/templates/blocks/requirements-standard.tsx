import React from 'react';
import { RequirementsProps } from '@/lib/types';
import { PortableTextRenderer } from '@/lib/portable-text';
import Link from 'next/link';

export default function RequirementsStandard({ content }: RequirementsProps) {
  if (!content) return null;

  const requirements = content?.data?.requirements || 'Requirements';
  const text = content?.data?.text;

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 animate-fade-in">
              {requirements}
            </h2>
          </div>

          <div className="bg-surface rounded-2xl shadow-lg p-8 md:p-12 animate-slide-up">
            <div className="prose prose-lg max-w-none">
              {text && <PortableTextRenderer content={text} />}
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 border border-tertiary">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Annual Membership Fee
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary">
                    Annual subscription: <span className="font-semibold text-text-primary">$120.00</span>
                  </p>
                  <p className="text-sm text-text-tertiary">
                    Includes member profile and photo
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">$120</div>
                  <div className="text-sm text-text-tertiary">per year</div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/contact" className="btn btn-primary btn-lg hover-lift">
                Apply for Membership
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}