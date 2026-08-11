import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "vendor/appica-ui-react/src/index.ts"),
      formats: ["es"],
      fileName: () => "appica.js",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^@base-ui\//,
        /^motion(\/.*)?$/,
        /^date-fns(\/.*)?$/,
        /^react-day-picker(\/.*)?$/,
        /^embla-carousel(-.*)?$/,
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
      ],
    },
  },
});
