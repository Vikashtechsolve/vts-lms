import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { subscriptionAPI } from "../utils/api";
import { PageLoader } from "./skeletons";

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
  // Keep loading until we have a definitive subscription status (not null)
  if (loading || checkingSubscription || (isAuthenticated && subscriptionStatus === null)) {
    return <PageLoader />;
  }

  // Not authenticated - redirect to landing page with original location preserved
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  // Authenticated but no active subscription - redirect to plan chooser with original location preserved
  // Only redirect if we've confirmed subscriptionStatus is false (not null)
  if (subscriptionStatus === false) {
    return <Navigate to="/planChooser" state={{ from: location.pathname }} replace />;
  }

  // User is authenticated and has active subscription - allow access
  return children;
};

export default ProtectedRoute;

