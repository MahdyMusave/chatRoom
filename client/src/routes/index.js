import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import AuthLayout from "../layout/index";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: (
          <AuthLayout>
            <Register />,
          </AuthLayout>
        ),
      },
      {
        path: "login",
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/",

        element: <Home />,

        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
]);
export default router;
