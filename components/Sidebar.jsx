'use client';
import Link from 'next/link';
import '../styles/sidebar.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  BarChart,
  FileText,
  UsersRound,
  Settings,
  HelpCircle,
  LogOut,
  UserRound,
  Sun,
  Moon
} from 'lucide-react';

export default function Sidebar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [theme, setTheme] = useState('dark');
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="admin-info">
          <div className="admin-icon-wrapper">
            <UserRound className="admin-icon" />
          </div>
          <div className="admin-text">
            <p className="admin-name">Admin</p>
            <p className="admin-role">Administration</p>
          </div>
        </div>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div className="sidebar-section">
        <h4>Pages</h4>
        <ul>
          <li><Link href="/dashboard"><LayoutDashboard className="icon" />Dashboard</Link></li>
          <li><Link href="/users"><Users className="icon" />Users</Link></li>
          <li><Link href="/products"><Package className="icon" />Products</Link></li>
          <li><Link href="/transactions"><CreditCard className="icon" />Transactions</Link></li>
        </ul>

        <h4>Analytics</h4>
        <ul>
          <li><Link href="/revenue"><BarChart className="icon" />Revenue</Link></li>
          <li><Link href="/reports"><FileText className="icon" />Reports</Link></li>
          <li><Link href="/teams"><UsersRound className="icon" />Teams</Link></li>
        </ul>

        <h4>User</h4>
        <ul>
          <li><Link href="/settings"><Settings className="icon" />Settings</Link></li>
          <li><Link href="/help"><HelpCircle className="icon" />Help</Link></li>
          <li>
            <a href="#" onClick={() => setShowLogoutModal(true)}>
              <LogOut className="icon" />
              Logout
            </a>
          </li>
        </ul>
      </div>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="logout-modal">
            <p>Are you sure you want to log out?</p>
            <div className="modal-buttons">
              <button className="confirm" onClick={() => router.push('/login')}>Yes</button>
              <button className="cancel" onClick={() => setShowLogoutModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
