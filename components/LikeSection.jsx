import { useSocket } from "@/app/lib/SocketContext";
import feedStore from "@/app/store/user/feedStore";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import SharePost from "./radixui/SharePost";
import LikedList from "./modals/LikedList";

export default function LikeSection({ post, isSaved, HandleCommentVisible }) {
  const socket = useSocket();
  const [hasLiked, setHasLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(isSaved);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const { data: session } = useSession();
  const [status, setStatus] = useState(false);

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
  }, [session?.user?.email, socket]);

  // console.log(session);

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
  function toggleStatusChange(newStatus) {
    setStatus(newStatus);
  }
  console.log(post);

  return (
    <div>
      <LikedList
        status={status}
        onStatusChange={toggleStatusChange}
        likes={post.userDetails}
      />

      <div className="flex items-center justify-between border-t border-gray-100 px-4 pt-4">
        <div className="flex gap-4 cursor-pointer hover:underline">
          <div className="flex  justify-center gap-2">
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
            <div onClick={() => setStatus(true)}>
              {likeCount.length > 0 && (
                <p className="text-gray-500 ">
                  {likeCount} {likeCount === 1 ? "like" : "likes"}
                </p>
              )}
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </div>
          </div>
          <div
            onClick={HandleCommentVisible}
            className="flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-7 hover:scale-125 transform duration-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </div>
        </div>

        <div className="flex gap-4 cursor-pointer" onClick={handleSavePost}>
          {session.id !== post.userId && (
            <div className="flex items-center px-4 py-2 hover:bg-gray-300 rounded-md ">
              {bookmarked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-purple-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
                    // onClick={handleSavePost}
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-purple-700"
                  // onClick={handleSavePost}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              )}
            </div>
          )}
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
