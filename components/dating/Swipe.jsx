"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { SlDislike, SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import { Progress } from "../ui/progress";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { useSocket } from "@/app/lib/SocketContext";
import FlyingHeart from "@/app/utils/Animations/FlyingHeart";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, RefreshCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { X, Heart } from "lucide-react";
import ReachedEnd from "./ReachedEnd";
import toast from "react-hot-toast";

export default function Swipe() {
  const { data: session } = useSession();
  const socket = useSocket();

  const [isMatch, setIsMatch] = useState(false);
  const [swipeProfiles, setSwipeProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(33);
  const [myProfileImage, setMyProfileImage] = useState(null);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  // Fetch profiles from the server
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!session?.id) return;

      try {
        const response = await instance.post("/api/user/swipe-profiles", {
          userId: session.id,
        });

        if (response.data) {
          setSwipeProfiles(response.data.profiles);
          setCurrentProfileIndex(0);
          setHasReachedEnd(false);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, [session]);
  console.log(swipeProfiles);

  useEffect(() => {
    if (socket) {
      socket.on("match", (message) => {
        setIsMatch(true);
      });

      return () => {
        socket.off("match");
      };
    }
  }, [socket]);

  // Handle image click for like/dislike
  const handleImageClick = (event) => {
    const clickX = event.nativeEvent.offsetX;
    const imageWidth = event.target.clientWidth;

    if (clickX < imageWidth / 2) {
      handleDislike();
    } else {
      handleLike();
    }
  };

  const handleLike = () => {
    if (swipeProfiles.length === 0) return; // Prevent actions if no profiles

    setSwipeDirection("right");
    socket.emit("swipe", {
      profile: swipeProfiles[currentProfileIndex],
      userId: session?.id,
    });
    toast.success("liked!");

    if (currentProfileIndex < swipeProfiles.length - 1) {
      setTimeout(() => {
        setSwipeDirection(null);
        setCurrentProfileIndex((prev) => prev + 1);
      }, 500);
    } else {
      // User has reached the end
      setHasReachedEnd(true);
    }
  };

  const handleDislike = () => {
    setSwipeDirection("left");

    if (currentProfileIndex < swipeProfiles.length - 1) {
      setTimeout(() => {
        setSwipeDirection(null);
        setCurrentProfileIndex((prev) => prev + 1);
      }, 500);
    } else {
      // User has reached the end
      setHasReachedEnd(true);
    }
  };

  const currentProfile = swipeProfiles[currentProfileIndex] || {};
  console.log(currentProfile);

  console.log(currentProfile);
  console.log(currentProfile.images);
  console.log(currentIndex);

  return (
    <div className="bg-black h-screen">
      {isMatch ? (
        <div className="flex items-center justify-center">
          <div className="w-[700px] h-[600px] overflow-hidden mt-4 animate-fade-in relative">
            <div className="flex items-center justify-center mt-4 animate-fade-up flex-col">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 text-white rounded p-4 shadow-lg animate-heartbeat">
                {/* You found a match {currentProfile.name} */}
                You have a match
              </h1>
              <h1 className="scroll-m-20 mt-4  text-muted-foreground text-sm tracking-tight  bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 text-white rounded p-4 shadow-lg animate-heartbeat">
                {/* You found a match {currentProfile.name} */}
                Check the matches section to connect with the profile.
              </h1>
              <div className="flex p-4 mt-8">
                <div className="relative group">
                  {myProfileImage && (
                    <Image
                      src={myProfileImage}
                      height="300"
                      width="200"
                      className="w-full object-fit aspect-square rounded-xl border-red-700 border-4 pulse-effect"
                      alt="Your profile image"
                    />
                  )}
                </div>
                {/* 
                {currentProfile?.images?.length > 0 && (
                  <div className="relative group ml-6">
                    <Image
                      src={
                        currentProfile.images[0] ||
                        "/path/to/fallback-image.jpg"
                      }
                      height="200"
                      width="200"
                      className="w-full object-cover aspect-square rounded-xl border-red-700 border-4 glow-effect"
                      alt={`${
                        currentProfile?.name ?? "Profile"
                      }'s profile image`}
                    />
                  </div>
                )} */}
              </div>
              <div className="flex mt-4 gap-1">
                <Button
                  onClick={() => setIsMatch(false)}
                  variant="outline"
                  className="text-red-600 font-semibold hover:text-white hover:bg-red-600"
                >
                  Keep Swiping
                </Button>
              </div>
            </div>
            <div
              id="hearts-container"
              className="absolute inset-0 pointer-events-none"
            ></div>
            <FlyingHeart />
          </div>
        </div>
      ) : hasReachedEnd ? (
        <ReachedEnd />
      ) : (
        <div>
          {currentProfile?.images?.length > 0 ? (
            <div className=" max-w-md mx-auto w-[300px] bg-black mt-6">
              <div className="flex items-center justify-center mb-2">
                <p className="text-white text-sm font-semibold">
                  Swipe across profiles.
                </p>
              </div>
              <Card
                className={`overflow-hidden bg-black text-white border-gray-800 ${
                  swipeDirection ? `swipe-${swipeDirection}` : ""
                }`}
              >
                <CardContent className="p-0 mt-2 bg-black text-white">
                  <div className="flex items-center justify-center p-2">
                    <Progress
                      value={progressValue * (currentIndex + 1)}
                      className="w-[400px]"
                    />
                  </div>
                  <div className="p-4 text-white">
                    <h1 className="text-2xl font-extrabold  dark:text-gray-200">
                      {currentProfile.name || "No Name"},
                      <span className=" dark:text-gray-400">
                        {currentProfile.age
                          ? ` ${currentProfile.age}`
                          : " Unknown"}
                      </span>
                    </h1>
                    <p className=" dark:text-gray-400 font-medium mt-1">
                      {currentProfile.bio || "No description"}
                    </p>
                  </div>
                  <div
                    className="relative aspect-square"
                    onClick={handleImageClick}
                  >
                    <Image
                      src={currentProfile.images[currentIndex]}
                      layout="fill"
                      objectFit="cover"
                      alt={`${currentProfile.name}'s photo`}
                      className="transition-opacity duration-300 ease-in-out group-hover:opacity-75"
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-center items-center gap-4 mt-2 mb-2 ">
                <Button
                  onClick={handleDislike}
                  variant="outline"
                  size="icon"
                  className="hover:scale-110 transform duration-300"
                  // className="w-10 h-10 rounded-full border-2 border-red-500 bg-white hover:bg-red-100 transition-colors duration-200"
                  // onClick={handleCancel}
                  aria-label="Dislike"
                >
                  <X className="h-8 w-8 text-red-500 " />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentIndex((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={currentIndex === 0}
                  // className="rounded-full"
                  className="hover:scale-110 transform duration-300 rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {/* <Button variant="outline">
                  <RefreshCcw size={24} />
                </Button> */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      Math.min(
                        prev + 1,
                        (currentProfile.images || []).length - 1
                      )
                    )
                  }
                  disabled={
                    currentIndex === (currentProfile.images || []).length - 1
                  }
                  className="hover:scale-110 transform duration-300 rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                  onClick={handleLike}
                  variant="outline"
                  size="icon"
                  className="hover:scale-110 transform duration-300 rounded"
                  // className="w-10 h-10 rounded-full border-2 border-purple-700 bg-white hover:bg-green-100 transition-colors duration-200"
                  // onClick={handleLove}
                  aria-label="Like"
                >
                  <Heart className="h-8 w-8  text-purple-700 " />
                </Button>
              </div>
            </div>
          ) : (
            // <div className="flex items-center justify-center">
            //   <Skeleton className="w-[500px] h-[600px]">
            //     <div className="flex items-center justify-center">
            //       <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"></h2>
            //     </div>
            //   </Skeleton>
            // </div>
            <div className="flex items-center justify-center mt-10">
              <ReachedEnd />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
