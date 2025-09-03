import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicOnlyRoute() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dashboardPath =
    user?.role === "admin"
      ? "/admin-dashboard"
      : user?.role === "mechanic"
      ? "/mechanic-dashboard"
      : "/user-dashboard";

  return isAuthenticated ? <Navigate to={dashboardPath} replace /> : <Outlet />;
}

export default PublicOnlyRoute;