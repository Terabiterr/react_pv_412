import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";
import { AuthService } from "../services/AuthService";

function ProtectedRoute({ children }: { children: JSX.Element }) {

  const { isAuth } = useAuth()

  // if (!AuthService.is_auth()) {
  //   return <Navigate to="/login" />;
  // }

  return isAuth ? children : <Navigate to="/login" />
}

export default ProtectedRoute;