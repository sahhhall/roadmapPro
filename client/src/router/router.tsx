import {
  AdminDashBoard,
  AdminLayout,
  AdminLoginPage,
  UserManagment,
} from "@/features/admin";
import { ForgotPasswordPage, LoginPage, SignupPage } from "@/features/auth";
import Resetpassword from "@/features/auth/pages/Resetpassword";
import UserLayout from "@/layout/UserLayout";
import Home from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      {
        path: "/reset-password",
        element: <Resetpassword />,
      },
    ],
  },
  {
    path: "/admin/login",
    // element:<NavBar/>
    element: <AdminLoginPage />,
  },
  {
    path: "/admin/",
    element: <AdminLayout />,
    children: [
      { path: "/admin/", element: <AdminDashBoard /> },
      {
        path: "/admin/user-management",
        element: <UserManagment />,
      },
    ],
  },
]);

export default routes;
