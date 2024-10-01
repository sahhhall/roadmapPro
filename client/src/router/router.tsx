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
    path: "/admin",
  },
]);

export default routes;
