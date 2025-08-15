'use client';

import { useEffect, useState } from 'react';
import { Search, PlusCircle, Trash2 } from 'lucide-react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTx, setNewTx] = useState({
    customer: '',
    product: '',
    amount: '',
    status: 'Pending'
  });

  // 📌 1. Yalnızca ilk açılışta fake data yükle
useEffect(() => {
  const stored = localStorage.getItem("transactions");
  const isInitialized = localStorage.getItem("transactions_initialized");

  if (!isInitialized || !stored || stored === "[]") {
    const fakeData = [
        {
          id: "TX001",
          customer: "Alice Johnson",
          product: "Laptop",
          amount: 120.5,
          status: "Success",
          date: "2024-05-01",
        },
        {
          id: "TX002",
          customer: "Bob Smith",
          product: "Phone",
          amount: 75.25,
          status: "Pending",
          date: "2024-05-02",
        },
        {
          id: "TX003",
          customer: "Charlie Brown",
          product: "Tablet",
          amount: 200.0,
          status: "Failed",
          date: "2024-05-03",
        },
        {
          id: "TX004",
          customer: "Daisy Lee",
          product: "Monitor",
          amount: 90.99,
          status: "Success",
          date: "2024-05-04",
        },
        {
          id: "TX005",
          customer: "Ethan Clark",
          product: "Mouse",
          amount: 50.5,
          status: "Pending",
          date: "2024-05-05",
        },
        {
          id: "TX006",
          customer: "Fiona Davis",
          product: "Keyboard",
          amount: 130.0,
          status: "Success",
          date: "2024-05-06",
        },
        {
          id: "TX007",
          customer: "George Miller",
          product: "Charger",
          amount: 300.75,
          status: "Failed",
          date: "2024-05-07",
        },
     ];
    localStorage.setItem("transactions", JSON.stringify(fakeData));
    localStorage.setItem("transactions_initialized", "true");
    setTransactions(fakeData);
  } else {
    setTransactions(JSON.parse(stored));
  }
}, []);
  // 📌 2. Ne zaman transactions değişse, localStorage’a yaz
useEffect(() => {
  // Sadece transactions doluysa veya hiç boş değilse güncelle
  if (transactions.length > 0) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
}, [transactions]);


  // ➕ Yeni ekle
  const handleAdd = () => {
    const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const newTxData = {
      ...newTx,
      id: `TX${String(Date.now()).slice(-5)}`,
      date: now
    };
    setTransactions([newTxData, ...transactions]);
    setNewTx({ customer: '', product: '', amount: '', status: 'Pending' });
    setFormVisible(false);
  };

  // ❌ Sil
const handleDelete = (id) => {
  const updated = transactions.filter(tx => tx.id !== id);
  setTransactions(updated);
  localStorage.setItem('transactions', JSON.stringify(updated));
};


  // 🔍 Arama
  const filtered = transactions.filter(tx =>
    tx.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search by customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={() => setFormVisible(true)}>
          <PlusCircle className="add-icon" />
          Add Transaction
        </button>
      </div>

      {formVisible && (
        <div className="overlay">
          <div className="add-user-form">
            <h3>Add New Transaction</h3>
            <input
              type="text"
              placeholder="Customer"
              value={newTx.customer}
              onChange={(e) => setNewTx({ ...newTx, customer: e.target.value })}
            />
            <input
              type="text"
              placeholder="Product"
              value={newTx.product}
              onChange={(e) => setNewTx({ ...newTx, product: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              value={newTx.amount}
              onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
            />
            <select
              value={newTx.status}
              onChange={(e) => setNewTx({ ...newTx, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button className="confirm-add-btn" onClick={handleAdd}>Add</button>
          </div>
        </div>
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((tx, idx) => (
            <tr key={idx}>
              <td>{tx.id}</td>
              <td>{tx.customer}</td>
              <td>{tx.product}</td>
              <td>${tx.amount}</td>
              <td>{tx.date}</td>
              <td>{tx.status}</td>
              <td>
                <button className="action-btn delete" onClick={() => handleDelete(tx.id)}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
