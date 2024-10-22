"use client";

import useComponentsStore from "@/app/store/user/componentsStore";
import instance from "@/axiosInstance";
import Chat from "@/components/Chat";
import MiniChat from "@/components/MiniChat";
import MiniProfile from "@/components/MiniProfile";
import MobileViewMiniChat from "@/components/ui/MobileViewMiniChat";
import VideoCallUser from "@/components/VideoCallUser";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import ReactModal from "react-modal";

export default function Page() {
  const { data: session } = useSession();
  const [list, setList] = useState([]);
  const [user, setUser] = useState("");
  const [callFrom, setCallFrom] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);

  
  const fetchList = useCallback(async () => {
    if (!session?.id) {
      console.log("Session ID is not available");
      return;
    }

    try {
      const response = await instance.post("/api/user/fetchChatList", {
        userId: session.id,
      });

      if (response) {
        console.log("response received", response.data.uniqueUsers);
        setList(response.data.uniqueUsers);
      }
    } catch (error) {
      console.error("Error fetching chat list:", error);
    }
  }, [session?.id]);

  // Fetch list when session or fetchList changes
  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // Handle user selection
  function handleUser(user) {
    setUser(user);
  }

  // Close modal function
  function closeModal() {
    setIncomingCall(false);
  }

  // const isVideoCallActive = useComponentsStore(
  //   (state) => state.isVideoCallActive
  // );
  console.log(user);

  return (
    <main className="bg-black text-white grid grid-cols-1 md:grid-cols-4 mx-auto z-30">
      <MobileViewMiniChat userSelected={handleUser} list={list} />

      <section className="hidden md:inline-grid md:col-span-1">
        <div className="fixed w-full max-w-[280px]">
          <MiniProfile />
        </div>
      </section>

      <section className="md:col-span-2">
        <Chat recipient={user} />
      </section>

      <section className="hidden md:inline-grid md:col-span-1">
        <div className="fixed w-full max-w-[350px] ml-5">
          <MiniChat userSelected={handleUser} list={list} />
        </div>
      </section>
    </main>
  );
}
