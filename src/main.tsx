import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { QueryProvider } from "./app/providers/QueryProvider";
import AppRouter from "./app/routes/AppRouter";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <AppRouter />
      <ToastContainer />

    </QueryProvider>
  </React.StrictMode>
);
