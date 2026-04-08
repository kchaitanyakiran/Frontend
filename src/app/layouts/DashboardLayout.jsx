import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Lightbulb, 
  BookOpen, 
  User, 
  Settings,
  FileText,
  BarChart3,
  MessageSquare,
  Menu,
  X,
  Home,
  Calendar,
  HelpCircle,
  Heart,
  Edit,
  LogOut
} from 'lucide-react';
import { clearSession, getSession, normalizeRole } from '../lib/api';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [session, setSession] = useState(() => getSession());
  
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determine which dashboard we're in
  const currentPath = location.pathname.split('/')[1];

  useEffect(() => {
    const activeSession = getSession();
    setSession(activeSession);

    if (currentPath === 'public') {
      return;
    }

    if (!activeSession?.token) {
      navigate(`/signin?role=${currentPath}`, { replace: true });
      return;
    }

    const rolePath = normalizeRole(activeSession.user?.role);
    if (rolePath !== currentPath) {
      navigate(`/${rolePath}`, { replace: true });
    }
  }, [currentPath, navigate]);
  
  const menuItems = {
    farmer: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/farmer' },
      { icon: Briefcase, label: 'Opportunities', path: '/farmer/opportunities' },
      { icon: Users, label: 'Connections', path: '/farmer/connections' },
      { icon: Lightbulb, label: 'Initiatives', path: '/farmer/initiatives' },
      { icon: BookOpen, label: 'Resources', path: '/farmer/resources' },
      { icon: User, label: 'Profile', path: '/farmer/profile' },
    ],
    admin: [
      { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
      { icon: FileText, label: 'Content', path: '/admin/content' },
      { icon: Users, label: 'Users', path: '/admin/users' },
      { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
      { icon: MessageSquare, label: 'Moderation', path: '/admin/moderation' },
      { icon: User, label: 'Profile', path: '/admin/profile' },
    ],
    expert: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/expert' },
      { icon: Edit, label: 'Create Content', path: '/expert/content' },
      { icon: FileText, label: 'Guidance', path: '/expert/guidance' },
      { icon: HelpCircle, label: 'Queries', path: '/expert/queries' },
      { icon: Calendar, label: 'Sessions', path: '/expert/sessions' },
      { icon: User, label: 'Profile', path: '/expert/profile' },
    ],
    public: [
      { icon: Home, label: 'Explore', path: '/public' },
      { icon: BookOpen, label: 'Learn', path: '/public/learn' },
      { icon: MessageSquare, label: 'Discussions', path: '/public/discussions' },
      { icon: Heart, label: 'Support', path: '/public/support' },
    ],
  };
  
  const currentMenu = menuItems[currentPath] || [];
  
  const roleLabels = {
    farmer: 'Farmer Portal',
    admin: 'Admin Panel',
    expert: 'Expert Hub',
    public: 'Public Portal',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC]/20 via-white to-[#E8F5E9]/30">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1B5E20] text-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="font-semibold text-lg">AgriLink</span>
        </div>
        <button onClick={() => navigate('/')} className="text-sm">
          Exit
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || isDesktop) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-[#1B5E20] to-[#2E7D32] text-white shadow-2xl z-40 lg:z-30"
          >
            <div className="p-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-3xl font-bold mb-1">AgriLink</h1>
                <p className="text-sm text-white/70">{roleLabels[currentPath]}</p>
                {session?.user && (
                  <div className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm">
                    <div className="font-semibold text-white">{session.user.fullName}</div>
                    <div className="text-white/70">{session.user.email}</div>
                  </div>
                )}
              </motion.div>

              <nav className="space-y-2">
                {currentMenu.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                          isActive
                            ? 'bg-white/20 shadow-lg'
                            : 'hover:bg-white/10'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-[#C9A961]"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-8 border-t border-white/20"
              >
                <button
                  type="button"
                  onClick={() => {
                    clearSession();
                    navigate('/');
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen">
        <div className="pt-20 lg:pt-8 px-4 md:px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
