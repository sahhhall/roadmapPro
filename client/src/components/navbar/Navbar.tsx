import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { toggleDarkMode } from "@/redux/slices/themeSlice";
import { Button } from "../ui/button";
import { Bell, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const { userData } = useAppSelector((state) => state.auth);
  const handleToggle = () => {
    dispatch(toggleDarkMode());
    //toggle method part of classlist (clasname, force(true,flase))
    //when it apply to body i mean class add new dark class tailwind get knwo and enabeled
    //so it class only occur when it there
    document.body.classList.toggle("dark", !isDarkMode);
  };

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
            <Link to={""}>
              <Bell />
            </Link>
            <div className="flex flex-row md:gap-2  items-center">
              <Dropdown  handleToggle={handleToggle} />
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
