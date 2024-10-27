import React from "react";
import ThisMonth from "../ThisMonth";
import Chart1 from "../Chart1";
import RecentSales from "../RecentSales";

export default function DashboardGUI() {
  return (
    <div className="p-4 space-y-6">
      {/* ThisMonth and Chart1 Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <ThisMonth />
          <Chart1 />
        </div>
        <RecentSales />
      </div>
    </div>
  );
}
