import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { 
  Sprout, 
  ArrowLeft, 
  BookOpen, 
  Video, 
  FileText,
  Users,
  Award
} from 'lucide-react';
import { Card } from '../../components/Card';
import { AnimatedSection } from '../../components/AnimatedSection';
import { EmptyState } from '../../components/EmptyState';

const LearningCenter = () => {
  const navigate = useNavigate();

  const resourceTypes = [
    {
      icon: BookOpen,
      title: 'Guides & Tutorials',
      description: 'Step-by-step guides on modern farming techniques and best practices',
      color: '#1B5E20',
      count: 0
    },
    {
      icon: Video,
      title: 'Video Lessons',
      description: 'Interactive video content from agricultural experts',
      color: '#2E7D32',
      count: 0
    },
    {
      icon: FileText,
      title: 'Articles & Research',
      description: 'In-depth articles and research papers on agriculture',
      color: '#5D4037',
      count: 0
    },
    {
      icon: Users,
      title: 'Webinars',
      description: 'Live sessions and recorded webinars with industry experts',
      color: '#C9A961',
      count: 0
    }
  ];

  const topics = [
    'Sustainable Farming Practices',
    'Crop Management',
    'Soil Health & Nutrition',
    'Pest & Disease Control',
    'Irrigation Techniques',
    'Organic Farming',
    'Agricultural Technology',
    'Farm Business Management'
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
          <BookOpen className="w-20 h-20 text-[#1B5E20] mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Learning Center
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Enhance your agricultural knowledge with comprehensive learning resources, 
            expert tutorials, and cutting-edge research in modern farming.
          </p>
        </div>
      </AnimatedSection>

      {/* Resource Types */}
      <AnimatedSection className="py-16 px-6 bg-gradient-to-b from-[#E8F5E9]/20 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Learning Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {resourceTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${type.color}20` }}
                    >
                      <type.icon className="w-7 h-7" style={{ color: type.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {type.title}
                        </h3>
                        <span className="text-2xl font-bold" style={{ color: type.color }}>
                          {type.count}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Topics Section */}
      <AnimatedSection className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Popular Topics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topics.map((topic, index) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="p-4 text-center cursor-pointer hover:shadow-lg transition-shadow">
                  <p className="text-sm font-medium text-gray-700">{topic}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Content Section */}
      <AnimatedSection className="py-16 px-6 bg-gradient-to-b from-transparent to-[#E8F5E9]/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Content
          </h2>
          
          <EmptyState
            icon={Award}
            title="Learning Resources Coming Soon"
            description="Our team is curating high-quality educational content, tutorials, and resources to help you excel in agriculture. Check back soon for exciting learning materials."
          />
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Start Your Learning Journey
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join AgriLink to access exclusive learning resources and expert knowledge 
            that will help you succeed in modern agriculture.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup?role=farmer')}
            className="px-8 py-4 bg-[#1B5E20] text-white rounded-lg font-medium hover:bg-[#2E7D32] transition-colors"
          >
            Join Learning Center
          </motion.button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default LearningCenter;
