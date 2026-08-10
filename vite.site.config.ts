import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: "public-site",
  build: {
    outDir: "site-dist",
    emptyOutDir: true,
  },
});
