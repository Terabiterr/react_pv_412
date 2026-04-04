import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { AuthService } from "../services/AuthService";

function ProtectedRoute({ children }: { children: JSX.Element }) {

  if (!AuthService.is_auth()) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;