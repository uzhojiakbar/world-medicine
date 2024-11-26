import React, { useState } from "react";
import { Select } from "antd";
import styled from "styled-components";

const { Option } = Select;

// Styled rasm konteyneri
const LanguageIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  vertical-align: middle;
`;

const Language = ({ imgIcon, onChange = () => {} }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "ru"
  ); // Til uchun boshqaruvchi holat

  const languages = [
    { value: "ru", label: "Русский", icon: imgIcon },
    { value: "en", label: "English", icon: imgIcon },
    { value: "uz", label: "O'zbek", icon: imgIcon },
  ];

  const handleLanguageChange = (value) => {
    setLanguage(value); // Holatni yangilash
    onChange(value); // OnChange funksiyasini chaqirish
  };

  return (
    <Select
      value={language} // Tanlangan tilni ko‘rsatish
      style={{ width: 160 }}
      onChange={handleLanguageChange} // Til o‘zgarishini boshqarish
      dropdownRender={(menu) => <div>{menu}</div>}
    >
      {languages.map((lang) => (
        <Option key={lang.value} value={lang.value}>
          <LanguageIcon src={lang.icon} alt={`${lang.label} icon`} />
          {lang.label}
        </Option>
      ))}
    </Select>
  );
};

export default Language;
