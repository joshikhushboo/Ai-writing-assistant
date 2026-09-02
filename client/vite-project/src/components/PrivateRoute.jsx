
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

const PrivateRoute = () => {
  const { ready, authenticated } = usePrivy();

  // Wait for Privy to determine authentication status
  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // User is NOT logged in
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // User IS logged in
  return <Outlet />;
};

export default PrivateRoute;

