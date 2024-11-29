import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const isAuth = ({ children }) => {
  const token = Cookies.get("access_token");

  if (token && token.length > 1) {
    return children;
  }
  return <Navigate to={`/login`} />;
};

export default isAuth;
