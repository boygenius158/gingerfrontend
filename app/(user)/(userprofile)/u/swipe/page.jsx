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
    <div className="bg-black min-h-screen">
      <main className="grid grid-cols-1 md:grid-cols-4 mx-auto z-30 bg-black min-h-screen">
        {/* MiniProfile Section */}
        <section className="md:inline-grid md:col-span-1 hidden md:block bg-black">
          <div className="fixed w-[280px]">
            <MiniProfile />
          </div>
        </section>

        {/* Main Content Section */}
        <section className="col-span-1 md:col-span-2 mt-4 border border-gray-600 bg-black h-screen w-full md:mr-2">
          <DatingHome className="bg-black h-screen mr-4" />
        </section>

        {/* RightSideBar Section */}
        <section className="md:inline-grid md:col-span-1 hidden md:block bg-black ml-4">
          <div className="fixed w-[380px] bg-black h-screen">
            <RightSideBar />
          </div>
        </section>
      </main>
    </div>
  );
}
