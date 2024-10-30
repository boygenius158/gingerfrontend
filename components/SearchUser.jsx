"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import instance from "@/axiosInstance";
import { X } from "lucide-react";

export default function SearchUser({ handleClose }) {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [userProfiles, setUserProfiles] = useState([]);
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const onSearchSubmit = async (e) => {
    e.preventDefault();
    const response = await instance.get("/api/user/searchUser", {
      params: { searchQuery: searchTerm },
    });
    if (response) {
      setUserProfiles(response.data.users);
    }
  };

  const displayProfileInformationHere = async (search) => {
    // if (status === "authenticated" && session?.id) {
    //   await instance.post("/api/user/save-user-to-search-history", {
    //     userId: session.id,
    //     key: search,
    //   });
    // }
    router.push(`/u/${search.username}`);
  };

  return (
    <Card className="w-[423px] h-[700px] relative bg-background text-foreground bg-black text-white border border-purple-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Search</CardTitle>
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSearchSubmit} className="space-y-4">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full text-black"
          />
          <Button type="submit" className="w-full">
            Search
          </Button>
        </form>

        {searchTerm.length > 0 && userProfiles.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold mb-2">Result</h2>
            <ScrollArea className="h-[500px]">
              {userProfiles.map((search, index) => (
                <div
                  key={index}
                  onClick={() => displayProfileInformationHere(search)}
                  className="flex items-center space-x-4 py-2 cursor-pointer hover:bg-accent rounded-md px-2"
                >
                  <Avatar>
                    <AvatarImage src={search.profilePicture} alt={search.username} />
                    <AvatarFallback>{search.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{search.username}</p>
                    <p className="text-sm text-muted-foreground capitalize">{search.name}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
