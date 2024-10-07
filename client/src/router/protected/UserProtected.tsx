import { useAppSelector } from "@/hooks/useAppStore";
import React from "react";
import { Navigate } from "react-router-dom";

interface UserProtectedProps {
  children: React.ReactNode; 
}

const UserProtected: React.FC<UserProtectedProps> = ({ children }) => {
  const { userData } = useAppSelector((state) => state.auth);

  if (userData) {
    return <Navigate to={"/"} />; 
  }

  return <>{children}</>; 
};

export default UserProtected;
