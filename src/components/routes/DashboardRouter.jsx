import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function DashboardRouter() {
  const { user } = useSelector((state) => state.auth);

  if (user?.role === "admin") return <Navigate to="/admin-dashboard" replace />;
  if (user?.role === "mechanic") return <Navigate to="/mechanic-dashboard" replace />;
  return <Navigate to="/user-dashboard" replace />;
}