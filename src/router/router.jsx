import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { navbarData, NavbarDataAdmin } from "../utils/navbar";
import NotAuth from "../components/Navigate/notAuth";
import OnlyAdmin from "../components/Navigate/onlyAdmin";
import OnlyMenager from "../components/Navigate/onlyMenager";

// Lazy loaded pages
const MenagerPage = lazy(() => import("../pages/menager/menager"));
const AdminPage = lazy(() => import("../pages/admin/admin"));
const Login = lazy(() => import("../pages/login/login"));
const CompleteSetup = lazy(() => import("../pages/login/ForgetPassword"));

// Loader fallback
const Loader = () => (
  <div className="loaderWindow">
    <div className="loader"></div>
  </div>
);

const Router = () => {
  // Function to generate routes dynamically
  const renderRoutes = (routes, Wrapper) =>
    routes.map(({ id, path, element }) => (
      <Route key={id} path={path} element={<Wrapper>{element}</Wrapper>} />
    ));

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Root Route */}
        <Route
          path="/"
          element={
            <NotAuth>
              <OnlyMenager>
                <Navigate to="/menager/analiktika" replace />
              </OnlyMenager>
              <OnlyAdmin>
                <Navigate to="/admin" replace />
              </OnlyAdmin>
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
          {renderRoutes(NavbarDataAdmin, OnlyAdmin)}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>

        {/* Menager Routes */}
        <Route
          path="/menager/*"
          element={
            <OnlyMenager>
              <MenagerPage />
            </OnlyMenager>
          }
        >
          {renderRoutes(navbarData, OnlyMenager)}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>

        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<CompleteSetup />} />

        {/* Catch-All Route */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Suspense>
  );
};

export default Router;
