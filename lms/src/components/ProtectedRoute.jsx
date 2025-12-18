import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { subscriptionAPI } from "../utils/api";

/**
 * ProtectedRoute - Checks authentication AND subscription before allowing access
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [checkingSubscription, setCheckingSubscription] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!isAuthenticated || !user) {
        setCheckingSubscription(false);
        return;
      }

      try {
        const response = await subscriptionAPI.getStatus();
        
        // Check if user has active subscription
        const hasActiveSubscription = 
          response.status === "active" && 
          response.endAt && 
          new Date(response.endAt) > new Date();

        setSubscriptionStatus(hasActiveSubscription);
      } catch (error) {
        console.error("Subscription check error:", error);
        setSubscriptionStatus(false);
      } finally {
        setCheckingSubscription(false);
      }
    };

    if (isAuthenticated && user) {
      checkSubscription();
    } else {
      setCheckingSubscription(false);
    }
  }, [isAuthenticated, user]);

  // Show loading while checking auth/subscription
  if (loading || checkingSubscription) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to landing page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Authenticated but no active subscription - redirect to plan chooser
  if (!subscriptionStatus) {
    return <Navigate to="/planChooser" replace />;
  }

  // User is authenticated and has active subscription - allow access
  return children;
};

export default ProtectedRoute;

