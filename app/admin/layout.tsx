'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FiBriefcase,
  FiDatabase,
  FiFileText,
  FiHome,
  FiLogOut,
  FiMenu,
  FiPlus,
  FiUsers,
  FiX,
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
      } else if (pathname !== '/admin/login') {
        router.push('/admin/login');
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

  if (!authenticated) {
    return null;
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <FiHome /> },
    { href: '/admin/jobs', label: 'Manage Jobs', icon: <FiBriefcase /> },
    { href: '/admin/jobs/new', label: 'Add New Job', icon: <FiPlus /> },
    { href: '/admin/articles', label: 'Manage Articles', icon: <FiFileText /> },
    { href: '/admin/articles/new', label: 'Add New Article', icon: <FiPlus /> },
    { href: '/admin/leads', label: 'Audience Inbox', icon: <FiUsers /> },
  ];

  return (
    <div className="admin-layout">
      <button
        type="button"
        className="admin-mobile-menu-btn"
        onClick={() => setSidebarOpen((current) => !current)}
        aria-label="Toggle admin navigation"
      >
        {sidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {sidebarOpen && (
        <button
          type="button"
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close admin navigation"
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <Link href="/admin/dashboard" className="admin-sidebar-logo" onClick={() => setSidebarOpen(false)}>
            the<span>uae</span>career
          </Link>
          <p className="admin-sidebar-copy">
            Publishing desk for job listings, walk-ins, articles, and incoming audience leads.
          </p>
        </div>

        <div className="admin-sidebar-section-title">Workspace</div>

        <nav className="admin-nav">
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

        <div className="admin-sidebar-card">
          <h3>Launch Toolkit</h3>
          <p>Seed sample content, preview the public site, or sign out when you are done reviewing edits.</p>
          <div className="admin-sidebar-actions">
            <button
              type="button"
              className="admin-nav-item admin-nav-muted"
              onClick={handleSeedData}
            >
              <FiDatabase /> Seed sample data
            </button>
            <Link
              href="/"
              className="admin-nav-item admin-nav-muted"
              onClick={() => setSidebarOpen(false)}
            >
              <FiHome /> Back to site
            </Link>
            <button
              type="button"
              className="admin-nav-item admin-nav-muted"
              onClick={handleLogout}
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        <div className="admin-sidebar-footnote">
          Built for faster publishing, cleaner review loops, and less admin friction.
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-main-inner">{children}</div>
      </div>
    </div>
  );
}
