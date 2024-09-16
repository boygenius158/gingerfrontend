"use client";

import { useSocket } from "@/app/lib/SocketContext";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

const NotificationItem = ({ type, message, image, username }) => {
  let icon;
  switch (type) {
    case "comment":
      icon = "💬";
      break;
    case "like":
      icon = "❤️";
      break;
    case "follow":
      icon = "🤵";
      break;
    default:
      icon = "🔔";
  }

  return (
    <div className="border-b">
      <div className="flex items-center p-2 gap-2">
        <Image
          src={image}
          className="rounded-full"
          alt="failed"
          height={40}
          width={40}
        />
        <p className="font-semibold cursor-pointer">@{username}</p>
        <p className="font-light text-gray-700">{message}</p>
        <span className="text-xl mr-2">{icon}</span>
      </div>
      <div className="flex justify-end mb-2">
        <p className="font-extralight text-xs">a few moments ago</p>
      </div>
    </div>
  );
};

export default function Notification() {
  const socket = useSocket();
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState([]);

  const fetchData = useCallback(async () => {
    if (!session?.id) return; // Ensure that session.id is defined before making the request

    try {
      const response = await instance.post("/api/media/fetch-notifications", {
        userId: session.id,
      });
      console.log(response);
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, [session?.id]);

  useEffect(() => {
    if (!socket) {   
      console.log("socket is missing");
      return
    }
    // socket.emit("register", session?.user?.email);

    socket.on("notification_stack", (msg) => {
      console.log(msg);
      setNotifications((prev)=>[...prev,msg])
      
    });
  }, [session,socket]); 

  useEffect(() => { 
    if (session?.id) {
      fetchData();
    } 
  }, [session?.id,fetchData]);
  
  console.log(notifications)
    
  return (   
    <div className="flex flex-col">
      <div className="p-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex justify-center items-center">
          Notifications
        </h1>
      </div>
      <div className="max-h-[500px] overflow-y-scroll">
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            type={notification.type}
            message={notification.message}
            username={notification?.interactorId?.username}
            image={notification?.interactorId?.profilePicture}
          />
        ))}
      </div>
    </div>
  );
}
