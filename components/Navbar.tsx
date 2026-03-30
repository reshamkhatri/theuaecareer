'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Find Jobs' },
  { href: '/jobs/walk-in', label: 'Walk-ins' },
  { href: '/blog', label: 'Blog' },
  { href: '/tools/gratuity-calculator', label: 'Gratuity Calc' },
];

const resourceLinks = [
  { href: '/resources', label: 'Resources Home' },
  { href: '/resources/interview-question-bank', label: 'Interview Question Bank' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();
  const isResourcesActive = pathname?.startsWith('/resources');

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
        <Link
          href="/"
          className="navbar-logo"
          onClick={() => {
            setIsOpen(false);
            setResourcesOpen(false);
          }}
        >
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
          <div
            className={`navbar-resource ${resourcesOpen ? 'open' : ''}`}
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              className={`navbar-dropdown-trigger ${isResourcesActive ? 'active' : ''}`}
              onClick={() => setResourcesOpen((current) => !current)}
              aria-expanded={resourcesOpen}
            >
              Resources <FiChevronDown className="navbar-dropdown-icon" />
            </button>
            <div className="navbar-dropdown-menu">
              {resourceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`navbar-dropdown-link ${pathname === link.href ? 'active' : ''}`}
                  onClick={() => {
                    setResourcesOpen(false);
                    setIsOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Mobile only buttons */}
          <div className="navbar-mobile-actions">
            <div className="navbar-mobile-section-label">Resources</div>
            {resourceLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
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
