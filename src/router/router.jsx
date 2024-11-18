import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MenagerPage from "../pages/menager/menager";
import { navbarData, NavbarDataAdmin } from "../utils/navbar";
import NotAuth from "../components/Navigate/notAuth";
import Login from "../pages/login/login";
import { getCookie } from "../hooks/useCookie";
import OnlyAdmin from "../components/Navigate/onlyAdmin";
import OnlyMenager from "../components/Navigate/onlyMenager";
import AdminPage from "../pages/admin/admin";

const Router = () => {
  return (
    <Routes>
      {/* ROute control */}
      <Route
        path="/"
        element={
          <NotAuth>
            <OnlyMenager>
              <Navigate to={"/menager/analiktika"} />
            </OnlyMenager>
            <OnlyAdmin>
              <Navigate to={"/admin"} />
            </OnlyAdmin>
          </NotAuth>
        }
      />
      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <OnlyAdmin>
            <AdminPage />
          </OnlyAdmin>
        }
      >
        {NavbarDataAdmin.map((v) => {
          return <Route key={v.id} path={v.path} element={v.element} />;
        })}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
      {/* MENAGER ROUTES */}
      <Route
        path="/menager"
        element={
          <OnlyMenager>
            <MenagerPage />
          </OnlyMenager>
        }
      >
        {navbarData.map((v) => {
          return <Route key={v.id} path={v.path} element={v.element} />;
        })}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<>Not Found</>} />
    </Routes>
  );
};

export default Router;
