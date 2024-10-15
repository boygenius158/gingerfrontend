"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Username from "./settings/username/Username";
import Password from "./settings/password/Password";

export default function Settings() {
  return (
    <div className="flex items-center justify-center mt-8  p-4 mr-4">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-black ">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          {/* <TabsTrigger value="password">Password</TabsTrigger> */}
        </TabsList>
        <TabsContent value="account">
          <Username/>
        </TabsContent>
        <TabsContent value="password">
          <Password/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
