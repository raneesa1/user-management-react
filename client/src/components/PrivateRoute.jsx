import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';  

const PrivateRoute = () => {

  const user = Cookies.get("UserJwtToken");

  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
