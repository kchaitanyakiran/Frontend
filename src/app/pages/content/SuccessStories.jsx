import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Sprout, ArrowLeft, Award, TrendingUp, Users } from 'lucide-react';
import { Card } from '../../components/Card';
import { AnimatedSection } from '../../components/AnimatedSection';
import { EmptyState } from '../../components/EmptyState';

const SuccessStories = () => {
  const navigate = useNavigate();

  const categories = [
    { icon: Award, title: 'Farmer Success', count: 0, color: '#1B5E20' },
    { icon: TrendingUp, title: 'Business Growth', count: 0, color: '#2E7D32' },
    { icon: Users, title: 'Community Impact', count: 0, color: '#C9A961' }
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
            Success Stories
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Celebrating the achievements and inspiring journeys of our farming community 
            as they transform their agricultural practices and build sustainable futures.
          </p>
        </div>
      </AnimatedSection>

      {/* Categories */}
      <AnimatedSection className="py-16 px-6 bg-gradient-to-b from-[#E8F5E9]/20 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Story Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                  >
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <category.icon className="w-8 h-8" style={{ color: category.color }} />
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-3xl font-bold mb-2" style={{ color: category.color }}>
                    {category.count}
                  </p>
                  <p className="text-sm text-gray-500">Stories Available</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Stories Section */}
      <AnimatedSection className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Stories
            </h2>
          </div>
          
          <EmptyState
            icon={Award}
            title="No Success Stories Yet"
            description="Success stories from our farming community will be featured here. Check back soon to read inspiring journeys of transformation and achievement."
          />
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 px-6 bg-gradient-to-b from-transparent to-[#E8F5E9]/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Share Your Story
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Have a success story to share? Your journey could inspire and motivate 
            other farmers in their agricultural endeavors.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-[#1B5E20] text-white rounded-lg font-medium hover:bg-[#2E7D32] transition-colors"
          >
            Submit Your Story
          </motion.button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default SuccessStories;
