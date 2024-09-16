"use client";

import MiniProfile from "@/components/MiniProfile";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "@/components/dating/Profile";
import Matches from "@/components/dating/Matches";
import Swipe from "@/components/dating/Swipe";
import { useSocket } from "@/app/lib/SocketContext";

export default function Page() {
 

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto ">
      <section className="md:col-span-2  border h-screen mt-6 overflow-hidden ">
        <div className="flex flex-col">
          <div>
            <div className="mt-2">
              <Tabs defaultValue="Swipe">
                <div className="flex ml-2 font-extrabold">
                  <div className="flex ">
                    <TabsList>
                      <TabsTrigger value="Swipe">Swipe</TabsTrigger>
                      <TabsTrigger value="Matches">Matches</TabsTrigger>
                      <TabsTrigger value="Profile">Profile</TabsTrigger>
                    </TabsList>
                  </div>
                </div>

                <TabsContent value="Swipe">
                  <Swipe />
                </TabsContent>
                <TabsContent value="Matches">
                  <Matches />
                </TabsContent>
                <TabsContent value="Profile">
                  <Profile />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden md:inline-grid  md:col-span-1">
        <div className="fixed w-[380px]">
          <MiniProfile />
        </div>
      </section>
    </main>
  );
}
