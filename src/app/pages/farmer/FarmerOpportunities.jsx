import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Search } from 'lucide-react';
import { Card } from '../../components/Card';
import { DetailModal } from '../../components/DetailModal';
import { EmptyState } from '../../components/EmptyState';
import { Button } from '../../components/Button';
import { api } from '../../lib/api';
import { formatDisplayDate } from '../../lib/date';

const FarmerOpportunities = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.getFarmerOpportunities(search)
      .then((response) => setItems(response.items))
      .catch((error) => setMessage(error.message));
  }, [search]);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-2 text-4xl font-bold text-gray-900">Available Opportunities</h1>
        <p className="text-gray-600">
          Discover live grants, programs, and training opportunities that support farmer livelihoods
        </p>
      </motion.div>

      {message && (
        <div className="rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
          {message}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card hover={false}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/20 transition-all"
            />
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card hover={false}>
          {items.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No Opportunities Found"
              description="Try a different search term or check back for new programs."
              action={
                <Button variant="primary" type="button" onClick={() => setSearch('')}>
                  Show All Opportunities
                </Button>
              }
            />
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-left transition hover:bg-[#E8F5E9]"
                  onClick={() => setSelectedOpportunity(item)}
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        {item.organization} | {item.location}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-sm font-medium text-[#1B5E20]">
                        {item.category}
                      </span>
                      <span className="rounded-full bg-[#F5F5DC] px-3 py-1 text-sm font-medium text-[#5D4037]">
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">{item.description}</p>
                  <p className="mt-3 text-sm font-medium text-gray-800">
                    Deadline: {formatDisplayDate(item.deadline)}
                  </p>
                </button>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      <DetailModal
        isOpen={Boolean(selectedOpportunity)}
        title={selectedOpportunity?.title}
        subtitle={
          selectedOpportunity
            ? `${selectedOpportunity.organization} | ${selectedOpportunity.location}`
            : ''
        }
        onClose={() => setSelectedOpportunity(null)}
        maxWidth="max-w-3xl"
      >
        {selectedOpportunity ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                  Category
                </div>
                <div className="mt-2 text-sm text-gray-700">{selectedOpportunity.category}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                  Status
                </div>
                <div className="mt-2 text-sm text-gray-700">{selectedOpportunity.status}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                  Deadline
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  {formatDisplayDate(selectedOpportunity.deadline)}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#F5F5DC]/40 px-5 py-5 text-sm leading-7 text-gray-700">
              {selectedOpportunity.detailBody}
            </div>
          </div>
        ) : null}
      </DetailModal>
    </div>
  );
};

export default FarmerOpportunities;
