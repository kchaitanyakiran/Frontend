import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Sprout, ArrowLeft, FileText, CheckCircle, AlertCircle, Scale } from 'lucide-react';
import { Card } from '../../components/Card';
import { AnimatedSection } from '../../components/AnimatedSection';

const Terms = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: 'By accessing and using AgriLink, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. These terms apply to all users, including farmers, agricultural experts, administrators, and public members.'
    },
    {
      icon: FileText,
      title: 'User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating your account and keep it updated. You agree to notify us immediately of any unauthorized use of your account.'
    },
    {
      icon: Scale,
      title: 'User Conduct',
      content: 'Users agree to use AgriLink in a lawful and respectful manner. Prohibited activities include: posting false or misleading information, harassing other users, sharing inappropriate content, attempting to gain unauthorized access to the platform, using the platform for spam or commercial solicitation, and violating intellectual property rights.'
    },
    {
      icon: AlertCircle,
      title: 'Content and Intellectual Property',
      content: 'Users retain ownership of content they post but grant AgriLink a license to use, display, and distribute such content on the platform. AgriLink and its content, features, and functionality are owned by AgriLink and are protected by copyright, trademark, and other intellectual property laws.'
    }
  ];

  const additionalTerms = [
    {
      title: 'Platform Services',
      points: [
        'AgriLink provides a platform for connecting farmers, experts, and the agricultural community',
        'We do not guarantee specific outcomes or results from using our services',
        'Services may be modified, suspended, or discontinued at any time',
        'We reserve the right to refuse service to anyone for any reason'
      ]
    },
    {
      title: 'Disclaimers',
      points: [
        'The platform is provided "as is" without warranties of any kind',
        'We do not guarantee the accuracy or completeness of information on the platform',
        'Users are responsible for verifying information before acting on it',
        'Agricultural advice should be verified with qualified professionals'
      ]
    },
    {
      title: 'Limitation of Liability',
      points: [
        'AgriLink is not liable for indirect, incidental, or consequential damages',
        'Our liability is limited to the amount you paid for services, if any',
        'We are not responsible for user-generated content or interactions',
        'Users assume all risks associated with using the platform'
      ]
    },
    {
      title: 'Termination',
      points: [
        'We may terminate or suspend your account at our discretion',
        'You may close your account at any time',
        'Upon termination, your right to use the platform ceases immediately',
        'Certain provisions of these terms survive termination'
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
          <FileText className="w-20 h-20 text-[#1B5E20] mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Please read these terms carefully before using AgriLink. 
            By using our platform, you agree to these terms and conditions.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: March 3, 2026
          </p>
        </div>
      </AnimatedSection>

      {/* Main Sections */}
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
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1B5E20]/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-[#1B5E20]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed ml-16">
                  {section.content}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Additional Terms */}
      <AnimatedSection className="py-16 px-6 bg-gradient-to-b from-transparent to-[#E8F5E9]/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Additional Terms
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {additionalTerms.map((term, index) => (
              <motion.div
                key={term.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {term.title}
                  </h3>
                  <ul className="space-y-3">
                    {term.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#1B5E20] mt-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Final Provisions */}
      <AnimatedSection className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              These Terms of Service are governed by and construed in accordance with applicable laws. 
              Any disputes arising from these terms or your use of AgriLink shall be resolved through 
              binding arbitration or in courts of competent jurisdiction.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Changes to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We reserve the right to modify these terms at any time. We will notify users of significant 
              changes via email or platform notification. Your continued use of AgriLink after changes 
              constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Contact Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@agrilink.com
              <br />
              Phone: +1 (555) 123-4567
              <br />
              Address: AgriLink Legal Department, 123 Farm Street, Agricultural District
            </p>
          </Card>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Questions About Our Terms?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our legal team is available to clarify any questions you may have.
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

export default Terms;
