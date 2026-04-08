import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { User, MapPin, Mail, Phone, Edit, Camera } from 'lucide-react';
import { api, getSession, saveSession } from '../../lib/api';

const FarmerProfile = () => {
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
      .catch(() => {});
  }, []);

  const [firstName = '', lastName = ''] = formData.fullName.split(' ');

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage('');
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
      setMessage('Profile updated successfully.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>
        <Button variant="primary">
          <Edit size={20} />
          Edit Profile
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card hover={false}>
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#43A047] flex items-center justify-center text-white text-4xl font-bold">
                  <User className="w-16 h-16" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#C9A961] text-white flex items-center justify-center shadow-lg"
                >
                  <Camera size={18} />
                </motion.button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{formData.fullName || 'Your Name'}</h2>
              <p className="text-gray-600 mb-4">Farmer</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <MapPin size={16} />
                  <span>{formData.location || 'Location'}</span>
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card hover={false}>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h3>
            <form className="space-y-6" onSubmit={handleSave}>
              {message && (
                <div className="rounded-lg border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
                  {message}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: `${e.target.value} ${lastName}`.trim() }))}
                    placeholder="Enter first name"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: `${firstName} ${e.target.value}`.trim() }))}
                    placeholder="Enter last name"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter your location"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself and your farming experience"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 transition-all resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="primary" className="flex-1" type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  type="button"
                  onClick={() => window.location.reload()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FarmerProfile;
