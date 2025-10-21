import React from 'react';
import Link from 'next/link';
import { FooterProps } from '@/lib/types';

export default function Footer1({ content }: FooterProps) {
  const currentYear = new Date().getFullYear();

  if (!content) return null;

  return (
    <footer className="bg-surface border-t-2 border-primary">
      <div className="container">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="text-xl font-bold text-primary">
                Business Chicks
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                A supportive community of women in business who meet monthly to exchange ideas, 
                discuss business issues and build lasting friendships.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-text-primary font-semibold">Quick Links</h3>
              <nav className="space-y-2">
                <Link href="/" className="block text-text-secondary hover:text-accent transition-colors duration-200">
                  Home
                </Link>
                <Link href="/join" className="block text-text-secondary hover:text-accent transition-colors duration-200">
                  Join Us
                </Link>
                <Link href="/our-meetings" className="block text-text-secondary hover:text-accent transition-colors duration-200">
                  Our Meetings
                </Link>
                <Link href="/resources" className="block text-text-secondary hover:text-accent transition-colors duration-200">
                  Resources
                </Link>
                <Link href="/contact" className="block text-text-secondary hover:text-accent transition-colors duration-200">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-text-primary font-semibold">Get In Touch</h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>First Wednesday of each month</p>
                <p>12:00 PM - 1:30 PM</p>
                <p>Tomi Japanese Restaurant</p>
                <p>Edgeware Mall, Christchurch</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-primary py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-text-tertiary">
              © {currentYear} Business Chicks. All rights reserved.
            </div>
            <div className="text-sm text-text-tertiary">
              Built with{' '}
              <a 
                href="https://builtjs.com" 
                className="text-accent hover:text-primary transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Built
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}