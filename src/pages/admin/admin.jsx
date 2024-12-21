import React from "react";
import { MenagerPageContainer } from "../menager/style";
import AdminNavbar from "../../components/navbar/admin/navbar";
import { Outlet } from "react-router-dom";
import Analiktika from "../analiktika/analiktika";
import AdminAnaliktika from "../analiktika/admin/adminAnaliktika";

const AdminPage = () => {
  return (
    <MenagerPageContainer>
      <AdminAnaliktika />
    </MenagerPageContainer>
  );
};

export default AdminPage;
