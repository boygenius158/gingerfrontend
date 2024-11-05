"use client";

import { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import instance from "@/axiosInstance";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

export default function CommentSectionPost({ post }) {
  const { data: session, status } = useSession();
  const [hidePostComment, setHidePostComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [reply, setReply] = useState("");

  const fetchComments = useCallback(async () => {
    if (!session) {
      return;
    }
    const res = await instance.post("/api/user/fetch-post-comment", {
      postId: post._id,
    });
    setComments(res.data.comments);
  }, [session, post._id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Submit the new comment to the backend
      const res = await instance.post("/api/user/user-posted-comment", {
        content: newComment,
        userId: session?.id,
        postId: post._id,
      });

      console.log(res);

      const comment = res.data; // The backend returns the new comment with MongoDB _id

      // Add the new comment to the list of comments
      setComments([...comments, comment]);
      setNewComment("");
      toast.success("Comment posted.");
    }
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    console.log("work");

    if (reply.trim()) {
      // Submit the reply to the backend
      const res = await instance.post("/api/user/user-posted-reply", {
        content: reply,
        userId: session?.id,
        postId: post._id,
        parentId: commentId,
      });

      console.log(res);

      const replyComment = res.data; // The backend returns the new reply with MongoDB _id

      const updatedComments = comments.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            replies: comment.replies
              ? [...comment.replies, replyComment]
              : [replyComment],
          };
        }
        return comment;
      });

      setComments(updatedComments);
      setReply("");
      toast.success("Reply added.");
      setReplyingTo(null); // Reset replying state
    }
  };

  async function handleDelereReplyComment(comment, parentComment) {
    console.log(parentComment);
    const { data } = await instance.post("/api/user/delete-commentreply", {
      parentCommentId: parentComment._id,
      comment,
    });
    toast.success("reply deleted.");
    console.log(data);
    let updatedComments = comments.map((item) => {
      if (item._id === parentComment._id) {
        return {
          ...item,
          replies: item.replies.filter((reply) => reply._id !== comment._id),
        };
      }
      return item;
    });
    setComments(updatedComments);
  }

  async function handleDeleteComment(comment) {
    const commentId = comment._id;
    console.log(comment);
    const updatedComments = comments.filter((item) => item._id !== commentId);
    setComments(updatedComments);

    const response = await instance.post("/api/user/delete-comment", {
      commentId,
    });
    if (response.status === 200) {
      toast("The comment was deleted");
    }
  }

  console.log(comments);

  console.log(post);

  return (
    <div className="w-full mx-auto p-4 bg-background rounded-lg shadow text-white bg-black ">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <ScrollArea className="h-[220px] mb-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex flex-col mb-4">
            <div className="flex space-x-4">
              <Avatar className="border-2 border-purple-700">
                <AvatarImage src={comment.avatar} alt="failed" />
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{comment.author}</p>
                <p className="text-muted-foreground">{comment.content}</p>
              </div>
              {replyingTo === comment._id ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs ml-12"
                  onClick={() => setReplyingTo(null)}
                >
                  <p>close</p>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs ml-12"
                  onClick={() => setReplyingTo(comment._id)}
                >
                  <p>reply</p>
                </Button>
              )}

              {session.username === comment.author && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs ml-12"
                  onClick={() => handleDeleteComment(comment)}
                >
                  Delete
                </Button>
              )}
            </div>

            {/* Render replies if they exist */}
            {comment.replies &&
              comment.replies.map((reply) => (
                <div key={reply._id} className="flex space-x-4 ml-8 mt-2">
                  <Avatar className="border-2 border-purple-700">
                    <AvatarImage
                      src={
                        typeof reply.avatar === "string"
                          ? reply.avatar
                          : reply.avatar[0]
                      }
                      alt="failed"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">
                          {typeof reply.author === "string"
                            ? reply.author
                            : reply.author[0]}
                        </p>
                        <p className="text-muted-foreground">{reply.content}</p>
                      </div>
                      {/* {session.username === comment.author && ( */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs ml-12"
                        onClick={() => handleDelereReplyComment(reply, comment)}
                      >
                        Delete
                      </Button>
                      {/* )} */}
                    </div>
                  </div>
                </div>
              ))}

            {/* Render reply textarea if replying to the current comment */}
            {replyingTo === comment._id && (
              <form
                onSubmit={(e) => handleReplySubmit(e, comment._id)}
                className="mt-2"
              >
                <Textarea
                  placeholder="Add a reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="w-full bg-black text-white border-purple-700 border-2 focus:border-purple-900"
                />
                <Button className="bg-purple-700 mt-2" type="submit">
                  Post Reply
                </Button>
              </form>
            )}
          </div>
        ))}
      </ScrollArea>
      {/* <button onClick={()=>setHidePostComment(!hidePostComment)}>div</button> */}
      {session && session.username !== post?.userDetails?.username &&
        // session.username !== post.userDetails.username &&
        !hidePostComment && (
          <form onSubmit={handleCommentSubmit} className="space-y-4 ">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-black text-white  border-purple-700 border-2 focus:border-purple-900"
            />
            <Button className="bg-purple-700" type="submit">
              Post Comment
            </Button>
          </form>
        )}
    </div>
  );
}
