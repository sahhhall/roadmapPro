import { NavLink } from "react-router-dom";
import { SidebarItemsProfile } from "@/features/user/lib/SidebarItemsProfile";

export const ProfileSidebar = () => {
  return (
    <div>
      <ul className="space-y-2">
        {SidebarItemsProfile.map((item) => (
          <li key={item.path}>
            <NavLink
              to={`/profile/${item.path}`}
              className={({ isActive }) =>
                `block px-2 py-1 rounded transition-colors ${
                  isActive ? "bg-gray-200 dark:bg-gray-900" : " hover:bg-gray-200 dark:hover:bg-gray-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};