"use client";

import { getSession, useSession } from "next-auth/react";
import React from "react";

export default function Page() {
  const { data: session } = useSession();
  console.log(session?.token);

  return <div>random page</div>;
}
