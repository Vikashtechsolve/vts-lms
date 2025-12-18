// API Base URL - Update this to match your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Always log API URL in production for debugging deployment issues
// This helps identify if env vars were set correctly during build
console.log("🔗 API Base URL:", API_BASE_URL);
console.log("🔗 Environment Variable VITE_API_URL:", import.meta.env.VITE_API_URL || "NOT SET");
console.log("🔗 Mode:", import.meta.env.MODE);
console.log("🔗 Production:", import.meta.env.PROD);

// Warn if using default localhost URL in production
if (import.meta.env.PROD && API_BASE_URL === "http://localhost:8000") {
  console.error("❌ ERROR: Using default localhost API URL in production!");
  console.error("❌ VITE_API_URL environment variable was NOT set during build.");
  console.error("❌ Please set VITE_API_URL in your deployment platform's environment variables and rebuild.");
}

/**
 * Get stored access token
 */
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

/**
 * Get stored refresh token
 */
const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

/**
 * API request wrapper with automatic token handling
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAccessToken();

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Check if response is ok before trying to parse JSON
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      // If response is not JSON, create error message
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
      throw new Error("Invalid response from server");
    }

    // If token expired, try to refresh
    if (response.status === 401 && token) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // Retry original request with new token
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
        const retryResponse = await fetch(url, config);
        const retryData = await retryResponse.json();
        if (!retryResponse.ok) {
          throw new Error(retryData.message || retryData.error || "Request failed");
        }
        return retryData;
      }
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    // Improve error messages for network issues
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      // Use environment variable for error message, but always show the actual API URL being used
      const customErrorMsg = import.meta.env.VITE_ERROR_BACKEND_CONNECTION;
      const errorMsg = customErrorMsg 
        ? `${customErrorMsg} (${API_BASE_URL})`
        : `Cannot connect to server at ${API_BASE_URL}. Please check your network connection and ensure the backend is running.`;
      throw new Error(errorMsg);
    }
    throw error;
  }
};

/**
 * Refresh access token using refresh token
 */
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

// Auth API calls
export const authAPI = {
  register: async (name, email, password, phone) => {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, phone }),
    });
  },

  verifyOtp: async (email, otp) => {
    return apiRequest("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  },

  resendOtp: async (email) => {
    return apiRequest("/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  login: async (email, password) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  logout: async () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        await apiRequest("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  getMe: async () => {
    return apiRequest("/auth/me", {
      method: "GET",
    });
  },

  updatePasswordAfterOtp: async (email, newPassword) => {
    return apiRequest("/auth/update-password-after-otp", {
      method: "POST",
      body: JSON.stringify({ email, newPassword }),
    });
  },

  updateProfile: async (name, phone, avatarUrl) => {
    return apiRequest("/auth/update-profile", {
      method: "PATCH",
      body: JSON.stringify({ name, phone, avatarUrl }),
    });
  },
};

// Plans API calls
export const plansAPI = {
  listPlans: async () => {
    return apiRequest("/plans", {
      method: "GET",
    });
  },
};

// Subscription API calls
export const subscriptionAPI = {
  createOrder: async (planId) => {
    return apiRequest("/subscription/create-order", {
      method: "POST",
      body: JSON.stringify({ planId }),
    });
  },

  verifyPayment: async (razorpay_order_id, razorpay_payment_id, razorpay_signature, planId) => {
    return apiRequest("/subscription/verify-payment", {
      method: "POST",
      body: JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        planId,
      }),
    });
  },

  getStatus: async () => {
    return apiRequest("/subscription/status", {
      method: "GET",
    });
  },
};

export default apiRequest;

