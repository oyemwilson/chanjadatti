import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  return adminInfo?.token ? <Outlet /> : <Navigate to="/admin/login" />;
}
