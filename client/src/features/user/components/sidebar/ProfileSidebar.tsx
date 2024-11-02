import { NavLink } from "react-router-dom";
import { SidebarItemsProfile } from "@/features/user/lib/SidebarItemsProfile";

interface IProfileSidebar {
  onItemClick?: () => void;
}
export const ProfileSidebar: React.FC<IProfileSidebar> = ({ onItemClick }) => {
  
  return (
    <div>
      <ul className="space-y-2 sm:mt-4 mt-0">
        {SidebarItemsProfile.map((item) => (
          <li key={item.path}>
            <NavLink
              to={`/profile/${item.path}`}
              onClick={onItemClick}
              className={({ isActive }) =>
                `  block px-3 py-3 sm:py-2 rounded text-sm font-bold  ${
                  isActive
                    ? "bg-gray-200 dark:bg-black dark:border border-gray-900"
                    : " hover:bg-gray-200 dark:hover:bg-gray-900"
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
