
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface AuthGuardProps {
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function AuthGuard({ 
  requireAuth = true,
  redirectTo = requireAuth ? "/login" : "/"
}: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Wait while authentication state is being checked
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  // For login/signup pages (requireAuth=false):
  // If user is logged in, redirect to home
  if (!requireAuth && user) {
    console.log(`User is logged in, redirecting from ${location.pathname} to ${redirectTo}`);
    return <Navigate to={redirectTo} replace />;
  }

  // Render children if authentication conditions are met
  return <Outlet />;
}
