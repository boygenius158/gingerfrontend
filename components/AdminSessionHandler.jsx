"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AdminSessionHandler({ children }) {
  const { data: session, status } = useSession();
  console.log(session, "session");

  if (status === "loading") {
    return (
      <div>
        {" "}
        <AiOutlineLoading3Quarters className="text-2xl text-white animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
        <p className="text-lg">You need to be authenticated to access this page.</p>
      </div>
    );
  }

  if (session?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-800 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg">You do not have permission to access this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
