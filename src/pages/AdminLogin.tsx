import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import useAdminAuth from "@/hooks/useAdminAuth";

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, isAuthenticated, authLoaded } = useAdminAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginInProgress, setLoginInProgress] = useState(false);

  // Get redirect path from location state or default to dashboard
  const redirectPath = location.state?.from?.pathname || "/suraj/dashboard";

  // Handle URL error parameters
  useEffect(() => {
    // Check for error parameter in URL
    const params = new URLSearchParams(location.search);
    const errorParam = params.get("error");

    if (errorParam) {
      console.log("Found error in URL params:", errorParam);
      toast({
        title: "Authentication Error",
        description: decodeURIComponent(errorParam),
        variant: "destructive",
      });

      // Remove the error parameter from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [location.search, toast]);

  // If already authenticated, navigate to dashboard
  useEffect(() => {
    if (authLoaded && isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [authLoaded, isAuthenticated, navigate, redirectPath]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginInProgress(true);

    try {
      console.log("Login attempt with username:", credentials.username);
      const success = await login(credentials.username, credentials.password);

      if (success) {
        console.log("Login successful, redirecting to:", redirectPath);
        toast({
          title: "Login Successful",
          description: "You are now logged in to the admin dashboard.",
        });

        // Navigate immediately after successful login
        navigate(redirectPath, { replace: true });
      } else {
        console.error("Login failed:", error);
        toast({
          title: "Login Failed",
          description:
            error || "Invalid username or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoginInProgress(false);
    }
  };

  // Show loading indicator while checking auth
  if (!authLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-helia-blue/10 to-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
          <p className="mt-4 text-gray-600">Loading authentication state...</p>
        </div>
      </div>
    );
  }

  // If already authenticated, don't show login form
  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-helia-blue/10 to-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
          <p className="mt-4 text-gray-600">
            Already logged in. Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-helia-blue/10 to-white">
      <div className="m-auto w-full max-w-md p-8">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-gray-600 mt-2">
              Access the blog management dashboard
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-helia-blue hover:bg-helia-blue/90"
              disabled={loading || loginInProgress}
            >
              {loading || loginInProgress ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Debug Information:</p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono overflow-auto">
              <div>
                <strong>Auth Loaded:</strong> {authLoaded.toString()}
              </div>
              <div>
                <strong>Is Authenticated:</strong> {isAuthenticated.toString()}
              </div>
              <div>
                <strong>Login in Progress:</strong> {loginInProgress.toString()}
              </div>
              <div>
                <strong>Loading:</strong> {loading.toString()}
              </div>
              <div>
                <strong>Redirect Path:</strong> {redirectPath}
              </div>
              <div>
                <strong>Has Error:</strong> {Boolean(error).toString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
