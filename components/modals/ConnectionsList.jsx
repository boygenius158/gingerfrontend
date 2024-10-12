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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function ConnectionsList({
  status,
  onStatusChange,
  followers,
  following,
}) {
  function toggleModal() {
    let newStats = !status;
    onStatusChange(newStats);
  }
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
  const [selectedOption, setSelectedOption] = useState("Followers");
  console.log(followers);

  return (
    <div className="max-w-md mx-auto  rounded-lg overflow-hidden shadow-lg">
      <Dialog
        className="border-gray-900"
        open={status}
        onOpenChange={toggleModal} // Automatically toggles on open/close change
      >
        <DialogContent className="sm:max-w-md border-purple-700 bg-black text-gray-300 ">
          <DialogHeader>
            <DialogTitle onClick={toggleModal}>Connections</DialogTitle>
          </DialogHeader>
          <DialogHeader>
            <Select
              className="bg-black border-r-purple-900"
              defaultValue="Followers"
              onValueChange={(value) => setSelectedOption(value)}
            >
              <SelectTrigger className="w-[180px] bg-black border-purple-700 focus-within:border-purple-700">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-black text-purple-700">
                <SelectGroup>
                  <SelectItem className="" value="Followers">
                    Followers
                  </SelectItem>
                  <SelectItem value="Following">Following</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </DialogHeader>
          {selectedOption === "Followers" && (
            <ScrollArea className="mt-4 max-h-[60vh]">
              <div className="space-y-4">
                {followers.map((user, index) => (
                  <Link href={`/u/${user.username}`} key={index}>
                    <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-400 rounded p-2 transform duration-300 hover:border-purple-700">
                      <Avatar>
                        <AvatarImage
                          src={user.profilePicture}
                          alt={user.username}
                        />
                        <AvatarFallback>
                          {user.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        {/* <p className="text-sm font-medium leading-none">
                    {user.username}
                  </p> */}
                        <p className="text-sm text-gray-500">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          )}
          {selectedOption === "Following" && (
            <ScrollArea className="mt-4 max-h-[60vh]">
              <div className="space-y-4">
                {following.map((user, index) => (
                  <Link href={`/u/${user.username}`} key={index}>
                    <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-400 rounded p-2 transform duration-300 hover:border-purple-700">
                      <Avatar>
                        <AvatarImage
                          src={user.profilePicture}
                          alt={user.username}
                        />
                        <AvatarFallback>
                          {user.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        {/* <p className="text-sm font-medium leading-none">
                      {user.username}
                    </p> */}
                        <p className="text-sm text-gray-500">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
