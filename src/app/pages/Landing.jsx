import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router';
import { 
  Sprout, 
  Users, 
  Award, 
  TrendingUp, 
  UserCircle, 
  Shield, 
  GraduationCap, 
  Globe,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { AnimatedSection } from '../components/AnimatedSection';

const Landing = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const roles = [
    {
      icon: Shield,
      title: 'Admin',
      description: 'Manage platform content, users, and oversee the community ecosystem',
      color: '#5D4037',
      path: '/roles/admin'
    },
    {
      icon: Sprout,
      title: 'Farmer',
      description: 'Access opportunities, resources, and connect with agricultural experts',
      color: '#1B5E20',
      path: '/roles/farmer'
    },
    {
      icon: GraduationCap,
      title: 'Agricultural Expert',
      description: 'Share knowledge, provide guidance, and empower farming communities',
      color: '#2E7D32',
      path: '/roles/expert'
    },
    {
      icon: Globe,
      title: 'Public',
      description: 'Explore farming stories, learn about agriculture, and support initiatives',
      color: '#C9A961',
      path: '/roles/public'
    },
  ];

  const stats = [
    { value: '10K+', label: 'Farmers Empowered', icon: Users },
    { value: '500+', label: 'Expert Guidance Sessions', icon: Award },
    { value: '95%', label: 'Success Rate', icon: TrendingUp },
    { value: '50+', label: 'Active Initiatives', icon: Sprout },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F5F5DC]/10 to-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-10 w-96 h-96 bg-[#1B5E20] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-[#C9A961] rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Sprout className="w-8 h-8 text-[#1B5E20]" />
              <span className="text-2xl font-bold text-[#1B5E20]">AgriLink</span>
            </motion.div>

            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => navigate('/about')} className="text-gray-700 hover:text-[#1B5E20] transition-colors">About</button>
              <button onClick={() => navigate('/roles')} className="text-gray-700 hover:text-[#1B5E20] transition-colors">Roles</button>
              <button onClick={() => navigate('/impact')} className="text-gray-700 hover:text-[#1B5E20] transition-colors">Impact</button>
              <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>
                Get Started
              </Button>
            </nav>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 flex flex-col gap-4"
            >
              <a href="#about" className="text-gray-700 hover:text-[#1B5E20] transition-colors">About</a>
              <button onClick={() => navigate('/roles')} className="text-left text-gray-700 hover:text-[#1B5E20] transition-colors">Roles</button>
              <button onClick={() => navigate('/impact')} className="text-left text-gray-700 hover:text-[#1B5E20] transition-colors">Impact</button>
              <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>
                Get Started
              </Button>
            </motion.nav>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <motion.div
          style={{ y, opacity }}
          className="container mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1 }}
            className="mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Sprout className="w-20 h-20 text-[#1B5E20] mx-auto" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Empowering Farmers.<br />
            Connecting Sectors.<br />
            <span className="text-[#1B5E20]">Inspiring Society.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            A platform that bridges the gap between farmers and opportunities,
            fostering growth and sustainability in agriculture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="primary" size="lg" onClick={() => navigate('/farmer')}>
              Join as Farmer
              <ChevronRight size={20} />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/public')}>
              Explore as Public
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-400"
            >
              Scroll to explore
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <AnimatedSection id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About AgriLink
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            AgriLink is a comprehensive social agriculture platform designed to inspire society
            about farming while empowering farmers with essential resources, opportunities, and
            meaningful connections across the agricultural sector. We believe in creating a
            sustainable future through collaboration, knowledge sharing, and innovation.
          </p>
        </div>
      </AnimatedSection>

      {/* Roles Section */}
      <AnimatedSection id="roles" className="py-20 px-6 bg-gradient-to-b from-[#E8F5E9]/20 to-transparent">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Platform Roles
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose your role and join our community of agricultural enthusiasts
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full cursor-pointer" onClick={() => navigate(role.path)}>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${role.color}20` }}
                    >
                      <role.icon className="w-8 h-8" style={{ color: role.color }} />
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: role.color }}>
                    {role.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {role.description}
                  </p>
                  <motion.div
                    className="mt-4 flex items-center gap-2 text-sm font-medium"
                    style={{ color: role.color }}
                    whileHover={{ x: 5 }}
                  >
                    Learn more <ChevronRight size={16} />
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Impact Statistics */}
      <AnimatedSection id="impact" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Our Impact
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                    className="mb-4"
                  >
                    <stat.icon className="w-12 h-12 text-[#1B5E20] mx-auto" />
                  </motion.div>
                  <div className="text-4xl font-bold text-[#1B5E20] mb-2">
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

      {/* Testimonials */}
      <AnimatedSection className="py-20 px-6 bg-gradient-to-b from-transparent to-[#E8F5E9]/20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Voices from the Field
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#43A047]" />
                    <div>
                      <div className="font-semibold text-gray-900">Testimonial {item}</div>
                      <div className="text-sm text-gray-500">Role</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">
                    "Share your inspiring story here..."
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#1B5E20] to-[#2E7D32] text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sprout className="w-6 h-6" />
                <span className="text-xl font-bold">AgriLink</span>
              </div>
              <p className="text-white/70 text-sm">
                Empowering farmers and connecting agricultural communities.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><button onClick={() => navigate('/about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => navigate('/how-it-works')} className="hover:text-white transition-colors">How It Works</button></li>
                <li><button onClick={() => navigate('/success-stories')} className="hover:text-white transition-colors">Success Stories</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><button onClick={() => navigate('/learning-center')} className="hover:text-white transition-colors">Learning Center</button></li>
                <li><button onClick={() => navigate('/community')} className="hover:text-white transition-colors">Community</button></li>
                <li><button onClick={() => navigate('/support')} className="hover:text-white transition-colors">Support</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">Terms of Service</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/70">
            © 2026 AgriLink. All rights reserved. Built with passion for sustainable agriculture.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
