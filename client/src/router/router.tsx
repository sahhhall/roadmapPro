import {
  AdminDashBoard,
  AdminLayout,
  AdminLoginPage,
  UserManagment,
} from "@/features/admin";
import { ForgotPassowrdForm, LoginPage, SignupPage } from "@/features/auth";
import UserLayout from "@/layout/UserLayout";
import Home from "@/pages/ HomePage";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/forgot-password", element: <ForgotPassowrdForm /> },
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
