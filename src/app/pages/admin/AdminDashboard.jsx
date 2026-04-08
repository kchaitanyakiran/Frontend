import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../../components/Card';
import { Users, FileText, MessageSquare, Activity, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { useNavigate } from 'react-router';
import { api } from '../../lib/api';

const AdminDashboard = () => {
  const [data, setData] = useState({ stats: [], growth: [], contentActivity: [], recentActivity: [], quickActions: [] });
  const navigate = useNavigate();

  useEffect(() => {
    api.getAdminOverview().then(setData).catch(() => {});
  }, []);

  const iconMap = {
    'Total Users': Users,
    'Content Posts': FileText,
    'Active Discussions': MessageSquare,
    'Platform Activity': Activity,
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Platform Overview</h1>
        <p className="text-gray-600">Live platform insights and management actions</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat) => {
          const Icon = iconMap[stat.label] || Activity;
          return (
            <Card key={stat.label}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          );
        })}
      </div>

      <Card hover={false}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.quickActions.map((action) => (
            <button key={action.path} type="button" onClick={() => navigate(action.path)} className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-left transition hover:border-[#1B5E20] hover:bg-[#E8F5E9]">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-900">{action.label}</div>
                <ArrowRight className="w-4 h-4 text-[#1B5E20]" />
              </div>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card hover={false}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.growth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#1B5E20" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card hover={false}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Activity</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.contentActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="posts" fill="#2E7D32" radius={[8, 8, 0, 0]} />
                <Bar dataKey="discussions" fill="#C9A961" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card hover={false}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Platform Activity</h3>
        <div className="space-y-4">
          {data.recentActivity.map((item, index) => (
            <div key={`${item.title}-${index}`} className="rounded-2xl bg-gray-50 px-5 py-4">
              <div className="font-semibold text-gray-900">{item.title}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
              <div className="mt-2 text-xs text-gray-500">{item.timestamp}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
