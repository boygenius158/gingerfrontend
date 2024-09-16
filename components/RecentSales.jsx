import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import instance from "@/axiosInstance";
import Image from "next/image";

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
    <div className="p-4 w-1/2">
      <Card x-chunk="dashboard-01-chunk-5">
        <CardHeader>
          <CardTitle>Recent Sales From Ginger Premium</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
          {sales.map((element, index) => (
            <div key={index}>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                {/* <AvatarImage src={`${element.profilePicture}`}  /> */}
                <div>
                  <Image
                  src={`${element.profilePicture}`}
                  alt="faile"
                  height={34}
                  width={34}
                  />
                </div>
                {/* <AvatarFallback></AvatarFallback> */}
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {element.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {element.email}
                  </p>
                </div>
                <div className="ml-auto font-medium">+{element.amount}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
