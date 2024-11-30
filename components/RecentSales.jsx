import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import instance from "@/axiosInstance";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function RecentSales() {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await instance.get("/api/admin/premium-payment-details");
      console.log(response.data);
      setSales(response.data)
    }

    fetchData();
  }, []);

  return (
    <div className="p-4 w-full mt-\">
      <Card className="h-[400px] flex flex-col">
        <CardHeader>
          <CardTitle>Recent Sales From Ginger Premium</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            <div className="grid gap-4 pr-4">
              {sales.map((sale, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar className="h-9 w-9">
                    <Image
                      src={sale.profilePicture}
                      alt={`${sale.username}'s profile picture`}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    {/* <AvatarFallback>{sale.username[0]}</AvatarFallback> */}
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">{sale.username}</p>
                    <p className="text-sm text-muted-foreground">{sale.email}</p>
                  </div>
                  <div className="ml-auto font-medium">+${sale.amount.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>

  );
}
