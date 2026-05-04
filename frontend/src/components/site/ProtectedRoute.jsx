import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "checking") {
    return (
      <div
        data-testid="auth-loading"
        className="min-h-[60vh] flex items-center justify-center"
      >
        <Loader2 className="h-6 w-6 animate-spin text-forest" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Navigate
        to={`/admin?from=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
}
