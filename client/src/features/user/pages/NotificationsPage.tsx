import { useState } from "react";
import { Bell } from "lucide-react";

import { formatDistanceToNow } from "date-fns";
import { useGetNotificationsQuery } from "../services/api/mentorTestApi";
import { usegetUser } from "@/hooks/usegetUser";

const NotificationsPage = () => {
  const [skip, setSkip] = useState(0);
  const user = usegetUser();

  const {
    data: notifications = [],
    isLoading,
    isFetching,
  } = useGetNotificationsQuery({
    email: user!.email,
    skip,
  });

  

//   const loadMore = () => {
//     setSkip((prev) => prev + 10);
//   };


  const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div className=" max-w-5xl p-6  mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 dark:text-white text-black" />
          <h1 className="text-sm font-bold">Notifications</h1>
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-4">Loading notifications...</div>
      )}

      <div className="space-y-4">
        {notifications && notifications.map((notification) => (
          <div
            key={notification.id}
            className={`  transition-colors ${
              notification.isRead ? "bg-white" : "bg-gray-200"
            }`}
          >
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {notification.type}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(notification.createdAt)}
                    </span>
                  </div>
                  <p className=" text-xs text-gray-600 mt-1">{notification.message}</p>
                </div>
              </div>
            </div>
            <hr />
          </div>
       
        ))}

        {/* {notifications.length > 0 && (
          <button
            onClick={loadMore}
            disabled={isFetching}
            className="w-full py-2 text-blue-500 hover:text-blue-600 disabled:opacity-50"
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        )} */}

        {!isLoading && notifications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No notifications found
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
