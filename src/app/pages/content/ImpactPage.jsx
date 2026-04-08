import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  ChevronRight,
  HeartHandshake,
  Leaf,
  Sprout,
  TrendingUp,
  Users,
  BadgeIndianRupee,
  GraduationCap,
  Globe2,
} from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { AnimatedSection } from '../../components/AnimatedSection';
import { api } from '../../lib/api';

const iconMap = {
  users: Users,
  'graduation-cap': GraduationCap,
  'trending-up': TrendingUp,
  sprout: Sprout,
  'badge-indian-rupee': BadgeIndianRupee,
  'globe-2': Globe2,
};

const roleOptions = [
  { key: 'farmer', title: 'Farmer', color: '#1B5E20' },
  { key: 'expert', title: 'Expert', color: '#2E7D32' },
  { key: 'public', title: 'Public', color: '#C9A961' },
];

const formatValue = (value) => {
  if (typeof value !== 'number') {
    return value;
  }
  return value.toLocaleString();
};

const ImpactPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ stats: [], areas: [], stories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.getPublicImpact();
        if (active) {
          setData(response);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => data.stats || [], [data.stats]);
  const areas = useMemo(() => data.areas || [], [data.areas]);
  const stories = useMemo(() => data.stories || [], [data.stories]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-white via-[#F4F8F2] to-[#FFFDF6]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-[#1B5E20] blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 22, repeat: Infinity }}
          className="absolute -left-20 bottom-24 h-80 w-80 rounded-full bg-[#C9A961] blur-3xl"
        />
      </div>

      <section className="relative px-6 pb-16 pt-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#1B5E20] transition hover:text-[#2E7D32]"
            >
              <ArrowLeft size={16} />
              Back to Landing Page
            </button>

            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <span className="inline-flex rounded-full border border-[#1B5E20]/15 bg-white/80 px-4 py-2 text-sm font-medium text-[#1B5E20]">
                  Live Impact Overview
                </span>
                <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
                  See the real impact of AgriLink from current application data.
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                  This screen now uses live backend data instead of static demo numbers. It shows how the application is
                  currently supporting farmers, experts, public engagement, and agricultural initiatives using the data
                  stored in the running system.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button variant="primary" size="lg" onClick={() => navigate('/roles')}>
                    Explore Roles
                    <ChevronRight size={18} />
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate('/signup')}>
                    Get Started
                  </Button>
                </div>
              </div>

              <Card hover={false} className="bg-white/90">
                <div className="flex items-start gap-4">
                  <HeartHandshake className="mt-1 h-10 w-10 text-[#1B5E20]" />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Why Impact Matters</h2>
                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      AgriLink creates impact when live users, resources, discussions, expert sessions, and support
                      efforts all work together inside one connected platform instead of scattered systems.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatedSection className="relative px-6 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Live Application Impact</h2>
            <p className="mt-3 max-w-2xl text-gray-600">
              These numbers are loaded from the current application database, not from demo placeholders.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {(loading ? Array.from({ length: 4 }) : stats).map((stat, index) => {
              const Icon = iconMap[stat?.icon] || Users;
              return (
                <Card key={stat?.label || index} className="h-full">
                  {loading ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-16 w-16 rounded-2xl bg-gray-100" />
                      <div className="h-10 w-24 rounded bg-gray-100" />
                      <div className="h-6 w-40 rounded bg-gray-100" />
                      <div className="h-20 rounded bg-gray-100" />
                    </div>
                  ) : (
                    <>
                      <div
                        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${stat.color}18` }}
                      >
                        <Icon className="h-8 w-8" style={{ color: stat.color }} />
                      </div>
                      <div className="text-4xl font-bold" style={{ color: stat.color }}>
                        {formatValue(stat.value)}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-gray-900">{stat.label}</h3>
                      <p className="mt-3 text-sm leading-7 text-gray-600">{stat.description}</p>
                    </>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <section className="relative px-6 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Where the Impact Happens</h2>
            <p className="mt-3 max-w-2xl text-gray-600">
              These sections also use current backend values to explain where the application is creating value right now.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {(loading ? Array.from({ length: 3 }) : areas).map((area, index) => {
              const Icon = iconMap[area?.icon] || Leaf;
              return (
                <AnimatedSection key={area?.title || index} delay={index * 0.08}>
                  <Card className="h-full">
                    {loading ? (
                      <div className="space-y-4 animate-pulse">
                        <div className="h-16 w-16 rounded-2xl bg-gray-100" />
                        <div className="h-8 w-40 rounded bg-gray-100" />
                        <div className="h-24 rounded bg-gray-100" />
                        <div className="h-20 rounded bg-gray-100" />
                      </div>
                    ) : (
                      <>
                        <div
                          className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                          style={{ backgroundColor: `${area.color}18` }}
                        >
                          <Icon className="h-8 w-8" style={{ color: area.color }} />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900">{area.title}</h3>
                        <p className="mt-4 text-sm leading-7 text-gray-600">{area.description}</p>
                        <div className="mt-6 space-y-3">
                          {area.points.map((point) => (
                            <div key={point} className="flex items-start gap-3 text-sm leading-7 text-gray-700">
                              <Leaf className="mt-1 h-4 w-4 shrink-0" style={{ color: area.color }} />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatedSection className="relative px-6 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Live Platform Outcome Stories</h2>
            <p className="mt-3 max-w-2xl text-gray-600">
              These summaries are built from the current application data instead of generic sample stories.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {(loading ? Array.from({ length: 3 }) : stories).map((story, index) => (
              <AnimatedSection key={story?.title || index} delay={index * 0.08}>
                <Card className="h-full bg-white/90">
                  {loading ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-8 w-48 rounded bg-gray-100" />
                      <div className="h-28 rounded bg-gray-100" />
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-semibold text-gray-900">{story.title}</h3>
                      <p className="mt-4 text-sm leading-8 text-gray-600">{story.text}</p>
                    </>
                  )}
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="relative px-6 pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-[#1B5E20]/10 bg-white/90 p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Choose Your Role to Get Started</h2>
            <p className="mt-3 max-w-2xl text-gray-600">
              Generic get-started actions now open role selection instead of defaulting directly to farmer sign-up.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {roleOptions.map((role) => (
                <button
                  key={role.key}
                  type="button"
                  onClick={() => navigate(`/signup?role=${role.key}`)}
                  className="rounded-3xl border border-gray-200 bg-[#FAFBF8] px-5 py-5 text-left transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-lg font-semibold" style={{ color: role.color }}>{role.title}</div>
                  <div className="mt-2 text-sm text-gray-600">Sign up as {role.title.toLowerCase()}.</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ImpactPage;
