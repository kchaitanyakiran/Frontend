import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { DetailModal } from '../../components/DetailModal';
import { Eye, FileText, Plus } from 'lucide-react';
import { api } from '../../lib/api';
import { formatDisplayDateTime } from '../../lib/date';

const topicOptions = [
  'Crop Management',
  'Soil Health',
  'Pest Control',
  'Sustainable Practices',
  'Technology & Innovation',
];

const initialForm = {
  title: '',
  type: 'Article',
  topic: 'Crop Management',
  description: '',
  contentBody: '',
  resourceUrl: '',
  status: 'DRAFT',
  featured: true,
};

const buildArticleUrl = (title) => {
  const slug = (title || 'expert-guide')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/resources/${slug || 'expert-guide'}`;
};

const ExpertContent = () => {
  const [data, setData] = useState({ stats: [], items: [] });
  const [formData, setFormData] = useState(initialForm);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState('');

  const loadContent = () => api.getExpertContent().then(setData).catch((error) => setMessage(error.message));

  useEffect(() => {
    loadContent();
  }, []);

  const filteredItems = useMemo(() => {
    return (data.items ?? []).filter((item) => !selectedStatus || item.status === selectedStatus);
  }, [data.items, selectedStatus]);

  const createContent = async (status) => {
    try {
      await api.createExpertContent({
        ...formData,
        type: 'Article',
        resourceUrl: formData.resourceUrl || buildArticleUrl(formData.title),
        status,
      });
      setMessage(status === 'DRAFT' ? 'Article guide saved as draft.' : 'Article guide published successfully.');
      setFormData(initialForm);
      setIsFormOpen(false);
      loadContent();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const statusFromLabel = (label) => {
    if (label.includes('Draft')) return 'DRAFT';
    if (label.includes('Pending')) return 'PENDING_REVIEW';
    return 'PUBLISHED';
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Expert Article Guides</h1>
          <p className="text-gray-600">Create and review expert article guides using the same live content database as Admin and Farmer portals</p>
        </div>
        <Button variant="primary" type="button" onClick={() => setIsFormOpen(true)}>
          <Plus size={20} />
          New Article Guide
        </Button>
      </motion.div>

      {message && (
        <div className="rounded-lg border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(data.stats ?? []).map((stat) => {
          const status = statusFromLabel(stat.label);
          return (
            <button key={stat.label} type="button" className="rounded-3xl text-left" onClick={() => setSelectedStatus((current) => current === status ? '' : status)}>
              <Card className={selectedStatus === status ? 'ring-2 ring-[#1B5E20]' : ''}>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Tap to filter</div>
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      <Card hover={false}>
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="rounded-2xl bg-gray-50 px-5 py-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.topic} | {item.authorName}</p>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-sm font-medium text-[#1B5E20]">{item.status || 'PUBLISHED'}</span>
                  <Button type="button" variant="outline" size="sm" onClick={() => setSelectedContent(item)}>
                    <Eye size={16} />
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="py-16 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No live article guides found for this filter.</p>
            </div>
          )}
        </div>
      </Card>

      <DetailModal
        isOpen={isFormOpen}
        title="Create Expert Article Guide"
        subtitle="This creates a live resource record visible through the shared content system."
        onClose={() => setIsFormOpen(false)}
        maxWidth="max-w-3xl"
      >
        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          <div className="rounded-2xl border-2 border-[#1B5E20] bg-[#1B5E20]/5 p-4">
            <FileText className="w-6 h-6 text-[#1B5E20] mb-2" />
            <div className="font-semibold text-gray-900">Article & Guide</div>
            <p className="mt-2 text-sm text-gray-600">Experts create written article guides only, matching the Farmer Resources format.</p>
          </div>
          <input required type="text" value={formData.title} onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))} placeholder="Article guide title" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
          <select value={formData.topic} onChange={(event) => setFormData((prev) => ({ ...prev, topic: event.target.value }))} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
            {topicOptions.map((topic) => <option key={topic}>{topic}</option>)}
          </select>
          <textarea required minLength={20} rows={4} value={formData.description} onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))} placeholder="Short article summary" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 resize-none" />
          <textarea required minLength={50} rows={10} value={formData.contentBody} onChange={(event) => setFormData((prev) => ({ ...prev, contentBody: event.target.value }))} placeholder="Full article guide content" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 resize-none" />
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="button" variant="primary" onClick={() => createContent('PUBLISHED')}>Publish Article Guide</Button>
            <Button type="button" variant="outline" onClick={() => createContent('DRAFT')}>Save Draft</Button>
          </div>
        </form>
      </DetailModal>

      <DetailModal
        isOpen={Boolean(selectedContent)}
        title={selectedContent?.title}
        subtitle={selectedContent ? `${selectedContent.authorName} | ${selectedContent.topic} | ${selectedContent.status}` : ''}
        onClose={() => setSelectedContent(null)}
      >
        {selectedContent ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Format</div>
                <div className="mt-2 text-sm text-gray-700">Article & Guide</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Featured</div>
                <div className="mt-2 text-sm text-gray-700">{selectedContent.featured ? 'Yes' : 'No'}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Created</div>
                <div className="mt-2 text-sm text-gray-700">{formatDisplayDateTime(selectedContent.createdAt)}</div>
              </div>
            </div>
            <p className="rounded-3xl bg-[#F5F5DC]/40 px-5 py-5 text-sm leading-7 text-gray-700">{selectedContent.description}</p>
            <article className="whitespace-pre-wrap text-sm leading-8 text-gray-700">{selectedContent.contentBody}</article>
          </div>
        ) : null}
      </DetailModal>
    </div>
  );
};

export default ExpertContent;
