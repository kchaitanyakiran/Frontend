import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Search, UserPlus, Users } from 'lucide-react';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { Button } from '../../components/Button';
import { DetailModal } from '../../components/DetailModal';
import { api } from '../../lib/api';

const FarmerConnections = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [data, setData] = useState({ stats: [], items: [] });
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [message, setMessage] = useState('');
  const stats = data.stats ?? [];
  const items = data.items ?? [];

  useEffect(() => {
    api.getFarmerConnections(search, selectedCategory)
      .then(setData)
      .catch((error) => setMessage(error.message));
  }, [search, selectedCategory]);

  const handleFilter = (filterKey) => {
    setSelectedCategory((current) => (current === filterKey ? '' : filterKey));
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-2 text-4xl font-bold text-gray-900">Sector Connections</h1>
        <p className="text-gray-600">Connect with experts, organizations, and fellow farmers</p>
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
              placeholder="Search connections..."
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <button
              key={stat.label}
              type="button"
              className="w-full rounded-3xl text-left"
              onClick={() => handleFilter(stat.filterKey)}
            >
              <Card className={selectedCategory === stat.filterKey ? 'ring-2 ring-[#1B5E20]' : ''}>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1B5E20]/10">
                    <Users className="h-8 w-8 text-[#1B5E20]" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                    {selectedCategory === stat.filterKey ? 'Showing this category' : 'Tap to filter'}
                  </p>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card hover={false}>
          {items.length === 0 ? (
            <EmptyState
              icon={UserPlus}
              title="Build Your Network"
              description="Start connecting with agricultural experts, organizations, and fellow farmers to grow your network."
              action={
                <Button variant="primary" type="button" onClick={() => setSelectedCategory('')}>
                  Show All Connections
                </Button>
              }
            />
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="w-full rounded-2xl bg-gray-50 px-5 py-4 text-left transition hover:bg-[#E8F5E9]"
                  onClick={() => setSelectedConnection(item)}
                >
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.organization} | {item.location}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-sm font-medium text-[#1B5E20]">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{item.specialty}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                    View full profile
                  </p>
                </button>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      <DetailModal
        isOpen={Boolean(selectedConnection)}
        title={selectedConnection?.name}
        subtitle={
          selectedConnection
            ? `${selectedConnection.category} | ${selectedConnection.organization}`
            : ''
        }
        onClose={() => setSelectedConnection(null)}
        maxWidth="max-w-3xl"
        actions={
          selectedConnection ? (
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                window.location.href = `mailto:${selectedConnection.contactEmail}`;
              }}
            >
              <Mail size={16} />
              Contact Person
            </Button>
          ) : null
        }
      >
        {selectedConnection ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                  Location
                </div>
                <div className="mt-2 text-sm text-gray-700">{selectedConnection.location}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                  Specialty
                </div>
                <div className="mt-2 text-sm text-gray-700">{selectedConnection.specialty}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                  Email
                </div>
                <div className="mt-2 text-sm text-gray-700">{selectedConnection.contactEmail}</div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#F5F5DC]/40 px-5 py-5">
              <div className="text-sm font-semibold text-gray-900">Connection Overview</div>
              <p className="mt-3 text-sm leading-7 text-gray-600">{selectedConnection.about}</p>
            </div>

            <div>
              <div className="text-sm font-semibold text-gray-900">Support Areas</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(selectedConnection.supportAreas ?? []).map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-[#E8F5E9] px-3 py-1 text-sm font-medium text-[#1B5E20]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </DetailModal>
    </div>
  );
};

export default FarmerConnections;
