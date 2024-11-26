import React, { createContext, useContext, useState } from "react";
import ru from "./langs/ru.json";
import en from "./langs/en.json";

const LanguageContext = createContext();

const translations = { ru, en };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const translate = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ translate, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
