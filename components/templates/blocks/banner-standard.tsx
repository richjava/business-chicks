import React from 'react';
import { BannerProps } from '@/lib/types';

export default function BannerStandard({ content }: BannerProps) {
  if (!content) return null;

  const title = content?.data?.title || '';

  return (
    <section 
      className="py-8 bg-background"
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)'
      }}
    >
      <div className="container">
        <div className="text-center">
          {/* Minimal Swiss Design Banner */}
          <div className="bg-white border-2 border-primary p-6">
            <h1 className="text-2xl md:text-4xl font-bold text-primary mb-3 tracking-tight">
              {title}
            </h1>
            
            {/* Minimal horizontal line */}
            <div className="w-20 h-0.5 bg-primary mx-auto"></div>
          </div>
        </div>
      </div>
    </section>
  );
}