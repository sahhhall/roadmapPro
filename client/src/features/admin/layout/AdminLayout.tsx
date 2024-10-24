import { Outlet } from "react-router-dom";
import Sidebar from "@/features/admin/components/sidebar/Sidebar";
import Navbar from "@/features/admin/components/navbar/Navbar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-16 hidden md:block md:w-16">
        <div className="fixed h-screen w-16">
          <Sidebar />
        </div>
      </div>
      <div className="flex-grow flex flex-col">
        <div className="sticky top-0 z-10 bg-background">
          <Navbar />
        </div>

        <div className="flex-grow  p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
