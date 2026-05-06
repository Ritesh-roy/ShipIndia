import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { roleHomePath, type AppRole } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({
  children, requireRole,
}: { children: React.ReactNode; requireRole?: AppRole }) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace state={{ from: location }} />;
  if (requireRole && role !== requireRole) return <Navigate to={roleHomePath(role)} replace />;
  return <>{children}</>;
};
