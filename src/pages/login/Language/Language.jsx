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

const Language = ({ imgIcon }) => {
  const [language, setLanguage] = useState("ru");

  const languages = [
    { value: "ru", label: "Русский", icon: imgIcon },
    { value: "en", label: "English", icon: imgIcon },
    { value: "uz", label: "O'zbek", icon: imgIcon },
  ];

  const handleChange = (value) => {
    setLanguage(value);
    console.log("Selected language:", value);
  };

  const selectedLanguage = languages.find((lang) => lang.value === language);

  return (
    <Select
      defaultValue={language}
      style={{ width: 160 }}
      onChange={handleChange}
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
