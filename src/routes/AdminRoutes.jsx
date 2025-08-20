import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../views/Admin/Login";
import AdminDashboard from "../views/Admin/Dashboard";
import AdminNavbar from "../components/Admin/Navbar";

export default function AdminRoutes() {
  const AdminRoute = ({ children }) => {
    const admin = sessionStorage.getItem("admin_session");
    if (!admin) return <Navigate to="/admin" replace />;
    return children;
  };

  const LoginRoute = ({ children }) => {
    const admin = sessionStorage.getItem("admin_session");
    if (admin) return <Navigate to="/admin/dashboard" replace />;
    return children;
  };

  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <LoginRoute>
            <AdminLogin />
          </LoginRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminNavbar />
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
