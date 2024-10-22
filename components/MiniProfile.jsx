"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation"; // Import usePathname

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiPaperAirplane } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";
import { useEdgeStore } from "@/app/lib/edgestore";
import instance from "@/axiosInstance";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/app/lib/SocketContext";
import SearchUser from "./SearchUser";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Home,
  Settings,
  Star,
  Bell,
  MessageCircle,
  Search,
  ArrowLeft,
} from "lucide-react"; // Import Lucide icons

export default function MiniProfile() {
  const socket = useSocket();

  const { data: session } = useSession();
  const [isOpen2, setIsOpen2] = useState(false);
  const [file, setFile] = useState();
  const [storyFileUrl, setStoryFileUrl] = useState();
  const storyPickerRef = useRef(null);
  const { edgestore } = useEdgeStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [spin, setSpin] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const pathname = usePathname(); // Get the current path
  const [activePage, setActivePage] = useState(pathname);
  console.log(pathname);

  const handleClose = () => {
    setSearchOpen(false);
  };

  function addStory(e) {
    const file = e.target.files[0];
    setFile(file);
    setStoryFileUrl(URL.createObjectURL(file));
  }
  console.log(session);
  // useEffect(() => {
  //   let isMounted = true; // Flag to track if component is mounted

  //   const fetchProfileDetailsForMiniProfile = async () => {
  //     if (session) {
  //       try {
  //         const response = await instance.post("/api/user/miniProfile", {
  //           id: session.id,
  //         });
  //         console.log(response);

  //         // Only update state if the component is still mounted
  //         if (isMounted) {
  //           setRole(response.data.user.roles);
  //           setUser(response.data.user);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching profile details:", error);
  //       }
  //     }
  //   };

  //   fetchProfileDetailsForMiniProfile();

  //   return () => {
  //     isMounted = false; // Cleanup function to set the flag to false on unmount
  //   };
  // }, [session]);

  useEffect(() => {
    if (socket) {
      socket.on("force-logout2", () => {
        console.log("force logout 2");
        signOut({ callbackUrl: "/" });
      });
    }
  }, [socket]);
  useEffect(() => {
    const handleNotification = (data) => {
      console.log(data);

      toast.info(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    if (socket) {
      socket.on("notification", handleNotification);

      // Cleanup the listener on component unmount or before re-running effect
      return () => {
        socket.off("notification", handleNotification);
      };
    }
  }, [socket]);

  return (
    <div className="text-white z-10 bg-black h-screen">
      <div className="scroll-m-20 tracking-tight h-screen w-180 bg-gray-25 rounded border-2 border-gray-700 mt-4">
        <nav className="mt-10 ">
          <Link href="/u/home">
            <div
              // onClick={() => setActivePage("Home")}
              className={`flex items-center justify-start ml-4 transition-transform duration-300 p-2 cursor-pointer rounded gap-2
    ${
      activePage === "/home"
        ? "bg-purple-600 text-white translate-y-[-4px] justify-center"
        : ""
    }
    hover:-translate-y-1 hover:justify-center hover:bg-purple-600 hover:text-white`}
            >
              <Home className="size-6" />
              Feed
            </div>
          </Link>
          <Link href="/u/settings">
            <div
              onClick={() => setActivePage("Settings")}
              className={`flex items-center justify-start ml-4 transition-transform duration-300 p-2 cursor-pointer rounded gap-2
    ${
      activePage === "/u/settings"
        ? "bg-purple-600 text-white translate-y-[-4px] justify-center"
        : ""
    }
    hover:-translate-y-1 hover:justify-center hover:bg-purple-600 hover:text-white`}
            >
              <Settings className="size-6" />
              Settings
            </div>
          </Link>
          <Link href={role === "user" ? "#" : "/u/swipe"}>
            <div
              onClick={() => setActivePage("Swipe")}
              className={`flex items-center justify-start ml-4 transition-transform duration-300 p-2 cursor-pointer rounded gap-2
      ${
        activePage === "/u/swipe"
          ? "bg-purple-600 text-white translate-y-[-4px] justify-center"
          : ""
      }
      hover:-translate-y-1 hover:justify-center hover:bg-purple-600 hover:text-white`}
            >
              <Star className="size-6" />
              {role === "user" ? (
                <HoverCard>
                  <HoverCardTrigger>
                    <p className="">Swipe!</p>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Unlock this feature by taking premium.
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <p className="">Swipe!</p>
              )}
            </div>
          </Link>

          <Link href="/u/premium">
            <div
              onClick={() => setActivePage("Premium")}
              className={`flex items-center justify-start ml-4 transition-transform duration-300 p-2 cursor-pointer rounded gap-2
    ${
      activePage === "/u/premium"
        ? "bg-purple-600 text-white translate-y-[-4px] justify-center"
        : ""
    }
    hover:-translate-y-1 hover:justify-center hover:bg-purple-600 hover:text-white`}
            >
              <Star className="size-6" />
              Premium
            </div>
          </Link>
          <Link href="/u/notifications">
            <div
              onClick={() => setActivePage("Notifications")}
              className={`flex items-center justify-start ml-4 transition-transform duration-300 p-2 cursor-pointer rounded gap-2
    ${
      activePage === "/u/notifications"
        ? "bg-purple-600 text-white translate-y-[-4px] justify-center"
        : ""
    }
    hover:-translate-y-1 hover:justify-center hover:bg-purple-600 hover:text-white`}
            >
              <Bell className="size-6" />
              Notifications
            </div>
          </Link>
          <Link href="/u/messages">
            <div
              onClick={() => setActivePage("Messages")}
              className={`flex items-center justify-start ml-4 transition-transform duration-300 p-2 cursor-pointer rounded gap-2
    ${
      activePage === "/u/messages"
        ? "bg-purple-600 text-white translate-y-[-4px] justify-center"
        : ""
    }
    hover:-translate-y-1 hover:justify-center hover:bg-purple-600 hover:text-white`}
            >
              <MessageCircle className="size-6" />
              Messages
            </div>
          </Link>
          <div
            onClick={() => setSearchOpen(true)}
            className={`flex items-center justify-start ml-4 transition-transform duration-300 p-2 cursor-pointer rounded gap-2
    ${
      activePage === "/u/search"
        ? "bg-purple-600 text-white translate-y-[-4px] justify-center"
        : ""
    }
    hover:-translate-y-1 hover:justify-center hover:bg-purple-600 hover:text-white`}
          >
            <Search className="size-6" />
            <span>Search</span>
          </div>
          <div
            onClick={() => window.history.back()} // Use window.history.back() to go back
            className={`flex items-center justify-start ml-4 transition-transform duration-300 p-2 cursor-pointer rounded gap-2
            hover:-translate-y-1 hover:justify-center hover:bg-purple-600 hover:text-white`}
          >
            <ArrowLeft className="size-6" />
            <span>Go Back</span>
          </div>
        </nav>
      </div>

      {searchOpen && (
        <Modal
          onClose={handleClose}
          isOpen={searchOpen}
          className="fixed inset-0 flex top-32 justify-center "
        >
          <div>
            <SearchUser
              // className="bg-red-500"
              handleClose={handleClose}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
