'use client';
import '../../../styles/dashboard.css';
import '../../../styles/settings.css';

import { useEffect, useState } from 'react';

// Users sample data ve Revenue sample data localStorage'dan geliyor ya da başlangıçta fake data atanıyor.

export default function DashboardContent() {
  // Revenue verileri
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Users verileri
  const [users, setUsers] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers && storedUsers !== '[]') return JSON.parse(storedUsers);
      else return [];
    }
    return [];
  });

  useEffect(() => {
    // Fake revenue data (sayfa yüklendiğinde)
    const fakeRevenue = [
      { month: 'Jan', revenue: 1200 },
      { month: 'Feb', revenue: 1900 },
      { month: 'Mar', revenue: 800 },
      { month: 'Apr', revenue: 2400 },
      { month: 'May', revenue: 3100 },
      { month: 'Jun', revenue: 1700 },
    ];
    setMonthlyData(fakeRevenue);

    const total = fakeRevenue.reduce((sum, r) => sum + r.revenue, 0);
    setTotalRevenue(total);
  }, []);

  // Localstorage users güncellemesi
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  return (
    <main className="dashboard-content">
      <section className="revenue-section">
        <h1>Revenue Overview</h1>
        <div className="revenue-summary">
          <div className="card">
            <h2>Total Revenue</h2>
            <p>${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="card">
            <h2>Last Month Revenue</h2>
            <p>${monthlyData[monthlyData.length - 1]?.revenue.toLocaleString()}</p>
          </div>
        </div>
      </section>

      <section className="users-section">
        <h1>Users</h1>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
