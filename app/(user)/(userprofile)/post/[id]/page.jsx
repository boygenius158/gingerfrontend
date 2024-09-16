"use client";

import { useCallback } from "react";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function Page({ params }) {
  const [post, setPosts] = useState(null);
  const [comments, setComments] = useState([]);
  const { data: session, status } = useSession();
  const { id } = params;

  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getPost = useCallback(async () => {
    const response = await instance.post("/api/user/visitPost", {
      postId: id,
    });
    setPosts(response.data.result);
    setComments(response.data.comments);
  }, [id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  // Handlers for navigating through the carousel
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? post.imageUrl.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === post.imageUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="border relative">
        {/* Carousel */}
        {post && post.imageUrl.length > 0 && (
          <div className="relative w-[538px] h-[430px]">
            <Image
              src={post.imageUrl[currentImageIndex]}
              width={538}
              height={430}
              alt="Post Image"
              className="rounded-lg object-cover w-full h-full"
            />
            {/* Navigation buttons */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
              onClick={prevImage}
            >
              Prev
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
              onClick={nextImage}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <div className="ml-4 flex flex-col justify-between">
        <div className="w-[334px] h-[60px] bg-transparent border flex justify-between">
          <div className="flex justify-center items-center p-4 gap-2">
            <Image
              src={post?.userId?.profilePicture}
              width={40}
              height={40}
              alt="Profile Picture"
              className="rounded-full"
            />
            <div className="text-sm font-semibold">
              {post?.userId?.username}
            </div>
          </div>
          <div className="flex items-center justify-center p-4">
            <HiOutlineDotsHorizontal className="h-5 cursor-pointer" />
          </div>
        </div>

        <div className="w-[334px] h-[402px] p-4 border overflow-y-scroll">
          <div className="flex gap-4 items-center">
            <div className="text-sm font-semibold">
              {post?.userId?.username}
            </div>
            <div className="font-sm text-gray-500">{post?.caption}</div>
          </div>
          <div className="border-b mt-2"></div>
          <div className="mt-2">
            <div className="flex flex-col">
              {comments.map((element, index) => (
                <div key={index} className="flex">
                  <div className="flex items-center justify-center gap-4 my-2">
                    <Image
                      src={element?.userId?.profilePicture}
                      width={25}
                      height={25}
                      alt="Profile Picture"
                      className="rounded-full"
                    />
                    <div className="text-sm font-semibold">
                      {element?.userId?.username}
                    </div>
                  </div>
                  <div className="ml-2 font-normal text-gray-500 flex items-center justify-center">
                    {element?.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border flex-grow p-4 flex flex-col items-start">
          {/* Like Section and other actions */}
        </div>
      </div>
    </div>
  );
}
