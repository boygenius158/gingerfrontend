"use client";

import React, { useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Badge } from "@/components/ui/badge";
import PricingCard from "./PricingCard";
import PaymentForm from "./PaymentForm";
import { useSession, signIn, signOut } from "next-auth/react";
import Subscribed from "./Subscribed";

const MenuItem = ({ onClick, children }) => (
  <MenubarItem onClick={onClick}>
    <span>{children}</span>
  </MenubarItem>
);

export default function Settings() {
  const { data: session, status } = useSession();
  const [page, setPage] = useState("");

  useEffect(() => {
    // Use the session's role field directly
    if (status === "authenticated" && session?.role && !page) {
      setPage(session.role);
    }
  }, [session, status, page]);

  return (
    <div className="bg-black text-white border h-screen my-7 rounded">
      <div className="p-4">
        <Badge>Premium</Badge>
      </div>
      {page === "payment" && <PaymentForm />}
      {page === "user" && (
        <div className="p-4 sm:flex sm:flex-col ">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
            Unlock Premium: A better way to use{" "}
            <span className="bg-purple-700 text-white rounded">Ginger!</span>
          </h1>
          <div className="flex justify-center items-center">
            <PricingCard className="" setPage={setPage} />
          </div>
        </div>
      )}
      {page === "premium" && <Subscribed />}
      {page === "admin" && <div>{/* Admin content */}</div>}
    </div>
  );
}
