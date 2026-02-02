import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin"
            end
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
          className="m-4 px-4 py-2 bg-red-600 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
