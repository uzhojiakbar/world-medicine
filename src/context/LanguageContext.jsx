import React, { createContext, useContext, useState } from "react";
import ru from "./langs/ru.json";
import en from "./langs/en.json";
import uz from "./langs/uz.json";

const LanguageContext = createContext();

const translations = { ru, en, uz };

export const LanguageProvider = React.memo(({ children }) => {
  const [language, setLanguageFunc] = useState(
    localStorage.getItem("lang") || "ru"
  );

  const setLanguage = (lang) => {
    localStorage.setItem("lang", lang);
    setLanguageFunc(lang);
  };

  const translate = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ translate, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
});

export const useLanguage = () => useContext(LanguageContext);
