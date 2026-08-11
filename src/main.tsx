import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./appica-tailwind.css";
import "./lib/styles.css";
import "./appica-catalog.css";
import "./demo.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
