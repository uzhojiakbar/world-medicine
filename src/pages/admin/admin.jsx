import React from "react";
import { MenagerPageContainer } from "../menager/style";
import AdminAnaliktika from "../analiktika/admin/adminAnaliktika";

const AdminPage = () => {
  return (
    <MenagerPageContainer>
      <AdminAnaliktika />
    </MenagerPageContainer>
  );
};

export default AdminPage;
