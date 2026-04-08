import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Eye, MessageSquare, Pencil, Plus, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';

const categoryOptions = [
  'Crop Management',
  'Water Conservation',
  'Market Access',
  'Organic Farming',
  'Farm Technology',
];

const statusOptions = ['ACTIVE', 'PENDING_REVIEW', 'FLAGGED'];

const defaultForm = {
  title: '',
  category: 'Crop Management',
  status: 'ACTIVE',
  contentBody: '',
};

const AdminModeration = () => {
  const [data, setData] = useState({ stats: [], items: [] });
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [formData, setFormData] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState('');

  const loadModeration = (filter = selectedFilter) => {
    api.getAdminModeration(filter).then(setData).catch((error) => setMessage(error.message));
  };

  useEffect(() => {
    loadModeration('');
  }, []);

  const handleFilter = (filterKey) => {
    const nextFilter = selectedFilter === filterKey ? '' : filterKey;
    setSelectedFilter(nextFilter);
    loadModeration(nextFilter);
  };

  const openDiscussion = async (id) => {
    try {
      const detail = await api.getAdminDiscussionDetail(id);
      setSelectedDiscussion(detail);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(defaultForm);
    setIsFormOpen(true);
    setMessage('');
  };

  const openEditModal = async (id) => {
    try {
      const detail = await api.getAdminDiscussionDetail(id);
      setEditingId(detail.id);
      setFormData({
        title: detail.title,
        category: detail.category,
        status: detail.status || 'ACTIVE',
        contentBody: detail.contentBody,
      });
      setIsFormOpen(true);
      setMessage('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const closeFormModal = () => {
    setEditingId(null);
    setFormData(defaultForm);
    setIsFormOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.updateAdminDiscussion(editingId, formData);
        setMessage('Discussion updated successfully.');
      } else {
        await api.createAdminDiscussion(formData);
        setMessage('Discussion created successfully.');
      }
      closeFormModal();
      loadModeration();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteAdminDiscussion(id);
      if (selectedDiscussion?.id === id) {
        setSelectedDiscussion(null);
      }
      setMessage('Discussion deleted successfully.');
      loadModeration();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Discussion Moderation</h1>
          <p className="text-gray-600">Open full discussions, manage their status, and perform discussion CRUD from live data</p>
        </div>
        <Button variant="primary" onClick={openCreateModal}>
          <Plus size={18} />
          Add Discussion
        </Button>
      </motion.div>

      {message && (
        <div className="rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {data.stats.map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={() => handleFilter(stat.filterKey)}
            className={`rounded-3xl text-left ${selectedFilter === stat.filterKey ? 'ring-2 ring-[#1B5E20]' : ''}`}
          >
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1 text-[#1B5E20]">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </Card>
          </button>
        ))}
      </div>

      <Card hover={false}>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id} className="rounded-2xl bg-gray-50 px-5 py-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.authorName} | {item.category}</div>
                  <div className="text-sm text-gray-500">{item.replyCount} replies | {item.viewCount} views</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${item.status === 'FLAGGED' ? 'bg-red-100 text-red-700' : item.status === 'PENDING_REVIEW' ? 'bg-amber-100 text-amber-700' : 'bg-[#E8F5E9] text-[#1B5E20]'}`}>
                    {item.status}
                  </span>
                  <Button type="button" variant="outline" size="sm" onClick={() => openDiscussion(item.id)}>
                    <Eye size={16} />
                    View
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => openEditModal(item.id)}>
                    <Pencil size={16} />
                    Edit
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {data.items.length === 0 && (
            <div className="py-16 text-center">
              <MessageSquare className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <p className="text-gray-500">No discussions are available in this filter yet.</p>
            </div>
          )}
        </div>
      </Card>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{editingId ? 'Edit Discussion' : 'Create Discussion'}</h2>
                <p className="text-sm text-gray-600">Maintain the full discussion content directly from this moderation popup.</p>
              </div>
              <Button type="button" variant="outline" onClick={closeFormModal}>Close</Button>
            </div>

            {message && (
              <div className="mb-4 rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
                {message}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                required
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Discussion title"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  {categoryOptions.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  {statusOptions.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
              <textarea
                required
                minLength={50}
                rows={12}
                value={formData.contentBody}
                onChange={(e) => setFormData((prev) => ({ ...prev, contentBody: e.target.value }))}
                placeholder="Full discussion content"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 resize-none"
              />
              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="submit" variant="primary">
                  {editingId ? 'Update Discussion' : 'Create Discussion'}
                </Button>
                <Button type="button" variant="outline" onClick={closeFormModal}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedDiscussion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{selectedDiscussion.title}</h2>
                <p className="text-sm text-gray-600">
                  {selectedDiscussion.authorName} | {selectedDiscussion.category} | {selectedDiscussion.status}
                </p>
              </div>
              <Button type="button" variant="outline" onClick={() => setSelectedDiscussion(null)}>Close</Button>
            </div>
            <div className="mb-6 flex flex-wrap gap-3 text-sm text-gray-500">
              <span>{selectedDiscussion.replyCount} replies</span>
              <span>{selectedDiscussion.viewCount} views</span>
              <span>{selectedDiscussion.createdAt ? new Date(selectedDiscussion.createdAt).toLocaleString() : 'Recently created'}</span>
            </div>
            <article className="prose max-w-none whitespace-pre-wrap leading-8 text-gray-700">
              {selectedDiscussion.contentBody}
            </article>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  setSelectedDiscussion(null);
                  openEditModal(selectedDiscussion.id);
                }}
              >
                <Pencil size={16} />
                Edit Discussion
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDelete(selectedDiscussion.id)}
              >
                <Trash2 size={16} />
                Delete Discussion
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminModeration;
