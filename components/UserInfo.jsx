"use client";

import { useSession } from "next-auth/react";
import SignInForm from "./SignInForm";
import Image from "next/image";
import { redirect } from "next/navigation";
import useUserStore from "@/app/store/user/userStore";
import Loading from "./Loading";
import LandingPage from "./LandingPage";

export default function UserInfo() {
  const { status, data: session } = useSession();
  // console.log(session.role);
  // if (status === "authenticated") {
  //   if (session && session.role === "user") redirect("/home");
  //   if (session && session.role === "admin") redirect("/admin/home");
  // }

  return <LandingPage></LandingPage>;
}
