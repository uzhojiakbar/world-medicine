import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import styled from "styled-components";

const LanguageIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: ${(props) => (props.noText ? "0" : "8px")};
  vertical-align: middle;
`;

const Language = ({ imgIcon, noText = false, onChange = () => {} }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "ru"
  );

  const languages = [
    { value: "ru", label: "Русский", icon: imgIcon },
    { value: "en", label: "English", icon: imgIcon },
    { value: "uz", label: "O'zbek", icon: imgIcon },
  ];

  const handleLanguageChange = (value) => {
    setLanguage(value); // Holatni yangilash
    localStorage.setItem("lang", value); // Tanlangan tilni saqlash
    onChange(value); // OnChange funksiyasini chaqirish
  };

  const selectedLanguage = languages.find((lang) => lang.value === language);

  const menu = (
    <Menu>
      {languages.map((lang) => (
        <Menu.Item
          key={lang.value}
          onClick={() => handleLanguageChange(lang.value)}
        >
          {!noText && (
            <LanguageIcon
              src={lang.icon}
              alt={`${lang.label} icon`}
              noText={noText}
            />
          )}
          {lang.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <LanguageIcon
          src={selectedLanguage?.icon}
          alt={`${selectedLanguage?.label} icon`}
          noText={noText}
        />
        {!noText && selectedLanguage?.label}
      </div>
    </Dropdown>
  );
};

export default Language;
