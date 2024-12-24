import React, { useEffect, useState } from "react";
import { Container, H1, ContainerItem, Title } from "./style";
import { NavLink, useLocation } from "react-router-dom";
import "./index.css";
import { MenagerPageContainer } from "../../menager/style";
const Pagination = () => {
  const [active, setActive] = useState("nastroyka-usloviya");
  const location = useLocation(); // React Router'dan location hook

  const navdata = [
    { id: 0, name: "Архив договоров", path: "" },
    { id: 1, name: "Препараты", path: "Preparad" },
    { id: 2, name: "Места работы", path: "Mestrabotaya" },
    { id: 3, name: "Продажи", path: "Predoji" },
  ];

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const pageName = pathSegments[pathSegments.length - 1] || ""; // Oxirgi segmentni oladi

    if (pageName === "nastroyka-usloviya") {
      console.log(1);
      setActive("");
    } else {
      console.log(2);
      setActive(pageName);
    }

    console.log(active); // Ehtimoliy eski qiymatni ko'rsatadi
  }, [location.pathname]); // document.location o'rniga location.pathname ishlatiladi

  return (
    <>
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
    </>
  );
};

export default Pagination;
