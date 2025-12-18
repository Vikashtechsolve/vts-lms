import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PublicRoute - Redirects authenticated users away from public pages
 * Use this for landing page, sign in, etc.
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, redirect to LMS home
  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  // Not authenticated - show public page
  return children;
};

export default PublicRoute;

