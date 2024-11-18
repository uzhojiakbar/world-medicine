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

const Router = () => {
  const renderAdminRoutes = () =>
    NavbarDataAdmin.map(({ id, path, element }) => (
      <Route key={id} path={path} element={element} />
    ));

  const renderMenagerRoutes = () =>
    navbarData.map(({ id, path, element }) => (
      <Route key={id} path={path} element={element} />
    ));

  return (
    <Suspense
      fallback={
        <div className="loaderWindow">
          <div className="loader"></div>
        </div>
      }
    >
      <Routes>
        {/* Root Route */}
        <Route
          path="/"
          element={
            <NotAuth>
              <OnlyMenager>
                <Navigate to="/menager/analiktika" />
              </OnlyMenager>
              <OnlyAdmin>
                <Navigate to="/admin" />
              </OnlyAdmin>
            </NotAuth>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <OnlyAdmin>
              <AdminPage />
            </OnlyAdmin>
          }
        >
          {renderAdminRoutes()}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>

        {/* Menager Routes */}
        <Route
          path="/menager"
          element={
            <OnlyMenager>
              <MenagerPage />
            </OnlyMenager>
          }
        >
          {renderMenagerRoutes()}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Catch-All Route */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Suspense>
  );
};

export default Router;
