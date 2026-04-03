'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Find Jobs' },
  { href: '/jobs/walk-in', label: 'Walk-ins' },
  { href: '/blog/', label: 'Blog' },
];

const resourceLinks = [
  { href: '/resources', label: 'Resources Home' },
  { href: '/resources/interview-question-bank', label: 'Interview Question Bank' },
];

const toolLinks = [
  { href: '/tools/currency-converter', label: 'Currency Converter' },
  { href: '/tools/gratuity-calculator', label: 'Gratuity Calculator' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const pathname = usePathname();
  const isResourcesActive = pathname?.startsWith('/resources');
  const isToolsActive = pathname?.startsWith('/tools');
  const navWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!navWrapperRef.current?.contains(event.target as Node)) {
        setResourcesOpen(false);
        setToolsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/studio')) return null;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="container navbar-inner" ref={navWrapperRef}>
        <Link
          href="/"
          className="navbar-logo"
          onClick={() => {
            setIsOpen(false);
            setResourcesOpen(false);
            setToolsOpen(false);
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
              onClick={() => {
                setIsOpen(false);
                setResourcesOpen(false);
                setToolsOpen(false);
              }}
            >
              {link.label}
            </Link>
          ))}
          <div
            className={`navbar-dropdown ${resourcesOpen ? 'open' : ''}`}
          >
            <button
              type="button"
              className={`navbar-dropdown-trigger ${isResourcesActive ? 'active' : ''}`}
              onClick={() => {
                setResourcesOpen((current) => !current);
                setToolsOpen(false);
              }}
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
                    setToolsOpen(false);
                    setIsOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div
            className={`navbar-dropdown ${toolsOpen ? 'open' : ''}`}
          >
            <button
              type="button"
              className={`navbar-dropdown-trigger ${isToolsActive ? 'active' : ''}`}
              onClick={() => {
                setToolsOpen((current) => !current);
                setResourcesOpen(false);
              }}
              aria-expanded={toolsOpen}
            >
              Tools <FiChevronDown className="navbar-dropdown-icon" />
            </button>
            <div className="navbar-dropdown-menu">
              {toolLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`navbar-dropdown-link ${pathname === link.href ? 'active' : ''}`}
                  onClick={() => {
                    setResourcesOpen(false);
                    setToolsOpen(false);
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
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setIsOpen(false);
                  setResourcesOpen(false);
                  setToolsOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="navbar-mobile-section-label">Tools</div>
            {toolLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setIsOpen(false);
                  setResourcesOpen(false);
                  setToolsOpen(false);
                }}
              >
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
            onClick={() => {
              setIsOpen(!isOpen);
              setResourcesOpen(false);
              setToolsOpen(false);
            }}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
}
