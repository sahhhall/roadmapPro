import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { toggleDarkMode } from "@/redux/slices/themeSlice";
import { Button } from "../ui/button";
import { Bell, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";
import { usegetUser } from "@/hooks/usegetUser";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const userData = usegetUser();

  const location = useLocation();
  if (location.pathname.includes("/meet")) {
    return null;
  }
  // Check if current route is mentor profile
  const isMentorProfile = location.pathname.includes("/mentor-profile");
  const handleToggle = () => {
    dispatch(toggleDarkMode());
    //toggle method part of classlist (clasname, force(true,flase))
    //when it apply to body i mean class add new dark class tailwind get knwo and enabeled
    //so it class only occur when it there
    document.body.classList.toggle("dark", !isDarkMode);
  };
  if (isMentorProfile) {
    return (
      <div className="fixed top-0 w-full left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center px-4 sm:px-8 h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-extrabold text-xl">
              RoadmapPro
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {userData ? (
              <>
                <Link
                  to=""
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Bell className="w-5 h-5" />
                </Link>
                <div className="relative overflow-visible">
                  <Dropdown handleToggle={handleToggle} />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold">{userData.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userData.email}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <Button variant="customHover" size="sm" className="text-sm">
                    Sign in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="signin" size="signin" className="text-sm">
                    Get started
                  </Button>
                </Link>
                <button
                  onClick={handleToggle}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <Moon className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between pt-4  border border-b-1 pb-4 align-middle items-center ">
        <div>
          <h1 className="ms-[1.4rem] sm:ms-[7rem] font-extrabold text-1xl sm:text:2xl  ">
            RoadmapPro
          </h1>
        </div>
        {userData ? (
          <div className="me-[1rem] flex items-center gap-6  sm:me-[8em]">
            <Link to={"/notifications"}>
              <Bell />
            </Link>
            <div className="flex flex-row md:gap-2  items-center">
              <Dropdown handleToggle={handleToggle} />
              <div className="md:block hidden">
                <p className="text-xs pt-1 font-bold ">{userData.name}</p>
                <p className="text-xs">{userData.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="me-[1rem] sm:me-[8em]">
            <Link to={"/login"}>
              <Button
                className=" text-[12px] sm:text-xs pe-4 tracking-widest"
                variant={"customHover"}
                size={"sm"}
              >
                Sign in
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button
                className=" text-[12px] sm:text-sm"
                variant={"signin"}
                size={"signin"}
              >
                Get started
              </Button>
            </Link>
            <button onClick={handleToggle}>
              <Moon />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
