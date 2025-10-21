import React from 'react';
import { InfoProps } from '@/lib/types';
import { PortableTextRenderer } from '@/lib/portable-text';

export default function InfoStandard({ content }: InfoProps) {
  if (!content) return null;

  const title = content?.data?.title || 'When & Where?';
  const blurb = content?.data?.blurb || '';
  const text = content?.data?.text;
  const locationLat = content?.data?.locationLat;
  const locationLng = content?.data?.locationLng;

  // Default coordinates for Tomi Japanese Restaurant, Edgeware Mall, Christchurch
  const defaultLat = -43.5321;
  const defaultLng = 172.6362;
  
  const mapLat = parseFloat(String(locationLat ?? '')) || defaultLat;
  const mapLng = parseFloat(String(locationLng ?? '')) || defaultLng;

  // Calculate bounding box for the map view
  const latOffset = 0.01;
  const lngOffset = 0.01;
  const bbox = `${mapLng - lngOffset},${mapLat - latOffset},${mapLng + lngOffset},${mapLat + latOffset}`;

  return (
    <section className="section bg-surface">
      <div className="container">
        <div className="max-w-6xl mx-auto">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Meeting Information */}
            <div className="bg-white border-2 border-primary p-8 animate-slide-up">
              <div className="prose prose-lg max-w-none">
                {text && <PortableTextRenderer content={text} />}
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Meeting Time</h3>
                    <p className="text-text-secondary">12:00 PM - 1:30 PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Meeting Day</h3>
                    <p className="text-text-secondary">First Wednesday of each month</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Location</h3>
                    <p className="text-text-secondary">Tomi Japanese Restaurant</p>
                    <p className="text-sm text-text-tertiary">Edgeware Mall, Christchurch</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white border-2 border-primary p-8 animate-slide-up">
              <h3 className="text-xl font-semibold text-text-primary mb-6">
                Meeting Location
              </h3>
              
              {/* OpenStreetMap Embed */}
              <div className="border-2 border-primary h-64 mb-6 overflow-hidden">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${mapLat},${mapLng}`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title="Meeting Location Map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-secondary border-2 border-primary">
                  <h4 className="font-semibold text-text-primary mb-2">Getting There</h4>
                  <p className="text-sm text-text-secondary">
                    Located in Edgeware Mall, easily accessible by car or public transport. 
                    Free parking available in the mall.
                  </p>
                </div>

                <div className="p-4 bg-secondary border-2 border-accent">
                  <h4 className="font-semibold text-text-primary mb-2">RSVP Required</h4>
                  <p className="text-sm text-text-secondary">
                    Please send your apologies to the secretary 24 hours before the meeting 
                    if you cannot attend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}