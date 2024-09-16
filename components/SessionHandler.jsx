"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation"; // Import useRouter
import { useEffect } from "react";
import Loading from "./Loading";

export default function SessionHandler({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter(); // Initialize useRouter



  return (
    <>
      {/* Render based on session status if necessary */}
      {children}
    </>
  );
}
