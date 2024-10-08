import { usegetUser } from "@/hooks/usegetUser";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface UserProtectedProps {
  children?: React.ReactNode;
}

const UserProtected: React.FC<UserProtectedProps> = ({ children }) => {
  const user = usegetUser();
  console.log(user, "user");
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children ? <>{children}</> : <Outlet />;
};

export default UserProtected;