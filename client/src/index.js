import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { Outlet, RouterProvider } from "react-router-dom";
import router from "./routes";
const root = createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router}>
    <Outlet />
  </RouterProvider>
);
