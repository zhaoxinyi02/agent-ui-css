import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./appica-tailwind.css";
import "./appica-catalog.css";
import { AppicaCatalog } from "./AppicaCatalog";

createRoot(document.getElementById("appica-root")!).render(
  <StrictMode>
    <AppicaCatalog />
  </StrictMode>,
);
