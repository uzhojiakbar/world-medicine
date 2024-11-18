import React from "react";
import AdminNavbar from "../../components/navbar/admin/navbar";
import { Outlet } from "react-router-dom";
import { AdminPageContainer } from "./style";

const AdminPage = () => {
  return (
    <AdminPageContainer>
      <AdminNavbar />
      <Outlet />
    </AdminPageContainer>
  );
};

export default AdminPage;
