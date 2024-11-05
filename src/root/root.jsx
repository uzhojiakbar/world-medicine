import React from "react";
import { MainContainer } from "./style";
import AdminPage from "../pages/admin/admin";
import Router from "../router/router";

const Root = () => {
  return (
    <MainContainer>
      <Router />
    </MainContainer>
  );
};

export default Root;
