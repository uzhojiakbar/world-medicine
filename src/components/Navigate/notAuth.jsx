import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../hooks/useCookie";

const NotAuth = ({ children, toHome = 0 }) => {
  const role = getCookie("role");
  const token = getCookie("token");

  if (!role || !token) {
    return <Navigate to={`/login`} />;
  }

  return children;
};

export default NotAuth;
