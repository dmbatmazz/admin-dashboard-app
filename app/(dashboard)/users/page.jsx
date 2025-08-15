'use client';

import { useEffect, useState } from 'react';
import { Search, PlusCircle } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'User' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // LocalStorage'dan veri alma
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('users');
      const initialized = localStorage.getItem('users_initialized');

      if (!initialized || !stored || stored === "[]") {
        const fakeUsers = [
          { name: "Alice Johnson", email: "alice@example.com", role: "User", createdAt: "2024-05-01 10:00" },
          { name: "Bob Smith", email: "bob@example.com", role: "User", createdAt: "2024-05-02 11:00" },
          { name: "Charlie Brown", email: "charlie@example.com", role: "User", createdAt: "2024-05-03 12:00" },
          { name: "Daisy Lee", email: "daisy@example.com", role: "User", createdAt: "2024-05-04 13:00" },
          { name: "Ethan Clark", email: "ethan@example.com", role: "User", createdAt: "2024-05-05 14:00" },
          { name: "Fiona Davis", email: "fiona@example.com", role: "User", createdAt: "2024-05-06 15:00" },
          { name: "George Miller", email: "george@example.com", role: "User", createdAt: "2024-05-07 16:00" },
        ];
        localStorage.setItem('users', JSON.stringify(fakeUsers));
        localStorage.setItem('users_initialized', 'true');
        setUsers(fakeUsers);
      } else {
        setUsers(JSON.parse(stored));
      }
    }
  }, []);

  // Kullanıcıları formatlı tarih ile kopyalama
  useEffect(() => {
    const formatted = users.map((user) => ({
      ...user,
      formattedDate: new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(user.createdAt)),
    }));
    setDisplayedUsers(formatted);
  }, [users]);

  // LocalStorage’a yazma
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const handleAdd = () => {
    const now = new Date().toISOString().slice(0, 16).replace('T', ' ');

    if (editingIndex !== null) {
      const updated = [...users];
      updated[editingIndex] = { ...formData, createdAt: updated[editingIndex].createdAt };
      setUsers(updated);
      setEditingIndex(null);
    } else {
      const newUser = { ...formData, createdAt: now };
      setUsers([newUser, ...users]);
    }

    setFormData({ name: '', email: '', role: 'User' });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
  };

  const handleRoleChange = (index, newRole) => {
    const updated = [...users];
    updated[index].role = newRole;
    setUsers(updated);
  };

  const filteredUsers = displayedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          <PlusCircle className="add-icon" />
          Add New
        </button>
      </div>

      {showForm && (
        <div className="overlay">
          <div className="add-user-form">
            <h3>{editingIndex !== null ? 'Edit User' : 'Add New User'}</h3>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
            <button className="confirm-add-btn" onClick={handleAdd}>
              {editingIndex !== null ? 'Save' : 'Add'}
            </button>
          </div>
        </div>
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u, i) => (
            <tr key={i}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.formattedDate}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(i, e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </td>
              <td>
                <button className="action-btn edit" onClick={() => handleEdit(i)}>Edit</button>
                <button className="action-btn delete" onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
