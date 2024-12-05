import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NavbarDataAdmin } from "../utils/navbar";
import { useAuth } from "../context/AuthContext/AuthContext";
import { MainContainer } from "../root/style";

// Components
const NotAuth = lazy(() => import("../components/Navigate/notAuth"));
const OnlyAdmin = lazy(() => import("../components/Navigate/onlyAdmin"));

// Pages
const AdminPage = lazy(() => import("../pages/admin/admin"));
const Login = lazy(() => import("../pages/login/login"));
const CompleteSetup = lazy(() => import("../pages/login/ForgetPassword"));

// Loader
const Loader = () => (
  <div className="loaderWindow">
    <div className="loader" />
  </div>
);

const Router = () => {
  const { role } = useAuth();

  const isAdmin = role === "CHIEF";

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Root redirect */}
        <Route
          path="/"
          element={
            <MainContainer>
              <NotAuth>
                <Navigate
                  to={isAdmin ? "/admin/analiktika" : "/login"}
                  replace
                />
              </NotAuth>
            </MainContainer>
          }
        />

        {/* Protected admin routes */}
        <Route
          path="/admin"
          element={
            <MainContainer>
              <OnlyAdmin>
                <AdminPage />
              </OnlyAdmin>
            </MainContainer>
          }
        >
          {NavbarDataAdmin().map(({ id, path, element }) => (
            <Route key={id} path={path} element={element} />
          ))}
          <Route
            path="*"
            element={
              <MainContainer>
                <Navigate to="/admin/analiktika" replace />
              </MainContainer>
            }
          />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<CompleteSetup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
