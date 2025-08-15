'use client';
import { usePathname } from 'next/navigation';
import { Bell, MessageCircle, Globe } from 'lucide-react';

export default function Topbar() {
  const pathname = usePathname();
  const getPageTitle = (path) => {
    const segments = path.split('/');
    const lastSegment = segments[segments.length - 1] || 'dashboard';
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  const pageTitle = getPageTitle(pathname);

  return (
    <div className="topbar">
      <h1 className="page-title">{pageTitle}</h1>
      <div className="topbar-right">
        <input type="text" placeholder="Search..." className="search-input" />
        <div className="icons">
          <Bell size={20} color="var(--text)" />
          <MessageCircle size={20} color="var(--text)" />
          <Globe size={20} color="var(--text)" />
        </div>
      </div>
    </div>
  );
}
