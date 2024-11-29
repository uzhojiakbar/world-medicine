import React, { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NavbarDataAdmin } from "../utils/navbar";
import NotAuth from "../components/Navigate/notAuth";
import OnlyAdmin from "../components/Navigate/onlyAdmin";
import { useAuth } from "../context/AuthContext/AuthContext"; // Import AuthContext for global state

// Lazy loaded pages
const AdminPage = lazy(() => import("../pages/admin/admin"));
const Login = lazy(() => import("../pages/login/login"));
const CompleteSetup = lazy(() => import("../pages/login/ForgetPassword"));

// Loader fallback component
const Loader = () => (
  <div className="loaderWindow">
    <div className="loader"></div>
  </div>
);

const Router = () => {
  const { role, token } = useAuth(); // Fetch global role and token from context

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Root Route */}
        <Route
          path="/"
          element={
            <NotAuth>
              {role === "CHIEF" ? (
                <Navigate to="/admin/analiktika" replace />
              ) : (
                <Navigate to="/login" replace />
              )}
            </NotAuth>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <OnlyAdmin>
              <AdminPage />
            </OnlyAdmin>
          }
        >
          {NavbarDataAdmin().map(({ id, path, element }) => (
            <Route
              key={id}
              path={path}
              element={<OnlyAdmin>{element}</OnlyAdmin>}
            />
          ))}
          <Route path="*" element={<h1>ADMIN: Not Found Page</h1>} />
        </Route>

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Forget Password Route */}
        <Route path="/forget-password" element={<CompleteSetup />} />

        {/* Catch-All Route */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Suspense>
  );
};

export default Router;
