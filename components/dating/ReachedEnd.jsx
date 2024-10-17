import React from "react";

export default function ReachedEnd() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">
          You have reached the end
        </h2>
        <p className="text-gray-400 mt-2">
          There are no more profiles to show. Comeback later.
        </p>
      </div>
    </div>
  );
}
