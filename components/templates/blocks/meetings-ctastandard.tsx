import React from 'react';
import { MeetingsCTAProps } from '@/lib/types';
import { PortableTextRenderer } from '@/lib/portable-text';
import Link from 'next/link';

export default function MeetingsCTA({ content }: MeetingsCTAProps) {
  if (!content) return null;

  const title = content?.data?.title || 'Together through the highs & lows of business';
  const text = content?.data?.text;

  return (
    <section className="section bg-surface">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 animate-fade-in">
              {title}
            </h2>
          </div>

          <div className="bg-white border-2 border-primary p-8 md:p-12 animate-slide-up">
            <div className="prose prose-lg max-w-none">
              {text && <PortableTextRenderer content={text} />}
            </div>

            <div className="mt-8 p-6 bg-secondary border-2 border-accent">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Join Our Supportive Community
                </h3>
              </div>
              <p className="text-text-secondary text-center mb-6">
                Experience the difference of a networking group that truly supports each other&apos;s success.
              </p>
              <div className="text-center">
                <Link href="/join" className="btn btn-primary btn-lg hover-lift">
                  Become a Member
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}