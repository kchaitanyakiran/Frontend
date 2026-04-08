import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { DetailModal } from '../../components/DetailModal';
import { FileText, Search } from 'lucide-react';
import { api } from '../../lib/api';
import { formatDisplayDateTime } from '../../lib/date';

const ExpertGuidance = () => {
  const [data, setData] = useState({ stats: [], items: [] });
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.getExpertGuidance().then(setData).catch((error) => setMessage(error.message));
  }, []);

  const filteredItems = useMemo(() => {
    return (data.items ?? []).filter((item) => {
      const matchesStatus = !selectedStatus || item.status === selectedStatus;
      const matchesSearch = !search
        || item.title?.toLowerCase().includes(search.toLowerCase())
        || item.topic?.toLowerCase().includes(search.toLowerCase())
        || item.authorName?.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [data.items, search, selectedStatus]);

  const statusFromLabel = (label) => {
    if (label.includes('Draft')) return 'DRAFT';
    if (label.includes('Pending')) return 'PENDING_REVIEW';
    return 'PUBLISHED';
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Published Guidance</h1>
        <p className="text-gray-600">Review article guides created by experts and admins in the shared database</p>
      </motion.div>

      {message && (
        <div className="rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(data.stats ?? []).map((stat) => {
          const statusKey = statusFromLabel(stat.label);
          return (
            <button key={stat.label} type="button" className="text-left rounded-3xl" onClick={() => setSelectedStatus((current) => current === statusKey ? '' : statusKey)}>
              <Card className={selectedStatus === statusKey ? 'ring-2 ring-[#1B5E20]' : ''}>
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search article guides by title, topic, or author..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
          />
        </div>
      </Card>

      <Card hover={false}>
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <button key={item.id} type="button" className="w-full rounded-2xl bg-gray-50 px-5 py-4 text-left transition hover:bg-[#E8F5E9]" onClick={() => setSelectedGuide(item)}>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.authorName} | {item.topic}</p>
                </div>
                <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-sm font-medium text-[#1B5E20]">{item.status || 'PUBLISHED'}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Open full article guide</p>
            </button>
          ))}
          {filteredItems.length === 0 && (
            <div className="py-16 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No article guides match this filter.</p>
            </div>
          )}
        </div>
      </Card>

      <DetailModal
        isOpen={Boolean(selectedGuide)}
        title={selectedGuide?.title}
        subtitle={selectedGuide ? `${selectedGuide.authorName} | ${selectedGuide.topic} | ${selectedGuide.status}` : ''}
        onClose={() => setSelectedGuide(null)}
      >
        {selectedGuide ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Format</div>
                <div className="mt-2 text-sm text-gray-700">Article & Guide</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Featured</div>
                <div className="mt-2 text-sm text-gray-700">{selectedGuide.featured ? 'Yes' : 'No'}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Created</div>
                <div className="mt-2 text-sm text-gray-700">{formatDisplayDateTime(selectedGuide.createdAt)}</div>
              </div>
            </div>
            <p className="rounded-3xl bg-[#F5F5DC]/40 px-5 py-5 text-sm leading-7 text-gray-700">{selectedGuide.description}</p>
            <article className="whitespace-pre-wrap text-sm leading-8 text-gray-700">{selectedGuide.contentBody}</article>
          </div>
        ) : null}
      </DetailModal>
    </div>
  );
};

export default ExpertGuidance;
