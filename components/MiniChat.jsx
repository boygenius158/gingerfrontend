import { useSocket } from "@/app/lib/SocketContext";
import useComponentsStore from "@/app/store/user/componentsStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiCamera } from "react-icons/hi";
import Modal from "react-modal";

export default function MiniChat({ userSelected, list }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [caller, setCaller] = useState();
  const socket = useSocket();
  console.log(list);
  const startVideoCall = useComponentsStore((state) => state.startVideoCall);
  let stateofvediocall = useComponentsStore((state) => state.isVedioCallActive);
  console.log(stateofvediocall);
  function handleVedioCall(params) {
    startVideoCall();
    userSelected(params);
    console.log("call clicked", params);
    socket.emit("call", params.email, session.user.email);
  }
  console.log(session);

  // socket.on("user_calling", (msg) => {
  //   console.log(msg, "pooo");
  //   setCaller(msg)
  // });
  // socket.on("caller_notification", (msg) => {
  //   console.log(msg);
  // });
  return (
    <div className=" bg-gray-100 p-4 mt-8 rounded-lg shadow-md">
      <div className="text-center  font-semibold mb-4">
        {" "}
        <h1 className="p-4  text-2xl  font-extrabold  tracking-tight  flex justify-center items-center ">
          Chat
        </h1>
      </div>
      <div className="space-y-4">
        {list.map((user) => (
          <div key={user.id}>
            <div className="flex bg-white">
              <div
                className="flex flex-grow items-center space-x-4 p-2 rounded-lg shadow-sm cursor-pointer"
                onClick={() => userSelected(user)}
              >
                <Image
                  src={user.profilePicture}
                  alt={user.username}
                  height={40}
                  width={40}
                  className="rounded-full object-cover h-[40px] w-[40px]"
                />
                <p className="text-md font-medium">{user.username}</p>
              </div>
              <div
                className=" flex items-center justify-end mr-8 cursor-pointer"
                onClick={() => handleVedioCall(user)}
              >
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
                    d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
