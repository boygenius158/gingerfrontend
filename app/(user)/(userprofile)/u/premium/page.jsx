"use client";

import MiniProfile from "@/components/MiniProfile";
import Posts from "@/components/Posts";
import Premium from "@/components/Premium";
import RightSideBar from "@/components/RightSideBar";
import React from "react";

export default function page() {
  return (
    <div className="bg-black">
      <main className="grid md:grid-cols-4 mx-auto z-30 min-h-screen">
        <section className="hidden md:inline-grid md:col-span-1">
          <div className="fixed w-[280px]">
            <MiniProfile />
          </div>
        </section>
        <section className="md:col-span-2 md:mr-8  ">
          <Premium />
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
