import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./root/root";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "./context/LanguageContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Root />
        <Toaster />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>
);
