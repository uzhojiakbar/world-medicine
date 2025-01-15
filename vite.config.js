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
        target: "http://209.38.109.22:8080/api", // Backend manzili
        changeOrigin: true,
        secure: false,
      },
    },
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
