import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Subscribed() {
  return (
    <div className="">
      <div className="flex items-center justify-center p-2 ">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          you have unlocked premium
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
