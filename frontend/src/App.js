import { Routes, Route } from "react-router-dom";


/* Public pages */
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Campaigns from "./pages/Campaigns";
import Contact from "./pages/Contact";
import MeetTheTeam from "./pages/MeetTheTeam";
import RecycleWithUs from "./pages/RecycleWithUs";
import WhatWeDo from "./pages/WhatWeDo";
import Careers from "./pages/Careers";
import BlogDetail from "./pages/BlogDetail";


/* Admin */
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminVideos from "./admin/AdminVideos";
import AdminRoute from "./admin/AdminRoute";
import AdminBlogs from "./admin/AdminBlogs";

import "./App.css";
import AdminTeam from "./admin/AdminTeam";
import AdminCampaigns from "./admin/AdminCampaigns";
import CampaignDetail from "./pages/CampaignDetail";
import AdminImpactReports from "./admin/AdminImpactReports";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <Routes>

      {/* 🌍 PUBLIC WEBSITE */}
<Route element={<PublicLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/blog" element={<Blog />} />
  <Route path="/blog/:id" element={<BlogDetail />} /> {/* ✅ */}
  <Route path="/campaigns/:id" element={<CampaignDetail />} />
  <Route path="/campaigns" element={<Campaigns />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/meet-the-team" element={<MeetTheTeam />} />
  <Route path="/recycle-with-us" element={<RecycleWithUs />} />
  <Route path="/what-we-do" element={<WhatWeDo />} />
  <Route path="/careers" element={<Careers />} />
  <Route path="/privacy" element={<PrivacyPolicy />} />
</Route>

      {/* 🔐 ADMIN LOGIN (NO NAV/FOOTER) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 🛡️ PROTECTED ADMIN */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/videos" element={<AdminVideos />} />
          <Route path="/admin/teams" element={<AdminTeam />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/campaigns" element={<AdminCampaigns />} />
          <Route path="/admin/impact-reports" element={<AdminImpactReports />} />

        </Route>
      </Route>

    </Routes>
  );
}

export default App;
