import React, { useEffect } from "react";
import { MainContainer } from "./style";

import Router from "../router/router";
import "./fonts.css";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Server from "../utils/server/server";

const Root = () => {
  const nav = useNavigate();

  const token = Cookies.get("access_token");
  useEffect(() => {
    if (token) {
      // const role = "CHIEF";
      const role = jwtDecode(token)?.role;
      Cookies.set("role", role);
      console.log("DECODE: ", jwtDecode(token));

      // Server.getUserInfo();
    }
  }, [token]);

  return <Router />;
};

export default Root;
