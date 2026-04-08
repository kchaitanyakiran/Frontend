import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Sprout,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { DetailModal } from '../../components/DetailModal';
import { api } from '../../lib/api';
import { formatDisplayDate, formatDisplayDateTime } from '../../lib/date';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ stats: [], quickActions: [], recentActivity: [], user: null });
  const [message, setMessage] = useState('');
  const [selectedPanel, setSelectedPanel] = useState(null);
  const stats = data.stats ?? [];
  const recentActivity = data.recentActivity ?? [];
  const quickActions = data.quickActions ?? [
    {
      label: 'Explore Opportunities',
      path: '/farmer/opportunities',
      description: 'Check current livelihood opportunities.',
    },
    {
      label: 'Connect with Experts',
      path: '/farmer/connections',
      description: 'Reach agricultural experts and sector partners.',
    },
    {
      label: 'Access Resources',
      path: '/farmer/resources',
      description: 'Open published articles and guides.',
    },
  ];

  useEffect(() => {
    api.getFarmerDashboard().then(setData).catch((error) => setMessage(error.message));
  }, []);

  const iconMap = {
    'Active Initiatives': Sprout,
    Connections: Users,
    'Resources Accessed': BookOpen,
    'Live Opportunities': Award,
  };

  const actionIconMap = {
    'Explore Opportunities': Award,
    'Connect with Experts': Users,
    'Access Resources': BookOpen,
  };

  const panelConfig = {
    initiatives: {
      path: '/farmer/initiatives',
      subtitle: 'Live initiative records with current participant counts from the platform.',
      load: async () => {
        const response = await api.getFarmerInitiatives();
        return response.items.map((item) => ({
          id: item.id,
          title: item.title,
          meta: `${item.status} | ${item.liveParticipantCount ?? item.participantCount ?? 0} live participants`,
          description: item.summary,
        }));
      },
    },
    connections: {
      path: '/farmer/connections',
      subtitle: 'Current sector contacts available for farmers right now.',
      load: async () => {
        const response = await api.getFarmerConnections();
        return response.items.map((item) => ({
          id: item.id,
          title: item.name,
          meta: `${item.category} | ${item.organization}`,
          description: `${item.specialty} | ${item.location}`,
        }));
      },
    },
    resources: {
      path: '/farmer/resources',
      subtitle: 'Published articles and guides that are live in the portal.',
      load: async () => {
        const response = await api.getFarmerResources();
        return response.items.map((item) => ({
          id: item.id,
          title: item.title,
          meta: `${item.authorName} | ${item.topic}`,
          description: item.description,
        }));
      },
    },
    opportunities: {
      path: '/farmer/opportunities',
      subtitle: 'Open opportunities currently available for farmer participation.',
      load: async () => {
        const response = await api.getFarmerOpportunities();
        return response.items.map((item) => ({
          id: item.id,
          title: item.title,
          meta: `${item.organization} | ${item.location}`,
          description: `${item.category} | Deadline ${formatDisplayDate(item.deadline)}`,
        }));
      },
    },
  };

  const openPanel = async (stat) => {
    const config = panelConfig[stat.key];
    if (!config) {
      return;
    }

    setSelectedPanel({
      title: stat.label,
      subtitle: config.subtitle,
      path: config.path,
      items: [],
      loading: true,
      error: '',
    });

    try {
      const items = await config.load();
      setSelectedPanel({
        title: stat.label,
        subtitle: config.subtitle,
        path: config.path,
        items,
        loading: false,
        error: '',
      });
    } catch (error) {
      setSelectedPanel({
        title: stat.label,
        subtitle: config.subtitle,
        path: config.path,
        items: [],
        loading: false,
        error: error.message,
      });
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          Welcome Back{data.user?.fullName ? `, ${data.user.fullName.split(' ')[0]}` : ''}
        </h1>
        <p className="text-gray-600">Here&apos;s what&apos;s happening with your farming journey</p>
      </motion.div>

      {message && (
        <div className="rounded-2xl border border-[#1B5E20]/20 bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.label] || Sprout;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button type="button" className="w-full rounded-3xl text-left" onClick={() => openPanel(stat)}>
                <Card className="cursor-pointer">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: stat.color }} />
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="mb-1 text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-gray-600">{stat.label}</div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                      View live data
                    </div>
                  </div>
                </Card>
              </button>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = actionIconMap[action.label] || Sprout;
            return (
              <button
                key={action.label}
                type="button"
                className="w-full rounded-3xl text-left"
                onClick={() => navigate(action.path)}
              >
                <Card className="h-full cursor-pointer">
                  <Icon className="mb-3 h-10 w-10 text-[#1B5E20]" />
                  <h3 className="mb-2 text-lg font-semibold">{action.label}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#1B5E20]">
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Card>
              </button>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Recent Activity</h2>
        <Card hover={false}>
          {recentActivity.length === 0 ? (
            <div className="py-12 text-center">
              <Calendar className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-lg font-semibold text-gray-700">No Recent Activity</h3>
              <p className="text-gray-500">Your farming activities will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={`${activity.title}-${activity.occurredAt ?? ''}`}
                  className="rounded-2xl bg-gray-50 px-5 py-4"
                >
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#1B5E20]">
                    {formatDisplayDateTime(activity.occurredAt)}
                  </div>
                  <div className="font-semibold text-gray-900">{activity.title}</div>
                  <div className="text-sm text-gray-600">{activity.description}</div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      <DetailModal
        isOpen={Boolean(selectedPanel)}
        title={selectedPanel?.title}
        subtitle={selectedPanel?.subtitle}
        onClose={() => setSelectedPanel(null)}
        maxWidth="max-w-3xl"
        actions={
          selectedPanel ? (
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                navigate(selectedPanel.path);
                setSelectedPanel(null);
              }}
            >
              Open Full Page
            </Button>
          ) : null
        }
      >
        {selectedPanel?.loading ? (
          <div className="py-16 text-center text-gray-500">Loading live records...</div>
        ) : selectedPanel?.error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {selectedPanel.error}
          </div>
        ) : selectedPanel?.items?.length ? (
          <div className="space-y-4">
            {selectedPanel.items.map((item) => (
              <div key={item.id} className="rounded-2xl bg-gray-50 px-5 py-4">
                <div className="font-semibold text-gray-900">{item.title}</div>
                <div className="mt-1 text-sm font-medium text-[#1B5E20]">{item.meta}</div>
                <div className="mt-2 text-sm text-gray-600">{item.description}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-gray-500">
            No live records are available in this section right now.
          </div>
        )}
      </DetailModal>
    </div>
  );
};

export default FarmerDashboard;
