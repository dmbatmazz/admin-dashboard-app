'use client';
import '../../../styles/teams.css';

import { User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('teamMembers');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(teamMembers);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', email: '', photoUrl: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
    }
  }, [teamMembers]);

  // Client-side filtreleme
  useEffect(() => {
    const filtered = teamMembers.filter((member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchTerm, teamMembers]);

  const openAddForm = () => {
    setFormData({ name: '', role: '', email: '', photoUrl: '' });
    setEditIndex(null);
    setShowForm(true);
  };

  const openEditForm = (member, index) => {
    setFormData(member);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...teamMembers];
      updated[editIndex] = formData;
      setTeamMembers(updated);
    } else {
      setTeamMembers([formData, ...teamMembers]);
    }
    setShowForm(false);
    setFormData({ name: '', role: '', email: '', photoUrl: '' });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updated = [...teamMembers];
    updated.splice(index, 1);
    setTeamMembers(updated);
  };

  return (
    <>
      <div className="teams-container">
        <div className="teams-header">
          <h1>Our Team</h1>
          <div>
            <input
              type="text"
              placeholder="Search members..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="add-btn" onClick={openAddForm}>Add Member</button>
          </div>
        </div>

        <div className="members-list">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member, i) => (
              <div key={member.email || i} className="member-card">
                <div className="member-icon">
                  <User size={64} color="#3b82f6" />
                </div>
                <div className="member-name">{member.name}</div>
                <div className="member-role">{member.role}</div>
                <div className="member-email">{member.email}</div>
                <div className="action-buttons">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => openEditForm(member, teamMembers.indexOf(member))}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(teamMembers.indexOf(member))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No team members found.</p>
          )}
        </div>

        {showForm && (
          <div className="overlay">
            <div className="form-container">
              <h2>{editIndex !== null ? 'Edit Member' : 'Add New Member'}</h2>
              <input
                type="text"
                placeholder="Name"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Role"
                className="form-input"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="url"
                placeholder="Photo URL (optional)"
                className="form-input"
                value={formData.photoUrl}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
              />
              <button className="form-btn" onClick={handleSave}>
                {editIndex !== null ? 'Save Changes' : 'Add Member'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
