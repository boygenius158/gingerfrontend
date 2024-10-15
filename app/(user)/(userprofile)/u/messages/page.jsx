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

  // Memoize fetchList to avoid unnecessary re-renders
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
  }, [session, fetchList]);

  // Handle user selection
  function handleUser(user) {
    setUser(user);
  }

  // Close modal function
  function closeModal() {
    setIncomingCall(false);
  }

  const isVedioCallActive = useComponentsStore(
    (state) => state.isVedioCallActive
  );
console.log(user);

  return (
    <main className="bg-black text-white grid  md:grid-cols-4  mx-auto z-30">
      <ReactModal
        isOpen={incomingCall}
        onRequestClose={closeModal}
        contentLabel="Incoming Call Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            padding: "20px",
            borderRadius: "10px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <div>Incoming call modal content</div>
      </ReactModal>

      <MobileViewMiniChat userSelected={handleUser} list={list} />
      <section className="hidden md:inline-grid  md:col-span-1">
          <div className="fixed w-[280px]  ">
            {/* <LeftSideBar/> */}
            <MiniProfile />
          </div>
        </section>
      <section className="md:col-span-2">
        {isVedioCallActive ? (
          <VideoCallUser
            user={user}
            setIncomingCallFunction={setIncomingCall}
          />
        ) : (
          <Chat recipient={user} />
        )}
      </section>

      <section className="hidden md:inline-grid md:col-span-1">
        <div className="fixed w-[350px] ml-5">
          {/* <Sidebar /> */}
          <MiniChat userSelected={handleUser} list={list} />
        </div>
      </section>
    </main>
  );
}
