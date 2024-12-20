import React from "react";
import { MenagerPageContainer } from "../menager/style";
import AdminNavbar from "../../components/navbar/admin/navbar";
import { Outlet } from "react-router-dom";
import Analiktika from "../analiktika/analiktika";

const AdminPage = () => {
  return (
    <MenagerPageContainer>
      <AdminNavbar />
      <Outlet />
    </MenagerPageContainer>
  );
};

export default AdminPage;
