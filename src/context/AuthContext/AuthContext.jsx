import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Create context for auth
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const token = Cookies.get("access_token");
  //   if (token) {
  //     // const decodedToken = "CHIEF" || jwtDecode(token);
  //     // const userRole = "CHIEF" || decodedToken?.role;
  //     const decodedToken = "CHIEF";
  //     const userRole = "CHIEF";
  //     setRole(userRole);
  //     setToken(token);
  //   } else {
  //     // if no token, set role to null
  //     setRole(null);
  //     setToken(null);
  //   }
  // }, []); // Only runs on mount and initial token check

  return (
    <AuthContext.Provider value={{ role, token, setRole, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
