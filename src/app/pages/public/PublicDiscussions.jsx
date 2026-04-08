import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { DetailModal } from '../../components/DetailModal';
import { MessageSquare, Plus, Search } from 'lucide-react';
import { Button } from '../../components/Button';
import { api } from '../../lib/api';
import { formatDisplayDateTime } from '../../lib/date';

const baseCategories = ['General Discussion', 'Crop Management', 'Technology & Innovation', 'Market Insights', 'Sustainability', 'Success Stories'];

const initialForm = {
  title: '',
  category: 'General Discussion',
  excerpt: '',
  contentBody: '',
  authorName: '',
};

const PublicDiscussions = () => {
  const [data, setData] = useState({ stats: [], items: [] });
  const [formData, setFormData] = useState(initialForm);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState('');

  const loadDiscussions = () => api.getPublicDiscussions().then(setData).catch((error) => setMessage(error.message));

  useEffect(() => {
    loadDiscussions();
  }, []);

  const categoryOptions = useMemo(() => {
    const liveCategories = (data.items ?? [])
      .map((item) => item.category)
      .filter(Boolean);
    return [...new Set([...liveCategories, ...baseCategories])];
  }, [data.items]);

  const filteredItems = useMemo(() => {
    return (data.items ?? []).filter((item) => {
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesSearch = !search
        || item.title?.toLowerCase().includes(search.toLowerCase())
        || item.category?.toLowerCase().includes(search.toLowerCase())
        || item.authorName?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [data.items, selectedCategory, search]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.createPublicDiscussion(formData);
      setMessage('Discussion posted successfully.');
      setFormData(initialForm);
      setIsFormOpen(false);
      loadDiscussions();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Discussions & Community</h1>
          <p className="text-gray-600">Open live agriculture discussions and add new public conversations</p>
        </div>
        <Button variant="primary" type="button" onClick={() => setIsFormOpen(true)}>
          <Plus size={20} />
          New Discussion
        </Button>
      </motion.div>

      {message && <div className="rounded-lg border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">{message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(data.stats ?? []).map((stat) => (
          <Card key={stat.label}>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card hover={false}>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search live discussions..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((category) => (
            <button key={category} type="button" onClick={() => setSelectedCategory((current) => current === category ? '' : category)} className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category ? 'bg-[#1B5E20] text-white' : 'bg-[#E8F5E9] text-[#1B5E20]'}`}>
              {category}
            </button>
          ))}
        </div>
      </Card>

      <Card hover={false}>
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <button key={item.id} type="button" className="w-full rounded-2xl bg-gray-50 px-5 py-4 text-left transition hover:bg-[#E8F5E9]" onClick={() => setSelectedDiscussion(item)}>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.authorName} | {item.category}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${item.status === 'FLAGGED' ? 'bg-red-100 text-red-700' : 'bg-[#E8F5E9] text-[#1B5E20]'}`}>{item.status || 'ACTIVE'}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{item.excerpt}</p>
              <p className="mt-2 text-xs text-gray-500">Posted {formatDisplayDateTime(item.createdAt)}</p>
            </button>
          ))}
          {filteredItems.length === 0 && (
            <div className="py-16 text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No discussions match this filter.</p>
            </div>
          )}
        </div>
      </Card>

      <DetailModal isOpen={isFormOpen} title="Start A Public Discussion" subtitle="Create a live public discussion record for moderation and community view." onClose={() => setIsFormOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input required type="text" value={formData.authorName} onChange={(event) => setFormData((prev) => ({ ...prev, authorName: event.target.value }))} placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
          <input required type="text" value={formData.title} onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))} placeholder="Discussion title" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
          <select value={formData.category} onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
            {categoryOptions.map((category) => <option key={category}>{category}</option>)}
          </select>
          <textarea required minLength={20} rows={4} value={formData.excerpt} onChange={(event) => setFormData((prev) => ({ ...prev, excerpt: event.target.value }))} placeholder="Short discussion summary" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 resize-none" />
          <textarea required minLength={50} rows={8} value={formData.contentBody} onChange={(event) => setFormData((prev) => ({ ...prev, contentBody: event.target.value }))} placeholder="Full discussion content" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 resize-none" />
          <Button variant="primary" type="submit">
            <Plus size={20} />
            Post Discussion
          </Button>
        </form>
      </DetailModal>

      <DetailModal isOpen={Boolean(selectedDiscussion)} title={selectedDiscussion?.title} subtitle={selectedDiscussion ? `${selectedDiscussion.authorName} | ${selectedDiscussion.category} | ${selectedDiscussion.status}` : ''} onClose={() => setSelectedDiscussion(null)}>
        {selectedDiscussion ? (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
              <span>Status: {selectedDiscussion.status || 'ACTIVE'}</span>
              <span>{formatDisplayDateTime(selectedDiscussion.createdAt)}</span>
            </div>
            <p className="rounded-3xl bg-[#F5F5DC]/40 px-5 py-5 text-sm leading-7 text-gray-700">{selectedDiscussion.excerpt}</p>
            <article className="whitespace-pre-wrap text-sm leading-8 text-gray-700">{selectedDiscussion.contentBody}</article>
          </div>
        ) : null}
      </DetailModal>
    </div>
  );
};

export default PublicDiscussions;
