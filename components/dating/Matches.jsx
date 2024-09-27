import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Matches() {
  const{data:session} = useSession()
  const[matches,setMatches] = useState([])
  const fetchMatches = useCallback(async () => {
    if (session?.id) {
      try {
        const response = await instance.post("/api/user/fetch-matches", {
          userId: session.id,
        });
        if (response) {
          console.log(response);
          setMatches(response.data.matches);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    }
  }, [session?.id]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return (
    <div>
      <Table>
        <TableCaption>Your Recent Matches Appear Here.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Matches</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches &&  matches.map((element, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">
                <div className="flex justify-around ">
                  <Avatar>
                    <AvatarImage src={element.userId.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center justify-center">
                    <p>You Matched With @{element.userId.username}</p>
                  </div>
                  <div className="">
                    <Link 
                    href={`/u/${element.userId.username}`}
                    >
                      <Button variant="outline">Visit Profile</Button>
                    </Link>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
