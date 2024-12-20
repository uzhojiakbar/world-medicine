import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.23.100:8080/api", // Backend manzili
        changeOrigin: true,
        secure: false,
      },
    },
    port: 5000,
  },
  preview: {
    port: 5000,
  },
});
