import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Axios from "../Axios";

const ProtectedRoute = () => {
  
  return isAuthenticated === false ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoute;
