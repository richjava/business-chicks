import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HeaderProps, NavigationItem } from '@/lib/types';

export default function Header1({ content }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navigationItems = content?.collections?.navigationItem || [];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (url: string) => {
    return router.pathname === url;
  };

  if (!content) return null;

  return (
    <header className="bg-background border-b-2 border-primary sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-primary">
                Business Chicks
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item: NavigationItem) => (
              <Link
                key={item._id}
                href={item.url}
                className={`nav-link ${
                  isActiveLink(item.url) ? 'nav-link-active' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-text-primary hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t-2 border-primary">
              {navigationItems.map((item: NavigationItem) => (
                <Link
                  key={item._id}
                  href={item.url}
                  className={`block px-3 py-2 text-base font-medium nav-link ${
                    isActiveLink(item.url) ? 'nav-link-active' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}