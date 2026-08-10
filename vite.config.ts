import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  publicDir: command === "serve" ? "public-site" : false,
  build: {
    lib: {
      entry: "src/lib/index.ts",
      name: "AgentUiCss",
      fileName: "agent-ui-css",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: { react: "React", "react-dom": "ReactDOM" },
      },
    },
  },
}));
