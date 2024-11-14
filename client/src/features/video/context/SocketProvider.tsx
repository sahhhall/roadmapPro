import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext<any>(null);

interface SocketProviderProps {
  children: ReactNode;
}
export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

export const SocketProvider: React.FC<SocketProviderProps> = (props) => {
  const socket = useMemo(() => {
    return io("http://localhost:3004", {
      transports: ["websocket"],
      autoConnect: true,
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
