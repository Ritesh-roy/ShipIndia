import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { roleHomePath } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export default function AppRedirect() {
  const { user, role, loading } = useAuth();
  if (loading) return <div className="min-h-screen grid place-items-center"><Loader2 className="w-6 h-6 animate-spin text-accent" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  return <Navigate to={roleHomePath(role)} replace />;
}
