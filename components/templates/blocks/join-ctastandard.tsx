import React from 'react';
import { JoinCTAProps } from '@/lib/types';
import { PortableTextRenderer } from '@/lib/portable-text';
import Link from 'next/link';

export default function JoinCTA({ content }: JoinCTAProps) {
  if (!content) return null;

  const title = content?.data?.title || 'Where business women get real answers';
  const ctaText = content?.data?.ctaText || 'What are you waiting for? Join our group today!';
  const questions = content?.data?.questions || [];
  const text1 = content?.data?.text1;
  const text2 = content?.data?.text2;

  return (
    <section className="section bg-secondary">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 animate-fade-in">
              {title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Story */}
            <div className="space-y-6 animate-slide-up">
              <div className="bg-white border-2 border-primary p-8">
                <h3 className="text-2xl font-semibold text-text-primary mb-4">
                  Our Story
                </h3>
                {text1 && <PortableTextRenderer content={text1} />}
              </div>

              <div className="bg-white border-2 border-primary p-8">
                <h3 className="text-2xl font-semibold text-text-primary mb-4">
                  Making a Difference
                </h3>
                {text2 && <PortableTextRenderer content={text2} />}
              </div>
            </div>

            {/* Right Column - Questions & CTA */}
            <div className="space-y-6 animate-slide-up">
              <div className="bg-white border-2 border-primary p-8">
                <h3 className="text-2xl font-semibold text-text-primary mb-6">
                  Are you asking yourself these questions?
                </h3>
                
                {questions.length > 0 && (
                  <div className="space-y-4 mb-8">
                    {questions.map((question: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <p className="text-text-secondary leading-relaxed">{question}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-primary border-2 border-accent p-6 text-center">
                  <h4 className="text-xl font-semibold text-white mb-4">
                    {ctaText}
                  </h4>
                  <div className="space-y-3">
                    <Link
                      href="/join"
                      className="btn bg-white text-primary hover:bg-accent hover:text-white btn-lg hover-lift block"
                    >
                      Join Business Chicks
                    </Link>
                    <Link
                      href="/contact"
                      className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary btn-lg hover-lift block"
                    >
                      Get in Touch
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}