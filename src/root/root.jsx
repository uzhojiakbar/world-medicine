import React, { useEffect } from "react";
import { MainContainer } from "./style";

import Router from "../router/router";
import "./fonts.css";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import publishService from "../utils/server/some_shit";

const Root = () => {
  // publishService.getPosts();
  const nav = useNavigate();

  const token = Cookies.get("access_token");
  useEffect(() => {
    if (token) {
      // const role = "CHIEF";
      const role = jwtDecode(token)?.role;
      Cookies.set("role", role);
      console.log("DECODE: ", jwtDecode(token));
    }
  }, [token]);

  return <Router />;
};

export default Root;
