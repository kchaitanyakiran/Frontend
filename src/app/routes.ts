import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import FarmerOpportunities from "./pages/farmer/FarmerOpportunities";
import FarmerConnections from "./pages/farmer/FarmerConnections";
import FarmerInitiatives from "./pages/farmer/FarmerInitiatives";
import FarmerResources from "./pages/farmer/FarmerResources";
import FarmerProfile from "./pages/farmer/FarmerProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContent from "./pages/admin/AdminContent";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReports from "./pages/admin/AdminReports";
import AdminModeration from "./pages/admin/AdminModeration";
import AdminProfile from "./pages/admin/AdminProfile";
import ExpertDashboard from "./pages/expert/ExpertDashboard";
import ExpertContent from "./pages/expert/ExpertContent";
import ExpertGuidance from "./pages/expert/ExpertGuidance";
import ExpertQueries from "./pages/expert/ExpertQueries";
import ExpertSessions from "./pages/expert/ExpertSessions";
import ExpertProfile from "./pages/expert/ExpertProfile";
import PublicExplore from "./pages/public/PublicExplore";
import PublicLearn from "./pages/public/PublicLearn";
import PublicDiscussions from "./pages/public/PublicDiscussions";
import PublicSupport from "./pages/public/PublicSupport";
import DashboardLayout from "./layouts/DashboardLayout";

// Auth pages
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// Content pages
import AboutUs from "./pages/content/AboutUs";
import HowItWorks from "./pages/content/HowItWorks";
import SuccessStories from "./pages/content/SuccessStories";
import LearningCenter from "./pages/content/LearningCenter";
import Community from "./pages/content/Community";
import Support from "./pages/content/Support";
import Privacy from "./pages/content/Privacy";
import Terms from "./pages/content/Terms";
import Contact from "./pages/content/Contact";
import RolesPage from "./pages/content/RolesPage";
import ImpactPage from "./pages/content/ImpactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  // Auth routes
  {
    path: "/signin",
    Component: SignIn,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  // Content routes
  {
    path: "/about",
    Component: AboutUs,
  },
  {
    path: "/how-it-works",
    Component: HowItWorks,
  },
  {
    path: "/success-stories",
    Component: SuccessStories,
  },
  {
    path: "/learning-center",
    Component: LearningCenter,
  },
  {
    path: "/community",
    Component: Community,
  },
  {
    path: "/support",
    Component: Support,
  },
  {
    path: "/privacy",
    Component: Privacy,
  },
  {
    path: "/terms",
    Component: Terms,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/roles",
    Component: RolesPage,
  },
  {
    path: "/roles/:roleKey",
    Component: RolesPage,
  },
  {
    path: "/impact",
    Component: ImpactPage,
  },
  {
    path: "/farmer",
    Component: DashboardLayout,
    children: [
      { index: true, Component: FarmerDashboard },
      { path: "opportunities", Component: FarmerOpportunities },
      { path: "connections", Component: FarmerConnections },
      { path: "initiatives", Component: FarmerInitiatives },
      { path: "resources", Component: FarmerResources },
      { path: "profile", Component: FarmerProfile },
    ],
  },
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "content", Component: AdminContent },
      { path: "users", Component: AdminUsers },
      { path: "reports", Component: AdminReports },
      { path: "moderation", Component: AdminModeration },
      { path: "profile", Component: AdminProfile },
    ],
  },
  {
    path: "/expert",
    Component: DashboardLayout,
    children: [
      { index: true, Component: ExpertDashboard },
      { path: "content", Component: ExpertContent },
      { path: "guidance", Component: ExpertGuidance },
      { path: "queries", Component: ExpertQueries },
      { path: "sessions", Component: ExpertSessions },
      { path: "profile", Component: ExpertProfile },
    ],
  },
  {
    path: "/public",
    Component: DashboardLayout,
    children: [
      { index: true, Component: PublicExplore },
      { path: "learn", Component: PublicLearn },
      { path: "discussions", Component: PublicDiscussions },
      { path: "support", Component: PublicSupport },
    ],
  },
]);
