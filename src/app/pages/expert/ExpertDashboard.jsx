import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Award, Calendar, FileText, MessageSquare, TrendingUp, Users } from 'lucide-react';
import { Card } from '../../components/Card';
import { DetailModal } from '../../components/DetailModal';
import { Button } from '../../components/Button';
import { api } from '../../lib/api';
import { formatDisplayDateTime } from '../../lib/date';

const ExpertDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    stats: [],
    impact: {},
    queries: [],
    sessions: [],
    resources: [],
    quickActions: [],
    recentActivity: [],
  });
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.getExpertDashboard().then(setData).catch((error) => setMessage(error.message));
  }, []);

  const iconMap = {
    'Published Content': FileText,
    'Answered Queries': MessageSquare,
    'Upcoming Sessions': Calendar,
    'Farmers Helped': Users,
  };

  const actionIcons = {
    'Create Content': FileText,
    'Answer Queries': MessageSquare,
    'Schedule Session': Calendar,
  };

  const openStatPanel = (stat) => {
    const panelData = {
      'Published Content': {
        subtitle: 'Article guides currently stored in the shared platform database.',
        items: (data.resources ?? []).map((item) => ({
          id: item.id,
          title: item.title,
          meta: `${item.topic} | ${item.status}`,
          description: item.description,
        })),
        path: '/expert/guidance',
      },
      'Answered Queries': {
        subtitle: 'Farmer questions already answered by experts.',
        items: (data.queries ?? [])
          .filter((item) => item.status === 'ANSWERED')
          .map((item) => ({
            id: item.id,
            title: item.question,
            meta: `${item.farmerName} | ${item.topic}`,
            description: item.answeredAt ? `Answered ${formatDisplayDateTime(item.answeredAt)}` : 'Answered',
          })),
        path: '/expert/queries',
      },
      'Upcoming Sessions': {
        subtitle: 'Scheduled expert guidance sessions from the shared database.',
        items: (data.sessions ?? [])
          .filter((item) => item.status === 'SCHEDULED')
          .map((item) => ({
            id: item.id,
            title: item.title,
            meta: `${item.registeredCount}/${item.attendeeCapacity} registered`,
            description: formatDisplayDateTime(item.sessionDate),
          })),
        path: '/expert/sessions',
      },
      'Farmers Helped': {
        subtitle: 'Live farmer support activity from queries and session registrations.',
        items: (data.queries ?? []).map((item) => ({
          id: item.id,
          title: item.farmerName,
          meta: `${item.topic} | ${item.status}`,
          description: item.question,
        })),
        path: '/expert/queries',
      },
    }[stat.label];

    if (panelData) {
      setSelectedPanel({ title: stat.label, ...panelData });
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Expert Dashboard</h1>
        <p className="text-gray-600">Share live guidance and support farmers using the shared AgriLink database</p>
      </motion.div>

      {message && (
        <div className="rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(data.stats ?? []).map((stat, index) => {
          const Icon = iconMap[stat.label] || FileText;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <button type="button" className="w-full text-left rounded-3xl" onClick={() => openStatPanel(stat)}>
                <Card className="cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-gray-600">{stat.label}</div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">View live data</div>
                  </div>
                </Card>
              </button>
            </motion.div>
          );
        })}
      </div>

      <Card hover={false}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Live Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            ['Content Reach', data.impact?.contentReach || 0, Award],
            ['Responses Given', data.impact?.responsesGiven || 0, MessageSquare],
            ['Query Coverage', `${data.impact?.queryCoverage || 0}%`, Users],
          ].map(([label, value, Icon]) => (
            <div key={label} className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#43A047] flex items-center justify-center mx-auto mb-3">
                <Icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{value}</h3>
              <p className="text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(data.quickActions ?? []).map((action) => {
            const Icon = actionIcons[action.label] || FileText;
            return (
              <button key={action.label} type="button" className="w-full text-left rounded-3xl" onClick={() => navigate(action.path)}>
                <Card className="h-full cursor-pointer">
                  <Icon className="w-10 h-10 text-[#1B5E20] mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{action.label}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </Card>
              </button>
            );
          })}
        </div>
      </div>

      <Card hover={false}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Expert Activity</h2>
        <div className="space-y-4">
          {(data.recentActivity ?? []).map((item) => (
            <div key={`${item.title}-${item.timestamp}`} className="rounded-2xl bg-gray-50 px-5 py-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20] mb-2">{formatDisplayDateTime(item.timestamp)}</div>
              <div className="font-semibold text-gray-900">{item.title}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
            </div>
          ))}
          {(data.recentActivity ?? []).length === 0 && <p className="py-8 text-center text-gray-500">No recent expert activity yet.</p>}
        </div>
      </Card>

      <DetailModal
        isOpen={Boolean(selectedPanel)}
        title={selectedPanel?.title}
        subtitle={selectedPanel?.subtitle}
        onClose={() => setSelectedPanel(null)}
        maxWidth="max-w-3xl"
        actions={selectedPanel ? <Button type="button" onClick={() => navigate(selectedPanel.path)}>Open Full Page</Button> : null}
      >
        <div className="space-y-4">
          {(selectedPanel?.items ?? []).map((item) => (
            <div key={item.id} className="rounded-2xl bg-gray-50 px-5 py-4">
              <div className="font-semibold text-gray-900">{item.title}</div>
              <div className="mt-1 text-sm font-medium text-[#1B5E20]">{item.meta}</div>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
          {(selectedPanel?.items ?? []).length === 0 && <p className="py-8 text-center text-gray-500">No live records available for this section.</p>}
        </div>
      </DetailModal>
    </div>
  );
};

export default ExpertDashboard;
