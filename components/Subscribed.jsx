import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Subscribed({ daysLeft }) {
  return (
    <div className="">
      <div className="flex items-center justify-center p-2 ml-4 ">
        {/* <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          <span className="text-amber-300">{daysLeft} </span>days left for premium to expire
        </h1> */}
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          You have unlocked{" "}
          <span className="text-amber-300"> Ginger premium </span>
        </h1>
        <Player
          src="https://lottie.host/01219472-dc1c-4306-a580-71c705ff1ad0/G88NDSeO5d.json "
          className="player"
          loop
          autoplay
          style={{ height: "300px", width: "300px" }}
        />
      </div>
    </div>
  );
}
