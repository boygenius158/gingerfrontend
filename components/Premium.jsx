"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Menubar,
  MenubarItem,
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
  
  // Using useRef to track if a request is already in progress
  const requestInProgress = useRef(false);

  const fetchStatus = async () => {
    if (requestInProgress.current) return;  // Avoid making concurrent requests

    try {
      if (session && session.id) {
        requestInProgress.current = true;  // Mark request as in progress

        const response = await instance.post("/api/user/premiumStatus", {
          userId: session.id,
        });

        const role = response.data.role;
        console.log(role);
        setPage(role);

        if (role === "premium") {
          console.log("worked");

          const expiryResponse = await instance.post("/api/user/expiry-date", {
            userId: session.id,
          });
          setDaysLeft(expiryResponse.data.daysLeft);
        }
      }
    } catch (error) {
      console.error("Failed to fetch status:", error);
    } finally {
      requestInProgress.current = false;  // Reset request state
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      fetchStatus();  // Fetch status when session is authenticated
    }
  }, [status, session]);

  return (
    <div className="bg-black text-white border h-screen my-7 rounded">
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
            {/* Unlock Premium: A better way to usse3{" "} */}
            <span className="bg-purple-700 text-white rounded">Ginger!</span>
          </h1>
          <div>
            <PricingCard setPage={setPage} />
          </div>
        </div>
      )}

      {page === "premium" && (
        <div>
          <Subscribed daysLeft={daysLeft} />
        </div>
      )}

      {page === "admin" && (
        <div>
          {/* Add admin-specific functionality here */}
        </div>
      )}
    </div>
  );
}
