import { usegetUser } from "@/hooks/usegetUser";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RedirectLoggedInProps {
  children?: React.ReactNode;
}

const RedirectLoggedIn: React.FC<RedirectLoggedInProps> = ({ children }) => {
  const user = usegetUser();

  if (user) {
    return <Navigate to="/" />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default RedirectLoggedIn;
