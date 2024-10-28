import Navbar from "@/components/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const UserLayout = () => {
  const { pathname } = useLocation();
  const routesWithoutNavbar = ["/assessment"];
  const shouldHideNavbar = routesWithoutNavbar.some((route) =>
    pathname.startsWith(route)
  );
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default UserLayout;
