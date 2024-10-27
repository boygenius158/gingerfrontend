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
      if (session.role === "admin") {
        console.log("Redirecting to admin dashboard...");
        router.push("/admin/dashboard");
      } else {
        console.log("Redirecting to user home...");
        router.replace("/u/home");
      }
    }
  }, [session, router]);

  return (
    <>
      <UserInfo />
    </>
  );
}
