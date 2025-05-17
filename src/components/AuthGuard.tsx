
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

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
  const [shouldNavigate, setShouldNavigate] = useState(false);

  // Use effect to prevent immediate redirect and avoid redirect loops
  useEffect(() => {
    // Only determine if we should redirect after loading is complete
    if (!isLoading) {
      const accessRequired = requireAuth && !user;
      const accessForbidden = !requireAuth && user;
      
      // Set shouldNavigate to a boolean value
      setShouldNavigate(accessRequired || accessForbidden);
    }
  }, [user, isLoading, requireAuth]);

  // Wait while authentication state is being checked
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  // Only redirect if we've determined we should after loading is complete
  if (shouldNavigate) {
    console.log(`Redirecting from ${location.pathname} to ${redirectTo}, auth required: ${requireAuth}, user exists: ${!!user}`);
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // Render children if authentication conditions are met
  return <Outlet />;
}
