"use client";

import useAdminRedirect from "@/app/utils/useAdminRedirect";
import useUserRedirect from "@/app/utils/useUserRedirect";
import MiniProfile from "@/components/MiniProfile";
import Posts from "@/components/Posts";
import RightSideBar from "@/components/RightSideBar";
import React from "react";

export default function Page() {
  useAdminRedirect();
  useUserRedirect();


  return (
    <div className="bg-black h-screen overflow-hidden">
     
      <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto z-30 h-screen">
        {/* Only show MiniProfile on medium screens and up */}
        <section className="hidden md:inline bg-black h-full">
          <div className="fixed w-[280px] h-full bg-black overflow-y-auto hide-scrollbar">
            <MiniProfile />
          </div>
        </section>
        
        {/* Always show Posts */}
        <section className="md:col-span-2 bg-black h-full overflow-y-auto hide-scrollbar">
          <Posts />
        </section>
        
        {/* Only show RightSideBar on large screens and up */}
        <section className="hidden lg:inline bg-black h-full">
          <div className="fixed w-[380px] h-full bg-black overflow-y-auto hide-scrollbar">
            <RightSideBar />
          </div>
        </section>
      </main>
    </div>
  );
}
