import React from "react";
import {
  ProfileBarButton,
  GoToProfileButton,
  Link,
  Links,
  Logo,
  NavContainer,
  ProfieBtn,
} from "./style";

// *IMG
import LogoMain from "../../../assets/logo-Banner.svg";
import { navbarData } from "../../../utils/navbar";

import useCustomNavigate from "../../../hooks/useCustomNavigate";
import { Dropdown } from "antd";
import {
  HeartFilled,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const AdminNavbar = () => {
  const nav = useCustomNavigate();
  const items = [
    {
      key: "1",
      label: (
        <GoToProfileButton
          onClick={() => handleSettingsClick(1)}
          style={{ cursor: "pointer" }}
        >
          <div className="name">
            {/* {} */}
            "Admin username"
          </div>
          <div className="name-desc">Hisobni ochish</div>
        </GoToProfileButton>
      ),
      disabled: false,
    },
    {
      type: "divider",
    },

    {
      key: "2",
      label: (
        <ProfileBarButton
          onClick={() => console.log(0, "/contact")}
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
          onClick={() => console.log("Sozlamalar")}
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
        <ProfileBarButton
          type="logOut"
          onClick={() => console.log("log out")}
          style={{ cursor: "pointer" }}
        >
          <LogoutOutlined />
          <div>Hisobdan chiqish</div>
        </ProfileBarButton>
      ),
    },
  ];

  return (
    <NavContainer>
      <Logo onClick={() => nav("/")} src={LogoMain} />
      <Links>
        {navbarData.map((v) => {
          return (
            <Link
              className={({ isActive }) => (isActive ? "active" : "")}
              key={v.id || v.title}
              to={`/admin/${v.path}`}
            >
              {v.title}
            </Link>
          );
        })}
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <ProfieBtn>
            <i className="fa-solid fa-user"></i>
          </ProfieBtn>
        </Dropdown>
      </Links>
    </NavContainer>
  );
};

export default AdminNavbar;
