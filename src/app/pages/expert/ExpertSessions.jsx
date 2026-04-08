import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { DetailModal } from '../../components/DetailModal';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '../../components/Button';
import { api } from '../../lib/api';
import { formatDisplayDateTime } from '../../lib/date';

const initialForm = {
  title: '',
  description: '',
  sessionDate: '',
  attendeeCapacity: 50,
};

const ExpertSessions = () => {
  const [data, setData] = useState({ stats: [], items: [] });
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadSessions = () => api.getExpertSessions().then(setData).catch((error) => setMessage(error.message));

  useEffect(() => {
    loadSessions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.createExpertSession(formData);
      setMessage('Session scheduled successfully.');
      setFormData(initialForm);
      setIsFormOpen(false);
      loadSessions();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Live Session Scheduling</h1>
          <p className="text-gray-600">Schedule and manage guidance sessions from the shared platform database</p>
        </div>
        <Button variant="primary" type="button" onClick={() => setIsFormOpen(true)}>
          <Plus size={20} />
          Schedule Session
        </Button>
      </motion.div>

      {message && <div className="rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">{message}</div>}

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
        <div className="space-y-4">
          {(data.items ?? []).map((item) => (
            <button key={item.id} type="button" className="w-full rounded-2xl bg-gray-50 px-5 py-4 text-left transition hover:bg-[#E8F5E9]" onClick={() => setSelectedSession(item)}>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{formatDisplayDateTime(item.sessionDate)}</p>
                </div>
                <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-sm font-medium text-[#1B5E20]">{item.status}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              <p className="mt-2 text-xs text-gray-500">{item.registeredCount}/{item.attendeeCapacity} registered</p>
            </button>
          ))}
          {(data.items ?? []).length === 0 && (
            <div className="py-16 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No sessions scheduled.</p>
            </div>
          )}
        </div>
      </Card>

      <DetailModal
        isOpen={isFormOpen}
        title="Schedule Expert Session"
        subtitle="Create a new live session record in MySQL."
        onClose={() => setIsFormOpen(false)}
        maxWidth="max-w-3xl"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input required type="text" value={formData.title} onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))} placeholder="Session title" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
          <textarea required rows={4} value={formData.description} onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))} placeholder="Session description" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 resize-none" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required type="datetime-local" value={formData.sessionDate ? formData.sessionDate.slice(0, 16) : ''} onChange={(event) => setFormData((prev) => ({ ...prev, sessionDate: event.target.value ? `${event.target.value}:00` : '' }))} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
            <input required type="number" value={formData.attendeeCapacity} onChange={(event) => setFormData((prev) => ({ ...prev, attendeeCapacity: Number(event.target.value) }))} min="1" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" />
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="primary" type="submit">Save Session</Button>
            <Button variant="outline" type="button" onClick={() => setIsFormOpen(false)}>Cancel</Button>
          </div>
        </form>
      </DetailModal>

      <DetailModal
        isOpen={Boolean(selectedSession)}
        title={selectedSession?.title}
        subtitle={selectedSession ? `${selectedSession.status} | ${formatDisplayDateTime(selectedSession.sessionDate)}` : ''}
        onClose={() => setSelectedSession(null)}
        maxWidth="max-w-3xl"
      >
        {selectedSession ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Capacity</div>
                <div className="mt-2 text-sm text-gray-700">{selectedSession.attendeeCapacity}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Registered</div>
                <div className="mt-2 text-sm text-gray-700">{selectedSession.registeredCount}</div>
              </div>
              <div className="rounded-2xl bg-gray-50 px-4 py-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">Open Seats</div>
                <div className="mt-2 text-sm text-gray-700">{Math.max(0, selectedSession.attendeeCapacity - selectedSession.registeredCount)}</div>
              </div>
            </div>
            <p className="rounded-3xl bg-[#F5F5DC]/40 px-5 py-5 text-sm leading-7 text-gray-700">{selectedSession.description}</p>
          </div>
        ) : null}
      </DetailModal>
    </div>
  );
};

export default ExpertSessions;
