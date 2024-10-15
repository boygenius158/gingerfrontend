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

export default function SearchUserModal({
  isOpen,
  changeStatus,
  list,
  userSelected,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [user, setUser] = useState("");
  const filteredList = list.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function updateStatus() {
    changeStatus();
  }

  function toggleUserSelection(user) {
    let userId = user._id;
    console.log(user);
    setUser(user);
    userSelected(user);

    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={updateStatus}>
        <DialogContent className="sm:max-w-[425px] border border-purple-700 bg-black text-gray-400">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold ">
              New message
            </DialogTitle>
          </DialogHeader>
          <button
            onClick={() => changeStatus(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Select a user to start a conversation with.
            </p>
            <Input
              type="text"
              placeholder="Search user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4 bg-gray-400 focus:border-purple-700 border-purple-700 text-black"
            />
            <ScrollArea className="h-[220px] mb-4 ">
              {filteredList.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center space-x-4 cursor-pointer mb-2 hover:bg-gray-400 p-2 text-purple-700 hover:text-white rounded"
                  onClick={() => toggleUserSelection(user)}
                >
                  <Avatar className="h-8 w-8 border border-purple-700">
                    <AvatarImage
                      src={user.profilePicture}
                      alt={user.username}
                    />
                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.username}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
