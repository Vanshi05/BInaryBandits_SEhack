
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Redirect to auth page if not authenticated
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  // Render child routes if authenticated
  return <Outlet />;
};