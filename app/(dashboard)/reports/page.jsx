'use client';
import '../../../styles/reports.css';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ReportsPage() {
  const [salesData, setSalesData] = useState([]);
  const [dateRange, setDateRange] = useState('last7days');

  useEffect(() => {
    // Tarih aralığına göre fake veri (basitleştirilmiş)
    let data;
    if (dateRange === 'last7days') {
      data = [
        { date: 'Jun 1', sales: 120 },
        { date: 'Jun 2', sales: 150 },
        { date: 'Jun 3', sales: 100 },
        { date: 'Jun 4', sales: 180 },
        { date: 'Jun 5', sales: 200 },
        { date: 'Jun 6', sales: 170 },
        { date: 'Jun 7', sales: 220 },
      ];
    } else if (dateRange === 'last30days') {
      data = Array.from({ length: 30 }, (_, i) => ({
        date: `Day ${i + 1}`,
        sales: Math.floor(100 + Math.random() * 150),
      }));
    } else {
      data = Array.from({ length: 12 }, (_, i) => ({
        date: `Month ${i + 1}`,
        sales: Math.floor(1500 + Math.random() * 2000),
      }));
    }
    setSalesData(data);
  }, [dateRange]);

  // Özet metrikler (fake hesaplama)
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const averageSales = salesData.length > 0 ? Math.round(totalSales / salesData.length) : 0;

  return (

      <div className="reports-container">
        <div className="header">
          <h1>Reports</h1>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            aria-label="Select Date Range"
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>

        <div className="summary-cards">
          <div className="card">
            <h2>Total Sales</h2>
            <p>{totalSales.toLocaleString()}</p>
          </div>
          <div className="card">
            <h2>Average Sales</h2>
            <p>{averageSales.toLocaleString()}</p>
          </div>
          <div className="card">
            <h2>Data Points</h2>
            <p>{salesData.length}</p>
          </div>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: 'none', color: 'white' }}
              />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

  );
}
