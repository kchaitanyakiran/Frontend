import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { 
  Sprout, 
  ArrowLeft, 
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Book,
  Users
} from 'lucide-react';
import { Card } from '../../components/Card';
import { AnimatedSection } from '../../components/AnimatedSection';

const Support = () => {
  const navigate = useNavigate();

  const supportOptions = [
    {
      icon: Book,
      title: 'Help Center',
      description: 'Browse our comprehensive knowledge base and FAQs',
      action: 'Browse Articles',
      color: '#1B5E20'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      action: 'Start Chat',
      color: '#2E7D32'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      action: 'Send Email',
      color: '#5D4037'
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Get help from our community of farmers and experts',
      action: 'Visit Forum',
      color: '#C9A961'
    }
  ];

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click on "Get Started" or "Sign Up" and choose your role (Farmer, Expert, Admin, or Public). Fill in your details and verify your email to get started.'
    },
    {
      question: 'What resources are available for farmers?',
      answer: 'Farmers have access to funding opportunities, expert guidance, educational resources, community discussions, and business development tools.'
    },
    {
      question: 'How can I connect with agricultural experts?',
      answer: 'Navigate to the Connections section in your dashboard to browse and connect with verified agricultural experts in your region or area of interest.'
    },
    {
      question: 'Is AgriLink free to use?',
      answer: 'Basic access to AgriLink is free for all users. Premium features and specialized services may require subscription or payment.'
    },
    {
      question: 'How do I report inappropriate content?',
      answer: 'Use the report button available on any content. Our moderation team reviews all reports and takes appropriate action within 24 hours.'
    },
    {
      question: 'Can I change my role after registration?',
      answer: 'Yes, contact our support team to request a role change. We\'ll verify your request and update your account accordingly.'
    }
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'support@agrilink.com' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: MessageCircle, label: 'Hours', value: 'Mon-Fri, 9AM-6PM EST' }
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
          <HelpCircle className="w-20 h-20 text-[#1B5E20] mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Support Center
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're here to help! Find answers to your questions and get the support you need.
          </p>
        </div>
      </AnimatedSection>

      {/* Support Options */}
      <AnimatedSection className="py-16 px-6 bg-gradient-to-b from-[#E8F5E9]/20 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How Can We Help?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${option.color}20` }}
                    >
                      <option.icon className="w-7 h-7" style={{ color: option.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {option.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2.5 rounded-lg text-white font-medium transition-colors"
                    style={{ backgroundColor: option.color }}
                  >
                    {option.action}
                  </motion.button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQs */}
      <AnimatedSection className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Info */}
      <AnimatedSection className="py-16 px-6 bg-gradient-to-b from-transparent to-[#E8F5E9]/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Contact Information
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center">
                  <info.icon className="w-8 h-8 text-[#1B5E20] mx-auto mb-3" />
                  <div className="text-sm text-gray-500 mb-1">{info.label}</div>
                  <div className="font-semibold text-gray-900">{info.value}</div>
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
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is always ready to assist you with any questions or concerns.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-[#1B5E20] text-white rounded-lg font-medium hover:bg-[#2E7D32] transition-colors"
          >
            Contact Support
          </motion.button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Support;
