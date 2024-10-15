"use client"

import React, { useEffect } from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

export default function Feed() {
  return (
    <div className="bg-black">
      <main className="grid md:grid-cols-4 mx-auto z-30 min-h-screen">
        <section className="hidden md:inline-grid md:col-span-1">
          <div className="fixed w-[280px]">
            <MiniProfile />
          </div>
        </section>
        <section className="md:col-span-2">
          <Posts />
        </section>
        <section className="hidden md:inline-grid md:col-span-1">
          <div className="fixed w-[380px]">
            <RightSideBar />
          </div>
        </section>
      </main>
    </div>
  );
}
