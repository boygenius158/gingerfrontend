import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart } from "lucide-react";
import Image from "next/image";

// Mock data for likes
const likes = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Alice Johnson",
    username: "alicej",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Bob Wilson",
    username: "bobwilson",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "Emma Brown",
    username: "emmab",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  // Add more mock users as needed
];

export default function LikedList({ status ,onStatusChange}) {

function toggleModal(){
    let newStats = !status
    onStatusChange(newStats)
}
 

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <Dialog
        open={status}
        onOpenChange={toggleModal} // Automatically toggles on open/close change
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle onClick={toggleModal}>Likes</DialogTitle>
          </DialogHeader>
          <ScrollArea className="mt-4 max-h-[60vh]">
            <div className="space-y-4">
              {likes.map((user) => (
                <div key={user.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
