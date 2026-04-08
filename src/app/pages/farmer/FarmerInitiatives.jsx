import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Users } from 'lucide-react';
import { Card } from '../../components/Card';
import { DetailModal } from '../../components/DetailModal';
import { EmptyState } from '../../components/EmptyState';
import { Button } from '../../components/Button';
import { api } from '../../lib/api';
import { formatDisplayDate, formatDisplayDateTime } from '../../lib/date';

const FarmerInitiatives = () => {
  const [data, setData] = useState({ items: [], summary: {} });
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [message, setMessage] = useState('');
  const items = data.items ?? [];
  const summary = data.summary ?? {};

  useEffect(() => {
    api.getFarmerInitiatives().then(setData).catch((error) => setMessage(error.message));
  }, []);

  const currentInitiative = items.find((item) => item.status === 'ACTIVE') || items[0] || null;
  const otherInitiatives = currentInitiative
    ? items.filter((item) => item.id !== currentInitiative.id)
    : [];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Farming Initiatives</h1>
          <p className="text-gray-600">
            Track live initiative participation and open the full details for each initiative
          </p>
        </div>
      </motion.div>

      {message && (
        <div className="rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card hover={false}>
          <div className="text-sm font-semibold uppercase tracking-wide text-[#1B5E20]">
            Current Initiative
          </div>
          <div className="mt-3 text-3xl font-bold text-gray-900">{currentInitiative ? 1 : 0}</div>
          <p className="mt-2 text-sm text-gray-600">
            One live initiative is featured on this page at a time.
          </p>
        </Card>
        <Card hover={false}>
          <div className="text-sm font-semibold uppercase tracking-wide text-[#1B5E20]">
            Active Initiatives
          </div>
          <div className="mt-3 text-3xl font-bold text-gray-900">{summary.active || 0}</div>
          <p className="mt-2 text-sm text-gray-600">Pulled from the current initiative records in MySQL.</p>
        </Card>
        <Card hover={false}>
          <div className="text-sm font-semibold uppercase tracking-wide text-[#1B5E20]">
            Live Participants
          </div>
          <div className="mt-3 text-3xl font-bold text-gray-900">
            {currentInitiative?.liveParticipantCount ?? currentInitiative?.participantCount ?? 0}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Based on real participant rows linked to the selected initiative.
          </p>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card hover={false}>
          {!currentInitiative ? (
            <EmptyState
              icon={Lightbulb}
              title="No Initiatives Yet"
              description="Live initiatives will appear here once records are available in the platform."
            />
          ) : (
            <div className="space-y-6">
              <button
                type="button"
                className="w-full rounded-3xl bg-gray-50 px-6 py-6 text-left transition hover:bg-[#E8F5E9]"
                onClick={() => setSelectedInitiative(currentInitiative)}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                      Current Live Initiative
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentInitiative.title}</h3>
                    <p className="text-sm text-gray-600">Led by {currentInitiative.ownerName}</p>
                    <p className="text-sm leading-7 text-gray-600">{currentInitiative.summary}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-sm font-medium text-[#1B5E20]">
                      {currentInitiative.status}
                    </span>
                    <span className="rounded-full bg-[#F5F5DC] px-3 py-1 text-sm font-medium text-[#5D4037]">
                      {currentInitiative.liveParticipantCount ?? currentInitiative.participantCount ?? 0} participants
                    </span>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-white px-4 py-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                      Schedule
                    </div>
                    <div className="mt-2 text-sm text-gray-700">{currentInitiative.schedule}</div>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                      Participants
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(currentInitiative.participants ?? []).slice(0, 3).map((participant) => (
                        <span
                          key={participant.id}
                          className="rounded-full bg-[#E8F5E9] px-3 py-1 text-sm font-medium text-[#1B5E20]"
                        >
                          {participant.fullName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>

              {otherInitiatives.length > 0 ? (
                <div className="rounded-3xl bg-[#F5F5DC]/40 px-5 py-5">
                  <div className="mb-3 text-sm font-semibold text-gray-900">
                    Other Tracked Initiatives
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {otherInitiatives.map((item) => (
                      <Button
                        key={item.id}
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedInitiative(item)}
                      >
                        {item.title}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </Card>
      </motion.div>

      <DetailModal
        isOpen={Boolean(selectedInitiative)}
        title={selectedInitiative?.title}
        subtitle={
          selectedInitiative
            ? `${selectedInitiative.ownerName} | ${selectedInitiative.status}`
            : ''
        }
        onClose={() => setSelectedInitiative(null)}
        maxWidth="max-w-4xl"
      >
        {selectedInitiative ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                  Start Date
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  {formatDisplayDate(selectedInitiative.startDate)}
                </div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                  End Date
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  {selectedInitiative.endDate
                    ? formatDisplayDate(selectedInitiative.endDate)
                    : 'Ongoing initiative'}
                </div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                  Live Participants
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  {selectedInitiative.liveParticipantCount ?? selectedInitiative.participantCount ?? 0}
                </div>
              </div>
            </div>

            <article className="rounded-3xl bg-[#F5F5DC]/40 px-5 py-5 text-sm leading-8 text-gray-700">
              {selectedInitiative.detailBody}
            </article>

            <div>
              <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Users className="h-5 w-5 text-[#1B5E20]" />
                Users Participating In This Initiative
              </div>
              <div className="space-y-3">
                {(selectedInitiative.participants ?? []).map((participant) => (
                  <div key={participant.id} className="rounded-2xl bg-gray-50 px-5 py-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{participant.fullName}</div>
                        <div className="text-sm text-gray-600">
                          {participant.role} | {participant.location}
                        </div>
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                        Joined {formatDisplayDateTime(participant.joinedAt)}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-gray-600">{participant.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </DetailModal>
    </div>
  );
};

export default FarmerInitiatives;
