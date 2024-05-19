import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const adminToken = Cookies.get("AdminJwtToken");
  if (adminToken) {
    return <Navigate to="/adminPanel" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
