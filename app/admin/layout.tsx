'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FiHome,
  FiBriefcase,
  FiFileText,
  FiLogOut,
  FiPlus,
  FiMenu,
  FiX,
  FiDatabase,
} from 'react-icons/fi';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        setAuthenticated(true);
      } else {
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      }
    } catch {
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    } finally {
      setChecking(false);
    }
  }, [pathname, router]);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setChecking(false);
      return;
    }
    checkAuth();
  }, [pathname, checkAuth]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleSeedData = async () => {
    if (!confirm('Seed database with sample data?')) return;
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      alert(JSON.stringify(data.results, null, 2));
      window.location.reload();
    } catch {
      alert('Failed to seed data');
    }
  };

  // Login page — render without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="login-page">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!authenticated) return null;

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <FiHome /> },
    { href: '/admin/jobs', label: 'Manage Jobs', icon: <FiBriefcase /> },
    { href: '/admin/jobs/new', label: 'Add New Job', icon: <FiPlus /> },
    { href: '/admin/articles', label: 'Manage Articles', icon: <FiFileText /> },
    { href: '/admin/articles/new', label: 'Add New Article', icon: <FiPlus /> },
  ];

  return (
    <div className="admin-layout">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 100,
          display: 'none',
          background: 'var(--primary)',
          color: 'white',
          padding: '8px',
          borderRadius: 'var(--radius-md)',
        }}
        className="admin-mobile-menu-btn"
      >
        {sidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-logo">
          the<span>uae</span>career
          <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.5)', fontWeight: 400, marginTop: 4 }}>
            Admin Panel
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${pathname === item.href ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 'var(--space-md)' }}>
          <button
            className="admin-nav-item"
            onClick={handleSeedData}
            style={{ width: '100%', textAlign: 'left' }}
          >
            <FiDatabase /> Seed Sample Data
          </button>
          <button
            className="admin-nav-item"
            onClick={handleLogout}
            style={{ width: '100%', textAlign: 'left', color: 'rgba(255,255,255,0.5)' }}
          >
            <FiLogOut /> Logout
          </button>
          <Link
            href="/"
            className="admin-nav-item"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {children}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .admin-mobile-menu-btn {
            display: block !important;
          }
          .admin-sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .admin-sidebar.open {
            transform: translateX(0);
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
