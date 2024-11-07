import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "../pages/admin/admin";
import { navbarData } from "../utils/navbar";

const Router = () => {
  const isAdmin = true;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/admin/analiktika"} />} />
      <Route
        path="/admin"
        element={isAdmin ? <AdminPage /> : <Navigate to="/" />}
      >
        {navbarData.map((v) => {
          return <Route key={v.id} path={v.path} element={v.element} />;
        })}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
      <Route
        path="/"
        element={
          <>
            <AdminPage />
            <h1>Home page</h1>
          </>
        }
      />
    </Routes>
  );
};

export default Router;
