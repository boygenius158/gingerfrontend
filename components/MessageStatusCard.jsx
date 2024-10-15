import React from "react";

export default function MessageStatusCard({ isSeen, time }) {
  // Convert timestamp to a Date object
  const date = new Date(time);

  // Format the time to "h:mm a"
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="absolute bottom-0 right-0 mb-2 mr-2 p-2 bg-gray-800 text-white text-sm rounded shadow-lg z-10">
      <div className="flex flex-col">
        <p>Read: {isSeen ? "Yes" : "No"}</p>
        <p>Delivered: {formattedTime}</p>
      </div>
    </div>
  );
}
