import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';
import { INDIA_LOCATIONS, INDIA_STATES } from '../../lib/indiaLocations';

const defaultForm = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  role: 'PUBLIC',
  bio: '',
};

const defaultLocation = {
  state: '',
  district: '',
};

const parseLocation = (location) => {
  if (!location) {
    return defaultLocation;
  }

  const parts = location.split(',').map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2) {
    return { state: '', district: parts[0] || '' };
  }

  const state = INDIA_STATES.find((item) => item.toLowerCase() === parts[parts.length - 1].toLowerCase()) || parts[parts.length - 1];
  return {
    state,
    district: parts[0],
  };
};

const buildLocation = ({ state, district }) => [district, state].filter(Boolean).join(', ');

const AdminUsers = () => {
  const [data, setData] = useState({ stats: [], items: [] });
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState(defaultForm);
  const [locationData, setLocationData] = useState(defaultLocation);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const stateOptions = [...new Set([...INDIA_STATES, locationData.state].filter(Boolean))];
  const districtOptions = locationData.state
    ? [...new Set([...(INDIA_LOCATIONS[locationData.state] || []), locationData.district].filter(Boolean))]
    : locationData.district
      ? [locationData.district]
      : [];

  const loadUsers = (role = selectedRole) => {
    api.getAdminUsers(role).then(setData).catch((error) => setMessage(error.message));
  };

  useEffect(() => {
    loadUsers('');
  }, []);

  const handleRoleClick = (roleFilter) => {
    const nextRole = selectedRole === roleFilter || roleFilter === 'TOTAL_USERS' ? '' : roleFilter;
    setSelectedRole(nextRole);
    loadUsers(nextRole);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(defaultForm);
    setLocationData(defaultLocation);
    setIsFormOpen(false);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(defaultForm);
    setLocationData(defaultLocation);
    setIsFormOpen(true);
    setMessage('');
  };

  const openEditModal = (user) => {
    setEditingId(user.id);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      password: '',
      role: user.role,
      bio: user.bio || '',
    });
    setLocationData(parseLocation(user.location));
    setIsFormOpen(true);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      password: formData.password ? formData.password : undefined,
      location: buildLocation(locationData),
      bio: formData.bio.trim(),
    };

    try {
      if (editingId) {
        await api.updateAdminUser(editingId, payload);
        setMessage('User updated successfully.');
      } else {
        await api.createAdminUser(payload);
        setMessage('User created successfully.');
      }
      resetForm();
      loadUsers();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteAdminUser(id);
      setMessage('User deleted successfully.');
      loadUsers();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Filter, add, update, and remove platform users from live data</p>
        </div>
        <Button variant="primary" onClick={openCreateModal}>
          <Plus size={18} />
          Add User
        </Button>
      </motion.div>

      {message && (
        <div className="rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
          {message}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.stats.map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={() => handleRoleClick(stat.roleFilter)}
            className={`rounded-3xl text-left ${selectedRole === stat.roleFilter ? 'ring-2 ring-[#1B5E20]' : ''}`}
          >
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </Card>
          </button>
        ))}
      </div>

      <Card hover={false}>
        <div className="space-y-4">
          {data.items.map((user) => (
            <div key={user.id} className="rounded-2xl bg-gray-50 px-5 py-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="font-semibold text-gray-900">{user.fullName}</div>
                  <div className="text-sm text-gray-600">{user.email} | {user.phone}</div>
                  <div className="text-sm text-gray-600">{user.location || 'Location not set'}</div>
                  <div className="text-xs text-gray-500">{user.bio || 'No bio added yet.'}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-sm font-medium text-[#1B5E20]">{user.role}</span>
                  <Button type="button" variant="outline" size="sm" onClick={() => openEditModal(user)}>
                    <Pencil size={16} />
                    Edit
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => handleDelete(user.id)}>
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {data.items.length === 0 && (
            <div className="py-16 text-center text-gray-500">No users found for this filter.</div>
          )}
        </div>
      </Card>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{editingId ? 'Edit User' : 'Add User'}</h2>
                <p className="text-sm text-gray-600">Fill in the user details and select the Indian state and district.</p>
              </div>
              <Button type="button" variant="outline" onClick={resetForm}>Close</Button>
            </div>

            {message && (
              <div className="mb-4 rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
                {message}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                />
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Email"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                />
                <input
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="Phone"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                />
                <input
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder={editingId ? 'New password (optional)' : 'Password'}
                  required={!editingId}
                  minLength={editingId ? undefined : 6}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                />
                <select
                  value={formData.role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  <option>ADMIN</option>
                  <option>FARMER</option>
                  <option>EXPERT</option>
                  <option>PUBLIC</option>
                </select>
                <select
                  required
                  value={locationData.state}
                  onChange={(e) => setLocationData({ state: e.target.value, district: '' })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  <option value="">Select state</option>
                  {stateOptions.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <select
                  required
                  value={locationData.district}
                  onChange={(e) => setLocationData((prev) => ({ ...prev, district: e.target.value }))}
                  disabled={!locationData.state}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 disabled:cursor-not-allowed disabled:bg-gray-100"
                >
                  <option value="">{locationData.state ? 'Select district' : 'Choose state first'}</option>
                  {districtOptions.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                placeholder="Bio"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 resize-none"
              />
              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="submit" variant="primary">
                  <Plus size={16} />
                  {editingId ? 'Update User' : 'Create User'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
