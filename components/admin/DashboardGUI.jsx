import React from "react";
import ThisMonth from "../ThisMonth";
import Chart1 from "../Chart1";
import RecentSales from "../RecentSales";

export default function DashboardGUI() {
  return (
    <div>
      <div className="p-4">
        <div className="flex items-center justify-center gap-20">
          <div className="gap-y-2 ">
            <div className="mb-2">
              <ThisMonth />
            </div>

            <Chart1 />
          </div>

          <RecentSales />
        </div>
      </div>
    </div>
  );
}
