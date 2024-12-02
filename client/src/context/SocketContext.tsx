import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { usegetUser } from "@/hooks/usegetUser";
import { useToast } from "@/hooks/use-toast";
const clinetBaseUrl = import.meta.env.VITE_BASE_CLIENT_URL;

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const userEmail = usegetUser();
  const { toast } = useToast();
  useEffect(() => {
    if (userEmail) {
      const newSocket = io(clinetBaseUrl, {
        path: '/notification-socket/socket.io' 
      });
      newSocket.on(`user:${userEmail.email}`, handleUserEvent);

      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }
  }, [userEmail]);

  const handleUserEvent = useCallback(
    (data: any) => {
      toast({
        title: data.type || "Notification",
        description: data.message || "You have a new update",
      });
    },
    [toast]
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
