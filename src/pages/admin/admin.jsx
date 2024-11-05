import React from "react";
import AdminNavbar from "../../components/navbar/admin/navbar";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
};

export default AdminPage;
