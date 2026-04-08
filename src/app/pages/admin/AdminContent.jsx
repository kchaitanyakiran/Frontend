import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { api } from '../../lib/api';

const topicOptions = [
  'Crop Management',
  'Soil Health',
  'Pest Control',
  'Sustainable Practices',
  'Technology & Innovation',
];

const statusOptions = ['PUBLISHED', 'DRAFT', 'PENDING_REVIEW', 'ARCHIVED'];

const defaultForm = {
  title: '',
  topic: 'Crop Management',
  description: '',
  contentBody: '',
  status: 'DRAFT',
  resourceUrl: '',
};

const buildArticleUrl = (title) => {
  const slug = (title || 'article')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `https://agrilink.local/articles/${slug || 'article'}`;
};

const buildPayload = (formData, statusOverride) => ({
  title: formData.title.trim(),
  type: 'Article',
  topic: formData.topic,
  description: formData.description.trim(),
  contentBody: formData.contentBody.trim(),
  resourceUrl: formData.resourceUrl || buildArticleUrl(formData.title),
  status: statusOverride || formData.status,
  featured: true,
});

const AdminContent = () => {
  const [data, setData] = useState({ stats: [], items: [] });
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);
  const [formData, setFormData] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadContent = (status = selectedStatus) => {
    api.getAdminContent(status).then(setData).catch((error) => setMessage(error.message));
  };

  useEffect(() => {
    loadContent('');
  }, []);

  const handleStatusClick = (statusKey) => {
    const nextStatus = selectedStatus === statusKey ? '' : statusKey;
    setSelectedStatus(nextStatus);
    loadContent(nextStatus);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(defaultForm);
    setIsFormOpen(true);
    setMessage('');
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      topic: item.topic,
      description: item.description,
      contentBody: item.contentBody,
      status: item.status || 'DRAFT',
      resourceUrl: item.resourceUrl || '',
    });
    setIsFormOpen(true);
    setMessage('');
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData(defaultForm);
  };

  const handleCreate = async (status) => {
    try {
      await api.createAdminContent(buildPayload(formData, status));
      setMessage(status === 'DRAFT' ? 'Draft article saved successfully.' : 'Article published successfully.');
      closeFormModal();
      loadContent();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.updateAdminContent(editingId, buildPayload(formData));
      setMessage('Content updated successfully.');
      closeFormModal();
      loadContent();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteAdminContent(id);
      if (selectedContent?.id === id) {
        setSelectedContent(null);
      }
      setMessage('Content deleted successfully.');
      loadContent();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const viewContent = async (id) => {
    try {
      const detail = await api.getAdminContentDetail(id);
      setSelectedContent(detail);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Management</h1>
          <p className="text-gray-600">Review, publish, draft, update, and remove live article content</p>
        </div>
        <Button variant="primary" onClick={openCreateModal}>
          <Plus size={20} />
          Review Content
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
            onClick={() => handleStatusClick(stat.statusKey)}
            className={`rounded-3xl text-left ${selectedStatus === stat.statusKey ? 'ring-2 ring-[#1B5E20]' : ''}`}
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
          {data.items.map((item) => (
            <div key={item.id} className="rounded-2xl bg-gray-50 px-5 py-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.topic} | {item.authorName}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-sm font-medium text-[#1B5E20]">{item.status}</span>
                  <Button type="button" variant="outline" size="sm" onClick={() => viewContent(item.id)}>
                    <Eye size={16} />
                    View
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => openEditModal(item)}>
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
            <div className="py-16 text-center text-gray-500">No content found for this filter.</div>
          )}
        </div>
      </Card>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {editingId ? 'Edit Article' : 'Create Article'}
                </h2>
                <p className="text-sm text-gray-600">
                  {editingId
                    ? 'Update the article details and manage its publishing state.'
                    : 'Add a new article from this popup only when you need it.'}
                </p>
              </div>
              <Button type="button" variant="outline" onClick={closeFormModal}>Close</Button>
            </div>

            {message && (
              <div className="mb-4 rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
                {message}
              </div>
            )}

            <form className="space-y-4" onSubmit={editingId ? handleUpdate : (e) => e.preventDefault()}>
              <input
                required
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Article title"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
              />
              <select
                value={formData.topic}
                onChange={(e) => setFormData((prev) => ({ ...prev, topic: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
              >
                {topicOptions.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
              {editingId && (
                <select
                  value={formData.status}
                  onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  {statusOptions.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              )}
              <textarea
                required
                minLength={20}
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Short article summary"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 resize-none"
              />
              <textarea
                required
                minLength={50}
                rows={12}
                value={formData.contentBody}
                onChange={(e) => setFormData((prev) => ({ ...prev, contentBody: e.target.value }))}
                placeholder="Full article body"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 resize-none"
              />

              {editingId ? (
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button type="submit" variant="primary">Update Article</Button>
                  <Button type="button" variant="outline" onClick={closeFormModal}>Cancel</Button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button type="button" variant="primary" onClick={() => handleCreate('PUBLISHED')}>
                    Publish Article
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleCreate('DRAFT')}>
                    Save Draft
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {selectedContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{selectedContent.title}</h2>
                <p className="text-sm text-gray-600">
                  {selectedContent.authorName} | {selectedContent.topic} | {selectedContent.status}
                </p>
              </div>
              <Button type="button" variant="outline" onClick={() => setSelectedContent(null)}>Close</Button>
            </div>
            <p className="mb-6 rounded-2xl bg-[#F4F8F2] px-4 py-3 text-sm text-gray-700">{selectedContent.description}</p>
            <article className="prose max-w-none whitespace-pre-wrap leading-8 text-gray-700">
              {selectedContent.contentBody}
            </article>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContent;
