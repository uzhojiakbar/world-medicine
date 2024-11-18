import React from "react";
import AdminNavbar from "../../components/navbar/admin/navbar";
import { Outlet } from "react-router-dom";
import { MenagerPageContainer } from "./style";

const MenagerPage = () => {
  return (
    <MenagerPageContainer>
      <AdminNavbar />
      <Outlet />
    </MenagerPageContainer>
  );
};

export default MenagerPage;
