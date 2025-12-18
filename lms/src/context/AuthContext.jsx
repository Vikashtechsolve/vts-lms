import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../utils/api";
import { tokenStorage } from "../utils/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount - persists across browser sessions
  useEffect(() => {
    const checkAuth = async () => {
      const token = tokenStorage.getAccessToken();
      if (token) {
        try {
          // Always verify token with backend to ensure it's still valid
          const response = await authAPI.getMe();
          if (response.success) {
            setUser(response.user);
            tokenStorage.setTokens(
              tokenStorage.getAccessToken(),
              tokenStorage.getRefreshToken(),
              response.user
            );
            setIsAuthenticated(true);
          } else {
            // Token invalid, clear storage
            tokenStorage.clear();
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          // Token expired or invalid, clear storage
          tokenStorage.clear();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        tokenStorage.setTokens(
          response.accessToken,
          response.refreshToken,
          response.user
        );
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: response.message || "Login failed" };
    } catch (error) {
      return { success: false, error: error.message || "Login failed" };
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      const response = await authAPI.register(name, email, password, phone);
      if (response.success) {
        return response;
      }
      return { success: false, error: response.message || response.error || "Registration failed" };
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, error: error.message || "Registration failed. Please check if backend is running." };
    }
  };

  const verifyOtp = async (email, otp, skipLogin = false) => {
    try {
      const response = await authAPI.verifyOtp(email, otp);
      if (response.success) {
        // If skipLogin is true, don't log in yet (for plan selection flow)
        if (!skipLogin) {
          tokenStorage.setTokens(
            response.accessToken,
            response.refreshToken,
            response.user
          );
          setUser(response.user);
          setIsAuthenticated(true);
        } else {
          // Store tokens temporarily but don't set auth state
          // This allows API calls but prevents LMS access
          tokenStorage.setTokens(
            response.accessToken,
            response.refreshToken,
            response.user
          );
        }
        return { success: true, user: response.user, accessToken: response.accessToken, refreshToken: response.refreshToken };
      }
      return { success: false, error: response.message || "OTP verification failed" };
    } catch (error) {
      return { success: false, error: error.message || "OTP verification failed" };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      tokenStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Method to complete login after plan selection
  const completeLogin = (userData) => {
    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
      tokenStorage.setTokens(
        tokenStorage.getAccessToken(),
        tokenStorage.getRefreshToken(),
        userData
      );
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    verifyOtp,
    logout,
    completeLogin,
    setUser,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

