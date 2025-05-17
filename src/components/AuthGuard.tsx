
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

  // If requireAuth is true, check if user is logged in
  // If requireAuth is false, check if user is NOT logged in
  const shouldRedirect = requireAuth ? !user : !!user;

  if (shouldRedirect) {
    // Pass the current location in the state so we can redirect back after login
    return <Navigate to={redirectTo} state={{ from: location.pathname }} />;
  }

  // Render children if authentication conditions are met
  return <Outlet />;
}
