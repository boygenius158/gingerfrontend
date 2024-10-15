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
import Link from "next/link";

// Mock data for likes


export default function LikedList({ status, onStatusChange, likes }) {
  function toggleModal() {
    let newStats = !status;
    onStatusChange(newStats);
  }
  const [likedby, setLikedby] = useState([likes]);
  console.log(likedby);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <Dialog
        open={status}
        onOpenChange={toggleModal} // Automatically toggles on open/close change
      >
        <DialogContent className="sm:max-w-md bg-black text-white border-purple-700">
          <DialogHeader>
            <DialogTitle className="text-gray-300  " onClick={toggleModal}>
              Likes
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="mt-4 max-h-[60vh]">
            <div className="space-y-4">
              {likedby.map((user, index) => (
                <Link key={index} href={`/u/${user?.username}`}>
                  <div className="flex items-center space-x-4 hover:bg-gray-400 cursor-pointer p-2 rounded">
                    <Avatar>
                      <AvatarImage
                        src={user?.profilePicture}
                        alt={user?.username}
                      />
                      <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      {/* Uncomment this if you want to display the user?'s name */}
                      {/* <p className="text-sm font-medium leading-none">{user?.name}</p> */}
                      <p className="text-sm text-gray-500">@{user?.username}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
