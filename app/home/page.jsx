"use client";

import Feed from "@/components/Feed";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useUserStore from "../store/user/userStore";

export default function Page() {
  // const { data: session } = useSession();
  // const router = useRouter();
  // console.log(session);
  // useEffect(() => {
  //   if (!session) {
  //     router.replace("/");
  //   }
  // }, [session, router]);
  
  return (
    <div>
      {/* <p>{session?.username}afds</p> */}
      <Feed />
    </div>
  );
}
