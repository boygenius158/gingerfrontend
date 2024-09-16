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
import { Button } from "@/components/ui/button";
import { useSocket } from "@/app/lib/SocketContext";
import { Switch } from "@/components/ui/switch";

export default function FilterGUI() {
  const socket = useSocket();

  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  async function fetchUserDetails() {
    const response = await instance.post("/api/admin/userDetails");
    setUsers(response.data.userDetails);

    // Get list of blocked users
    const blockedResponse = await instance.post("/api/admin/getBlockedUsers");
    console.log(blockedResponse);

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

  useEffect(() => {
    fetchUserDetails();
  }, []);

  console.log(blockedUsers);

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
