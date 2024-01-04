import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {    

  if (!localStorage.getItem("jwt")) {

    return <Navigate to='/inscription' replace={true} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;