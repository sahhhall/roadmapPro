import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleDarkMode } from "@/redux/slices/themeSlice";
import {  Moon } from "lucide-react";
import Hamburgermenu from "./Hamburgermenu";
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
    <nav className="border-b flex items-center  h-12 px-4 space-x-6  md:justify-end">
      <button className="md:block hidden" onClick={handleToggle}>
        <Moon />
      </button>
      <Avatar className="md:block hidden w-8 h-8 rounded-full">
        <AvatarImage
          src="https://github.com/shadcn.png"
          className="rounded-full w-full h-full"
        />
        <AvatarFallback>hihii</AvatarFallback>
      </Avatar>
      <div className="md:hidden ">
        <Hamburgermenu />
      </div>
    </nav>
  );
};

export default Navbar;
