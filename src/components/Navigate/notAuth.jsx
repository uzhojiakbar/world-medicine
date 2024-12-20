import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const NotAuth = ({ children, toHome = 0 }) => {
  const token = Cookies.get("access_token");

  if (!token) {
    return <Navigate to={`/login`} />;
  }
  return children;
};

export default NotAuth;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './hooks/useAuth'; // Custom auth hook (authni tekshiruvchi hook)

// // Middleware kabi ishlovchi component
// const AuthMiddleware = ({ children }) => {
//   const { isAuthenticated } = useAuth(); // Foydalanuvchining autentifikatsiya holati
//   const navigate = useNavigate();

//   // Agar foydalanuvchi autentifikatsiya qilmagan bo'lsa, login sahifasiga yo'naltirish
//   if (!isAuthenticated) {
//     navigate('/login');
//     return null; // Foydalanuvchi login sahifasiga yo'naltirilganda bu komponentni render qilmaslik
//   }

//   // Agar foydalanuvchi autentifikatsiya qilingan bo'lsa, componentni render qilamiz
//   return <>{children}</>;
// };

// export default AuthMiddleware;
