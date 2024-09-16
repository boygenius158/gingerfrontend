import React, { useEffect } from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import instance from "@/axiosInstance";
import useUserStore from "@/app/store/user/userStore";
import Sidebar from "./sidebar";
export default function Feed() {
  
  return (
    <div >
    
      <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto z-30">
        <section className="md:col-span-2">
          <Posts />
        </section>

        <section className="hidden md:inline-grid  md:col-span-1">
          <div className="fixed w-[380px]">
            {/* <Sidebar/> */}
            <MiniProfile />
          </div>
        </section>
      </main>
    </div>
  );
}
