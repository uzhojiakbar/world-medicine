import React, { useState } from "react";
import { Dropdown } from "antd";
import styled from "styled-components";

const LanguageIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: ${(props) => (props.notext ? "0" : "8px")};
  vertical-align: middle;
`;

const Language = ({ imgIcon, notext = false, onChange = () => {} }) => {
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

  const items = languages.map((lang) => ({
    key: lang.value,
    label: (
      <div
        onClick={() => handleLanguageChange(lang.value)}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        {!notext && (
          <LanguageIcon
            src={lang.icon}
            alt={`${lang.label} icon`}
            notext={notext}
          />
        )}
        {lang.label}
      </div>
    ),
  }));

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <LanguageIcon
          src={selectedLanguage?.icon}
          alt={`${selectedLanguage?.label} icon`}
          notext={notext}
        />
        {!notext && selectedLanguage?.label}
      </div>
    </Dropdown>
  );
};

export default Language;
