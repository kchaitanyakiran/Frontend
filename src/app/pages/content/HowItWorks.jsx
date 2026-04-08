import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { 
  Sprout, 
  UserPlus, 
  Search, 
  Link2, 
  TrendingUp,
  Shield,
  GraduationCap,
  Globe,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { Card } from '../../components/Card';
import { AnimatedSection } from '../../components/AnimatedSection';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: 'Create Your Account',
      description: 'Sign up and choose your role - Farmer, Agricultural Expert, or Public member. Complete your profile to get started.'
    },
    {
      number: '02',
      icon: Search,
      title: 'Explore Resources',
      description: 'Browse through opportunities, learning materials, expert guidance, and community initiatives tailored to your needs.'
    },
    {
      number: '03',
      icon: Link2,
      title: 'Connect & Collaborate',
      description: 'Build meaningful connections with farmers, experts, and supporters. Join discussions and share knowledge.'
    },
    {
      number: '04',
      icon: TrendingUp,
      title: 'Grow & Succeed',
      description: 'Access resources, receive expert guidance, and participate in initiatives that drive your agricultural success.'
    }
  ];

  const roleJourneys = [
    {
      role: 'Farmer',
      icon: Sprout,
      color: '#1B5E20',
      features: [
        'Access funding and business opportunities',
        'Connect with agricultural experts for guidance',
        'Participate in community initiatives',
        'Access educational resources and training',
        'Track your farming progress and goals'
      ]
    },
    {
      role: 'Agricultural Expert',
      icon: GraduationCap,
      color: '#2E7D32',
      features: [
        'Share knowledge and create educational content',
        'Provide one-on-one guidance to farmers',
        'Conduct virtual consultation sessions',
        'Answer farmer queries and concerns',
        'Build your professional reputation'
      ]
    },
    {
      role: 'Admin',
      icon: Shield,
      color: '#5D4037',
      features: [
        'Manage platform content and quality',
        'Oversee user community and engagement',
        'Generate insights and analytics reports',
        'Moderate discussions and content',
        'Ensure platform integrity and safety'
      ]
    },
    {
      role: 'Public',
      icon: Globe,
      color: '#C9A961',
      features: [
        'Explore inspiring farming stories',
        'Learn about sustainable agriculture',
        'Support farmers and initiatives',
        'Participate in community discussions',
        'Stay informed about agriculture sector'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F5F5DC]/10 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ x: -5 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </motion.button>
            <div className="flex items-center gap-2">
              <Sprout className="w-8 h-8 text-[#1B5E20]" />
              <span className="text-2xl font-bold text-[#1B5E20]">AgriLink</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <AnimatedSection className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How AgriLink Works
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            A simple, powerful platform connecting farmers with opportunities, 
            experts with knowledge-seekers, and society with agriculture.
          </p>
        </div>
      </AnimatedSection>

      {/* Steps Section */}
      <AnimatedSection className="py-16 px-6 bg-gradient-to-b from-[#E8F5E9]/20 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Getting Started is Easy
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="text-6xl font-bold text-[#1B5E20]/20">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="mb-4"
                      >
                        <step.icon className="w-12 h-12 text-[#1B5E20]" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Role-Based Journeys */}
      <AnimatedSection className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Choose Your Path
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Each role offers unique features and benefits tailored to your goals in the agricultural ecosystem.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {roleJourneys.map((journey, index) => (
              <motion.div
                key={journey.role}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${journey.color}20` }}
                    >
                      <journey.icon className="w-8 h-8" style={{ color: journey.color }} />
                    </div>
                    <h3 className="text-2xl font-semibold" style={{ color: journey.color }}>
                      {journey.role}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {journey.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: journey.color }} />
                        <span className="text-gray-600">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/signup?role=${journey.role.toLowerCase()}`)}
                    className="mt-6 w-full py-3 rounded-lg text-white font-medium transition-colors"
                    style={{ backgroundColor: journey.color }}
                  >
                    Join as {journey.role}
                  </motion.button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 px-6 bg-gradient-to-b from-transparent to-[#E8F5E9]/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of farmers, experts, and agriculture enthusiasts 
            who are already part of the AgriLink community.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup?role=farmer')}
            className="px-8 py-4 bg-[#1B5E20] text-white rounded-lg font-medium hover:bg-[#2E7D32] transition-colors"
          >
            Create Your Account
          </motion.button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default HowItWorks;
