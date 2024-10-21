"use client";

import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import RightSideBar from "./RightSideBar";

export default function Feed() {
  return (
    <div className="bg-black w-full min-h-screen">
      <main className="grid grid-cols-1 md:grid-cols-4 mx-auto z-30 w-full">
        {/* Left Sidebar (MiniProfile) */}
        <section className="hidden md:inline-grid md:col-span-1 w-full">
          <div className="relative w-full md:w-[280px]">
            <MiniProfile />
          </div>
        </section>

        {/* Main Content (Posts) */}
        <section className="col-span-1 md:col-span-2 bg-black w-full">
          <div className="w-full md:mr-2">
            <Posts />
          </div>
        </section>

        {/* Right Sidebar */}
        <section className="hidden md:inline-grid md:col-span-1 w-full">
          <div className="relative w-full md:w-[380px]">
            <RightSideBar />
          </div>
        </section>
      </main>
    </div>
  );
}
