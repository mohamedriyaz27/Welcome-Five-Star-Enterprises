import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      if (response.success && response.data.accessToken) {
        setToken(response.data.accessToken);
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, message: response.message || "Login failed" };
    } catch (error) {
      return { success: false, message: error.message || "An error occurred during login" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (err) {
      console.warn("Logout failed, cleaning local session", err);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setIsLoading(false);
    }
  }, []);

  const checkSession = useCallback(async () => {
    try {
      const response = await authService.getProfile();
      if (response.success) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (err) {
      console.warn("Session check failed, logging out", err);
      logout();
    }
  }, [logout]);

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token,
    login,
    logout,
    checkSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
