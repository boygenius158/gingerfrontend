import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import instance from "@/axiosInstance";

export default function ThisMonth() {
  const [revenue, setRevenue] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await instance.get("/api/admin/total-revenue");
      setRevenue(response.data.totalRevenue);
    } catch (err) {
      setError("Failed to fetch revenue data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-center m-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard
        </h1>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Last 30 days</CardDescription>
          <CardTitle className="text-4xl">${revenue}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {/* +10% from last month */}
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={12} aria-label="12% increase" />
        </CardFooter>
      </Card>
    </div>
  );
}
