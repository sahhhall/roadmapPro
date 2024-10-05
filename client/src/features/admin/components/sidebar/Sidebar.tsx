import { useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "../../lib/sidebaritems";
import { LogOut } from "lucide-react";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <div className="bg-gray-100  h-screen dark:bg-black border border-r-2">
      <br />
      <ul className="flex flex-col space-y-10 ">
        {sidebarItems.map((item) => (
          <li
            key={item.name}
            className={`flex hover:cursor-pointer  justify-center items-center   `}
          >
            <button
              onClick={() => handleClick(item.path)}
              className={` p-2 ${
                location.pathname === item.path
                  ? " items-center justify-center flex rounded-xl dark:text-black   dark:bg-white bg-black text-white"
                  : ""
              }`}
            >
              <item.icon />
            </button>
          </li>
        ))}
        <li className="flex hover:cursor-pointer  items-center px-4">
          <button>
            <LogOut />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
