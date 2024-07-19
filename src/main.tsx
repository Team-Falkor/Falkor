import "./i18n";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LanguageContextProvider } from "./contexts/languageContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LanguageContextProvider>
      <App />
    </LanguageContextProvider>
  </React.StrictMode>
);
