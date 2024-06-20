import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>{" "}
  </Provider>
);
