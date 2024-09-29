"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";
import Subscribed from "./Subscribed";

const MenuItem = ({ onClick, children }) => (
  <MenubarItem onClick={onClick}>
    <span>{children}</span>
  </MenubarItem>
);

export default function Settings() {
  const { data: session, status } = useSession();
  const [page, setPage] = useState(null);
  const [daysLeft, setDaysLeft] = useState("");

  const fetchStatus = useCallback(async () => {
    if (session) {
      const response = await instance.post("/api/user/premiumStatus", {
        userId: session?.id,
      });
      console.log(session);

      console.log(response.data.role);
      setPage(response.data.role);
      if (response.data.role === "premium" ) {
        console.log("worked");
        
        const response = await instance.post("/api/user/expiry-date", {
          userId: session?.id,
        });
        setDaysLeft(response.data.daysLeft);
      }
    }
  }, [session]);
  useEffect(() => {
    if (status === "authenticated") {
      fetchStatus();
    }
  }, [fetchStatus, status]);

  return (
    <div className="bg-white border h-screen my-7">
      <div className="p-4">
        <Badge>Premium</Badge>
      </div>
      {page === "payment" && (
        <div>
          <PaymentForm />
        </div>
      )}

      {page === "user" && (
        <div className="p-4 flex">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Unlock Premium: A better way to use{" "}
            <span className="bg-blue-500 text-white rounded">Ginger!</span>
          </h1>
          <div className="">
            <PricingCard setPage={setPage} />
          </div>
        </div>
      )}

      {page === "premium" && (
        <div>
          {" "}
          <Subscribed daysLeft={daysLeft} />
        </div>
      )}
      {page === "admin" && (
        <div>
          {" "}
          {/* <Subscribed daysLeft={daysLeft} /> */}
        </div>
      )}
    </div>
  );
}
