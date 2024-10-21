"use client";

import { useSocket } from "@/app/lib/SocketContext";
import useComponentsStore from "@/app/store/user/componentsStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Plus, Send } from "lucide-react";
import SearchUser from "./SearchUser";
import SearchUserModal from "./modals/SearchUserModal";

export default function MiniChat({ userSelected, list }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [caller, setCaller] = useState();
  const socket = useSocket();
  console.log(list);
  // const startVideoCall = useComponentsStore((state) => state.startVideoCall);
  let stateofvediocall = useComponentsStore((state) => state.isVedioCallActive);
  console.log(stateofvediocall);
  // function handleVedioCall(params) {
  //   startVideoCall();
  //   userSelected(params);
  //   console.log("call clicked", params);
  //   socket.emit("call", params.email, session.user.email);
  // }

  function changeStatus() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  console.log(userSelected);
  

  return (
    <>
      <SearchUserModal
        isOpen={isOpen}
        changeStatus={changeStatus}
        list={list}
        userSelected={userSelected}
      />
      <div className=" bg-black border text-black  border-gray-700 p-4 mt-8 rounded-lg shadow-md">
        <div className="text-center  font-semibold mb-4 flex items-center justify-center">
          {" "}
          <h1 className="p-4 text-white  text-2xl  font-extrabold  tracking-tight  flex justify-center items-center ">
            Chat
          </h1>
          <Plus
            onClick={() => setIsOpen(true)}
            className="h-8 w-8 text-white rounded-full bg-purple-600 hover:scale-125 transition-transform duration-300 cursor-pointer "
          />
        </div>
        <div className="space-y-4">
          {list.map((user) => (
            <div key={user.id}>
              <div className="flex bg-gray-300 transition-transform duration-300 rounded hover:translate-y-1 hover:bg-purple-600 hover:text-white  ">
                <div
                  className="flex flex-grow items-center space-x-4 p-2 rounded-lg shadow-sm cursor-pointer hover:justify-center"
                  onClick={() => userSelected(user)}
                >
                  <Image
                    src={user.profilePicture}
                    alt={user.username}
                    height={40}
                    width={40}
                    className="rounded-full object-cover h-[40px] w-[40px]"
                  />
                  <p className="text-md font-medium first-letter:uppercase">
                    {user.username}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
