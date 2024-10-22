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
import instance from "@/axiosInstance";
import { useSession, signIn, signOut } from "next-auth/react";
import Subscribed from "./Subscribed";

const MenuItem = ({ onClick, children }) => (
  <MenubarItem onClick={onClick}>
    <span>{children}</span>
  </MenubarItem>
);

export default function Settings() {
  const { data: session, status, update } = useSession();
  const [page, setPage] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      console.log("d");

      if (session) {
        const response = await instance.post("/api/user/premiumStatus", {
          userId: session?.id,
        });
        console.log(response);

        if (response.data.role && response.data.role !== session.user.role) {
          console.log("j");
          await update({ role: response.data.role });
        }

        setPage(response.data.role);
      }
    };

    if (status === "authenticated" && !page) {
      // Prevent fetch if page is already set
      fetchStatus();
    }
  }, [session, status, page,update]);

  console.log(session);

  return (
    <div className="bg-black text-white border h-screen my-7 rounded">
      <div className="p-4">
        <Badge>Premium</Badge>
      </div>
      {page === "payment" && <PaymentForm />}
      {page === "user" && (
        <div className="p-4 flex">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Unlock Premium: 33A better way to use{" "}
            <span className="bg-purple-700 text-white rounded">Ginger!</span>
          </h1>
          <PricingCard setPage={setPage} />
        </div>
      )}
      {page === "premium" && <Subscribed />}
      {page === "admin" && <div>{/* Admin content */}</div>}
    </div>
  );
}
