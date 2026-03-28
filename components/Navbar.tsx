'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Find Jobs' },
  { href: '/jobs/walk-in', label: 'Walk-ins' },
  { href: '/blog', label: 'Blog' },
  { href: '/tools/gratuity-calculator', label: 'Gratuity Calc' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/studio')) return null;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="container navbar-inner">
        <Link href="/" className="navbar-logo">
          the<span>uae</span>career
        </Link>

        {/* Center links - inspired by Sample */}
        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile only buttons */}
          <div className="navbar-mobile-actions">
            <Link href="/tools/cv-maker" className="btn btn-secondary btn-full mb-sm">CV Maker</Link>
          </div>
        </div>

        {/* Right side actions - "Get Started" style */}
        <div className="navbar-actions">
          <Link href="/tools/cv-maker" className="btn btn-outline-pill">
            CV Maker
          </Link>
          <button
            className="navbar-mobile-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
}
