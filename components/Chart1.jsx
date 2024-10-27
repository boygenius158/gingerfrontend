"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import instance from "@/axiosInstance";
import React, { useEffect, useState } from "react";

export default function Chart1() {
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState();

  async function fetchData() {
    try {
      const response = await instance.get("/api/admin/chartData1");
      console.log(response);

      if (response.data && response.data.chartData) {
        setChartData(response.data.chartData);
        setChartConfig(response.data.chartConfig);
      } else {
        console.log("No data received from the server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Most Followers</CardTitle>
        <CardDescription>Top 5 users with the most followers</CardDescription>
      </CardHeader>
      <CardContent>
        {chartConfig && chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                left: 0,
                right: 20,
              }}
            >
              <YAxis
                dataKey="username"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                width={100}
                tickFormatter={(value) => chartConfig[value]?.label}
              />
              <XAxis dataKey="followers" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="followers"
                layout="vertical"
                radius={5}
                barSize={25}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <p className="text-center py-10">Loading data...</p>
        )}
      </CardContent>
    </Card>
  );
}
