"use client";

import RegisterForm from "@/components/RegisterComponent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  useEffect(() => {
    if (session) {   
      router.replace("/home"); 
    }
  }, [session, router]);

  return (
    
      <RegisterForm />
    
  );
}
