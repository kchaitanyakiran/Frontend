import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { DetailModal } from '../../components/DetailModal';
import { EmptyState } from '../../components/EmptyState';
import { BookOpen, Calendar, Heart, MessageSquare, Search, TrendingUp } from 'lucide-react';
import { api } from '../../lib/api';
import { formatDisplayDate, formatDisplayDateTime } from '../../lib/date';

const PublicExplore = () => {
  const [data, setData] = useState({ categories: [], featured: [], discussions: [], supportItems: [], expertSessions: [], trendingTopics: [] });
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [activeType, setActiveType] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.getPublicExplore().then(setData).catch((error) => setMessage(error.message));
  }, []);

  const records = useMemo(() => {
    const allRecords = [
      ...(data.featured ?? []).map((item) => ({ ...item, recordType: 'ARTICLES', typeLabel: 'Article & Guide', icon: BookOpen })),
      ...(data.discussions ?? []).map((item) => ({ ...item, recordType: 'DISCUSSIONS', typeLabel: 'Discussion', icon: MessageSquare })),
      ...(data.supportItems ?? []).map((item) => ({ ...item, recordType: 'SUPPORT', typeLabel: 'Farmer Initiative', icon: Heart })),
      ...(data.expertSessions ?? []).map((item) => ({ ...item, recordType: 'SESSIONS', typeLabel: 'Expert Session', icon: Calendar })),
    ];

    return allRecords.filter((item) => {
      const matchesSearch = !search
        || item.title?.toLowerCase().includes(search.toLowerCase())
        || item.topic?.toLowerCase().includes(search.toLowerCase())
        || item.category?.toLowerCase().includes(search.toLowerCase())
        || item.description?.toLowerCase().includes(search.toLowerCase())
        || item.summary?.toLowerCase().includes(search.toLowerCase());
      const matchesTopic = !selectedTopic || item.topic === selectedTopic || item.category === selectedTopic;
      const matchesType = activeType === 'ALL' || item.recordType === activeType;
      return matchesSearch && matchesTopic && matchesType;
    });
  }, [activeType, data, search, selectedTopic]);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Farming Knowledge</h1>
        <p className="text-gray-600">Read live article guides and public knowledge from the shared AgriLink database</p>
      </motion.div>

      {message && <div className="rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">{message}</div>}

      <Card hover={false}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search live articles by title, topic, or summary..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 transition-all"
          />
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Live Platform Data</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(data.categories ?? []).map((category) => (
            <Card key={category.name}>
              <button type="button" className="w-full text-center" onClick={() => setActiveType((current) => current === category.filterKey ? 'ALL' : category.filterKey)}>
                <div className="text-2xl font-bold mb-1" style={{ color: category.color }}>{category.count}</div>
                <div className="text-sm text-gray-600">{category.name}</div>
                <div className="mt-2 text-xs font-semibold text-[#1B5E20]">{activeType === category.filterKey ? 'Showing records' : 'Tap to filter'}</div>
              </button>
            </Card>
          ))}
        </div>
      </div>

      <Card hover={false}>
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-[#1B5E20]" />
          <h3 className="text-lg font-semibold text-gray-900">Live Topics</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {(data.trendingTopics ?? []).map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => setSelectedTopic((current) => current === topic ? '' : topic)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTopic === topic ? 'bg-[#1B5E20] text-white' : 'bg-[#E8F5E9] text-[#1B5E20]'}`}
            >
              {topic}
            </button>
          ))}
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Live Public Records</h2>
        <Card hover={false}>
          {records.length === 0 ? (
            <EmptyState icon={BookOpen} title="No Live Records Found" description="Try a different search, topic, or data filter." />
          ) : (
            <div className="space-y-4">
              {records.map((item) => (
                <button key={`${item.recordType}-${item.id}`} type="button" className="w-full rounded-2xl bg-gray-50 px-5 py-4 text-left transition hover:bg-[#E8F5E9]" onClick={() => setSelectedRecord(item)}>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.typeLabel} | {item.topic || item.category || item.status}</p>
                    </div>
                    <span className="text-sm font-medium text-[#1B5E20]">Open details</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{item.description || item.excerpt || item.summary}</p>
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>

      <DetailModal
        isOpen={Boolean(selectedRecord)}
        title={selectedRecord?.title}
        subtitle={selectedRecord ? `${selectedRecord.typeLabel} | ${selectedRecord.topic || selectedRecord.category || selectedRecord.status}` : ''}
        onClose={() => setSelectedRecord(null)}
      >
        {selectedRecord ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Record Type</div>
                <div className="mt-2 text-sm text-gray-700">{selectedRecord.typeLabel}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Status</div>
                <div className="mt-2 text-sm text-gray-700">{selectedRecord.status || 'PUBLISHED'}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">{selectedRecord.recordType === 'SUPPORT' ? 'Participants' : 'Date'}</div>
                <div className="mt-2 text-sm text-gray-700">
                  {selectedRecord.recordType === 'SUPPORT'
                    ? selectedRecord.participantCount
                    : formatDisplayDateTime(selectedRecord.createdAt || selectedRecord.sessionDate)}
                </div>
              </div>
            </div>
            <p className="rounded-3xl bg-[#F5F5DC]/40 px-5 py-5 text-sm leading-7 text-gray-700">{selectedRecord.description || selectedRecord.excerpt || selectedRecord.summary}</p>
            {selectedRecord.contentBody ? <article className="whitespace-pre-wrap text-sm leading-8 text-gray-700">{selectedRecord.contentBody}</article> : null}
            {selectedRecord.recordType === 'SUPPORT' ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-gray-50 px-4 py-4">Owner: {selectedRecord.ownerName}</div>
                <div className="rounded-2xl bg-gray-50 px-4 py-4">Participants: {selectedRecord.participantCount}</div>
                <div className="rounded-2xl bg-gray-50 px-4 py-4">Started: {formatDisplayDate(selectedRecord.startDate)}</div>
              </div>
            ) : null}
            {selectedRecord.recordType === 'SESSIONS' ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 px-4 py-4">Capacity: {selectedRecord.attendeeCapacity}</div>
                <div className="rounded-2xl bg-gray-50 px-4 py-4">Registered: {selectedRecord.registeredCount}</div>
              </div>
            ) : null}
          </div>
        ) : null}
      </DetailModal>
    </div>
  );
};

export default PublicExplore;
