import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Moment from "react-moment";

export default function CommentSection({ post }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState(post.comments); // Initialize with existing comments
  const [newComment, setNewComment] = useState(""); // Initialize with an empty string

  useEffect(() => {
    // Update comments when post prop changes
    setComments(post.comments);
  }, [post.comments]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await instance.post("/api/user/postComment", {
        postedComment: newComment,
        userOfPost: post.userDetails.email,
        postId: post._id,
      });

      if (res && res.data && res.data.comment) {
        // Add the new comment to the existing comments
        setComments((prevComments) => [...prevComments, res.data.comment]);
        setNewComment(""); // Clear the input field
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }
  console.log(session);

  return (
    <div className="mb-4">
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex items-center space-x-2 mb-2 justify-between"
            >
              <Image
                height={20}
                width={20}
                // src={comment.commenter.image} // Assuming you have an image field
                alt="user image"
                className="rounded-full object-cover border"
              />
              <p className="text-sm flex-1 truncate">
                <span className="font-bold text-gray-700">
                  {comment.commenter?.username[0] || "You:"}
                </span>{" "}
                {comment.content}
              </p>
              <Moment fromNow>{comment.createdAt}</Moment>
            </div>
          ))}
        </div>
      )}
      {session && (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-center items-center gap-4">
            <div>
              <Image
              className="rounded-full"
              src={session?.user?.image}
              height={34}
              width={34}
              alt="failed"
              />
            </div>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="border rounded py-2 px-3"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-blue-400"
            >
              Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
