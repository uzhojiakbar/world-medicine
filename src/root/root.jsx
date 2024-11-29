import React, { useEffect } from "react";
import { MainContainer } from "./style";

import Router from "../router/router";
import "./fonts.css";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Root = () => {
  const nav = useNavigate();

  useEffect(() => {
    const token = Cookies.get("access_token");
    console.log("11212");

    if (token) {
      const role = jwtDecode(token)?.role;
      Cookies.set("role", role);
      nav("/");
    }
  }, []);

  return (
    <MainContainer>
      <Router />
    </MainContainer>
  );
};

export default Root;
