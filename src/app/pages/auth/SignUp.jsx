import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router';
import { Sprout, Mail, Lock, User, Phone, ArrowLeft, GraduationCap, Globe } from 'lucide-react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Captcha } from '../../components/Captcha';
import { api, normalizeRole, saveSession } from '../../lib/api';

const roleConfig = {
  farmer: {
    title: 'Farmer',
    color: '#1B5E20',
    path: '/farmer',
    icon: Sprout,
  },
  expert: {
    title: 'Agricultural Expert',
    color: '#2E7D32',
    path: '/expert',
    icon: GraduationCap,
  },
  public: {
    title: 'Public',
    color: '#C9A961',
    path: '/public',
    icon: Globe,
  },
};

const roleOptions = Object.entries(roleConfig).map(([key, value]) => ({
  key,
  ...value,
}));

const defaultConfig = {
  title: 'Your Role',
  color: '#1B5E20',
  path: '/signup',
  icon: Sprout,
};

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRole = searchParams.get('role');
  const [selectedRole, setSelectedRole] = useState(roleConfig[initialRole] ? initialRole : '');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialRole === 'admin') {
      setError('Admin sign up is disabled. Please sign in as admin or ask an existing admin to create the account.');
      setSearchParams({});
    }
  }, [initialRole, setSearchParams]);

  const config = useMemo(() => roleConfig[selectedRole] || defaultConfig, [selectedRole]);
  const AccentIcon = config.icon || Sprout;

  const selectRole = (role) => {
    setSelectedRole(role);
      if (error.startsWith('Admin sign up is disabled')) {
        setError('');
      } else {
        setError('');
      }
      setSearchParams({ role });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      setError('Please select a role to create your account.');
      return;
    }

    if (!captchaVerified) {
      setError('Please verify the CAPTCHA.');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      const session = await api.register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: selectedRole.toUpperCase()
      });
      saveSession(session);
      navigate(`/${normalizeRole(session.user.role)}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC]/30 via-white to-[#E8F5E9]/30 flex items-center justify-center p-6">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: config.color }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl relative z-10"
      >
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </motion.button>

        <Card className="p-8">
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <AccentIcon className="w-16 h-16 mx-auto" style={{ color: config.color }} />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: config.color }}>
              Create Account
            </h1>
            <p className="text-gray-600">
              {selectedRole ? `Join as ${config.title}` : 'Select your role to sign up'}
            </p>
            {initialRole === 'admin' && (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Admin accounts are created only from the admin portal, not from public sign up.
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose Role
            </label>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {roleOptions.map((role) => {
                const RoleIcon = role.icon;
                const isActive = selectedRole === role.key;
                return (
                  <button
                    key={role.key}
                    type="button"
                    onClick={() => selectRole(role.key)}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${isActive ? 'shadow-lg' : 'hover:shadow-md'}`}
                    style={isActive ? { borderColor: role.color, boxShadow: `0 0 0 3px ${role.color}20` } : { borderColor: '#D1D5DB' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${role.color}18` }}>
                        <RoleIcon className="h-5 w-5" style={{ color: role.color }} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{role.title}</div>
                        <div className="text-sm text-gray-600">Sign up as {role.title.toLowerCase()}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1B5E20] transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1B5E20] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1B5E20] transition-colors"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1B5E20] transition-colors"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1B5E20] transition-colors"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification
              </label>
              <Captcha onVerify={setCaptchaVerified} />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => navigate('/terms')}
                  className="hover:underline"
                  style={{ color: config.color }}
                >
                  Terms of Service
                </button>
                {' '}and{' '}
                <button
                  type="button"
                  onClick={() => navigate('/privacy')}
                  className="hover:underline"
                  style={{ color: config.color }}
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
              style={{ backgroundColor: config.color }}
            >
              {isSubmitting ? 'Creating Account...' : selectedRole ? `Create ${config.title} Account` : 'Select Role to Continue'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate(selectedRole ? `/signin?role=${selectedRole}` : '/signin')}
                className="font-medium hover:underline"
                style={{ color: config.color }}
              >
                Sign In
              </button>
            </div>
            {!selectedRole && (
              <div className="text-center text-sm text-gray-600">
                Need an admin account? Ask an existing admin to create it from the admin portal.
              </div>
            )}
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;
