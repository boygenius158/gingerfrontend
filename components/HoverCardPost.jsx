import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function HoverCardPost({ user }) {
  console.log(user);

  return (
    <HoverCard className="text-white bg-black">
      <HoverCardTrigger asChild>
        <Button className="text-gray-200 bg-black font-bold" variant="link">
          @{user.username}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-black border-purple-700 ">
        <div className="flex space-x-2 bg-black">
          <Avatar>
            <AvatarImage src={user.profilePicture} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="text-white">
            <h4 className="text-sm ">@{user.username}</h4>
           <div className="flex space-x-2">
           <p className="text-sm">
              Followers:{user.followers.length}
            </p>
            <p className="text-sm">
              Following:{user.following.length}
            </p>
           </div>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                {`Joined ${new Date(user.createdAt).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}`}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
