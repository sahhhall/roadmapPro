import { Outlet } from "react-router-dom";
import { ProfileSidebar } from "../components/sidebar/ProfileSidebar";

export const ProfileLayout = () => {
  return (
    <div className="flex">
      <div className="w-1/4  px-4 py-6">
        <ProfileSidebar />
      </div>
      <div className="w-3/4  p-8">
        <Outlet />
      </div>
    </div>
  );
};
