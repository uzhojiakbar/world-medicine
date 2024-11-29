import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../hooks/useCookie";

const OnlyMenager = ({ children, toHome = 0 }) => {
  const role = getCookie("role");
  const token = getCookie("access_token");

  if (!role || !token) {
    return <Navigate to={`/login`} />;
  }

  if (role === "menager") {
    return children;
  }
};

export default OnlyMenager;
