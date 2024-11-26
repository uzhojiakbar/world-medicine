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
    port: 3000,
    headers: {
      "Content-Security-Policy": "script-src 'self' 'unsafe-inline';",
    },
  },
  preview: {
    port: 3000,
  },
});
