import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-black text-white p-4 flex items-center justify-between z-50">
        <span className="text-xl font-bold">Admin Panel</span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white focus:outline-none"
        >
          {sidebarOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-black text-white flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 text-xl font-bold border-b border-gray-700 hidden lg:block">
          Admin Panel
        </div>

        {/* Mobile close button inside sidebar */}
        <div className="lg:hidden p-4 flex justify-between items-center border-b border-gray-700">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={closeSidebar}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLink
            to="/admin"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-gray-800" : "hover:bg-gray-800"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/videos"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-gray-800" : "hover:bg-gray-800"
              }`
            }
          >
            Videos
          </NavLink>

          <NavLink
            to="/admin/teams"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-gray-800" : "hover:bg-gray-800"
              }`
            }
          >
            Teams
          </NavLink>
          
          <NavLink
            to="/admin/blogs"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-gray-800" : "hover:bg-gray-800"
              }`
            }
          >
            Blogs
          </NavLink>

          <NavLink
            to="/admin/campaigns"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-gray-800" : "hover:bg-gray-800"
              }`
            }
          >
            Campaigns
          </NavLink>

          <NavLink
            to="/admin/impact-reports"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-gray-800" : "hover:bg-gray-800"
              }`
            }
          >
            Impact Report
          </NavLink>
        </nav>

        <button
          onClick={logoutHandler}
          className="m-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
        <Outlet />
      </main>
    </div>
  );
}