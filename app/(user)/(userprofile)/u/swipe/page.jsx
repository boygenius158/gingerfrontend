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
import useAdminRedirect from "@/app/utils/useAdminRedirect";

export default function Page() {
  useAdminRedirect();

  return (
    <div className="bg-black min-h-screen">
      <main className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto z-30 bg-black min-h-screen">
        {/* MiniProfile Section */}
        <section className="md:col-span-1 hidden md:block bg-black">
          <div className="md:fixed md:w-[280px] w-full p-2">
            <MiniProfile />
          </div>
        </section>

        {/* Main Content Section */}
        <section className="col-span-1 md:col-span-2 mt-4 md:mt-0 border border-gray-600 bg-black h-screen w-full p-4 md:mr-2 overflow-hidden">
          {/* Main content scrollable */}
          <div className="h-full overflow-y-auto">
            <DatingHome className="bg-black h-full" />
          </div>
        </section>

        {/* RightSideBar Section */}
        <section className="md:col-span-1 hidden md:block bg-black">
          <div className="md:fixed md:w-[380px] w-full p-2 h-full">
            <RightSideBar />
          </div>
        </section>
      </main>
    </div>
  );
}
