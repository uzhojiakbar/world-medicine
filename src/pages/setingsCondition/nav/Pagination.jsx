import React, { useEffect, useState } from "react";
import { Container, H1, ContainerItem, Title } from "./style";
import { NavLink } from "react-router-dom";
import "./index.css";
import { MenagerPageContainer } from "../../menager/style";
const Pagination = () => {
  const [active, setActive] = useState("nastroyka-usloviya");

  const navdata = [
    { id: 0, name: "Архив договоров", path: "" },
    { id: 1, name: "Препараты", path: "Preparad" },
    { id: 2, name: "Места работы", path: "Mestrabotaya" },
    { id: 3, name: "Продажи", path: "Predoji" },
  ];

  useEffect(() => {
    const pageName =
      document.location.pathname.split("/")[
        document.location.pathname.split("/").length - 1
      ];

    if (pageName === "nastroyka-usloviya") {
      setActive("");
    } else {
      setActive(pageName);
    }
  });

  return (
    <MenagerPageContainer>
      <ContainerItem>
        {navdata?.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            style={{ textDecoration: "none" }}
            className={active === item.path ? "activeInner" : "itemInner"}
          >
            <div>
              <H1>{item.name}</H1>
              <span
                style={{
                  fontSize: "24px",
                  color: "#3d7ffb",
                }}
              >
                <i className="fa-brands fa-discord"></i>
              </span>
            </div>
          </NavLink>
        ))}
      </ContainerItem>
    </MenagerPageContainer>
  );
};

export default Pagination;
