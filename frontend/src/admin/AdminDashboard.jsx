export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Videos</p>
          <h2 className="text-3xl font-bold">1</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Active Video</p>
          <h2 className="text-3xl font-bold text-green-600">Yes</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Admin Status</p>
          <h2 className="text-3xl font-bold">Online</h2>
        </div>
      </div>

      {/* Welcome */}
      <div className="bg-white p-8 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-2">
          Welcome back 👋
        </h3>
        <p className="text-gray-600">
          Use the sidebar to manage videos and control what appears on the homepage.
        </p>
      </div>
    </div>
  );
}
