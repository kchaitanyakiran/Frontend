import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { 
  Sprout, 
  ArrowLeft, 
  Users, 
  MessageCircle,
  Calendar,
  Heart,
  Globe
} from 'lucide-react';
import { Card } from '../../components/Card';
import { AnimatedSection } from '../../components/AnimatedSection';
import { EmptyState } from '../../components/EmptyState';

const Community = () => {
  const navigate = useNavigate();

  const communityStats = [
    { icon: Users, label: 'Active Members', value: '10,000+', color: '#1B5E20' },
    { icon: MessageCircle, label: 'Discussions', value: '0', color: '#2E7D32' },
    { icon: Calendar, label: 'Events', value: '0', color: '#5D4037' },
    { icon: Heart, label: 'Success Stories', value: '0', color: '#C9A961' }
  ];

  const communityFeatures = [
    {
      icon: MessageCircle,
      title: 'Discussion Forums',
      description: 'Engage in meaningful conversations with farmers and experts about various agricultural topics'
    },
    {
      icon: Calendar,
      title: 'Community Events',
      description: 'Participate in webinars, workshops, and networking events to connect with the community'
    },
    {
      icon: Globe,
      title: 'Knowledge Sharing',
      description: 'Share your experiences, ask questions, and learn from the collective wisdom of the community'
    },
    {
      icon: Heart,
      title: 'Farmer Support',
      description: 'Get support from fellow farmers and contribute to helping others succeed in their journey'
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
          <Users className="w-20 h-20 text-[#1B5E20] mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Community
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Join a vibrant community of farmers, agricultural experts, and agriculture enthusiasts 
            working together to build a sustainable future for farming.
          </p>
        </div>
      </AnimatedSection>

      {/* Community Stats */}
      <AnimatedSection className="py-16 px-6 bg-gradient-to-b from-[#E8F5E9]/20 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Community at a Glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mb-3"
                  >
                    <stat.icon className="w-10 h-10 mx-auto" style={{ color: stat.color }} />
                  </motion.div>
                  <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Community Features */}
      <AnimatedSection className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Community Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {communityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#1B5E20]/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-7 h-7 text-[#1B5E20]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Active Discussions */}
      <AnimatedSection className="py-16 px-6 bg-gradient-to-b from-transparent to-[#E8F5E9]/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Active Discussions
          </h2>
          
          <EmptyState
            icon={MessageCircle}
            title="No Active Discussions"
            description="Community discussions will appear here. Join AgriLink to start or participate in conversations with fellow farmers and experts."
          />
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect with thousands of farmers and experts who are passionate about 
            sustainable agriculture and community growth.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup?role=farmer')}
            className="px-8 py-4 bg-[#1B5E20] text-white rounded-lg font-medium hover:bg-[#2E7D32] transition-colors"
          >
            Become a Member
          </motion.button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Community;
