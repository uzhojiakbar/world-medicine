import React, { useState } from "react";
import {
  ProfileBarButton,
  GoToProfileButton,
  Link,
  Links,
  Logo,
  NavContainer,
  ProfieBtn,
  BurgerMenu,
} from "./style";

// *IMG
import LogoMain from "../../../assets/logo-Banner.svg";
import { NavbarBurgerMenu, navbarData } from "../../../utils/navbar";

import useCustomNavigate from "../../../hooks/useCustomNavigate";
import { Dropdown } from "antd";
import {
  HeartFilled,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import useLogout from "../../../hooks/useLogOut";
import { getCookie } from "../../../hooks/useCookie";

const AdminNavbar = () => {
  const nav = useCustomNavigate();

  const logout = useLogout();

  const handleLogout = () => {
    logout(() => {
      console.log("User logged out successfully");
      nav("/");
    });
  };

  // Dropdown menu for profile options
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

  const [open, setOpen] = useState(false);

  const isOpen = () => setOpen(!open);

  return (
    <NavContainer>
      <Logo onClick={() => nav("/")} src={LogoMain} />
      <Links>
        {navbarData.map((v) => {
          return (
            <Link
              className={({ isActive }) => (isActive ? "active" : "")}
              key={v.id || v.title}
              to={
                getCookie("role") === "admin"
                  ? `/admin/${v.path}`
                  : `/menager/${v.path}`
              }
            >
              {v.title}
            </Link>
          );
        })}
        <Dropdown menu={{ items }} trigger={["click"]}>
          <ProfieBtn>
            <i className="fa-solid fa-user"></i>
          </ProfieBtn>
        </Dropdown>
      </Links>

      {/* Burger menu dropdown */}
      <Dropdown menu={{ items: NavbarBurgerMenu }} trigger={["click"]}>
        <BurgerMenu>
          <i className="fa-solid fa-bars"></i>
        </BurgerMenu>
      </Dropdown>
    </NavContainer>
  );
};

export default AdminNavbar;
