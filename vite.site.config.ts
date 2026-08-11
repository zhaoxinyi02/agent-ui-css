import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: "public-site",
  build: {
    outDir: "site-dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        appica: resolve(__dirname, "appica.html"),
      },
    },
  },
});
