"use client";

import UserInfo from "@/components/UserInfo";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSocket } from "./lib/SocketContext";

export default function Home() {
  const socket = useSocket()
  const { data: session, status } = useSession();
  // console.log(session);
  const router = useRouter();
  // console.log(session);
  useEffect(() => {
    if (session) {
      router.replace("/home");
    }
  }, [session, router]);

  
  // if (status === "authenticated") {
  //   if (session && session.role === "user") redirect("/home");
  //   if (session && session.role === "admin") redirect("/admin/home");
  // }
  return (
    <>
      {/* <div className=""> */}
      <UserInfo />
      {/* </div> */}
    </>
  );
}
