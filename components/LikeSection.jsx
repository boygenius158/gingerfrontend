import { useSocket } from "@/app/lib/SocketContext";
import feedStore from "@/app/store/user/feedStore";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import SharePost from "./radixui/SharePost";

export default function LikeSection({ post, isSaved }) {
  const socket = useSocket();
  const [hasLiked, setHasLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(isSaved);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (post.likes && session?.id) {
      setHasLiked(post.likes.includes(session.id));
    }
  }, [post.likes, session?.id]);
  useEffect(() => {
    console.log("reg");
    if (socket) {
      socket.emit("register", session?.user?.email);
    }
  }, [session?.user?.email,socket]);

  console.log(session);

  async function likePost() {
    try {
      await instance.post("/api/user/likepost", {
        postId: post._id,
        originalUser: session.id,
      });
      console.log("clicked");

      setHasLiked((prev) => !prev);
      setLikeCount((prev) => prev + (hasLiked ? -1 : 1));

      console.log(session?.id, "sessionid");

      socket.emit("notification", {
        user: post.userId,
        type: hasLiked ? "like" : "unlike",
        originalUser: session?.id,
        postId: post._id,
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }

  async function handleSavePost() {
    // setIsSaved((prev) => !prev);
    setBookmarked((prev) => !prev);

    console.log("save post");
    const res = await instance.post("/api/user/savePost", {
      postId: post._id,
      userId: session.id,
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between border-t border-gray-100 px-4 pt-4">
        <div className="flex justify-center gap-2">
          {hasLiked ? (
            <HiHeart
              onClick={likePost}
              className="text-red-500 cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out"
            />
          ) : (
            <HiOutlineHeart
              onClick={likePost}
              className="cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out"
            />
          )}
          {likeCount.length > 0 && (
            <p className="text-gray-500">
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </p>
          )}
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </div>

        <div className="flex gap-4 cursor-pointer">
          <div className="flex items-center bg-gray-200 px-4 py-2 hover:bg-gray-300 rounded-md ">
            {bookmarked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
                  onClick={handleSavePost}
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
                onClick={handleSavePost}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            )}
          </div>
          <div>
            <div
            // onClick={handleShareClick}
            >
              <SharePost post={post} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
