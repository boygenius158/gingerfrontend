import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts";
import instance from "@/axiosInstance"; // Adjust the import path to your axios instance
import { useState, useEffect } from "react";

export default function GraphAdmin() {
  const [demographics, setDemographics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDemographics() {
      try {
        const response = await instance.get("/api/user/user-demographics");
        setDemographics(response.data); // Set the fetched data
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchDemographics();
  }, []);

  if (loading) {
    return <div>Loading demographics...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-center mt-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Demographics of User Roles
          </h1>
        </div>
        {/* Pie Chart */}
        {/* <PieChart
          series={[
            {
              data: demographics.map((item, index) => ({
                id: index,
                value: item.value, // Use the value (user count)
                label: item.label, // Label (e.g., "User", "Premium User")
              })),
            },
          ]}
          width={800}
          height={400}
        /> */}

        {/* Bar Chart (if needed) */}
        <div className="flex items-center justify-center mt-10">
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: demographics.map((item) => item.label),
              },
            ]}
            series={[
              {
                data: demographics.map((item) => item.value),
                label: "User Count",
              },
            ]}
            width={800}
            height={400}
          />
        </div>
      </div>
    </>
  );
}
