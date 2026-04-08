import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { DetailModal } from '../../components/DetailModal';
import { Heart, Search, Users } from 'lucide-react';
import { api } from '../../lib/api';
import { formatDisplayDate } from '../../lib/date';

const PublicSupport = () => {
  const [data, setData] = useState({ stats: [], items: [] });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.getPublicSupport().then(setData).catch((error) => setMessage(error.message));
  }, []);

  const statusOptions = useMemo(() => [...new Set((data.items ?? []).map((item) => item.status).filter(Boolean))], [data.items]);

  const filteredCampaigns = useMemo(() => {
    return (data.items ?? []).filter((item) => {
      const matchesStatus = !statusFilter || item.status === statusFilter;
      const matchesSearch = !search
        || item.title?.toLowerCase().includes(search.toLowerCase())
        || item.summary?.toLowerCase().includes(search.toLowerCase())
        || item.status?.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [data.items, search, statusFilter]);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Support Farmer Initiatives</h1>
        <p className="text-gray-600">View live farmer initiatives from the same database used in the Farmer Portal</p>
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
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search live farmer initiatives..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
        </div>
        <div className="mb-5 flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button key={status} type="button" onClick={() => setStatusFilter((current) => current === status ? '' : status)} className={`px-4 py-2 rounded-full text-sm font-medium ${statusFilter === status ? 'bg-[#1B5E20] text-white' : 'bg-[#E8F5E9] text-[#1B5E20]'}`}>
              {status}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {filteredCampaigns.map((item) => {
            return (
              <button key={item.id} type="button" className="w-full rounded-2xl bg-gray-50 px-5 py-4 text-left transition hover:bg-[#E8F5E9]" onClick={() => setSelectedCampaign(item)}>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.summary}</p>
                  </div>
                  <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-sm font-medium text-[#1B5E20]">{item.status}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{item.participantCount} participants | Owner: {item.ownerName}</p>
              </button>
            );
          })}
          {filteredCampaigns.length === 0 && (
            <div className="py-16 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No farmer initiatives match this live filter.</p>
            </div>
          )}
        </div>
      </Card>

      <DetailModal isOpen={Boolean(selectedCampaign)} title={selectedCampaign?.title} subtitle={selectedCampaign ? selectedCampaign.status : ''} onClose={() => setSelectedCampaign(null)} maxWidth="max-w-3xl">
        {selectedCampaign ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Owner</div>
                <div className="mt-2 text-sm text-gray-700">{selectedCampaign.ownerName}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Start Date</div>
                <div className="mt-2 text-sm text-gray-700">{formatDisplayDate(selectedCampaign.startDate)}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Participants</div>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                  <Users className="h-4 w-4 text-[#1B5E20]" />
                  {selectedCampaign.participantCount}
                </div>
              </div>
            </div>
            <p className="rounded-3xl bg-[#F5F5DC]/40 px-5 py-5 text-sm leading-7 text-gray-700">{selectedCampaign.summary}</p>
          </div>
        ) : null}
      </DetailModal>
    </div>
  );
};

export default PublicSupport;
