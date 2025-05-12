import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Hook that provides authentication state and navigation methods for admin pages
 * This is a wrapper around the AuthContext that adds navigation functionality
 */
export default function useAdminAuth() {
  const auth = useAuth();
  const navigate = useNavigate();

  // Enhanced logout with navigation
  const logoutWithRedirect = async () => {
    await auth.logout();
    navigate("/suraj/login", { replace: true });
  };

  // Enhanced forcedLogout with navigation
  const forcedLogoutWithRedirect = (errorMessage: string) => {
    auth.forcedLogout(errorMessage);
    const loginUrl = `/suraj/login?error=${encodeURIComponent(errorMessage)}`;
    navigate(loginUrl, { replace: true });
  };

  return {
    ...auth,
    logout: logoutWithRedirect,
    forcedLogout: forcedLogoutWithRedirect,
  };
}
