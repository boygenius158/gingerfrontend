"use client";

import useAdminRedirect from "@/app/utils/useAdminRedirect";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);
  
  // useAdminRedirect();


  return <div className="bg-black w-screen">this is user</div>;
}
