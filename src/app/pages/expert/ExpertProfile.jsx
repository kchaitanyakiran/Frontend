import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Mail, MapPin, Phone, User } from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { api, getSession, saveSession } from '../../lib/api';

const ExpertProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
  });
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.me()
      .then((user) =>
        setFormData({
          fullName: user.fullName || '',
          email: user.email || '',
          phone: user.phone || '',
          location: user.location || '',
          bio: user.bio || '',
        })
      )
      .catch((error) => setMessage(error.message));
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      const updatedUser = await api.updateProfile(formData);
      const session = getSession();
      if (session) {
        saveSession({ ...session, user: updatedUser });
      }
      setFormData({
        fullName: updatedUser.fullName || '',
        email: updatedUser.email || '',
        phone: updatedUser.phone || '',
        location: updatedUser.location || '',
        bio: updatedUser.bio || '',
      });
      setMessage('Expert profile updated successfully.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Expert Profile</h1>
        <p className="text-gray-600">Manage your expert account details from the shared user database</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card hover={false}>
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#43A047] flex items-center justify-center text-white text-4xl font-bold">
                <User className="w-16 h-16" />
              </div>
              <div className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#C9A961] text-white flex items-center justify-center shadow-lg">
                <Camera size={18} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{formData.fullName || 'Expert Name'}</h2>
            <p className="text-gray-600 mb-4">Agricultural Expert</p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <MapPin size={16} />
                <span>{formData.location || 'Location not set'}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail size={16} />
                <span>{formData.email || 'Email not set'}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone size={16} />
                <span>{formData.phone || 'Phone not set'}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card hover={false} className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h3>
          <form className="space-y-6" onSubmit={handleSave}>
            {message && (
              <div className="rounded-lg border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
                {message}
              </div>
            )}
            <input required type="text" value={formData.fullName} onChange={(event) => setFormData((prev) => ({ ...prev, fullName: event.target.value }))} placeholder="Full name" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
            <input required type="email" value={formData.email} onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))} placeholder="Email address" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
            <input required type="tel" value={formData.phone} onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))} placeholder="Phone number" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
            <input type="text" value={formData.location} onChange={(event) => setFormData((prev) => ({ ...prev, location: event.target.value }))} placeholder="Location" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
            <textarea rows={5} value={formData.bio} onChange={(event) => setFormData((prev) => ({ ...prev, bio: event.target.value }))} placeholder="Expertise, specialization, and farming support areas" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 resize-none" />
            <Button variant="primary" className="w-full" type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ExpertProfile;
