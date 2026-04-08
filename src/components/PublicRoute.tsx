import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicdRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicdRouteProps) {
  function isAuthenticated() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return false;
    }
    return true;
  }

  if (isAuthenticated()) {
    return <Navigate to="/bookmarks" />;
  }
  return children;
}
