'use client';
import '../../../styles/revenue.css';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function RevenuePage() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeOrders, setActiveOrders] = useState(0);

  useEffect(() => {
    const fakeMonthlyRevenue = [
      { month: 'Jan', revenue: 1200 },
      { month: 'Feb', revenue: 1900 },
      { month: 'Mar', revenue: 800 },
      { month: 'Apr', revenue: 2400 },
      { month: 'May', revenue: 3100 },
      { month: 'Jun', revenue: 1700 },
    ];
    setMonthlyData(fakeMonthlyRevenue);

    const total = fakeMonthlyRevenue.reduce(
      (sum, item) => sum + item.revenue,
      0
    );
    setTotalRevenue(total);

    const randomActiveOrders = Math.floor(Math.random() * 20) + 5;
    setActiveOrders(randomActiveOrders);
  }, []);

  return (
    <div className="revenue-page">
      <h1>Revenue Overview</h1>

      <div className="revenue-cards">
        <div className="revenue-card">
          <h2>Total Revenue</h2>
          <p>${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="revenue-card">
          <h2>Monthly Revenue</h2>
          <p>
            $
            {monthlyData[monthlyData.length - 1]?.revenue.toLocaleString()}
          </p>
        </div>
        <div className="revenue-card">
          <h2>Active Orders</h2>
          <p>{activeOrders}</p>
        </div>
      </div>

      <div className="revenue-chart">
        <h2>Revenue by Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                color: 'white',
              }}
            />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
