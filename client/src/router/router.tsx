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
import AdminProtected from "@/router/protected/AdminProtected";
import UserProtected from "@/router/protected/UserProtected";
import RedirectLoggedIn from "@/router/protected/RedirectLoggedIn";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "/login",
        element: (
          <RedirectLoggedIn>
            <LoginPage />
          </RedirectLoggedIn>
        ),
      },
      {
        path: "/signup",
        element: (
          <RedirectLoggedIn>
            <SignupPage />
          </RedirectLoggedIn>
        ),
      },

      { path: "/forgot-password", element: <ForgotPasswordPage /> },

      {
        path: "/reset-password",
        element: (
          <RedirectLoggedIn>
            <Resetpassword />
          </RedirectLoggedIn>
        ),
      },
      {
        path: "/profile",
        element: (
          <UserProtected>
            <>
              <p>fds</p>
            </>
          </UserProtected>
        ),
      },
    ],
  },

  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin/",
    element: (
      <AdminProtected>
        <AdminLayout />
      </AdminProtected>
    ),
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
