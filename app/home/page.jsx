"use client";

import Feed from "@/components/Feed";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useUserStore from "../store/user/userStore";

export default function Page() {

  return (
    <div className="bg-black w-full">
      {/* <p>{session?.username}afds</p> */}
      <Feed />
    </div>
  );
}
