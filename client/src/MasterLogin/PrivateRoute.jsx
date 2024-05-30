import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const userId = localStorage.getItem("userId");
  const designation = localStorage.getItem("designation");

  if (!userId) {
    return <Navigate to="/" />;
  }
  if (userId.startsWith("SUPERADMIN")) {
    return <Outlet />;
  }

  // Allow access to /login and /fr routes for all users
  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/fr"
  ) {
    return <Outlet />;
  }

  if (designation === "FranchiseAdmin" || userId) {
    return <Outlet />;
  } else if (designation === "Reception") {
    // Allow access only to /Recepttion route for Reception designation
    return window.location.pathname === "/Recepttion" ? (
      <Outlet />
    ) : (
      <Navigate to="/Recepttion" />
    );
  } else {
    // For other designations, restrict access
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
