import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu } from "lucide-react";
import { sidebarItems } from "../../util/sidebaritems";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";

const Hamburgermenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-3/4">
        <SheetHeader className="p-6 flex space-x-4 text-center items-center flex-row border-b-2">
          <Avatar className="w-8 h-8 rounded-full">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="rounded-full w-full h-full"
            />
          </Avatar>
          <p className="font-bold">sahhhall</p>
        </SheetHeader>
        <ul>
          {sidebarItems.map((item) => (
            <li
              onClick={() => handleClick(item.path)}
              className={`${
                location.pathname === item.path
                  ? "bg-black dark:bg-white dark:text-black text-white"
                  : ""
              } flex items-center m-3 rounded-md  mt-4 p-2 space-x-4 ps-8 cursor-pointer`}
              key={item.name}
            >
              <item.icon />
              <span
                className={`${
                  location.pathname === item.path
                    ? "dark:text-black text-white"
                    : ""
                } font-medium tracking-wide text-sm  text-center `}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
        <li className="flex m-3 items-center  mt-4 p-2 space-x-4 ps-8 cursor-pointer">
          <LogOut />
          <button className="">Logout</button>
        </li>
      </SheetContent>
    </Sheet>
  );
};

export default Hamburgermenu;
