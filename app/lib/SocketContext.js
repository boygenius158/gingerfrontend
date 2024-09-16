"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import io from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { data: session } = useSession();
  const socket = useRef(null);

  useEffect(() => {
    // Initialize socket connection if not already established
    if (session?.user?.email && !socket.current) {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL; // Access server URL from env
      socket.current = io(serverUrl);
      socket.current.emit("register", session.user.email);
    }

    // Cleanup socket connection on unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [session?.user?.email]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
