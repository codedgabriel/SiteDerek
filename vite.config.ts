import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(), // React + Vite
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // alias para src
      "@assets": path.resolve(__dirname, "attached_assets"), // alias para assets
    },
  },
  root: path.resolve(__dirname), // pasta raiz do projeto
  build: {
    outDir: "dist", // saída do build
    emptyOutDir: true, // limpa dist antes do build
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
