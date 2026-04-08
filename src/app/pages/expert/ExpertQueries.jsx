import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { DetailModal } from '../../components/DetailModal';
import { Button } from '../../components/Button';
import { HelpCircle, Search } from 'lucide-react';
import { api } from '../../lib/api';
import { formatDisplayDateTime } from '../../lib/date';

const ExpertQueries = () => {
  const [data, setData] = useState({ stats: [], items: [] });
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [answerBody, setAnswerBody] = useState('');
  const [message, setMessage] = useState('');

  const loadQueries = () => api.getExpertQueries().then(setData).catch((error) => setMessage(error.message));

  useEffect(() => {
    loadQueries();
  }, []);

  const filteredItems = useMemo(() => {
    return (data.items ?? []).filter((item) => {
      const matchesStatus = !selectedStatus || item.status === selectedStatus;
      const matchesSearch = !search
        || item.question?.toLowerCase().includes(search.toLowerCase())
        || item.farmerName?.toLowerCase().includes(search.toLowerCase())
        || item.topic?.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [data.items, search, selectedStatus]);

  const answerQuery = async (id) => {
    try {
      await api.answerExpertQuery(id, { answerBody });
      setMessage('Expert answer saved successfully.');
      setSelectedQuery(null);
      setAnswerBody('');
      loadQueries();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const filterFromLabel = (label) => label.includes('Pending') ? 'PENDING' : label.includes('Answered') ? 'ANSWERED' : '';

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Farmer Queries</h1>
        <p className="text-gray-600">Open live farmer questions and update their answered status in MySQL</p>
      </motion.div>

      {message && <div className="rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">{message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(data.stats ?? []).map((stat) => {
          const filter = filterFromLabel(stat.label);
          return (
            <button key={stat.label} type="button" className="rounded-3xl text-left" onClick={() => setSelectedStatus((current) => current === filter ? '' : filter)}>
              <Card className={selectedStatus === filter ? 'ring-2 ring-[#1B5E20]' : ''}>
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
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search farmer queries..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
        </div>
      </Card>

      <Card hover={false}>
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <button key={item.id} type="button" className="w-full rounded-2xl bg-gray-50 px-5 py-4 text-left transition hover:bg-[#E8F5E9]" onClick={() => {
              setSelectedQuery(item);
              setAnswerBody(item.answerBody || '');
            }}>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.question}</h3>
                  <p className="text-sm text-gray-600">{item.farmerName} | {item.topic}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${item.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-[#E8F5E9] text-[#1B5E20]'}`}>{item.status}</span>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Open query</p>
            </button>
          ))}
          {filteredItems.length === 0 && (
            <div className="py-16 text-center">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No queries match this filter.</p>
            </div>
          )}
        </div>
      </Card>

      <DetailModal
        isOpen={Boolean(selectedQuery)}
        title={selectedQuery?.question}
        subtitle={selectedQuery ? `${selectedQuery.farmerName} | ${selectedQuery.topic} | ${selectedQuery.status}` : ''}
        onClose={() => {
          setSelectedQuery(null);
          setAnswerBody('');
        }}
        actions={selectedQuery?.status === 'PENDING' ? <Button type="button" onClick={() => answerQuery(selectedQuery.id)}>Save Expert Answer</Button> : null}
      >
        {selectedQuery ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Submitted</div>
                <div className="mt-2 text-sm text-gray-700">{formatDisplayDateTime(selectedQuery.submittedAt)}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Answered</div>
                <div className="mt-2 text-sm text-gray-700">{selectedQuery.answeredAt ? formatDisplayDateTime(selectedQuery.answeredAt) : 'Not answered yet'}</div>
              </div>
            </div>
            <p className="rounded-3xl bg-[#F5F5DC]/40 px-5 py-5 text-sm leading-7 text-gray-700">{selectedQuery.question}</p>
            {selectedQuery.status === 'PENDING' ? (
              <textarea
                required
                minLength={20}
                rows={8}
                value={answerBody}
                onChange={(event) => setAnswerBody(event.target.value)}
                placeholder="Write a clear expert answer for this farmer query..."
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-7 text-gray-700 resize-none"
              />
            ) : (
              <div className="rounded-3xl bg-[#E8F5E9] px-5 py-5">
                <div className="mb-2 text-sm font-semibold text-[#1B5E20]">Expert Answer</div>
                <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">{selectedQuery.answerBody || 'Answer text is not available for this older query record.'}</p>
              </div>
            )}
          </div>
        ) : null}
      </DetailModal>
    </div>
  );
};

export default ExpertQueries;
