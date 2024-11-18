import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../hooks/useCookie";

const OnlyAdmin = ({ children, toHome = 0 }) => {
  const role = getCookie("role");
  const token = getCookie("token");

  if (!role || !token) {
    return <Navigate to={`/login`} />;
  }

  if (role === "admin") {
    return children;
  }
};

export default OnlyAdmin;
