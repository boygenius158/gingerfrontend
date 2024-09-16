"use client";
import React, { useState, useEffect } from "react";
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

  // Fetch profiles from the server
  const fetchProfiles = useCallback(async () => {
    if (session?.id) {
      try {
        const response = await instance.post("/api/user/swipe-profiles", {
          userId: session.id,
        });
        if (response.data) {
          setSwipeProfiles(response.data.profiles);
          setCurrentProfileIndex(0); // Start from the first profile
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    }
  }, [session]);

  // Handle "match" event
  const handleMatch = useCallback((msg) => {
    console.log(msg);
    setIsMatch(true);
    socket.emit("match_owner", { userId: session?.id });
    socket.on("profile-image", (msg) => {
      console.log(msg);
      setMyProfileImage(msg);
    });
  }, [session, socket]);

  // Handle image click for like/dislike
  const handleImageClick = (event) => {
    const clickX = event.nativeEvent.offsetX;
    const imageWidth = event.target.clientWidth;

    if (clickX < imageWidth / 2) {
      // Click on the left side (Dislike)
      handleDislike();
      console.log("dislike");
    } else {
      // Click on the right side (Like)
      handleLike();
      console.log("like", swipeProfiles[currentProfileIndex]);
      socket.emit("swipe", {
        profile: swipeProfiles[currentProfileIndex],
        userId: session?.id,
      });
      console.log(session?.id);
    }
  };

  // Handle like action
  const handleLike = () => {
    console.log("Profile liked");
    setSwipeDirection("right");
    setTimeout(() => {
      setSwipeDirection(null);
      if (currentProfileIndex < swipeProfiles.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
      } else {
        console.log("No more profiles");
      }
    }, 500); // Match duration with the CSS animation
  };

  // Handle dislike action
  const handleDislike = () => {
    console.log("Profile disliked");
    setSwipeDirection("left");
    setTimeout(() => {
      setSwipeDirection(null);
      if (currentProfileIndex < swipeProfiles.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
      } else {
        console.log("No more profiles");
      }
    }, 500); // Match duration with the CSS animation
  };

  // Fetch profiles and set up socket event listeners
  useEffect(() => {
    if (session) {
      fetchProfiles();
    }

    if (socket) {
      socket.emit("register", session?.user?.email);

      socket.on("match", handleMatch);
    }

    // Cleanup the socket event listener on component unmount or when socket changes
    return () => {
      if (socket) {
        socket.off("match", handleMatch);
      }
    };
  }, [session, socket, fetchProfiles, handleMatch]);

  const currentProfile = swipeProfiles[currentProfileIndex] || {};
  console.log(myProfileImage);

  return (
    <div className="">
      {isMatch ? (
        <div className="flex items-center justify-center">
          <div className="w-[700px] h-[600px] overflow-hidden mt-4 animate-fade-in relative">
            <div className="flex items-center justify-center mt-4 animate-fade-up flex-col">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 text-white rounded p-4 shadow-lg animate-heartbeat">
                You found a match
              </h1>
              <div className="flex p-4 mt-8">
                <div className="relative group">
                  {myProfileImage && (
                    <Image
                      src={myProfileImage}
                      height="300"
                      width="200"
                      className="w-full object-fit aspect-square rounded-xl border-red-700 border-4 pulse-effect"
                      alt="thumbnail"
                    />
                  )}
                </div>

                <div className="relative group  ml-6">
                  {currentProfile?.images[currentIndex] && (
                    <Image
                      src={currentProfile?.images[currentIndex]}
                      height="200"
                      width="200"
                      className="w-full object-cover aspect-square rounded-xl border-red-700 border-4 glow-effect"
                      alt="thumbnail"
                    />
                  )}
                </div>
              </div>
              <div className="flex mt-4 gap-1">
                <div className="">
                  <Button
                    className="text-red-600 font-semibold hover:text-white hover:bg-red-600 "
                    variant="outline"
                  >
                    Visit Profile
                  </Button>
                </div>
                <div className="">
                  <Button
                    onClick={() => setIsMatch(false)}
                    variant="outline"
                    className="text-red-600 font-semibold hover:text-white hover:bg-red-600"
                  >
                    Keep Swiping
                  </Button>
                </div>
              </div>
            </div>
            <div
              id="hearts-container"
              className="absolute inset-0 pointer-events-none"
            ></div>
            <FlyingHeart />
          </div>
        </div>
      ) : (
        <div>
          {currentProfile?.images ? (
            <div>
              <CardContainer className="">
                <CardBody
                  className={`bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl ${
                    swipeDirection ? `swipe-${swipeDirection}` : ""
                  }`}
                >
                  <CardItem translateZ="100" className="w-full">
                    <Progress
                      value={progressValue * (currentIndex + 1)}
                      className="mb-4"
                    />

                    <div className="relative">
                      <div className="flex flex-col mt-2 ml-2 mb-2 z-10">
                        <h1 className="scroll-m-20 text-2xl font-extrabold text-gray-600 lg:text-2xl">
                          {currentProfile.name || "No Name"},{" "}
                          <span className="text-gray-600">
                            {currentProfile.age || "Unknown"}
                          </span>
                        </h1>
                        <div className="text-gray-600 font-semibold">
                          {currentProfile.bio || "No description"}
                        </div>
                        <div></div>
                      </div>
                      <div onClick={handleImageClick}>
                        <Image
                          src={currentProfile.images[currentIndex]}
                          height="300"
                          width="300"
                          className="w-full object-cover rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </div>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
              <div className="flex justify-center items-center gap-10 mt-4 cursor-pointer">
                <div className="flex justify-center items-center w-12 h-12 rounded-full transition-transform transform hover:scale-150">
                  <Button
                    onClick={() =>
                      setCurrentIndex((prev) => Math.max(prev - 1, 0))
                    }
                  >
                    <SlArrowLeft className="text-2xl " />
                  </Button>
                </div>
                <div className="flex justify-center items-center w-12 h-12 rounded-full transition-transform transform hover:scale-150">
                  <Button
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        Math.min(
                          prev + 1,
                          (currentProfile.images || []).length - 1
                        )
                      )
                    }
                  >
                    <SlArrowRight className="text-2xl " />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="   flex items-center justify-center">
              <div>
                <Skeleton className="w-[500px] h-[600px]  ">
                  <div className="flex items-center justify-center">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                      
                    </h2>
                  </div>
                </Skeleton>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
