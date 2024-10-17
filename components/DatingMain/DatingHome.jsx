import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "@/components/dating/Profile";
import Matches from "@/components/dating/Matches";
import Swipe from "@/components/dating/Swipe";
import { useSocket } from "@/app/lib/SocketContext";

export default function DatingHome() {
  return (
    <div className="rounded bg-black h-screen border-gray-700 w-full mr-4 ">
       
      <Tabs defaultValue="Swipe">
        <div className="flex ml-2 font-extrabold mt-2">
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
  );
}
