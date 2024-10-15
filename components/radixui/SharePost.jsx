"use client";

import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Share2Icon, Link1Icon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function SharePost({ post }) {
  // const domain = process.env.NEXT_PUBLIC_DOMAIN; 

  console.log(post);
  // function handleShareClick() {
  //   console.log("handle share click", post._id);
  //   const postUrl = post._id;
  //   const text = `Check out this post: ${domain}/post/${postUrl}`; 

  //   const whatsappUrl = `http://wa.me/?text=${encodeURIComponent(text)}`;
  //   window.open(whatsappUrl, "_blank");
  // }
  // function handleCopyLink() {
  //   const postUrl = post._id;
  //   const textToCopy = `${process.env.NEXTAUTH_URL}/post/${postUrl}`;
  //   navigator.clipboard
  //     .writeText(textToCopy)
  //     .then(() => {
  //       console.log("Link copied to clipboard!");
  //     })
  //     .catch((err) => {
  //       console.error("Failed to copy the link: ", err);
  //     });
  // }

  function handleShareClick() {
    console.log("handle share click", post._id);
  
    // Dynamically get the domain URL
    const domain = `${window.location.protocol}//${window.location.host}`;
    const postUrl = `${domain}/post/${post._id}`;
  
    const text = `Check out this post: ${postUrl}`;
    const whatsappUrl = `http://wa.me/?text=${encodeURIComponent(text)}`;
  
    // Open WhatsApp share in a new tab
    window.open(whatsappUrl, "_blank");
  }
  
  function handleCopyLink() {
    // Dynamically get the domain URL
    const domain = `${window.location.protocol}//${window.location.host}`;
    const postUrl = `${domain}/post/${post._id}`;
  
    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        console.log("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy the link: ", err);
      });
  }
  

  return (
    <div className="">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="flex rounded  items-center border-gray-300 hover:bg-gray-300 text-purple-700 px-4 py-2 ">
            <Share2Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </Popover.Trigger>
        <Popover.Content className="w-[360px] p-4 bg-black border border-purple-700 shadow-lg rounded-md z-20">
          <div className="grid grid-cols-[130px_1fr] gap-4">
            <div className="pr-2">
              <Image
                // src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?&auto=format&fit=crop&w=400&q=80"
                // src={post?.imageUrl[0]}
                width={50}
                height={50}
                alt="Minimalistic 3D rendering wallpaper"
                className="rounded-md"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-400">Share this image</h2>
              <p className="text-gray-600 mb-4">
                {/* Minimalistic 3D rendering wallpaper. */}
              </p>

              <div className="flex flex-col items-start gap-y-2">
                <Popover.Close asChild>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center border border-purple-700  hover:bg-gray-300 text-purple-700 px-4 py-2 rounded-md"
                  >
                    <Link1Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                    Copy link
                  </button>
                </Popover.Close>
                <Popover.Close asChild>
                  <button
                    onClick={handleShareClick}
                    className="flex items-center border border-purple-700  hover:bg-gray-300 text-purple-700 px-4 py-2 rounded-md"
                  >
                    <Share2Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                    Whatsapp
                  </button>
                </Popover.Close>
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
