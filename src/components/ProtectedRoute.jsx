import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

export default function ProtectedRoute({ allowedRoles }) {
  const { user, loading, profile } = useAuth();

  if (loading) return <Loading />;

  // Belum login → redirect ke login
  if (!user) return <Navigate to="/login" replace />;

  // Jika ada batasan role, cek role user
  if (allowedRoles && profile) {
    if (!allowedRoles.includes(profile.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}
