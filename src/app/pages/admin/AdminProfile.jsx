import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import { api, getSession, saveSession } from '../../lib/api';

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.getAdminProfile().then((user) => {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
      });
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await api.updateProfile(formData);
      const session = getSession();
      if (session) saveSession({ ...session, user: updated });
      setMessage('Profile updated successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Profile</h1>
        <p className="text-gray-600">Update your account details</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card hover={false}>
          <div className="text-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#43A047] flex items-center justify-center mx-auto mb-4">
              <User className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{formData.fullName}</h2>
            <p className="text-gray-600 mb-4">Administrator</p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2"><Mail size={16} />{formData.email}</div>
              <div className="flex items-center justify-center gap-2"><Phone size={16} />{formData.phone}</div>
              <div className="flex items-center justify-center gap-2"><MapPin size={16} />{formData.location}</div>
            </div>
          </div>
        </Card>

        <Card hover={false} className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            {message && <div className="rounded-lg border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">{message}</div>}
            <input value={formData.fullName} onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))} placeholder="Full name" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
            <input value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
            <input value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} placeholder="Phone" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
            <input value={formData.location} onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))} placeholder="Location" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
            <textarea rows={5} value={formData.bio} onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))} placeholder="Bio" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 resize-none" />
            <Button type="submit" variant="primary">Update Profile</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
