import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { QueryProvider } from "./app/providers/QueryProvider";
import AppRouter from "./app/routes/AppRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  </React.StrictMode>
);
