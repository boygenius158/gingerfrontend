"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
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
  const [notifications, setNotifications] = useState(0);

  // console.log(session);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClose = () => {
    setSearchOpen(false);
  };
  async function handleSignOut() {
    if (socket) {
      socket.emit("disconnectUser");
    }
    await signOut({ redirect: false });
  }
  function addStory(e) {
    const file = e.target.files[0];
    setFile(file);
    setStoryFileUrl(URL.createObjectURL(file));
  }
  console.log(session);
  useEffect(() => {
    let isMounted = true;

    const fetchProfileDetailsForMiniProfile = async () => {
      if (session) {
        try {
          const response = await instance.post("/api/user/miniProfile", {
            id: session.id,
          });
          console.log(response.data.user.roles);
          setRole(response.data.user.roles);
          if (isMounted) {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error("Error fetching profile details:", error);
        }
      }
    };

    fetchProfileDetailsForMiniProfile();

    return () => {
      isMounted = false;
    };
  }, [session]);
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
    <div className="">
      <div className="scroll-m-20 text-2xl font-semibold tracking-tight h-screen w-180 bg-gray-25  text-gray-700 ml-20 mt-8 rounded border-2 ">
        <div className="flex items-center justify-between p-6">
          <div className="flex flex-col">
            <Image
              src={user?.profilePicture}
              alt="empty"
              className="rounded-full border p-[2px] w-16 h-16 object-cover"
              width={60}
              height={60}
            />
            <div onClick={() => setIsOpen2(true)} className="text-sm cursor-pointer ">
              upload story
            </div>
          </div>

          {/* <IoIosAddCircle
            className="text-2xl cursor-pointer transform hover:scale-150 transition duration-300 hover:text-blue-600"
            onClick={() => setIsOpen2(true)}
          /> */}
          <div className="">
            <p className=" first-letter:uppercase">{user?.name}</p>
            <Link href={`/u/${user?.username}`}>
              <h3 className="text-sm text-gray-400 hover:text-blue-500">
                Visit Profile
              </h3>
            </Link>
          </div>
          {session ? (
            <button onClick={handleSignOut} className="text-blue-500 text-sm">
              signout
            </button>
          ) : (
            <button onClick={signIn} className="text-blue-500 text-sm">
              signin
            </button>
          )}
        </div>
        <hr class="border-t border-gray-300" />

        <nav className="mt-10 ">
          <div className="flex items-center justify-start ml-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <Link
              href="/home"
              className="font-semibold block py-2.5 px-4 rounded transition duration-200  hover:text-blue-500"
            >
              Feed
            </Link>
          </div>
          <div className="flex items-center justify-start ml-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <Link
              href="/u/settings"
              className="font-semibold block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500"
            >
              Settings
            </Link>
          </div>
          <div className="flex items-center justify-start ml-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            {role === "user" ? (
              <HoverCard>
                <HoverCardTrigger>
                  <p className="font-semibold text-gray-500 block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500">
                    Swipe!
                  </p>
                </HoverCardTrigger>
                <HoverCardContent>
                  Unlock this feature by taking premium.
                </HoverCardContent>
              </HoverCard>
            ) : role === "premium" || role === "admin" ? (
              <Link
                href="/u/swipe"
                className="font-semibold block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500"
              >
                Swipe!
              </Link>
            ) : null}
          </div>
          <div className="flex items-center justify-start ml-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <Link
              href="/u/premium"
              className="font-semibold block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500"
            >
              Premium
            </Link>
          </div>
          <div className="flex items-center justify-start ml-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
              />
            </svg>

            <Link
              href="/u/notifications"
              className="font-semibold block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500"
            >
              Notifications
            </Link>
          </div>
          <div className="flex items-center justify-start ml-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>

            <Link
              href="/u/messages"
              className="font-semibold block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500"
            >
              Messages
            </Link>
          </div>
          <div className="flex items-center justify-start ml-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <span
              onClick={() => setSearchOpen(true)}
              className="font-semibold block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500 cursor-pointer"
            >
              Search
            </span>
          </div>
        </nav>
      </div>
      {isOpen2 && (
        <Modal
          isOpen={isOpen2}
          onRequestClose={() => setIsOpen2(false)}
          className="fixed inset-0 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z"
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col items-center">
            <h4 className=" text-2xl font-extrabold  tracking-tight lg:teFxt-2xl   ">
              Upload Story
            </h4>

            {file ? (
              <Image src={storyFileUrl} alt="story" height={120} width={120} />
            ) : (
              <HiPaperAirplane
                className="text-5xl text-gray-400 cursor-pointer"
                onClick={() => storyPickerRef.current.click()}
              />
            )}
            <input
              hidden
              ref={storyPickerRef}
              type="file"
              name="file"
              accept="image/*"
              onChange={addStory}
            />
            <button
              onClick={async () => {
                if (file) {
                  const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                      // you can use this to show a progress bar
                      console.log(progress);
                    },
                  });
                  // you can run some server action or api here
                  // to add the necessary data to your database
                  console.log(res);
                  const response = await instance.post(
                    "/api/user/uploadStory",
                    {
                      url: res.url,
                      userId: session?.id,
                    }
                  );
                  if (response) {
                    setFile(null);
                    setStoryFileUrl(null);
                    setIsOpen2(false);
                  }
                }
              }}
              className="w-full bg-red-600
             text-white p-2 shadow-md
             rounded-lg hover:brightness-105
              disabled:bg-gray-200 disabled:cursor-not-allowed 
              disabled:hover:brightness-100"
            >
              upload Story
            </button>
            <AiOutlineClose
              className="cursor-pointer absolute top-4 right-4 hover:text-red-600 transition duration-300"
              onClick={() => setIsOpen2(false)}
            />
          </div>
        </Modal>
      )}

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
