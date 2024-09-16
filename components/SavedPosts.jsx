import Image from "next/image";
import React from "react";

export default function SavedPosts() {
  return (
    <div className="border flex flex-col items-center p-4">
      <h1 className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Saved Post
      </h1>
      <div class="p-4 flex items-center justify-center flex-col">
        <div class="bg-white border rounded-sm max-w-md">
          <div class="flex items-center px-4 py-3">
            <Image
              class="rounded-full"
              height={18}
              width={18}
              src="https://picsum.photos/id/1027/150/150"
              alt="helo"
            />
            <div class="ml-3 ">
              <span class="text-sm font-semibold antialiased block leading-tight">
                8fact
              </span>
             
            </div>
          </div>
          <Image
            src="https://picsum.photos/id/244/900/900"
            alt="hello"
            height={500}
            width={500}
          />
        </div>
      </div>
      <div class="p-4 flex items-center justify-center flex-col">
        <div class="bg-white border rounded-sm max-w-md">
          <div class="flex items-center px-4 py-3">
            <Image
              class="rounded-full"
              height={18}
              width={18}
              src="https://picsum.photos/id/1027/150/150"
              alt="helo"
            />
            <div class="ml-3 ">
              <span class="text-sm font-semibold antialiased block leading-tight">
                8fact
              </span>
              
            </div>
          </div>
          <Image
            src="https://picsum.photos/id/244/900/900"
            alt="hello"
            height={500}
            width={500}
          />
        </div>
      </div>
      <div class="p-4 flex items-center justify-center flex-col">
        <div class="bg-white border rounded-sm max-w-md">
          <div class="flex items-center px-4 py-3">
            <Image
              class="rounded-full"
              height={18}
              width={18}
              src="https://picsum.photos/id/1027/150/150"
              alt="helo"
            />
            <div class="ml-3 ">
              <span class="text-sm font-semibold antialiased block leading-tight">
                8fact
              </span>
              
            </div>
          </div>
          <Image
            src="https://picsum.photos/id/244/900/900"
            alt="hello"
            height={500}
            width={500}
          />
        </div>
      </div>
    </div>
  );
}
