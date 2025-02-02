import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

export const NotificationBell = ({ notification }: { notification: any }) => {
  console.log(notification, "notifi");
  return (
    <div className="relative">
      <Link
        to="/notifications"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <Bell className="w-5 h-5" />
        {notification > 0 && (
          <div className="absolute  bg-red-500 text-white items-center justify-center  -top-2 -right-2 rounded-full w-4 h-4 flex text-xs">
            {notification > 9 ? "9+" : notification}
          </div>
        )}
      </Link>
    </div>
  );
};
