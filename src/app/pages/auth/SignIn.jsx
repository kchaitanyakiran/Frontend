import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router';
import { Sprout, Mail, Lock, ArrowLeft, Shield, GraduationCap, Globe } from 'lucide-react';
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
  admin: {
    title: 'Admin',
    color: '#5D4037',
    path: '/admin',
    icon: Shield,
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

const signUpRoles = ['farmer', 'expert', 'public'];

const SignIn = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const role = roleConfig[searchParams.get('role')] ? searchParams.get('role') : 'farmer';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const config = roleConfig[role];
  const AccentIcon = config.icon || Sprout;
  const otherSignupRoles = useMemo(
    () => signUpRoles.filter((item) => item !== role).map((item) => ({ key: item, ...roleConfig[item] })),
    [role]
  );

  const switchRole = (nextRole) => {
    setError('');
    setSearchParams({ role: nextRole });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      setError('Please verify the CAPTCHA.');
      return;
    }
    try {
      setIsSubmitting(true);
      setError('');
      const session = await api.login({
        email: formData.email,
        password: formData.password,
        role: role.toUpperCase()
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
              Sign In
            </h1>
            <p className="text-gray-600">
              Welcome back, {config.title}
            </p>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sign in to another role
            </label>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {Object.entries(roleConfig).map(([key, value]) => {
                const RoleIcon = value.icon;
                const isActive = role === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => switchRole(key)}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${isActive ? 'shadow-lg' : 'hover:shadow-md'}`}
                    style={isActive ? { borderColor: value.color, boxShadow: `0 0 0 3px ${value.color}20` } : { borderColor: '#D1D5DB' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${value.color}18` }}>
                        <RoleIcon className="h-5 w-5" style={{ color: value.color }} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{value.title}</div>
                        <div className="text-sm text-gray-600">Open {value.title.toLowerCase()} sign in</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

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
                Verification
              </label>
              <Captcha onVerify={setCaptchaVerified} />
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-sm hover:underline"
                style={{ color: config.color }}
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
              style={{ backgroundColor: config.color }}
            >
              {isSubmitting ? 'Signing In...' : `Sign In as ${config.title}`}
            </Button>

            {role !== 'admin' ? (
              <div className="text-center text-sm text-gray-600">
                Need a {config.title.toLowerCase()} account?{' '}
                <button
                  type="button"
                  onClick={() => navigate(`/signup?role=${role}`)}
                  className="font-medium hover:underline"
                  style={{ color: config.color }}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="text-center text-sm text-gray-600">
                Admin accounts are created only by an existing admin.
              </div>
            )}

            {otherSignupRoles.length > 0 && (
              <div className="border-t border-gray-200 pt-5">
                <div className="text-center text-sm font-medium text-gray-700 mb-3">
                  Other role sign up options
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {otherSignupRoles.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => navigate(`/signup?role=${item.key}`)}
                      className="rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
                      style={{ borderColor: `${item.color}50`, color: item.color, backgroundColor: `${item.color}10` }}
                    >
                      Sign up as {item.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignIn;
