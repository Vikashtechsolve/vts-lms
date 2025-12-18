/**
 * Token Storage Utility
 * Stores tokens in localStorage for persistence across browser sessions
 */

const TOKEN_KEYS = {
  ACCESS_TOKEN: import.meta.env.VITE_TOKEN_STORAGE_ACCESS_KEY || "accessToken",
  REFRESH_TOKEN: import.meta.env.VITE_TOKEN_STORAGE_REFRESH_KEY || "refreshToken",
  USER: import.meta.env.VITE_TOKEN_STORAGE_USER_KEY || "user",
};

export const tokenStorage = {
  /**
   * Save tokens and user data
   */
  setTokens: (accessToken, refreshToken, user = null) => {
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
    if (user) {
      localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
    }
  },

  /**
   * Get access token
   */
  getAccessToken: () => {
    return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  },

  /**
   * Get refresh token
   */
  getRefreshToken: () => {
    return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
  },

  /**
   * Get user data
   */
  getUser: () => {
    const userStr = localStorage.getItem(TOKEN_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  },

  /**
   * Clear all auth data
   */
  clear: () => {
    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.USER);
  },
};

