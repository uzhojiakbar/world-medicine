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

  const { language, setLanguage } = useLanguage(); // Use context for language state

  const [open, setOpen] = useState(false);
  const userRole = Cookies.get("role");

  const [data, setData] = useState(
    userRole === "CHIEF" ? NavbarDataAdmin(language) : navbarData(language)
  );

  const logout = useLogout();

  const handleLogout = () => {
    logout(() => {
      console.log("User logged out successfully");
      nav("/");
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <GoToProfileButton
          onClick={() => console.log("Profile clicked")}
          style={{ cursor: "pointer" }}
        >
          <div className="name">Admin username</div>
          <div className="name-desc">Hisobni ochish</div>
        </GoToProfileButton>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <ProfileBarButton
          onClick={() => console.log("Help clicked")}
          style={{ cursor: "pointer" }}
        >
          <HeartFilled />
          <div>Help</div>
        </ProfileBarButton>
      ),
    },
    {
      key: "3",
      label: (
        <ProfileBarButton
          onClick={() => console.log("Settings clicked")}
          style={{ cursor: "pointer" }}
        >
          <SettingOutlined />
          <div>Sozlamalar</div>
        </ProfileBarButton>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: (
        <ProfileBarButton onClick={handleLogout} style={{ cursor: "pointer" }}>
          <LogoutOutlined />
          <div>Hisobdan chiqish</div>
        </ProfileBarButton>
      ),
    },
  ];

  const languages = [
    { value: "ru", label: "Русский", icon: "" },
    { value: "en", label: "English", icon: "" },
    { value: "uz", label: "O'zbek", icon: "" },
  ];

  const handleLanguageChange = (value) => {
    setLanguage(value); // Update language using context
    setData();
    localStorage.setItem("lang", value); // Save language to localStorage
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
    <NavContainer>
      <Logo onClick={() => nav("/")} src={LogoMain} />
      <Links>
        {data.map(
          (v) =>
            v.visible && (
              <Link
                className={({ isActive }) => (isActive ? "active" : "")}
                key={v.id || v.title}
                to={
                  userRole === "CHIEF"
                    ? `/admin/${v.path}`
                    : `/menager/${v.path}`
                }
              >
                {v.title}
              </Link>
            )
        )}

        <Dropdown menu={{ items: langs }} trigger={["click"]}>
          <ChangeLanguage className={"inactive"}>{language}</ChangeLanguage>
        </Dropdown>

        <Dropdown menu={{ items }} trigger={["click"]}>
          <ProfieBtn>
            <i className="fa-solid fa-user"></i>
          </ProfieBtn>
        </Dropdown>
      </Links>

      {/* Burger menu dropdown */}
      <Dropdown menu={{ items: NavbarBurgerMenu() }} trigger={["click"]}>
        <BurgerMenu>
          <i className="fa-solid fa-bars"></i>
        </BurgerMenu>
      </Dropdown>
    </NavContainer>
  );
};

export default AdminNavbar;
