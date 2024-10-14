"use client";

import MiniProfile from "@/components/MiniProfile";
import Posts from "@/components/Posts";
import RightSideBar from "@/components/RightSideBar";
import React from "react";

export default function Page() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none; /* For Firefox */
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* For Chrome, Safari, and Opera */
        }

        /* Optional: for other browsers */
        .hide-scrollbar {
          -ms-overflow-style: none; /* For Internet Explorer and Edge */
        }
      `}</style>

      <main className="grid md:grid-cols-4 mx-auto z-30 h-screen">
        <section className="hidden md:inline-grid md:col-span-1 bg-black h-full">
          <div className="fixed w-[280px] h-full bg-black overflow-y-auto hide-scrollbar">
            <MiniProfile />
          </div>
        </section>
        <section className="md:col-span-2 bg-black h-full overflow-y-auto hide-scrollbar">
          <Posts />
        </section>
        <section className="hidden md:inline-grid md:col-span-1 bg-black h-full">
          <div className="fixed w-[380px] h-full bg-black overflow-y-auto hide-scrollbar">
            <RightSideBar />
          </div>
        </section>
      </main>
    </div>
  );
}
