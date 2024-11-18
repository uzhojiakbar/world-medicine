import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "../pages/admin/admin";
import { navbarData } from "../utils/navbar";
import NotAuth from "../components/Navigate/notAuth";
import Login from "../pages/login/login";

const Router = () => {
  const isAdmin = false;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <NotAuth>
            <Navigate to={"/admin/analiktika"} />
          </NotAuth>
        }
      />
      <Route
        path="/admin"
        element={isAdmin ? <AdminPage /> : <Navigate to="/" />}
      >
        {navbarData.map((v) => {
          return <Route key={v.id} path={v.path} element={v.element} />;
        })}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
      <Route path="/login" element={<Login />} />
      {/* <Route
        path="/"
        element={
          <>
            <AdminPage />
            <h1>Home page</h1>
          </>
        }
      /> */}
    </Routes>
  );
};

export default Router;
