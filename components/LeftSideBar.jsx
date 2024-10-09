import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function LeftSideBar() {
  return (
    <div className="text-white bg-black border-t  border-r border-gray-700 h-screen rounded">
      {/* LeftSideBar */}
      <Link href="/settings" className="flex gap-3 items-center p-5 ">
        <Image
          src={
            "https://i.pinimg.com/564x/59/41/60/594160fcca755bea8926352bab853a1a.jpg"
          }
          height={50}
          width={50}
          className="rounded-full"
          alt=""
        />
        <div className="flex flex-col">
          <p className="">Albin S</p>
          <p>@albnaifso</p>
        </div>
      </Link>
      {/* <div className="flex flex-col"> */}
      <hr className="border-t  border-2 border-gray-200 w-full "></hr>
      {/* </div> */}
      <ul className="">
        <div className="flex flex-col gap-6 p-10 ">
          <Link
            className="flex transition-transform duration-300 hover:-translate-y-1 hover:justify-center hover:bg-purple-600 hover:text-white rounded hover:items-center  p-2"
            href="/settings"
          >
            <div className="">Feed</div>
          </Link>
          <Link
            className="flex transition-transform duration-300 hover:-translate-y-1 hover:justify-center hover:bg-purple-600 hover:text-white rounded hover:items-center  p-2"
            href="/settings"
          >
            <div className="">Swipe</div>
          </Link>
          <Link
            className="flex transition-transform duration-300 hover:-translate-y-1 hover:justify-center hover:bg-purple-600 hover:text-white rounded hover:items-center  p-2"
            href="/settings"
          >
            <div className="">Settings</div>
          </Link>
          <Link
            className="flex transition-transform duration-300 hover:-translate-y-1 hover:justify-center hover:bg-purple-600 hover:text-white rounded hover:items-center  p-2"
            href="/settings"
          >
            <div className="">Notifications</div>
          </Link>
          <Link
            className="flex transition-transform duration-300 hover:-translate-y-1 hover:justify-center hover:bg-purple-600 hover:text-white rounded hover:items-center  p-2"
            href="/settings"
          >
            <div className="">Messages</div>
          </Link>
        </div>
      </ul>
    </div>
  );
}
