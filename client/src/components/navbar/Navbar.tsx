import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleDarkMode } from "@/redux/slices/themeSlice";
import { Button } from "../ui/button";
import { Moon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const handleToggle = () => {
    dispatch(toggleDarkMode());
    //toggle method part of classlist (clasname, force(true,flase))
    //when it apply to body i mean class add new dark class tailwind get knwo and enabeled
    //so it class only occur when it there
    document.body.classList.toggle("dark", isDarkMode);
  };

  return (
    <>
      <div className="flex justify-between pt-4  border border-b-1 pb-4 align-middle items-center ">
        <div>
          <h1 className="ms-[1.4rem] sm:ms-[7rem] font-extrabold text-1xl sm:text:2xl  ">
            RoadmapPro
          </h1>
        </div>
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
      </div>
    </>
  );
};

export default Navbar;
