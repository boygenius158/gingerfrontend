import { Button } from "@/components/ui/moving-border";
import React from "react";

export default function GingerLogo() {
  return (
    <div className="flex items-center justify-center w-full h-full mt-5">
      <Button
        borderRadius="0.5rem"
        className="bg-blue-500 rounded dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        <h1 className=" text-white scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-outline">
          Ginger
        </h1>
      </Button>
    </div>
  );
}
