import React, { useState, useEffect } from "react";
import {
  ProfileBarButton,
  GoToProfileButton,
  Link,
  Links,
  Logo,
  NavContainer,
  ProfieBtn,
  BurgerMenu,
  ChangeLanguage,
  NavBigContainer,
} from "./style";

// *IMG
import LogoMain from "../../../assets/logo-Banner.svg";
import {
  NavbarBurgerMenu,
  navbarData,
  NavbarDataAdmin,
} from "../../../utils/navbar";

import useCustomNavigate from "../../../hooks/useCustomNavigate";
import { Dropdown } from "antd";
import {
  HeartFilled,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import useLogout from "../../../hooks/useLogOut";
import Cookies from "js-cookie";
import { useLanguage } from "../../../context/LanguageContext";

const AdminNavbar = () => {
  const nav = useCustomNavigate();

  // Keep hooks at the top and avoid conditional calls
  const [lang1, setLanguage2] = useState(localStorage.getItem("lang") || "ru");
  const { translate, language, setLanguage } = useLanguage(); // useLanguage hook'ini chaqiramiz
  console.log(language);

  const [open, setOpen] = useState(false);
  const userRole = Cookies.get("role");

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("data");

    const CurrentData = userRole === "CHIEF" ? NavbarDataAdmin : navbarData;

    setData(
      CurrentData?.map((v) => {
        return {
          ...v,
          title: translate(v.title),
        };
      })
    );

    console.log(data);
  }, [language]);

  const languages = [
    { value: "ru", label: "Русский", icon: "" },
    { value: "en", label: "English", icon: "" },
    { value: "uz", label: "O'zbek", icon: "" },
  ];

  const handleLanguageChange = (value) => {
    setLanguage2(value); // Holatni yangilash
    setLanguage(value);
    localStorage.setItem("lang", value); // Tanlangan tilni saqlash
  };

  const langs = languages.map((lang) => ({
    key: lang.value,
    label: (
      <div
        onClick={() => handleLanguageChange(lang.value)}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        {lang.label}
      </div>
    ),
  }));

  return (
    <NavBigContainer>
      <NavContainer>
        <Logo onClick={() => nav("/")} src={LogoMain} />
        <Links>
          {data.map(
            (v) =>
              v.visible && (
                <Link
                  className={({ isActive }) => (isActive ? "active" : "")}
                  key={v.id || v.title}
                  to={Cookies.get("role") === "CHIEF" ? v.path : v.path}
                >
                  {v.title}
                </Link>
              )
          )}

          <Dropdown
            overlayStyle={{ zIndex: "999999999" }}
            menu={{ items: langs }}
            trigger={["click"]}
          >
            <ChangeLanguage className={"inactive"}>{lang1}</ChangeLanguage>
          </Dropdown>

          <ProfieBtn to={`/profile`}>
            <i className="fa-solid fa-user"></i>
          </ProfieBtn>
        </Links>

        {/* Burger menu dropdown */}
        <Dropdown
          overlayStyle={{ zIndex: "999999999" }}
          menu={{ items: NavbarBurgerMenu() }}
          trigger={["click"]}
        >
          <BurgerMenu>
            <i className="fa-solid fa-bars"></i>
          </BurgerMenu>
        </Dropdown>
      </NavContainer>
    </NavBigContainer>
  );
};

export default AdminNavbar;
