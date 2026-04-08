import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Sprout, Target, Heart, Users, Award, TrendingUp, ArrowLeft } from 'lucide-react';
import { Card } from '../../components/Card';
import { AnimatedSection } from '../../components/AnimatedSection';

const AboutUs = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: 'Empowerment',
      description: 'We believe in empowering farmers with the tools, knowledge, and connections they need to thrive in modern agriculture.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building strong connections between farmers, experts, and society to create a collaborative agricultural ecosystem.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering high-quality resources, guidance, and opportunities that drive agricultural success.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Embracing technology and modern practices to transform traditional farming into sustainable, profitable ventures.'
    }
  ];

  const milestones = [
    { year: '2024', event: 'AgriLink Platform Launch', description: 'Officially launched the platform connecting farmers with opportunities' },
    { year: '2025', event: 'Reached 10,000+ Farmers', description: 'Empowered over 10,000 farmers across multiple regions' },
    { year: '2025', event: 'Expert Network Expansion', description: 'Built a network of 500+ agricultural experts' },
    { year: '2026', event: 'Sustainable Impact', description: 'Achieved 95% success rate in farmer initiatives' }
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
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1 }}
            className="mb-6"
          >
            <Sprout className="w-20 h-20 text-[#1B5E20] mx-auto" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About AgriLink
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            A transformative social agriculture platform dedicated to inspiring society about farming 
            while empowering farmers with essential resources, opportunities, and meaningful connections 
            across the agricultural sector.
          </p>
        </div>
      </AnimatedSection>

      {/* Mission & Vision */}
      <AnimatedSection className="py-16 px-6 bg-gradient-to-b from-[#E8F5E9]/20 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <Target className="w-12 h-12 text-[#1B5E20] mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To bridge the gap between traditional farming and modern opportunities by creating 
                a comprehensive platform that empowers farmers, connects agricultural experts, 
                educates the public, and fosters sustainable growth in the agricultural sector.
              </p>
            </Card>
            <Card className="p-8">
              <Heart className="w-12 h-12 text-[#1B5E20] mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become the world's leading social agriculture platform where farmers thrive through 
                access to resources and opportunities, experts share valuable knowledge, and society 
                gains a deeper appreciation for the vital role of agriculture in our communities.
              </p>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      {/* Core Values */}
      <AnimatedSection className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <value.icon className="w-12 h-12 text-[#1B5E20] mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Journey Timeline */}
      <AnimatedSection className="py-16 px-6 bg-gradient-to-b from-transparent to-[#E8F5E9]/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our Journey
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-[#1B5E20] text-white flex items-center justify-center font-bold">
                        {milestone.year}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.event}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Be part of the agricultural revolution. Together, we can create a sustainable 
            and prosperous future for farming communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup?role=farmer')}
              className="px-8 py-4 bg-[#1B5E20] text-white rounded-lg font-medium hover:bg-[#2E7D32] transition-colors"
            >
              Get Started Today
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="px-8 py-4 border-2 border-[#1B5E20] text-[#1B5E20] rounded-lg font-medium hover:bg-[#1B5E20] hover:text-white transition-colors"
            >
              Contact Us
            </motion.button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default AboutUs;
