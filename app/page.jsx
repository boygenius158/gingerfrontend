"use client";

import UserInfo from "@/components/UserInfo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.replace("/home");
    }
  }, [session, router]);

  return (
    <>
      <UserInfo />
    </>
  );
}
