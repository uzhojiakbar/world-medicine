import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./root/root";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Otchot from "./Rahmadjon/Atchot";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            {/* <Root /> */}
          
          
            <Otchot/>


            <Toaster />
          </QueryClientProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
