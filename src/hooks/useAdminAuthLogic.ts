import { useState, useEffect } from "react";
import { adminLogin, checkAuth, logout as apiLogout } from "@/lib/api";

/**
 * Core authentication logic without redirects
 * This hook provides authentication state and methods for the admin portal
 */
export default function useAdminAuthLogic() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authLoaded, setAuthLoaded] = useState<boolean>(false);

  // Check authentication status on mount and update state
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setAuthChecking(true);
        console.log("Verifying authentication status...");
        const isValid = await checkAuth();
        console.log("Authentication check result:", isValid);
        setIsAuthenticated(isValid);
      } catch (err) {
        console.error("Error verifying authentication:", err);
        setIsAuthenticated(false);
      } finally {
        setAuthChecking(false);
        setAuthLoaded(true);
      }
    };

    verifyAuth();
  }, []);

  // Login function - uses cookies managed by the server
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Attempting login with username:", username);
      await adminLogin(username, password);

      // Trust the login call and set authenticated to true
      // Don't immediately re-check auth as it can cause race conditions
      setIsAuthenticated(true);
      console.log("Login successful - setting authenticated state");

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      setError(err instanceof Error ? err.message : "Failed to login");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function - clears cookies and session on the server
  const logout = async () => {
    console.log("Logging out user");

    try {
      await apiLogout();
      setIsAuthenticated(false);
      return true;
    } catch (err) {
      console.error("Logout failed:", err);
      return false;
    }
  };

  // Function to handle logout with error message
  const forcedLogout = (errorMessage: string) => {
    console.error("Forced logout due to:", errorMessage);
    setError(errorMessage);
    setIsAuthenticated(false);

    // Call API logout to clear cookies
    apiLogout().catch((err) => {
      console.error("Error during forced logout:", err);
    });

    return errorMessage;
  };

  // Return authentication state and functions
  return {
    isAuthenticated,
    loading,
    authLoaded,
    error,
    login,
    logout,
    forcedLogout,
    authChecking,
  };
}
