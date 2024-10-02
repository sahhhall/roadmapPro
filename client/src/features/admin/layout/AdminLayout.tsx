import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="w-16 hidden md:block md:w-16">
        <Sidebar />
      </div>
      <div className="flex-grow flex flex-col">
        <Navbar />
        <div className="flex-grow  p-4">
          <Outlet />
        </div>
      </div>
    </div>  
  );
};

export default AdminLayout;
