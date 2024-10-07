"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Link from "next/link";

export default function LandingPage() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
  return (
    <div className="flex flex-col bg-black">
      <div className=" mx-auto  h-[30rem] overflow-hidden w-full">
        <div
          backgroundColor="black"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <Link href="/">
            <h1 className="scroll-m-20 text-white text-4xl font-extrabold tracking-tight lg:text-8xl">
              Ginger....
            </h1>
          </Link>
          <p className="text-white text-2xl md:text-4xl max-w-xl mt-6 text-center">
            the new social media app 
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <Link href="/login">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2  text-white ">Register</button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full h-full py-20">
          <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white dark:text-neutral-200 font-sans">
            What you can do with Ginger
          </h2>
          <Carousel items={cards} />
        </div>
      </div>
      <footer className="w-full h-[100px] bg-white flex items-center justify-between px-4 shadow-md">
        <div className="text-gray-600">© 2024 Ginger. All rights reserved.</div>

        <div className="flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-blue-500">
            Privacy Policy
          </Link>
          <Link href="/" className="text-gray-600 hover:text-blue-500">
            Terms of Service
          </Link>
          <Link href="/" className="text-gray-600 hover:text-blue-500">
            Contact Us
          </Link>
        </div>
      </footer>
    </div>
  );
}

const data = [
  {
    category: "Ginger Swipe!",
    title: "Find your match.",
    src: "https://i.pinimg.com/564x/e7/84/35/e7843568c68dc11ec0f0f08d73ad5478.jpg",
    // src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // content: <DummyContent />,
  },
  {
    category: "Post",
    title: "Share your best moments.",
    src: "https://i.pinimg.com/564x/1f/36/bf/1f36bfdd961997b6d255da4a7000089c.jpg",
    // src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // content: <DummyContent />,
  },
  {
    category: "Story",
    title: "Capture moments.",
    src: "https://i.pinimg.com/564x/95/24/d9/9524d995bcf7c9e867c0a2c1c8df6b83.jpg",
    // src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // content: <DummyContent />,
  },

  {
    category: "Messaging",
    title: "Send messages to your loved ones.",
    src: "https://i.pinimg.com/564x/ea/b6/05/eab605534c80958122113868be5349cf.jpg",
    // src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // content: <DummyContent />,
  },
  {
    category: "Ginger",
    title: "Start now.",
    src: "https://i.pinimg.com/736x/94/ac/68/94ac68c201bcc1529d3fa045589e5161.jpg",
    // src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // content: <DummyContent />,
  },
  // {
  //   category: "Hiring",
  //   title: "Hiring for a Staff Software Engineer",
  //   src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   content: <DummyContent />,
  // },
];
