"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SearchUserModal({ isOpen, changeStatus }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    {
      id: "1",
      name: "Olivia Martin",
      email: "m@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      name: "Emma Wilson",
      email: "emma@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "4",
      name: "Jackson Lee",
      email: "lee@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "5",
      name: "William Kim",
      email: "will@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "1",
      name: "Olivia Martin",
      email: "m@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      name: "Emma Wilson",
      email: "emma@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "4",
      name: "Jackson Lee",
      email: "lee@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "5",
      name: "William Kim",
      email: "will@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  function updateStatus() {
    changeStatus();
  }
  return (
    <>
      <Dialog open={isOpen} onOpenChange={updateStatus}>
        <DialogContent className="sm:max-w-[425px] border border-purple-700 bg-black text-gray-400">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              New message
            </DialogTitle>
          </DialogHeader>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              select a user to start a conversation with.
            </p>
            <Input
              type="text"
              placeholder="Search user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4 bg-gray-400 focus:border-purple-700 border-purple-700"
            />
            <ScrollArea className="h-[220px] mb-4 ">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-4 cursor-pointer mb-2 hover:bg-gray-400 p-2 text-purple-700 hover:text-white rounded "
                  onClick={() => toggleUserSelection(user.id)}
                >
                  <Avatar className="h-8 w-8 border border-purple-700">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  {/* <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  /> */}
                </div>
              ))}
            </ScrollArea>
          </div>
          {/* <div className="flex justify-end">
            <Button
              onClick={() => setIsOpen(false)}
              disabled={selectedUsers.length === 0}
            >
              Continue
            </Button>
          </div> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
