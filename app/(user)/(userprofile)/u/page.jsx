"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session && session.role === "admin") {
      router.push("/admin");
    }
  }, [session,router]);

  return <div className="bg-black w-screen">this is user</div>;
}
