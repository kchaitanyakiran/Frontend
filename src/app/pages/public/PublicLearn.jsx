import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { DetailModal } from '../../components/DetailModal';
import { FileText, Search } from 'lucide-react';
import { api } from '../../lib/api';
import { formatDisplayDateTime } from '../../lib/date';

const PublicLearn = () => {
  const [data, setData] = useState({ categories: [], items: [] });
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.getPublicLearn()
      .then(setData)
      .catch((error) => setMessage(error.message));
  }, []);

  const articles = useMemo(() => {
    return (data.items ?? []).filter((item) => !search
      || item.title?.toLowerCase().includes(search.toLowerCase())
      || item.topic?.toLowerCase().includes(search.toLowerCase())
      || item.description?.toLowerCase().includes(search.toLowerCase()));
  }, [data.items, search]);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Learn About Agriculture</h1>
        <p className="text-gray-600">Read live article and guide resources from the same content database used by experts and admins</p>
      </motion.div>

      {message && <div className="rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">{message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(data.categories ?? []).map((type) => (
          <Card key={type.label}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${type.color}20` }}>
              <FileText className="w-7 h-7" style={{ color: type.color }} />
            </div>
            <h3 className="font-semibold text-lg mb-1">{type.label}</h3>
            <p className="text-2xl font-bold" style={{ color: type.color }}>{type.count}</p>
            <p className="mt-3 text-sm text-gray-600">Only live published article guides are shown.</p>
          </Card>
        ))}
      </div>

      <Card hover={false}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search article guides..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
        </div>
      </Card>

      <Card hover={false}>
        <div className="space-y-4">
          {articles.map((item) => (
            <button key={item.id} type="button" className="w-full rounded-2xl bg-gray-50 px-5 py-4 text-left transition hover:bg-[#E8F5E9]" onClick={() => setSelectedArticle(item)}>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.topic} | Article & Guide</p>
                </div>
                <span className="text-sm font-medium text-[#1B5E20]">Open full guide</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </button>
          ))}
          {articles.length === 0 && <div className="py-16 text-center text-gray-500">No article guides match this search.</div>}
        </div>
      </Card>

      <DetailModal
        isOpen={Boolean(selectedArticle)}
        title={selectedArticle?.title}
        subtitle={selectedArticle ? `${selectedArticle.authorName} | ${selectedArticle.topic}` : ''}
        onClose={() => setSelectedArticle(null)}
      >
        {selectedArticle ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Format</div>
                <div className="mt-2 text-sm text-gray-700">Article & Guide</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Status</div>
                <div className="mt-2 text-sm text-gray-700">{selectedArticle.status}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Published</div>
                <div className="mt-2 text-sm text-gray-700">{formatDisplayDateTime(selectedArticle.createdAt)}</div>
              </div>
            </div>
            <p className="rounded-3xl bg-[#F5F5DC]/40 px-5 py-5 text-sm leading-7 text-gray-700">{selectedArticle.description}</p>
            <article className="whitespace-pre-wrap text-sm leading-8 text-gray-700">{selectedArticle.contentBody}</article>
          </div>
        ) : null}
      </DetailModal>
    </div>
  );
};

export default PublicLearn;
