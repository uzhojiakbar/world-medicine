import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCookie } from "../../hooks/useCookie";

const OnlyAdmin = ({ children, toHome = 0 }) => {
  const role = getCookie("role");
  const token = getCookie("access_token");

  if (!role || !token) {
    return <Navigate to={`/login`} />;
  }

  if (role === "CHIEF") {
    return children;
  }
};

export default OnlyAdmin;
