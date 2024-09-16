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
    <Card>
      <CardHeader>
        <CardTitle>Most Followers</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        {chartConfig && chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                left: 0,
              }}
            >
              <YAxis
                dataKey="username"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => chartConfig[value]?.label}
              />
              <XAxis dataKey="followers" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="followers" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>
        ) : (
          <p>Loading data...</p>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total followers for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
