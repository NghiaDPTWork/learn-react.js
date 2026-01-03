import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./styles/global.css";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import UsersPage from "./pages/users";
import ProductsPage from "./pages/product";

const router = createBrowserRouter([
  /* 
    Cách định nghĩa - khái báo 1 đường dẫn mới
    Việc gộp users và product vào để nói với React rằng
    2 route đó với App có mối quan hệ cha con 
    => Từ đó t có thể chia sẻ tài nguyên (data, navbar, footer, ...)
    => Và ta cần định nghĩa lại xem ta sẽ tái sử dụng cái gì của
    thằng cha (Kỹ thuật Outlet)
  */
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/product",
        element: <ProductsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
