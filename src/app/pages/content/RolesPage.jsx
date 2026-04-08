import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router';
import {
  ChevronRight,
  Globe,
  GraduationCap,
  Shield,
  Sprout,
  Users,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { AnimatedSection } from '../../components/AnimatedSection';

const roleDefinitions = [
  {
    key: 'admin',
    title: 'Admin',
    icon: Shield,
    color: '#5D4037',
    summary: 'Own the platform operations, keep data accurate, and manage the full community system.',
    headline: 'Admin keeps AgriLink reliable, safe, and active.',
    description:
      'The admin role is responsible for the health of the application. Admins review platform activity, maintain users, manage published content, generate reports, and moderate discussions so the entire system stays trustworthy and useful.',
    capabilities: [
      'Monitor live overview statistics, content activity, and recent platform actions',
      'Create, edit, draft, publish, archive, and delete article content',
      'Add and manage users across admin, farmer, expert, and public roles',
      'Generate reports, preview them, and download them from current live data',
      'Moderate detailed discussions and manage flagged or pending community items',
    ],
    applicationAreas: ['Overview', 'Content', 'Users', 'Reports', 'Moderation', 'Profile'],
    flow: [
      'Open the dashboard to review platform growth and recent activity.',
      'Move into content or user management based on today\'s operational priority.',
      'Use reports and moderation tools to keep the platform accurate and well-managed.',
    ],
    ctaLabel: 'Continue as Admin',
    ctaPath: '/signin?role=admin',
  },
  {
    key: 'farmer',
    title: 'Farmer',
    icon: Sprout,
    color: '#1B5E20',
    summary: 'Access live opportunities, useful resources, community initiatives, and sector connections.',
    headline: 'Farmer uses AgriLink to find support, resources, and growth paths.',
    description:
      'The farmer role focuses on practical value. Farmers can discover schemes, explore useful learning resources, connect with experts or organizations, and take part in initiatives that strengthen livelihood and productivity.',
    capabilities: [
      'Track opportunities such as grants, subsidies, and training programs',
      'Find relevant agricultural resources and learning content',
      'Connect with experts, organizations, and other farmers',
      'Participate in initiatives and community-led farming programs',
      'Manage profile information and stay visible inside the ecosystem',
    ],
    applicationAreas: ['Dashboard', 'Opportunities', 'Connections', 'Initiatives', 'Resources', 'Profile'],
    flow: [
      'Start from the dashboard to view important updates and recommendations.',
      'Browse opportunities and resources that match the current farming need.',
      'Use connections and initiatives to build long-term support beyond a single season.',
    ],
    ctaLabel: 'Join as Farmer',
    ctaPath: '/signup?role=farmer',
  },
  {
    key: 'expert',
    title: 'Agricultural Expert',
    icon: GraduationCap,
    color: '#2E7D32',
    summary: 'Create educational content, answer field questions, and guide farmers with expert support.',
    headline: 'Expert turns agricultural knowledge into practical community guidance.',
    description:
      'The expert role supports the farming community with experience, education, and direct responses. Experts publish articles, handle queries, provide guidance, and host sessions that help farmers solve real agricultural problems.',
    capabilities: [
      'Create educational articles and practical guidance content',
      'Respond to farmer queries with topic-specific expertise',
      'Run expert sessions and interactive learning experiences',
      'Maintain a role-specific dashboard with live expert activity',
      'Support farmers with applied knowledge instead of generic information',
    ],
    applicationAreas: ['Dashboard', 'Content', 'Guidance', 'Queries', 'Sessions'],
    flow: [
      'Check the expert dashboard for current content, sessions, and pending queries.',
      'Publish useful learning material or answer active field questions.',
      'Use sessions and guidance areas to scale impact across many farmers at once.',
    ],
    ctaLabel: 'Sign In as Expert',
    ctaPath: '/signin?role=expert',
  },
  {
    key: 'public',
    title: 'Public',
    icon: Globe,
    color: '#C9A961',
    summary: 'Explore farming stories, learn about agriculture, and engage in public-facing discussions.',
    headline: 'Public role helps society understand and support farming more deeply.',
    description:
      'The public role is designed for awareness and participation. Public users can explore platform stories, learn from farming content, join discussions, and support initiatives that improve rural and agricultural outcomes.',
    capabilities: [
      'Explore public-facing platform content and awareness stories',
      'Learn from agriculture-focused educational material',
      'Join live discussions and understand current farming topics',
      'Support campaigns and initiatives that benefit farmers',
      'Participate without needing the full operational tools of internal roles',
    ],
    applicationAreas: ['Explore', 'Learn', 'Discussions', 'Support'],
    flow: [
      'Begin with public explore content to understand the platform and farming impact.',
      'Move into learn and discussions to deepen understanding.',
      'Support campaigns and initiatives to contribute back to the ecosystem.',
    ],
    ctaLabel: 'Explore as Public',
    ctaPath: '/signin?role=public',
  },
];

const RolesPage = () => {
  const navigate = useNavigate();
  const { roleKey } = useParams();
  const sectionRefs = useRef({});

  const activeRole = roleDefinitions.find((role) => role.key === roleKey);
  const orderedRoles = activeRole
    ? [activeRole, ...roleDefinitions.filter((role) => role.key !== activeRole.key)]
    : roleDefinitions;

  useEffect(() => {
    if (!roleKey || !sectionRefs.current[roleKey]) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const timer = window.setTimeout(() => {
      sectionRefs.current[roleKey]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [roleKey]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-white via-[#F4F8F2] to-[#FFFDF4]">
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

            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <span className="inline-flex rounded-full border border-[#1B5E20]/15 bg-white/80 px-4 py-2 text-sm font-medium text-[#1B5E20]">
                  Role Guide
                </span>
                <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
                  Understand every role in AgriLink before entering the application.
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                  This page opens as a dedicated role guide. It shows all available roles in the application,
                  then explains each role one by one in detail so users know exactly what they can do before
                  moving into sign in, sign up, or dashboard access.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button variant="primary" size="lg" onClick={() => navigate(activeRole ? activeRole.ctaPath : '/signup?role=farmer')}>
                    {activeRole ? activeRole.ctaLabel : 'Start with Farmer Role'}
                    <ChevronRight size={18} />
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate('/signin')}>
                    Go to Sign In
                  </Button>
                </div>
              </div>

              <Card hover={false} className="bg-white/90">
                <div className="flex items-start gap-4">
                  <Users className="mt-1 h-10 w-10 text-[#1B5E20]" />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Role Overview</h2>
                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      Admin manages the platform, Farmer uses opportunities and resources, Expert shares guidance,
                      and Public explores and supports agricultural awareness. Select any role below to bring its
                      detailed section to the top of this page.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatedSection className="relative px-6 pb-14">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Roles in the Application</h2>
            <p className="mt-3 max-w-2xl text-gray-600">
              Tap any role to stay on this dedicated roles page and jump directly to that role's detailed explanation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {roleDefinitions.map((role) => (
              <Card
                key={role.key}
                className="cursor-pointer border"
                onClick={() => navigate(`/roles/${role.key}`)}
                style={roleKey === role.key ? { borderColor: role.color, boxShadow: `0 0 0 3px ${role.color}20` } : undefined}
              >
                <div
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${role.color}18` }}
                >
                  <role.icon className="h-8 w-8" style={{ color: role.color }} />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: role.color }}>{role.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">{role.summary}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium" style={{ color: role.color }}>
                  View full role details
                  <ChevronRight size={16} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <section className="relative px-6 pb-24">
        <div className="container mx-auto max-w-6xl space-y-10">
          {orderedRoles.map((role, index) => (
            <AnimatedSection key={role.key} delay={index * 0.05} className="scroll-mt-24">
              <div
                ref={(node) => {
                  sectionRefs.current[role.key] = node;
                }}
                className="rounded-[2rem] border bg-white/85 p-8 shadow-xl backdrop-blur-sm md:p-10"
                style={roleKey === role.key ? { borderColor: `${role.color}40`, boxShadow: `0 0 0 4px ${role.color}18` } : { borderColor: '#E5E7EB' }}
              >
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <div className="mb-5 inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold" style={{ backgroundColor: `${role.color}18`, color: role.color }}>
                      <role.icon className="h-4 w-4" />
                      {index + 1} of {orderedRoles.length}: {role.title}
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900">{role.headline}</h3>
                    <p className="mt-5 text-base leading-8 text-gray-600">{role.description}</p>

                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-gray-900">What this role can do</h4>
                      <div className="mt-4 space-y-3">
                        {role.capabilities.map((capability) => (
                          <div key={capability} className="flex items-start gap-3 text-sm leading-7 text-gray-700">
                            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0" style={{ color: role.color }} />
                            <span>{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card hover={false} className="bg-[#FAFBF8]">
                      <h4 className="text-lg font-semibold text-gray-900">Application Areas</h4>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {role.applicationAreas.map((area) => (
                          <span
                            key={area}
                            className="rounded-full px-4 py-2 text-sm font-medium"
                            style={{ backgroundColor: `${role.color}18`, color: role.color }}
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </Card>

                    <Card hover={false} className="bg-[#FAFBF8]">
                      <h4 className="text-lg font-semibold text-gray-900">Typical Journey</h4>
                      <div className="mt-4 space-y-4">
                        {role.flow.map((step) => (
                          <div key={step} className="rounded-2xl border border-gray-200 bg-white px-4 py-4 text-sm leading-7 text-gray-700">
                            {step}
                          </div>
                        ))}
                      </div>
                    </Card>

                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary" onClick={() => navigate(role.ctaPath)}>
                        {role.ctaLabel}
                        <ChevronRight size={18} />
                      </Button>
                      <Button variant="outline" onClick={() => navigate('/roles')}>
                        View All Roles
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RolesPage;
