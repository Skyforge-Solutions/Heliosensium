import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogSubmission from "./pages/BlogSubmission";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogPost from "./pages/AdminBlogPost";
import NotFound from "./pages/NotFound";

import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import useAdminAuth from "./hooks/useAdminAuth";
import { Button } from "./components/ui/button";

// Create Auth Context
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkingSession: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: false,
  checkingSession: true,
});

// Auth Provider Component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAdminAuth();
  const [checkingSession, setCheckingSession] = useState(true);

  // Check auth state on mount
  useEffect(() => {
    console.log("Auth provider initializing, current auth state:", {
      isAuthenticated: auth.isAuthenticated,
      authLoaded: auth.authLoaded,
      authChecking: auth.authChecking,
    });

    // Wait until auth checking is complete before updating checkingSession
    if (!auth.authChecking && auth.authLoaded) {
      setCheckingSession(false);
      console.log("Auth provider initialized, final auth state:", {
        isAuthenticated: auth.isAuthenticated,
        authLoaded: auth.authLoaded,
      });
    }
  }, [auth.isAuthenticated, auth.authLoaded, auth.authChecking]);

  const contextValue = {
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.loading,
    checkingSession: checkingSession || auth.authChecking,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Protected Route component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, checkingSession } = useContext(AuthContext);
  const location = useLocation();

  // Debug logging
  console.log("ProtectedRoute check:", {
    isAuthenticated,
    checkingSession,
    path: location.pathname,
  });

  // While we're checking the session, show a loading indicator
  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-helia-blue/10 to-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log("Access to protected route denied, redirecting to login");
    return <Navigate to="/suraj/login" state={{ from: location }} replace />;
  }

  // User is authenticated, allow access
  return <>{children}</>;
};

// Create a simple auth debugger component
const AuthDebugger = () => {
  const auth = useAdminAuth();
  const authContext = useContext(AuthContext);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Auth Debug Page</h1>

      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Auth Hook State</h2>
        <pre className="bg-white p-4 rounded border overflow-auto text-sm">
          {JSON.stringify(
            {
              authLoaded: auth.authLoaded,
              isAuthenticated: auth.isAuthenticated,
              authChecking: auth.authChecking,
              loading: auth.loading,
              hasError: Boolean(auth.error),
              error: auth.error,
            },
            null,
            2
          )}
        </pre>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Auth Context State</h2>
        <pre className="bg-white p-4 rounded border overflow-auto text-sm">
          {JSON.stringify(authContext, null, 2)}
        </pre>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Cookie Info</h2>
        <p className="mb-2 text-sm text-gray-600">
          Cookies cannot be directly accessed via JavaScript if they are
          httpOnly (which is more secure). Authentication cookies should be
          httpOnly to prevent XSS attacks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Navigation</h2>
          <div className="space-y-2">
            <Button
              onClick={() => (window.location.href = "/suraj/login")}
              variant="outline"
              className="w-full"
            >
              Go to Login Page
            </Button>
            <Button
              onClick={() => (window.location.href = "/suraj/dashboard")}
              variant="outline"
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Auth Actions</h2>
          <div className="space-y-2">
            <Button
              onClick={() => auth.logout()}
              variant="destructive"
              className="w-full"
              disabled={!auth.isAuthenticated}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="helia-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/submit" element={<BlogSubmission />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/suraj/login" element={<AdminLogin />} />
              <Route
                path="/suraj/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/suraj/blog/:id"
                element={
                  <ProtectedRoute>
                    <AdminBlogPost />
                  </ProtectedRoute>
                }
              />
              <Route path="/suraj/auth-debug" element={<AuthDebugger />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
