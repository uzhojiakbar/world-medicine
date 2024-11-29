import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const NotAuth = ({ children, toHome = 0 }) => {
  const token = Cookies.get("access_token");
  console.log(token);

  if (!token) {
    return <Navigate to={`/login`} />;
  }
  return children;
};

export default NotAuth;
