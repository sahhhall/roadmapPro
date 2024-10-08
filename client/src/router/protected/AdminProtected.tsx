import { useAppSelector } from "@/hooks/useAppStore";
import React from "react";
import { Navigate } from "react-router-dom";

interface AdminProtectedProps {
  children: React.ReactNode; 
}

const AdminProtected: React.FC<AdminProtectedProps> = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.adminAuth);
  
  if (!isAuth) {
    return <Navigate to={"/admin/login"} />; 
  }

  return <>{children}</>; 
};

export default AdminProtected;
