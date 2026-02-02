import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import { Link } from "react-router-dom";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [campaigns, setCampaigns] = useState([]);

useEffect(() => {
  const fetchCampaigns = async () => {
    try {
      const { data } = await api.get("/api/campaigns");

      // your backend sometimes returns array directly
      setCampaigns(Array.isArray(data) ? data : data.campaigns || []);
    } catch (err) {
      console.error("Failed to load campaigns");
    }
  };

  fetchCampaigns();
}, []);


  // Helper to toggle dropdowns
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // NEW: Function to close everything when a link is clicked
  const closeMenus = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-[90%] lg:max-w-[80%] mx-auto px-4 py-5">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" onClick={closeMenus}>
              <img
                src="/images/Chanja-Logo.png"
                alt="Chanja Datti"
                className="h-16 w-auto cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4 lg:space-x-6">
            <Link to="/" onClick={closeMenus} className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link to="/about" onClick={closeMenus} className="text-gray-700 hover:text-green-600">
              About
            </Link>

            {/* What We Do Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("what-we-do")}
                className="flex items-center gap-1 text-gray-700 hover:text-green-600"
              >
                What we do
                <svg className={`w-4 h-4 transition-transform ${activeDropdown === "what-we-do" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === "what-we-do" && (
                <div className="absolute top-8 left-0 w-48 bg-white shadow-md rounded-md py-2 z-50 border border-gray-100">
                  <Link to="/what-we-do" onClick={closeMenus} className="block px-4 py-2 hover:bg-gray-100">
                    Services
                  </Link>
                  <Link to="/what-we-do#impact" onClick={closeMenus} className="block px-4 py-2 hover:bg-gray-100">
                    Impact Report
                  </Link>
                </div>
              )}
            </div>

            {/* Campaigns Dropdown */}
            <div className="relative">
              <button onClick={() => toggleDropdown("campaigns")} className="flex items-center gap-1 text-gray-700 hover:text-green-600">
                Campaigns
                <svg className={`w-4 h-4 transition-transform ${activeDropdown === "campaigns" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

{activeDropdown === "campaigns" && (
  <div className="absolute top-8 left-0 w-56 bg-white shadow-md rounded-md py-2 z-50 border border-gray-100">
    {campaigns.length === 0 && (
      <div className="px-4 py-2 text-sm text-gray-500">
        No campaigns available
      </div>
    )}

    {campaigns.map((campaign) => (
      <Link
        key={campaign._id}
        to={`/campaigns/${campaign._id}`}
        onClick={closeMenus}
        className="block px-4 py-2 hover:bg-gray-100 text-sm"
      >
        <div className="flex items-center justify-between">
          <span>{campaign.title}</span>

          {/* {campaign.isActive && (
            <span className="text-xs text-green-600 font-medium">
              ACTIVE
            </span>
          )} */}
        </div>
      </Link>
    ))}
  </div>
)}

            </div>

            <Link to="/blog" onClick={closeMenus} className="text-gray-700 hover:text-green-600">
              Blog
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/get-recykoin" onClick={closeMenus} className="bg-[#E2F0CE] text-black px-6 py-3 lg:px-10 lg:py-4 rounded-2xl font-medium hover:bg-[#7BA717] hover:text-white transition">
              Get Recykoin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" onClick={closeMenus} className="block text-gray-700">Home</Link>
            <Link to="/about" onClick={closeMenus} className="block text-gray-700">About</Link>

            {/* Mobile What We Do */}
            <details className="group" open={activeDropdown === "m-what-we-do"} onClick={(e) => { e.preventDefault(); toggleDropdown("m-what-we-do"); }}>
              <summary className="flex items-center justify-between cursor-pointer text-gray-700 list-none [&::-webkit-details-marker]:hidden">
                <span>What we do</span>
                <svg className={`w-4 h-4 transition-transform ${activeDropdown === "m-what-we-do" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="ml-4 mt-2 space-y-2 border-l-2 border-green-100 pl-4">
                <Link to="/services/recycling" onClick={closeMenus} className="block text-gray-600">Recycling</Link>
                <Link to="/services/waste-mgt" onClick={closeMenus} className="block text-gray-600">Waste Management</Link>
              </div>
            </details>

            {/* Mobile Campaigns */}
            <details className="group" open={activeDropdown === "m-campaigns"} onClick={(e) => { e.preventDefault(); toggleDropdown("m-campaigns"); }}>
              <summary className="flex items-center justify-between cursor-pointer text-gray-700 list-none [&::-webkit-details-marker]:hidden">
                <span>Campaigns</span>
                <svg className={`w-4 h-4 transition-transform ${activeDropdown === "m-campaigns" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
<div className="ml-4 mt-2 space-y-2 border-l-2 border-green-100 pl-4">
  {campaigns.length === 0 && (
    <p className="text-sm text-gray-500">
      No campaigns available
    </p>
  )}

  {campaigns.map((campaign) => (
    <Link
      key={campaign._id}
      to={`/campaigns/${campaign._id}`}
      onClick={closeMenus}
      className="block text-gray-600"
    >
      {campaign.title}
      {campaign.isActive && (
        <span className="ml-2 text-xs text-green-600">(Active)</span>
      )}
    </Link>
  ))}
</div>

            </details>

            <Link to="/blog" onClick={closeMenus} className="block text-gray-700">Blog</Link>
            <Link to="/get-recykoin" onClick={closeMenus} className="block text-center bg-[#E2F0CE] text-black py-2 rounded-full font-medium">
              Get Recykoin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}