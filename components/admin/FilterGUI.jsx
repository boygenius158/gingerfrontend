"use client";

import instance from "@/axiosInstance";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useSocket } from "@/app/lib/SocketContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FilterGUI() {
  const socket = useSocket();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (status === "unauthenticated") {
      router.push("/login");  // Adjust the route as per your project
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserDetails();
    }
  }, [status]);

  async function fetchUserDetails() {
    const response = await instance.post("/api/admin/userDetails");
    setUsers(response.data.userDetails);

    // Get list of blocked users
    const blockedResponse = await instance.post("/api/admin/getBlockedUsers");
    setBlockedUsers(blockedResponse?.data?.blockedUserIds);
  }

  async function toggleBlockUser(user) {
    const isBlocked = blockedUsers.includes(user._id);

    if (isBlocked) {
      await instance.post("/api/admin/unblockUser", {
        userId: user._id,
      });
      setBlockedUsers(blockedUsers.filter((id) => id !== user._id));
    } else {
      await instance.post("/api/admin/blockUser", {
        userId: user._id,
      });
      setBlockedUsers([...blockedUsers, user._id]);
      socket.emit("force-logout", user.email);
    }
  }

  if (status === "loading") {
    return <p>Loading...</p>;  // Show a loading message until session loads
  }

  if (status === "unauthenticated") {
    return null;  // Prevent rendering if unauthenticated
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Profile</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Block</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell className="font-medium">
              <Image
                src={user.profilePicture}
                className="rounded-full"
                alt={user.username}
                height={40}
                width={40}
              />
            </TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-right">
              <Switch
                id={`block-switch-${user._id}`}
                checked={blockedUsers.includes(user._id)}
                onCheckedChange={() => toggleBlockUser(user)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
