import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Sprout, ArrowLeft, Shield, Lock, Eye, UserCheck } from 'lucide-react';
import { Card } from '../../components/Card';
import { AnimatedSection } from '../../components/AnimatedSection';

const Privacy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: Shield,
      title: 'Information We Collect',
      content: [
        'Personal information you provide when creating an account (name, email, phone number)',
        'Profile information and agricultural data you choose to share',
        'Usage data and interaction with platform features',
        'Communication records and support requests',
        'Device and browser information for security purposes'
      ]
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'To provide and improve our agricultural platform services',
        'To connect farmers with experts and opportunities',
        'To personalize your experience and content recommendations',
        'To communicate important updates and notifications',
        'To ensure platform security and prevent fraud',
        'To analyze usage patterns and improve our services'
      ]
    },
    {
      icon: Eye,
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information to third parties',
        'Information shared with other users is based on your privacy settings',
        'We may share data with service providers who assist in platform operations',
        'Legal compliance may require disclosure to authorities when required',
        'Anonymous, aggregated data may be used for research and analytics'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights and Controls',
      content: [
        'Access and download your personal data at any time',
        'Update or correct your information through your profile',
        'Control your privacy settings and data sharing preferences',
        'Request deletion of your account and associated data',
        'Opt-out of non-essential communications',
        'Contact us with privacy concerns or questions'
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
          <Shield className="w-20 h-20 text-[#1B5E20] mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, 
            use, and protect your personal information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: March 3, 2026
          </p>
        </div>
      </AnimatedSection>

      {/* Privacy Sections */}
      <AnimatedSection className="py-16 px-6">
        <div className="container mx-auto max-w-4xl space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#1B5E20]/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-[#1B5E20]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3 ml-16">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#1B5E20] mt-2 flex-shrink-0" />
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Additional Information */}
      <AnimatedSection className="py-16 px-6 bg-gradient-to-b from-transparent to-[#E8F5E9]/20">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We implement industry-standard security measures to protect your personal information 
              from unauthorized access, disclosure, alteration, or destruction. This includes encryption, 
              secure servers, and regular security audits. However, no method of transmission over the 
              internet is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Children's Privacy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              AgriLink is not intended for users under the age of 18. We do not knowingly collect 
              personal information from children. If you believe we have collected information from 
              a child, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Changes to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We may update this privacy policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "Last Updated" date. We encourage 
              you to review this policy periodically.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@agrilink.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </Card>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Questions About Your Privacy?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our team is here to address any privacy concerns you may have.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-[#1B5E20] text-white rounded-lg font-medium hover:bg-[#2E7D32] transition-colors"
          >
            Contact Us
          </motion.button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Privacy;
