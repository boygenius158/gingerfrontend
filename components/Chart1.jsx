"use client"

import { TrendingUp, Users } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import instance from "@/axiosInstance"
import React, { useEffect, useState } from "react"

export default function MostFollowersChart() {
  const [chartData, setChartData] = useState([])
  const [chartConfig, setChartConfig] = useState({})

  async function fetchData() {
    try {
      const response = await instance.get("/api/admin/chartData1")
      if (response.data && response.data.chartData) {
        setChartData(response.data.chartData)
        setChartConfig(response.data.chartConfig)
      } else {
        console.log("No data received from the server")
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const topUser = chartData[0] || {}

  return (
    <Card className="w-[700px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5" />
          Most Followed User
        </CardTitle>
        <CardDescription>User with the highest follower count</CardDescription>
      </CardHeader>
      {/* <CardContent className="pb-2">
        {chartConfig && chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[100px]">
            <BarChart
              data={[topUser]}
              layout="horizontal"
              margin={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="followers" type="number" hide />
              <YAxis dataKey="username" type="category" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="followers"
                fill="url(#colorGradient)"
                radius={[0, 4, 4, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                </linearGradient>
              </defs>
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        )}
      </CardContent> */}
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={topUser.avatar} alt={topUser.username} />
            <AvatarFallback>{topUser.username?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{topUser.username}</p>
            <p className="text-xs text-muted-foreground">@{topUser.username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-2xl font-bold">{topUser.followers?.toLocaleString()}</span>
        </div>
      </CardFooter>
    </Card>
  )
}