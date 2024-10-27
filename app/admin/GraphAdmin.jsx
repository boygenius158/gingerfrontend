"use client";

import * as React from "react";
import { Bar, BarChart } from "recharts";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import instance from "@/axiosInstance"; // Adjust the import path to your axios instance
import { Line, LineChart } from "recharts";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


export default function UserDemographics() {
  const [demographics, setDemographics] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchDemographics() {
      try {
        const response = await instance.get("/api/user/user-demographics");
        console.log(response.data);
        setDemographics([
          { label: "user", value: 12 },
          { label: "premium", value: 10 },
        ]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchDemographics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading demographics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error fetching data: {error}
      </div>
    );
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Demographics of User Roles</CardTitle>
        <CardDescription>
          Distribution of users across different roles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pie">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="bar">
          <ChartContainer
          config={{
            userCount: {
              label: "User Count",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
  <BarChart data={demographics}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis 
      dataKey="label" 
      tick={{ fill: '#333333' }} // Dark gray tick color
    />
    <YAxis 
      tick={{ fill: '#333333' }} // Dark gray tick color
    />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar 
      dataKey="value" 
      fill="#1E90FF" // Light blue bar color
      radius={[4, 4, 0, 0]}
    />
  </BarChart>
</ResponsiveContainer>

        </ChartContainer>
          </TabsContent>
          <TabsContent value="pie">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={demographics}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {demographics.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
