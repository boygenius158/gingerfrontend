"use client";

import MiniProfile from "@/components/MiniProfile";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "@/components/dating/Profile";
import Matches from "@/components/dating/Matches";
import Swipe from "@/components/dating/Swipe";
import { useSocket } from "@/app/lib/SocketContext";
import DatingHome from "@/components/DatingMain/DatingHome";
import RightSideBar from "@/components/RightSideBar";

export default function Page() {
  return (
    <div className="bg-black h-screen">
      <main className="grid md:grid-cols-4 mx-auto z-30 bg-black h-screen ">
        <section className="hidden md:inline-grid md:col-span-1 bg-black h-screen">
          <div className="fixed w-[280px]">
            <MiniProfile />
          </div>
        </section>
        <section className="md:col-span-2 mt-4 border border-gray-600 bg-black h-screen w-full mr-2">
          {/* <Posts /> */}
          <DatingHome className="bg-black h-screen mr-4" />

          {/* <Premium/> */}

        </section>
        <section className="hidden md:inline-grid md:col-span-1 bg-black h-screen ml-4">
          <div className="fixed w-[380px] bg-black h-screen">
            <RightSideBar />
          </div>
        </section>
      </main>
    </div>
  );
}
